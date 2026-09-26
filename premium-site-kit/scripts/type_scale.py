#!/usr/bin/env python3
"""
Generate the fluid type scale (--step--2 ... --step-6) for a site.

Each step grows smoothly between two screen widths: on a phone it uses the
small base size and ratio, on a large screen the big ones. The clamp() mixes
rem and vw so text still grows when the visitor zooms (WCAG 1.4.4).

  python type_scale.py                                   # print the default scale
  python type_scale.py --base 16 18 --ratio 1.2 1.4      # phone / desktop values
  python type_scale.py --display-max 240                 # cap for --step-6 (giant hero/wordmark), px
  python type_scale.py --table                           # sizes in px at the test widths
  python type_scale.py --write path/to/site              # replace the --step-* tokens in src/styles/global.css

Defaults: 16px body on a 360px phone -> 18px on a 1440px screen, ratio 1.2 -> 1.4.
See references/typography.md for how to choose them.
"""
import argparse
import re
import sys
from pathlib import Path

STEPS = range(-2, 7)
TEST_WIDTHS = [320, 375, 768, 1024, 1440, 1920]
ROOT_PX = 16


def step_sizes(n, a):
    lo = a.base[0] * a.ratio[0] ** n
    hi = a.base[1] * a.ratio[1] ** n
    if n == 6 and a.display_max:
        hi = a.display_max
    if n == 6 and a.display_min:
        lo = a.display_min
    if n < 0:  # labels and captions: fixed, never under 12px
        lo = hi = max(12, min(lo, hi))
    return lo, max(lo, hi)


def clamp(lo, hi, a):
    """clamp(min, intercept rem + slope vw, max) that hits lo at vw[0] and hi at vw[1]."""
    slope = (hi - lo) / (a.vw[1] - a.vw[0])
    intercept = lo - slope * a.vw[0]
    r = lambda px: f"{px / ROOT_PX:.4g}rem"
    if slope == 0:
        return r(lo)
    return f"clamp({r(lo)}, {intercept / ROOT_PX:.4g}rem + {slope * 100:.4g}vw, {r(hi)})"


def size_at(width, lo, hi, a):
    t = (width - a.vw[0]) / (a.vw[1] - a.vw[0])
    return min(hi, max(lo, lo + (hi - lo) * t))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--base", nargs=2, type=float, default=[16, 18], metavar=("PHONE", "DESKTOP"), help="body size in px")
    p.add_argument("--ratio", nargs=2, type=float, default=[1.2, 1.4], metavar=("PHONE", "DESKTOP"), help="step ratio")
    p.add_argument("--vw", nargs=2, type=float, default=[360, 1440], metavar=("MIN", "MAX"), help="screen widths where the scale stops growing")
    p.add_argument("--display-max", type=float, help="px cap for --step-6 on large screens (giant hero/wordmark)")
    p.add_argument("--display-min", type=float, help="px floor for --step-6 on phones")
    p.add_argument("--table", action="store_true", help="print px sizes at the test widths")
    p.add_argument("--write", metavar="SITE", help="rewrite the --step-* tokens in SITE/src/styles/global.css")
    a = p.parse_args()

    if a.base[0] < 16:
        print(f"! Body size on phones is {a.base[0]}px. Keep it at 16px or more (iOS zooms inputs below 16px, and it's the readability floor).", file=sys.stderr)

    tokens, warnings = [], []
    for n in STEPS:
        lo, hi = step_sizes(n, a)
        tokens.append((n, lo, hi, clamp(lo, hi, a)))
        if hi / lo > 2.5:
            warnings.append(f"--step-{n}: grows {hi / lo:.1f}x from phone to desktop. Above 2.5x, browser zoom may not reach 200% (WCAG 1.4.4); lower the desktop size or raise the phone size.")

    css = "\n".join(f"  --step-{n}: {c};  /* {lo:.0f}px -> {hi:.0f}px */" for n, lo, hi, c in tokens)
    print(css)

    if a.table:
        print("\nstep    " + "".join(f"{w:>7}" for w in TEST_WIDTHS))
        for n, lo, hi, _ in tokens:
            print(f"{n:>4}    " + "".join(f"{size_at(w, lo, hi, a):>7.1f}" for w in TEST_WIDTHS))

    for w in warnings:
        print("! " + w, file=sys.stderr)

    if a.write:
        path = Path(a.write) / "src" / "styles" / "global.css"
        text = path.read_text(encoding="utf-8")
        count = 0
        for n, lo, hi, c in tokens:
            text, k = re.subn(rf"(--step-{re.escape(str(n))}:)[^;]*;[^\n]*", rf"\g<1> {c};  /* {lo:.0f}px -> {hi:.0f}px */", text)
            count += k
        if count == 0:
            sys.exit(f"No --step-* tokens found in {path}")
        path.write_text(text, encoding="utf-8")
        print(f"\nUpdated {count} tokens in {path}")


if __name__ == "__main__":
    main()
