import fs from "node:fs";
import path from "node:path";
import { SITE } from "@/data/site";

/**
 * Връща URL на OG изображение 1200×630 за даден ключ (slug):
 * public/og/<key>.jpg ако е генерирано, иначе fallback към подадения cover.
 */
export function ogImage(key: string, fallbackCover?: string): string {
  const file = path.join(process.cwd(), "public/og", `${key}.jpg`);
  if (fs.existsSync(file)) {
    return `${SITE.domain}/og/${key}.jpg`;
  }
  if (fallbackCover) return `${SITE.domain}${encodeURI(fallbackCover)}`;
  return `${SITE.domain}/og/home.jpg`;
}
