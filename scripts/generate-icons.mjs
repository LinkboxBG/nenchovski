/**
 * Favicon сет от бранд логото (камиончето вляво от wordmark-а):
 * - src/app/icon.png (512×512, прозрачен фон)
 * - src/app/apple-icon.png (180×180, бял фон)
 * - src/app/favicon.ico (32×32 PNG-in-ICO)
 * Пуска се с: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const SRC = path.join(
  root,
  "public/wp-content/uploads/2026/04/nenchovski-web-SMALL-header-home.png"
);

// Камиончето: лявата част на логото (372×73), после trim + квадрат
const mark = await sharp(SRC)
  .extract({ left: 0, top: 0, width: 118, height: 73 })
  .toBuffer();

async function square(size, bg) {
  return sharp(mark)
    .resize({
      width: Math.round(size * 0.86),
      height: Math.round(size * 0.86),
      fit: "inside",
    })
    .extend({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    })
    .toBuffer()
    .then((buf) =>
      sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: bg,
        },
      })
        .composite([{ input: buf, gravity: "centre" }])
        .png()
        .toBuffer()
    );
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

writeFileSync(path.join(root, "src/app/icon.png"), await square(512, transparent));
writeFileSync(
  path.join(root, "src/app/apple-icon.png"),
  await square(180, white)
);

// ICO: single-entry PNG-in-ICO (валидно от Vista нататък)
const png32 = await square(32, transparent);
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(png32.length, 14); // size
header.writeUInt32LE(22, 18); // offset
writeFileSync(
  path.join(root, "src/app/favicon.ico"),
  Buffer.concat([header, png32])
);

console.log("OK: icon.png (512), apple-icon.png (180), favicon.ico (32)");
