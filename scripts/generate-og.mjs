/**
 * Генерира OG изображения 1200×630 (JPG — Viber/FB не обичат webp) от
 * cover-ите във frontmatter-а на src/content/**. Изход: public/og/<key>.jpg
 * Пускай след промяна на съдържанието: node scripts/generate-og.mjs
 */
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(root, "public/og");
mkdirSync(OUT, { recursive: true });

const jobs = new Map(); // key -> абсолютен път до cover файла

function collect(dir) {
  const full = path.join(root, dir);
  if (!existsSync(full)) return;
  for (const f of readdirSync(full)) {
    if (!f.endsWith(".md")) continue;
    const { data } = matter(readFileSync(path.join(full, f), "utf8"));
    const cover = data.cover;
    const key = (data.slug ?? f.replace(/\.md$/, "")).replace(/\//g, "__");
    if (!cover || !cover.startsWith("/")) continue;
    const src = path.join(root, "public", decodeURIComponent(cover));
    if (existsSync(src)) jobs.set(key, src);
    else console.warn(`⚠ липсва cover за ${key}: ${cover}`);
  }
}

collect("src/content/pages");
collect("src/content/blog");

// Статични страници
const DEFAULT_COVER = path.join(
  root,
  "public/wp-content/uploads/2023/12/Хамали-София-Ненчовски-Транспорт-корица.webp"
);
for (const key of ["home", "ceni", "za-nas", "kontakti", "porachai", "blog"]) {
  if (!jobs.has(key)) jobs.set(key, DEFAULT_COVER);
}

let done = 0;
for (const [key, src] of jobs) {
  const out = path.join(OUT, `${key}.jpg`);
  try {
    await sharp(src)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, progressive: true })
      .toFile(out);
    done++;
  } catch (e) {
    console.warn(`⚠ ${key}: ${e.message}`);
  }
}
console.log(`OG: ${done}/${jobs.size} генерирани в public/og/`);
