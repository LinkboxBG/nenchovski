/**
 * Pexels → локален WEBP (CSP не позволява hotlink; пестелив API usage).
 * Употреба:
 *   PEXELS_API_KEY=xxx node scripts/fetch-stock.mjs "<query>" <out-name> [--landscape] [--pick N]
 * Записва в public/wp-content/uploads/2026/07/<out-name>.webp (макс. 1600px ширина)
 * и отпечатва избраната снимка (id, фотограф — за атрибуция при нужда).
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error("PEXELS_API_KEY env var required");
  process.exit(1);
}

const [query, outName] = process.argv.slice(2);
const pickArgIdx = process.argv.indexOf("--pick");
const pickIdx = pickArgIdx === -1 ? 0 : Number(process.argv[pickArgIdx + 1] || 0);
if (!query || !outName) {
  console.error('Usage: node scripts/fetch-stock.mjs "query" out-name [--pick N]');
  process.exit(1);
}

const res = await fetch(
  `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
  { headers: { Authorization: KEY } }
);
if (!res.ok) {
  console.error("Pexels error", res.status, await res.text());
  process.exit(1);
}
const data = await res.json();
if (!data.photos?.length) {
  console.error("No results for:", query);
  process.exit(2);
}
const photo = data.photos[Math.min(pickIdx, data.photos.length - 1)];
const imgRes = await fetch(photo.src.large2x || photo.src.large);
const buf = Buffer.from(await imgRes.arrayBuffer());

const outDir = "public/wp-content/uploads/2026/07";
mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${outName}.webp`);
const converted = await sharp(buf)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 78 })
  .toBuffer();
writeFileSync(outPath, converted);
console.log(
  JSON.stringify({
    out: `/wp-content/uploads/2026/07/${outName}.webp`,
    pexelsId: photo.id,
    photographer: photo.photographer,
    alt: photo.alt,
    kb: Math.round(converted.length / 1024),
  })
);
