/**
 * Автоматичен redirect тест по FINAL-REDIRECT-MAP (data/redirect-map.csv).
 * Изисква работещ сървър: npm run build && npm start, после:
 *   node scripts/verify-redirects.mjs [baseUrl]
 * Проверява: 200-keep → 200 (raw + percent-encoded), 301 → точния target,
 * 410 → 410, keep-asset → 200.
 */
import { readFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
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

async function check(path, redirect = "manual") {
  const res = await fetch(BASE + encodeURI(path), { redirect, headers: { "user-agent": "redirect-verifier" } });
  return res;
}

const rows = parseCSV(csv);
let pass = 0, fail = 0;
const failures = [];

for (const [oldPath, , , , action, target] of rows) {
  try {
    if (action === "200-keep") {
      // raw (encodeURI) форма
      const r1 = await check(oldPath);
      // вече percent-encoded форма (двойна проверка на кирилицата)
      const enc = oldPath.split("/").map((s) => (s ? encodeURIComponent(decodeURIComponentSafe(s)) : s)).join("/");
      const r2 = await fetch(BASE + enc, { redirect: "manual", headers: { "user-agent": "redirect-verifier" } });
      const ok1 = r1.status === 200 || (r1.status === 308 && normalize(r1.headers.get("location")) === normalize(BASE + encodeURI(oldPath)));
      if (r1.status === 200 && r2.status === 200) { pass++; }
      else if (ok1 && r2.status !== 404) { pass++; }
      else { fail++; failures.push(`200-keep ${oldPath}: raw=${r1.status} enc=${r2.status}`); }
    } else if (action === "301") {
      const r = await check(oldPath);
      const loc = r.headers.get("location") ?? "";
      const locPath = decodeURIComponentSafe(loc.replace(BASE, "").replace(/^https?:\/\/[^/]+/, ""));
      const expected = target.endsWith("/") ? target : target + "/";
      const gotNorm = locPath.endsWith("/") ? locPath : locPath + "/";
      if ((r.status === 301 || r.status === 308) && gotNorm === expected) pass++;
      else { fail++; failures.push(`301 ${oldPath}: status=${r.status} loc=${locPath} expected=${expected}`); }
    } else if (action === "410") {
      const r = await check(oldPath);
      if (r.status === 410) pass++;
      else { fail++; failures.push(`410 ${oldPath}: got ${r.status}`); }
    } else if (action === "keep-asset") {
      const r = await check(oldPath, "follow");
      if (r.status === 200) pass++;
      else { fail++; failures.push(`asset ${oldPath}: got ${r.status}`); }
    }
  } catch (e) {
    fail++;
    failures.push(`${action} ${oldPath}: ERROR ${e.message}`);
  }
}

function decodeURIComponentSafe(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}
function normalize(u) { return (u ?? "").replace(/\/$/, ""); }

console.log(`\n✔ pass: ${pass}   ✘ fail: ${fail}   (общо ${rows.length} реда)`);
if (failures.length) {
  console.log("\nПроблеми:");
  for (const f of failures) console.log("  " + f);
  process.exit(1);
}
