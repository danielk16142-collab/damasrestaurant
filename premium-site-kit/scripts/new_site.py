#!/usr/bin/env python3
"""
Create a new luxury site from the template, or recolour/rename an existing one.

  python new_site.py <target-dir> --name "Casa Lumen Realty" --short "Casa Lumen" \
      --accent "#C0C4C8" --base "#0B1A2E" [--paper "#F6F5F2"]

  python new_site.py <existing-site> --recolor-only --accent "#..." --base "#..."

  python new_site.py --preview --accent "#..." --base "#..."      # print palette only
  python new_site.py --logo-colors path/to/logo.svg               # list colours in an SVG
  python new_site.py <site> --add-hostinger                        # Hostinger hosting files only

  --add-hostinger (also combinable with site creation) copies:
    public/.htaccess                         HTTPS, 404 page, compression, caching
    .github/workflows/deploy-hostinger.yml   build + FTP upload on every push to main

What it does:
  * copies ../template into <target-dir> (refuses to overwrite a non-empty dir)
  * derives the full palette from two brand colours (accent + base), checking
    WCAG contrast so text colours stay readable (>= 4.5:1)
  * rewrites the tokens in src/styles/global.css and every hard-coded rgb()/hex
    that came from the template palette (overlays, favicon, theme-color)
  * replaces the template brand name ("Vértice Real Estate", "VÉRTICE", "Vértice")

It does NOT rewrite copy, listings, images or the monogram SVG: that is
judgement work, done by hand afterwards (see SKILL.md).
"""
import argparse
import colorsys
import re
import shutil
import sys
from collections import Counter
from pathlib import Path

TEMPLATE = Path(__file__).resolve().parent.parent / "template"
HOSTINGER = Path(__file__).resolve().parent.parent / "assets" / "hostinger"

# Template palette literals (the Vértice originals) that get swapped.
T_ACCENT = (217, 185, 120)   # #D9B978
T_BASE = (8, 8, 8)           # #080808
T_PAPER = (247, 243, 236)    # #F7F3EC

TEXT_EXT = {".css", ".astro", ".tsx", ".ts", ".svg", ".md", ".mjs", ".json", ".html"}


# ---------------------------------------------------------------- colour math
def hex_to_rgb(h: str):
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if not re.fullmatch(r"[0-9a-fA-F]{6}", h):
        sys.exit(f"Not a hex colour: {h!r}")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def rgb_to_hex(c):
    return "#{:02x}{:02x}{:02x}".format(*(max(0, min(255, round(v))) for v in c))


def mix(a, b, t):
    """t=0 -> a, t=1 -> b"""
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))


def luminance(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(v) for v in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def shade_until(color, against, target=4.5, toward=(0, 0, 0)):
    """Move `color` toward `toward` until contrast with `against` >= target."""
    for i in range(0, 101):
        c = mix(color, toward, i / 100)
        if contrast(c, against) >= target:
            return c
    return toward


def darken_keep_hue(color, against, target=4.5):
    """Darken by lowering lightness in HLS, keeping hue & a bit more saturation."""
    h, l, s = colorsys.rgb_to_hls(*(v / 255 for v in color))
    for step in range(0, 100):
        l2 = max(0.0, l - step / 100)
        c = tuple(v * 255 for v in colorsys.hls_to_rgb(h, l2, min(1.0, s * 1.05)))
        if contrast(c, against) >= target:
            return c
    return (0, 0, 0)


def derive(accent, base, paper=None):
    if paper is None:
        paper = mix((251, 250, 248), accent, 0.07)
    tint = mix(base, accent, 0.45)  # neutrals lean toward the brand hue
    p = {
        "accent": accent,
        "accent-soft": mix(accent, (255, 255, 255), 0.35),
        "accent-deep": darken_keep_hue(accent, paper, 4.6),
        "ink": base,
        "ink-2": mix(base, accent, 0.05),
        "ink-3": mix(base, accent, 0.10),
        "paper": paper,
        "bone": mix(paper, tint, 0.09),
        "sand": mix(paper, tint, 0.26),
        "stone": shade_until(mix(paper, tint, 0.7), paper, 4.6, base),
        "mist": shade_until(mix(base, mix(paper, accent, 0.3), 0.55), base, 4.6, paper),
    }
    return p


def report(p):
    rows = [
        ("accent on ink (headings, buttons)", contrast(p["accent"], p["ink"])),
        ("accent-deep on paper (eyebrows, links)", contrast(p["accent-deep"], p["paper"])),
        ("ink on paper (body text)", contrast(p["ink"], p["paper"])),
        ("stone on paper (muted text)", contrast(p["stone"], p["paper"])),
        ("mist on ink (muted text, dark)", contrast(p["mist"], p["ink"])),
        ("ink on accent (primary button label)", contrast(p["ink"], p["accent"])),
    ]
    print("\nPalette")
    for k, v in p.items():
        print(f"  --{k:<12} {rgb_to_hex(v)}")
    print("\nContrast (WCAG AA needs 4.5 for text, 3.0 for large text)")
    warn = False
    for label, r in rows:
        flag = "ok" if r >= 4.5 else ("large-text only" if r >= 3 else "FAIL")
        warn |= r < 4.5
        print(f"  {r:5.2f}  {flag:<15} {label}")
    if warn:
        print("\n  Note: pairs below 4.5 need attention. If 'accent on ink' is low, the accent is"
              "\n  too dark for the dark sections; pick a lighter accent or a darker base.")
    print()


# ---------------------------------------------------------------- rewriting
def rgb_str(c):
    return "{} {} {}".format(*(round(v) for v in c))


def recolor(root: Path, p):
    # Swap from whatever palette the site currently has (template on first run).
    import json
    state = root / ".kit-palette.json"
    cur = json.loads(state.read_text()) if state.exists() else {
        "accent": T_ACCENT, "ink": T_BASE, "paper": T_PAPER}
    cur = {k: tuple(v) for k, v in cur.items()}
    css = root / "src/styles/global.css"
    s = css.read_text(encoding="utf-8")
    for key in ["accent-soft", "accent-deep", "accent", "ink-2", "ink-3", "ink",
                "paper", "bone", "sand", "stone", "mist"]:
        s = re.sub(rf"(--{key}:\s*)#[0-9a-fA-F]{{6}}", rf"\g<1>{rgb_to_hex(p[key])}", s)
    css.write_text(s, encoding="utf-8")

    swaps = [
        (re.compile(re.escape(f"rgb({rgb_str(cur['accent'])}")), f"rgb({rgb_str(p['accent'])}"),
        (re.compile(re.escape(f"rgb({rgb_str(cur['ink'])}")), f"rgb({rgb_str(p['ink'])}"),
        (re.compile(re.escape(f"rgb({rgb_str(cur['paper'])}")), f"rgb({rgb_str(p['paper'])}"),
        (re.compile(re.escape(rgb_to_hex(cur["accent"])), re.I), rgb_to_hex(p["accent"])),
        (re.compile(re.escape(rgb_to_hex(cur["ink"])), re.I), rgb_to_hex(p["ink"])),
    ]
    changed = 0
    for f in root.rglob("*"):
        if f.suffix not in TEXT_EXT or "node_modules" in f.parts or f == css:
            continue
        t = f.read_text(encoding="utf-8")
        u = t
        for rx, rep in swaps:
            u = rx.sub(rep, u)
        if u != t:
            f.write_text(u, encoding="utf-8")
            changed += 1
    # global.css also holds rgb() literals for lines/overlays
    s = css.read_text(encoding="utf-8")
    for rx, rep in swaps[:3]:
        s = rx.sub(rep, s)
    css.write_text(s, encoding="utf-8")
    state.write_text(json.dumps({k: [round(x) for x in p[k]] for k in ("accent", "ink", "paper")}))
    print(f"Recoloured tokens + {changed} files")


def rename(root: Path, name: str, short: str):
    pairs = [("Vértice Real Estate", name), ("VÉRTICE", short.upper()), ("Vértice", short)]
    changed = 0
    for f in root.rglob("*"):
        if f.suffix not in TEXT_EXT or "node_modules" in f.parts:
            continue
        t = f.read_text(encoding="utf-8")
        u = t
        for a, b in pairs:
            u = u.replace(a, b)
        if u != t:
            f.write_text(u, encoding="utf-8")
            changed += 1
    import unicodedata
    ascii_name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-")
    pkg = root / "package.json"
    pkg.write_text(re.sub(r'"name":\s*"[^"]+"', f'"name": "{slug}"', pkg.read_text(encoding="utf-8"), 1), encoding="utf-8")
    print(f"Renamed brand in {changed} files (package name: {slug})")


def add_hostinger(root: Path):
    if not (root / "package.json").exists():
        sys.exit(f"{root} does not look like a site (no package.json)")
    targets = {
        HOSTINGER / "htaccess": root / "public" / ".htaccess",
        HOSTINGER / "deploy-hostinger.yml": root / ".github" / "workflows" / "deploy-hostinger.yml",
    }
    for src, dst in targets.items():
        if dst.exists():
            print(f"  kept existing {dst.relative_to(root)} (delete it first to replace)")
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        print(f"  added {dst.relative_to(root)}")
    print("Hostinger: add FTP_SERVER / FTP_USERNAME / FTP_PASSWORD as GitHub Actions secrets, "
          "then push to main (see references/deploy.md).")


def logo_colors(svg: Path):
    s = svg.read_text(encoding="utf-8", errors="ignore")
    found = Counter(h.lower() for h in re.findall(r"#[0-9a-fA-F]{6}\b", s))
    found.update(rgb_to_hex(tuple(map(int, m))) for m in re.findall(r"rgb\((\d+)[ ,]+(\d+)[ ,]+(\d+)", s))
    if not found:
        print("No hex/rgb colours found (the logo may use named colours or be a raster image).")
        return
    print("Colours in logo (most used first):")
    for h, n in found.most_common():
        print(f"  {h}  x{n}  luminance {luminance(hex_to_rgb(h)):.2f}")
    print("\nUsually: the darkest is --base (dark sections), the most saturated/brightest is --accent.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("target", nargs="?")
    ap.add_argument("--name", help='Full brand name, e.g. "Casa Lumen Realty"')
    ap.add_argument("--short", help='Short name for logo/wordmark, e.g. "Casa Lumen"')
    ap.add_argument("--accent", help="Brand accent hex (buttons, highlights)")
    ap.add_argument("--base", help="Brand dark hex (dark sections, text)")
    ap.add_argument("--paper", help="Optional light background hex")
    ap.add_argument("--recolor-only", action="store_true")
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--logo-colors", metavar="SVG")
    ap.add_argument("--add-hostinger", action="store_true", help="add .htaccess + FTP deploy workflow")
    a = ap.parse_args()

    if a.logo_colors:
        logo_colors(Path(a.logo_colors))
        return

    if a.add_hostinger and not (a.accent or a.base):
        if not a.target:
            ap.error("target directory required")
        add_hostinger(Path(a.target).resolve())
        return

    if not (a.accent and a.base):
        ap.error("--accent and --base are required (use --logo-colors to find them)")
    p = derive(hex_to_rgb(a.accent), hex_to_rgb(a.base), hex_to_rgb(a.paper) if a.paper else None)
    report(p)
    if a.preview:
        return
    if not a.target:
        ap.error("target directory required")

    root = Path(a.target).resolve()
    if not a.recolor_only:
        if root.exists() and any(p_ for p_ in root.iterdir() if p_.name not in {".git", ".claude", "Images", "images", "assets"} and not p_.name.lower().endswith((".svg", ".png", ".jpg", ".jpeg", ".webp", ".pdf", ".md"))):
            sys.exit(f"{root} already contains project files; refusing to overwrite. Use an empty folder or --recolor-only.")
        shutil.copytree(TEMPLATE, root, dirs_exist_ok=True)
        print(f"Copied template -> {root}")
    elif not (root / "src/styles/global.css").exists():
        sys.exit(f"{root} does not look like a site built from this kit (no src/styles/global.css)")

    recolor(root, p)
    if a.name:
        rename(root, a.name, a.short or a.name)
    if a.add_hostinger:
        add_hostinger(root)
    print("\nNext: npm install, then follow SKILL.md (logo, content, images, copy).")


if __name__ == "__main__":
    main()
