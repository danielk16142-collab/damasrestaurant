// One-off: vectorize the Damas wordmark + floral emblem from the brand square.
// Usage: node tools/trace-logo.mjs  → writes src/assets/brand/*.svg
import sharp from 'sharp';
import potrace from 'potrace';
import fs from 'fs';
const src = 'Damas Website Example/327319137_707671534290761_1026487546071611388_n.jpg';

async function traceBand(scale, test, opts) {
  const { data, info } = await sharp(src).greyscale().resize(1080 * scale, 1080 * scale, { kernel: 'lanczos3' }).raw().toBuffer({ resolveWithObject: true });
  // halo = letters grown by a few px, so the anti-aliased rim around the wordmark is not traced as ornament
  const halo = await sharp(src).greyscale().resize(1080 * scale, 1080 * scale).threshold(185).blur(3 * scale).raw().toBuffer();
  const out = Buffer.alloc(data.length);
  const edge = 12 * scale;
  for (let i = 0; i < data.length; i++) {
    const x = i % info.width, y = Math.floor(i / info.width);
    const inFrame = x > edge && y > edge && x < info.width - edge && y < info.height - edge;
    out[i] = inFrame && test(data[i], halo[i]) ? 0 : 255;
  }
  const png = await sharp(out, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
  const svg = await new Promise((res, rej) => potrace.trace(png, { threshold: 128, ...opts }, (e, s) => (e ? rej(e) : res(s))));
  const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
  // scale back to 1080 space and round
  return d.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round((parseFloat(n) / scale) * 10) / 10));
}
function bbox(d) {
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}
const word = await traceBand(3, (v) => v > 185, { turdSize: 60, optTolerance: 1.2, alphaMax: 1.1 });
const flora = await traceBand(2, (v, h) => v > 50 && v <= 185 && h < 8, { turdSize: 400, optTolerance: 1.2, alphaMax: 1.1 });
const [x0, y0, x1, y1] = bbox(word);
const pad = 4;
const r = (n) => Math.round(n * 10) / 10;
const wvb = [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2].map(r).join(" ");
fs.writeFileSync('src/assets/brand/wordmark.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wvb}"><path fill="currentColor" d="${word}"/></svg>\n`);
const [fx0, fy0, fx1, fy1] = bbox(flora);
if (!process.env.WORD_ONLY) fs.writeFileSync('src/assets/brand/emblem.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fx0 - pad} ${fy0 - pad} ${fx1 - fx0 + pad * 2} ${fy1 - fy0 + pad * 2}"><path fill="currentColor" fill-rule="evenodd" d="${flora}"/></svg>\n`);
console.log('wordmark', word.length, wvb, '| emblem', flora.length);
