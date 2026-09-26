// Social image (1200×630) and apple-touch-icon from the brand assets.
// Usage: node tools/make-og.mjs
import sharp from 'sharp';
import fs from 'fs';
const word = fs.readFileSync('src/assets/brand/wordmark.svg', 'utf8').replace('currentColor', '#efe6da');
const emblem = fs.readFileSync('public/brand/emblem-red.svg', 'utf8');

const photo = await sharp('src/assets/photos/salle-plafond.jpg').resize(1200, 630, { fit: 'cover', position: 'centre' }).modulate({ brightness: 0.55 }).toBuffer();
const shade = Buffer.from(`<svg width="1200" height="630"><defs><radialGradient id="g" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#120a0d" stop-opacity="0.25"/><stop offset="1" stop-color="#120a0d" stop-opacity="0.85"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);
const wordPng = await sharp(Buffer.from(word), { density: 300 }).resize({ width: 560 }).png().toBuffer();
const tag = Buffer.from(`<svg width="1200" height="80"><text x="600" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-style="italic" fill="#e8a54b">Cuisine syrienne · Outremont, Montréal</text></svg>`);
await sharp(photo)
  .composite([{ input: shade }, { input: wordPng, top: 190, left: 320 }, { input: tag, top: 420, left: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og/damas-home.jpg');

const icon = await sharp(Buffer.from(emblem), { density: 200 }).resize(150, 150, { fit: 'contain', background: { r: 18, g: 10, b: 13, alpha: 1 } }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#120a0d' } }).composite([{ input: icon, top: 15, left: 15 }]).png().toFile('public/apple-touch-icon.png');
console.log('og + icon written');
