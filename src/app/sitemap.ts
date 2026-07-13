import type { MetadataRoute } from "next";
import { getServicePages, getBlogArticles } from "@/lib/content";
import { SITE } from "@/data/site";

/**
 * Sitemap = само каноничните URL-и: 42-те запазени + /ceni/ + /za-nas/
 * + новите статии. Кирилските пътища се percent-енкодват (изискване на
 * sitemap протокола).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE.domain}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE.domain}/ceni/`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE.domain}/za-nas/`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${SITE.domain}/kontakti/`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${SITE.domain}/porachai/`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${SITE.domain}/blog/`, priority: 0.6, changeFrequency: "weekly" },
    {
      url: `${SITE.domain}/politika-za-poveritelnost/`,
      priority: 0.2,
      changeFrequency: "yearly",
    },
  ];

  for (const p of getServicePages()) {
    urls.push({
      url: `${SITE.domain}${encodeURI(p.urlPath)}`,
      priority: p.slug === "hamalski-uslugi" || p.slug === "karti-chisti-izvozva" ? 0.9 : 0.8,
      changeFrequency: "monthly",
    });
  }

  for (const a of getBlogArticles()) {
    urls.push({
      url: `${SITE.domain}${encodeURI(a.urlPath)}`,
      lastModified: a.dateModified,
      priority: 0.6,
      changeFrequency: "monthly",
    });
  }

  return urls;
}
