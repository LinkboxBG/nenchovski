/**
 * Еднократна подготовка на brand активи:
 * - IK-image.jpg → public/brand/team/ivan-kolev.webp (квадратен crop)
 * - съществуващи клиентски лога от uploads → public/brand/clients/*.webp
 *   (нормализирани на височина 64px, прозрачен/бял фон)
 * Пуска се с: node scripts/prepare-brand-assets.mjs
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const up = (p) => path.join(root, "public/wp-content/uploads", p);
const out = (p) => path.join(root, "public/brand", p);

const jobs = [
  // Екип
  {
    src: path.join(root, "IK-image.jpg"),
    dst: out("team/ivan-kolev.webp"),
    resize: { width: 320, height: 320, fit: "cover" },
  },
  // Клиентски лога (налични локално)
  {
    src: up("2019/06/Клиент-Пиреос-банк.png"),
    dst: out("clients/piraeus.webp"),
    logo: true,
  },
  {
    src: up("2019/06/клиент-българска-банка-за-развитие.png"),
    dst: out("clients/bbr.webp"),
    logo: true,
  },
  {
    src: up("2019/06/про-кредит.jpg"),
    dst: out("clients/procredit.webp"),
    logo: true,
  },
  {
    src: up("2019/06/финанс-лизинг-клиент.jpg"),
    dst: out("clients/finance-leasing.webp"),
    logo: true,
  },
  {
    src: up("2026/05/logo_institut_publichna_administraciya.webp"),
    dst: out("clients/ipa.webp"),
    logo: true,
  },
];

for (const j of jobs) {
  if (!existsSync(j.src)) {
    console.error(`LIPSVA: ${j.src}`);
    continue;
  }
  let img = sharp(j.src);
  if (j.logo) {
    img = img.resize({ height: 96, withoutEnlargement: true });
  } else if (j.resize) {
    img = img.resize(j.resize);
  }
  await img.webp({ quality: 82 }).toFile(j.dst);
  console.log(`OK: ${path.relative(root, j.dst)}`);
}
