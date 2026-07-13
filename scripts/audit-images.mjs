/**
 * Одит на изображенията в съдържанието: липсващи файлове, дубликати
 * в рамките на файл и повторени cover-и между статии.
 * Изход: image-audit.json + конзолен отчет.
 */
import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const dirs = ["src/content/blog", "src/content/pages"];
const report = {};
const coverUse = {};

function extractImages(md) {
  const out = [];
  const re = /!\[[^\]]*\]\(([^)\s]+)/g;
  let m;
  while ((m = re.exec(md))) out.push(m[1]);
  const cover = md.match(/^cover:\s*"?([^"\n]+)"?/m);
  return { images: out, cover: cover ? cover[1].trim() : null };
}

function fileExists(url) {
  if (!url.startsWith("/")) return "external";
  const p = path.join("public", decodeURIComponent(url));
  return existsSync(p);
}

for (const dir of dirs) {
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const md = readFileSync(path.join(dir, f), "utf8");
    const { images, cover } = extractImages(md);
    const missing = images.filter((i) => fileExists(i) === false);
    const dupes = images.filter((i, idx) => images.indexOf(i) !== idx);
    const coverMissing = cover && fileExists(cover) === false;
    if (cover) (coverUse[cover] = coverUse[cover] || []).push(f);
    report[`${dir}/${f}`] = {
      cover,
      coverMissing: !!coverMissing,
      imageCount: images.length,
      missing,
      dupesWithinFile: [...new Set(dupes)],
      images,
    };
  }
}

const sharedCovers = Object.fromEntries(
  Object.entries(coverUse).filter(([, v]) => v.length > 1)
);

writeFileSync(
  "image-audit.json",
  JSON.stringify({ report, sharedCovers }, null, 1)
);

for (const [f, r] of Object.entries(report)) {
  const flags = [];
  if (r.coverMissing) flags.push("COVER-MISSING");
  if (!r.cover) flags.push("NO-COVER");
  if (r.missing.length) flags.push(`MISSING:${r.missing.length}`);
  if (r.dupesWithinFile.length) flags.push(`DUPES:${r.dupesWithinFile.length}`);
  if (r.imageCount === 0 && f.includes("blog")) flags.push("NO-IMAGES");
  if (flags.length) console.log(`${f} → ${flags.join(", ")}`);
}
console.log("\nShared covers:", JSON.stringify(sharedCovers, null, 1));
