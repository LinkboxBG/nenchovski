import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/**
 * Позволяваме всички легитимни ботове, включително AI кролери (GEO).
 * На *.vercel.app staging proxy-то подменя robots.txt с Disallow: /.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
