/**
 * Поправя /wp-content/uploads/... reference-и в content md файловете срещу
 * реалния инвентар на диска: маха -WxH size-суфикси, търси файла по basename
 * в друга папка, а за счупени cover-и слага първата съществуваща снимка от
 * файла или дефолтна. Пускай: node scripts/fix-image-refs.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const UPLOADS = path.join(root, "public/wp-content/uploads");

// Инвентар: decoded relative path → true; basename index
const all = new Set();
const byBase = new Map();
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else {
      const rel = "/wp-content/uploads/" + path.relative(UPLOADS, full).replaceAll("\\", "/");
      all.add(rel);
      const base = e.toLowerCase();
      if (!byBase.has(base)) byBase.set(base, rel);
    }
  }
})(UPLOADS);

function decodeSafe(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}

/** Опитва да намери съществуващ файл за даден (decoded) reference */
function repair(ref) {
  if (all.has(ref)) return ref;
  // 1) махни -WxH суфикс
  const noSize = ref.replace(/-\d+x\d+(\.\w+)$/, "$1");
  if (all.has(noSize)) return noSize;
  // 2) търси по basename (и без size) в целия инвентар
  for (const cand of [ref, noSize]) {
    const base = path.posix.basename(cand).toLowerCase();
    if (byBase.has(base)) return byBase.get(base);
  }
  // 3) fuzzy: basename без size и без разширение като префикс
  const stem = path.posix.basename(noSize).replace(/\.\w+$/, "").toLowerCase();
  for (const [base, rel] of byBase) {
    if (base.startsWith(stem.slice(0, Math.max(10, stem.length - 3)))) return rel;
  }
  return null;
}

const report = [];
const IMG_RE = /\/wp-content\/uploads\/[^\s)"'\]]+/g;

for (const dir of ["src/content/pages", "src/content/blog"]) {
  const full = path.join(root, dir);
  if (!existsSync(full)) continue;
  for (const f of readdirSync(full).filter((x) => x.endsWith(".md"))) {
    const fp = path.join(full, f);
    let text = readFileSync(fp, "utf8");
    let changed = false;
    const broken = [];

    text = text.replace(IMG_RE, (m) => {
      const dec = decodeSafe(m);
      const fixed = repair(dec);
      if (fixed === dec || (fixed && encodeURI(fixed) === m)) return m;
      if (fixed) {
        changed = true;
        report.push(`  fix  ${f}: ${dec.slice(0, 70)}… → ${fixed.slice(0, 70)}…`);
        return encodeURI(fixed);
      }
      broken.push(dec);
      return m;
    });

    // cover без валиден файл → първата валидна снимка от body или дефолт
    const coverMatch = text.match(/^cover:\s*"([^"]+)"/m);
    if (coverMatch) {
      const dec = decodeSafe(coverMatch[1]);
      if (!all.has(dec)) {
        const bodyImgs = [...text.matchAll(IMG_RE)]
          .map((m) => decodeSafe(m[0]))
          .filter((p) => all.has(p) && p !== dec);
        const fallback =
          bodyImgs.find((p) => /корица|cover|\.02\.|снимка/i.test(p)) ??
          bodyImgs[0] ??
          "/wp-content/uploads/2026/04/Кърти-чисти-извозва.02.webp";
        if (all.has(fallback) || bodyImgs.length) {
          text = text.replace(coverMatch[0], `cover: "${encodeURI(fallback)}"`);
          changed = true;
          report.push(`  COVER ${f}: → ${fallback.slice(0, 80)}`);
        } else {
          report.push(`  ✘ COVER без замяна ${f}: ${dec.slice(0, 80)}`);
        }
      }
    }

    for (const b of broken) report.push(`  ✘ broken body img ${f}: ${b.slice(0, 90)}`);
    if (changed) writeFileSync(fp, text);
  }
}

console.log(report.join("\n") || "Всичко е наред — няма счупени reference-и.");
console.log(`\nИнвентар: ${all.size} файла.`);
