#!/usr/bin/env node
/**
 * Typography screen check (see references/typography.md).
 *
 * Loads every page at a set of screen sizes (plus a sideways phone and 200% zoom)
 * and fails when text overflows, headline lines touch, text is too small, or the
 * hero headline swallows a short screen. Saves a screenshot of each page/size.
 *
 * Run from the site folder, against a running dev/preview server:
 *   npm i -D playwright          (once; if the browser is missing: npx playwright install chromium)
 *   node <skill>/scripts/check_type.mjs http://localhost:4321
 *   node <skill>/scripts/check_type.mjs http://localhost:4321 /fr/ /es/contact   # only these paths
 *   options: --full (full-page screenshots)  --out type-check  --max-pages 40  --sizes 320,375,1440
 *
 * Exit code 1 when there are errors; warnings are reported but don't fail.
 */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(path.join(process.cwd(), 'noop.js'));
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright not found in this project. Run: npm i -D playwright  (then, if asked: npx playwright install chromium)');
  process.exit(2);
}

const args = process.argv.slice(2);
const VALUED = ['--out', '--max-pages', '--sizes'];
const flag = (name) => args.includes(name);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const positional = args.filter((a, i) => !a.startsWith('--') && !VALUED.includes(args[i - 1]));
const base = positional[0];
if (!base) { console.error('Usage: node check_type.mjs <base-url> [paths...]'); process.exit(2); }
const origin = new URL(base).origin;
const outDir = opt('--out', 'type-check');
const maxPages = Number(opt('--max-pages', 40));

const ALL_VIEWPORTS = [
  { name: '320', width: 320, height: 640, phone: true },
  { name: '375', width: 375, height: 812, phone: true },
  { name: '390', width: 390, height: 844, phone: true },
  { name: 'landscape-667', width: 667, height: 375, phone: true },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 },
  // 200% browser zoom on a 1280×800 window = a 640×400 CSS viewport at 2x.
  { name: 'zoom-200', width: 640, height: 400, scale: 2, phone: true },
];
const only = opt('--sizes', '')?.split(',').filter(Boolean);
const VIEWPORTS = only?.length ? ALL_VIEWPORTS.filter((v) => only.includes(v.name)) : ALL_VIEWPORTS;

/** Runs inside the page. Returns { errors, warnings, heads } where heads are headlines to pixel-check. */
function audit({ phone }) {
  const errors = [], warnings = [];
  const vw = innerWidth, vh = innerHeight;
  const label = (el) => {
    const t = (el.textContent || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 50);
    const id = el.id ? `#${el.id}` : el.classList[0] ? `.${el.classList[0]}` : '';
    return `<${el.tagName.toLowerCase()}${id}> "${t}"`;
  };
  const hidden = (el) => {
    if (el.closest('[aria-hidden="true"], [hidden], .sr-only, .visually-hidden, [inert]')) return true;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return true;
    const r = el.getBoundingClientRect();
    return r.width === 0 || r.height === 0;
  };
  // Horizontal scrollers and marquees may extend past the edge; logos are artwork.
  const exempt = (el) => {
    if (el.closest('svg, [class*="logo"], [class*="wordmark"], [class*="marquee"]')) return true;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (p.matches('[data-hscroll-track], [data-marquee]')) return true;
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll') return true;
    }
    return false;
  };
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());

  // 1. Page scrolls sideways (tested by actually scrolling: body { overflow-x: clip } legitimately hides extra width).
  const y0 = scrollY;
  scrollTo(9999, y0);
  const sideways = scrollX > 0;
  scrollTo(0, y0);
  if (sideways) {
    const culprits = [...document.body.querySelectorAll('*')]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.right > vw + 1 && !exempt(el) && !hidden(el); })
      .slice(-3).map(label);
    errors.push(`Page scrolls sideways (${document.documentElement.scrollWidth}px wide). Check: ${culprits.join(' | ')}`);
  }

  const textEls = [...document.body.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,button,label,span,dt,dd,td,th,blockquote,figcaption,small,strong,em,input,textarea,select,summary')]
    .filter((el) => !hidden(el) && !exempt(el) && (hasOwnText(el) || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)));

  for (const el of textEls) {
    const s = getComputedStyle(el);
    const fs = parseFloat(s.fontSize);
    const r = el.getBoundingClientRect();
    const field = el.matches('input,textarea,select');

    // 2. Text past the screen edge, or clipped by its own box.
    if (r.right > vw + 1 || r.left < -1) errors.push(`Text runs off the screen: ${label(el)}`);
    else if (hasOwnText(el) && s.display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2 && s.textOverflow !== 'ellipsis') {
      errors.push(s.overflowX === 'visible'
        ? `A word is too long for its box and sticks out (allow wrapping/hyphens or reduce the size): ${label(el)}`
        : `Text is cut off inside its box: ${label(el)}`);
    }

    // 3. Minimum sizes. Small uppercase, letter-spaced labels get a little leeway.
    if (!field) {
      const label11 = s.textTransform === 'uppercase' && parseFloat(s.letterSpacing) >= fs * 0.05;
      if (fs < 11) errors.push(`${fs.toFixed(1)}px text (min 12px): ${label(el)}`);
      else if (fs < 12) (label11 ? warnings : errors).push(`${fs.toFixed(1)}px text (min 12px${label11 ? ', 11px allowed only for spaced capitals' : ''}): ${label(el)}`);
    }
    // Running text: 16px on phones; fine print (notes, disclaimers) may go to 14px.
    if (phone && el.matches('p, li, dd, td, blockquote') && fs < 16 && (el.textContent || '').trim().length > 80) {
      if (fs < 14) errors.push(`Running text ${fs.toFixed(1)}px on a phone (min 16px, 14px for fine print): ${label(el)}`);
      else warnings.push(`Running text ${fs.toFixed(1)}px on a phone: fine for notes and disclaimers, otherwise use 16px: ${label(el)}`);
    }
    if (phone && field && fs < 16) errors.push(`Form field ${fs.toFixed(1)}px on a phone (iOS zooms in below 16px): ${label(el)}`);

    // 4. Line length for paragraphs.
    if (el.matches('p') && (el.textContent || '').length > 200) {
      const chars = r.width / (fs * 0.5);
      if (chars > 85) warnings.push(`Long lines (~${Math.round(chars)} characters; aim for 45–75): ${label(el)}`);
    }
  }

  // 5. Headlines with 2+ lines are pixel-checked afterwards (see linesTouch).
  const heads = [];
  const candidates = [...document.body.querySelectorAll('h1,h2,h3,.display,[class*="title"]')]
    .filter((el) => !hidden(el) && !el.parentElement.closest('h1,h2,h3,.display,[class*="title"]') && parseFloat(getComputedStyle(el).fontSize) >= 24);
  candidates.forEach((h, id) => {
    const lines = [];
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      for (let i = 0; i < node.textContent.length; i++) {
        if (!node.textContent[i].trim()) continue;
        const range = new Range();
        range.setStart(node, i); range.setEnd(node, i + 1);
        const rect = range.getClientRects()[0];
        if (!rect || !rect.width) continue;
        const line = lines.find((l) => Math.abs(l.top - rect.top) < rect.height * 0.3);
        line ? line.ranges.push(range) : lines.push({ top: rect.top, ranges: [range] });
      }
    }
    if (lines.length < 2) return;
    lines.sort((a, b) => a.top - b.top);
    h.setAttribute('data-tc-id', id);
    (window.__tc ||= {})[id] = lines.map((l) => l.ranges);
    heads.push({ id, label: label(h), fs: parseFloat(getComputedStyle(h).fontSize), lines: lines.length });
  });

  // 6. Hero headline on short screens.
  const h1 = document.querySelector('h1');
  if (h1 && !hidden(h1)) {
    const r = h1.getBoundingClientRect();
    if (r.top < vh && r.height > vh * 0.6) warnings.push(`<h1> takes ${Math.round((r.height / vh) * 100)}% of the screen height; cap it with min(var(--step-x), NNsvh).`);
    if (r.top < vh * 0.5 && r.bottom > vh) warnings.push('<h1> is cut by the bottom of the first screen.');
  }

  return { errors, warnings, heads };
}

/** Render only line `keep` of headline `id` in black on white; return its clip rect (viewport coords). */
function isolateLine({ id, keep }) {
  if (!document.getElementById('tc-style')) {
    const s = document.createElement('style');
    s.id = 'tc-style';
    s.textContent = `[data-tc-on], [data-tc-on] * { color:#000 !important; -webkit-text-fill-color: currentColor !important; text-shadow:none !important; background: transparent !important; }
      [data-tc-on] { background:#fff !important; } ::highlight(tc-hide) { color: transparent; }
      [data-tc-fixed] { visibility: hidden !important; opacity: 0 !important; }`;
    document.head.append(s);
    for (const el of document.body.querySelectorAll('*')) {
      const p = getComputedStyle(el).position;
      if (p === 'fixed' || p === 'sticky') el.setAttribute('data-tc-fixed', '');
    }
  }
  const h = document.querySelector(`[data-tc-id="${id}"]`);
  document.querySelectorAll('[data-tc-on]').forEach((e) => e.removeAttribute('data-tc-on'));
  h.setAttribute('data-tc-on', '');
  const lines = window.__tc[id];
  const hide = new Highlight();
  lines.forEach((ranges, i) => { if (i !== keep) ranges.forEach((r) => hide.add(r)); });
  CSS.highlights.set('tc-hide', hide);
  const r = h.getBoundingClientRect();
  // Whole pixels inside the heading's white box, so no background bleeds into the capture edges.
  const x = Math.ceil(Math.max(0, r.left)) + 1, y = Math.ceil(Math.max(0, r.top)) + 1;
  return { x, y, width: Math.floor(Math.min(innerWidth, r.right)) - 1 - x, height: Math.floor(Math.min(innerHeight, r.bottom)) - 1 - y };
}

function cleanupIsolate() {
  CSS.highlights.delete('tc-hide');
  document.getElementById('tc-style')?.remove();
  document.querySelectorAll('[data-tc-on],[data-tc-fixed]').forEach((e) => { e.removeAttribute('data-tc-on'); e.removeAttribute('data-tc-fixed'); });
}

/**
 * Compare two single-line renders; returns the smallest vertical gap in device px (negative = overlap).
 * `empty` is the same box with every line hidden: anything dark there (icons, arrows) isn't text and is ignored.
 */
async function inkGap({ a, b, empty }) {
  const load = (src) => new Promise((res) => { const img = new Image(); img.onload = () => res(img); img.src = src; });
  const [ia, ib, ie] = await Promise.all([load(a), load(b), load(empty)]);
  const pixels = (img) => {
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
    return { w: c.width, h: c.height, d: ctx.getImageData(0, 0, c.width, c.height).data };
  };
  const E = pixels(ie);
  const dark = (d, k) => d[k] * 0.3 + d[k + 1] * 0.59 + d[k + 2] * 0.11 < 170;
  const mask = (img) => {
    const { w, h, d } = pixels(img);
    const cols = { bottom: new Array(w).fill(-1), top: new Array(w).fill(Infinity) };
    for (let y = 2; y < h - 2; y++) for (let x = 2; x < w - 2; x++) {
      const k = (y * w + x) * 4;
      if (dark(d, k) && !(E.w === w && dark(E.d, k))) { cols.bottom[x] = Math.max(cols.bottom[x], y); cols.top[x] = Math.min(cols.top[x], y); }
    }
    return cols;
  };
  const A = mask(ia), B = mask(ib);
  let gap = Infinity;
  for (let x = 0; x < A.bottom.length; x++) {
    if (A.bottom[x] < 0) continue;
    for (const dx of [-1, 0, 1]) {
      const t = B.top[x + dx];
      if (t !== undefined && t !== Infinity) gap = Math.min(gap, t - A.bottom[x] - 1);
    }
  }
  return gap;
}

async function linesTouch(page, head, scale) {
  const results = [];
  await page.evaluate((id) => document.querySelector(`[data-tc-id="${id}"]`)?.scrollIntoView({ block: 'center' }), head.id);
  const emptyClip = await page.evaluate(isolateLine, { id: head.id, keep: -1 });
  if (emptyClip.width < 2 || emptyClip.height < 2) { await page.evaluate(cleanupIsolate); return null; }
  const empty = 'data:image/png;base64,' + (await page.screenshot({ clip: emptyClip })).toString('base64');
  for (let i = 0; i + 1 < head.lines; i++) {
    const shots = [];
    for (const keep of [i, i + 1]) {
      const clip = await page.evaluate(isolateLine, { id: head.id, keep });
      if (clip.width < 2 || clip.height < 2) { await page.evaluate(cleanupIsolate); return null; }
      const buf = await page.screenshot({ clip });
      if (process.env.TC_DEBUG) writeFileSync(path.join(outDir, `line-${head.id}-${keep}.png`), buf);
      shots.push('data:image/png;base64,' + buf.toString('base64'));
    }
    const gap = await page.evaluate(inkGap, { a: shots[0], b: shots[1], empty });
    if (gap !== Infinity) results.push(gap / scale / head.fs);
  }
  await page.evaluate(cleanupIsolate);
  return results.length ? Math.min(...results) : null;
}

async function discover(page) {
  if (positional.length > 1) return positional.slice(1).map((p) => new URL(p, origin).href);
  await page.goto(base, { waitUntil: 'networkidle' });
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
  const urls = new Set([new URL(base).href]);
  for (const h of hrefs) {
    const u = new URL(h);
    if (u.origin !== origin || /\.(pdf|jpe?g|png|webp|svg|zip)$/i.test(u.pathname)) continue;
    u.hash = ''; u.search = '';
    urls.add(u.href);
    if (urls.size >= maxPages) break;
  }
  return [...urls];
}

const browser = await chromium.launch();
const probe = await browser.newPage();
const urls = await discover(probe);
await probe.close();
mkdirSync(outDir, { recursive: true });

const findings = new Map(); // "level|message" -> { pages:Set, sizes:Set }
const note = (level, msg, url, vp) => {
  const key = `${level}|${msg}`;
  const f = findings.get(key) || { level, msg, pages: new Set(), sizes: new Set() };
  f.pages.add(new URL(url).pathname); f.sizes.add(vp);
  findings.set(key, f);
};

for (const vp of VIEWPORTS) {
  // Reduced motion: the kit then shows every reveal in its final state, so nothing is hidden mid-animation.
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.scale || 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
      await page.screenshot({ path: path.join(outDir, `${slug}@${vp.name}.png`), fullPage: flag('--full') });
      const res = await page.evaluate(audit, { phone: !!vp.phone });
      res.errors.forEach((m) => note('error', m, url, vp.name));
      res.warnings.forEach((m) => note('warn', m, url, vp.name));
      for (const head of res.heads) {
        const gap = await linesTouch(page, head, vp.scale || 1);
        if (gap === null) continue;
        if (gap <= 0) note('error', `Headline lines touch or overlap: ${head.label}. Raise its line-height.`, url, vp.name);
        else if (gap < 0.04) note('warn', `Headline lines almost touch (${gap.toFixed(2)}em gap): ${head.label}`, url, vp.name);
      }
    } catch (e) {
      note('error', `Could not check: ${e.message.split('\n')[0]}`, url, vp.name);
    }
  }
  await ctx.close();
}
await browser.close();

const list = [...findings.values()].sort((a, b) => (a.level === b.level ? b.pages.size * b.sizes.size - a.pages.size * a.sizes.size : a.level === 'error' ? -1 : 1));
const fmt = (set, n = 6) => { const v = [...set]; return v.slice(0, n).join(', ') + (v.length > n ? ` +${v.length - n}` : ''); };
for (const f of list) {
  console.log(`${f.level === 'error' ? 'ERROR' : 'warn '}  ${f.msg}\n       pages: ${fmt(f.pages)}  |  sizes: ${fmt(f.sizes, 10)}`);
}
writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(list.map((f) => ({ ...f, pages: [...f.pages], sizes: [...f.sizes] })), null, 2));
const errors = list.filter((f) => f.level === 'error').length;
console.log(`\nChecked ${urls.length} page(s) x ${VIEWPORTS.length} sizes: ${errors} distinct error(s), ${list.length - errors} distinct warning(s).`);
console.log(`Screenshots and report.json in ./${outDir}/ (add it to .gitignore).`);
process.exit(errors ? 1 : 0);
