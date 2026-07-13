/**
 * Опис на автентичните снимки по префикс (за enrichment мапинга).
 * Изход: image-inventory.json — percent-encoded пътища, готови за src.
 */
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const base = "public/wp-content/uploads";
const out = {};

function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(webp|jpe?g|png)$/i.test(e.name)) continue;
    const rel = "/" + p.split(path.sep).join("/").replace(/^public\//, "");
    const prefix = e.name
      .replace(/(\.\d+(-\d+)?)?(-e\d+)?\.(webp|jpe?g|png)$/i, "")
      .replace(/-\d+x\d+$/, "");
    const encoded = rel
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/");
    (out[prefix] = out[prefix] || []).push(encoded);
  }
}

walk(base);
const sorted = Object.fromEntries(
  Object.entries(out).sort((a, b) => b[1].length - a[1].length)
);
writeFileSync("image-inventory.json", JSON.stringify(sorted, null, 1));
console.log(
  Object.entries(sorted)
    .map(([k, v]) => `${k}: ${v.length}`)
    .join("\n")
);
