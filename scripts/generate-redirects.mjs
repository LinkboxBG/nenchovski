/**
 * Генерира src/data/redirects.generated.ts от data/redirect-map.csv
 * (копие на nenchovski-planning/FINAL-REDIRECT-MAP.csv).
 * Пускай след всяка промяна на CSV-то: node scripts/generate-redirects.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const csv = readFileSync(new URL("../data/redirect-map.csv", import.meta.url), "utf8");

function parseCSV(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    const cols = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') inQ = false;
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ",") { cols.push(cur); cur = ""; }
      else cur += c;
    }
    cols.push(cur);
    rows.push(cols);
  }
  return rows;
}

const rows = parseCSV(csv);
const redirects301 = [];
const gone410 = [];
const keep200 = [];
const keepAssets = [];

for (const [oldPath, cls, , , action, target] of rows) {
  if (action === "301") redirects301.push({ source: oldPath, destination: target });
  else if (action === "410") gone410.push(oldPath);
  else if (action === "200-keep") keep200.push(oldPath);
  else if (action === "keep-asset") keepAssets.push(oldPath);
}

const out = `// АВТОГЕНЕРИРАН ФАЙЛ — не редактирай на ръка.
// Източник: data/redirect-map.csv (FINAL-REDIRECT-MAP.csv)
// Регенерация: node scripts/generate-redirects.mjs

/** ${redirects301.length} × 301 консолидации (next.config redirects) */
export const REDIRECTS_301: { source: string; destination: string }[] = ${JSON.stringify(redirects301, null, 2)};

/** ${gone410.length} × 410 Gone — точни пътища от хак-спама */
export const GONE_410: string[] = ${JSON.stringify(gone410, null, 2)};

/** ${keep200.length} × канонични URL-а (200-keep) — launch blocker ако някой 404-не */
export const KEEP_200: string[] = ${JSON.stringify(keep200, null, 2)};

/** ${keepAssets.length} × keep-asset пътища (стари /wp-content файлове) */
export const KEEP_ASSETS: string[] = ${JSON.stringify(keepAssets, null, 2)};
`;

writeFileSync(new URL("../src/data/redirects.generated.ts", import.meta.url), out);
console.log(`301: ${redirects301.length}, 410: ${gone410.length}, 200: ${keep200.length}, assets: ${keepAssets.length}`);
