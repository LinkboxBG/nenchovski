import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const PAGES_DIR = path.join(process.cwd(), "src/content/pages");
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  urlPath: string; // "/kurtene-na-banya/" или "/sale-day/links-booster/"
  title: string;
  description: string;
  h1: string;
  serviceType?: string;
  priceFrom?: number;
  directAnswer?: string;
  category?: string;
  cover?: string;
  coverAlt?: string;
  frozen?: boolean;
  faq: FaqItem[];
  related: string[];
  html: string;
}

export interface BlogArticle {
  slug: string;
  category: string; // кирилски URL сегмент
  urlPath: string; // "/преместване-на-дома/kakvo-se-nosi-v-nova-kashta/"
  title: string;
  description: string;
  h1: string;
  datePublished: string;
  dateModified: string;
  author: string;
  cover?: string;
  coverAlt?: string;
  gscClicks?: number;
  isNew?: boolean;
  html: string;
}

marked.setOptions({ gfm: true, breaks: false });

function renderMd(md: string): string {
  return marked.parse(md) as string;
}

export function getServicePages(): ServicePage[] {
  if (!fs.existsSync(PAGES_DIR)) return [];
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(PAGES_DIR, f), "utf8");
      const { data, content } = matter(raw);
      // нормализация: "sale-day/links-booster" и "sale-day__links-booster" → "__"
      const slug = ((data.slug as string) ?? f.replace(/\.md$/, "")).replace(
        /\//g,
        "__"
      );
      const urlPath = "/" + slug.replace(/__/g, "/") + "/";
      return {
        slug,
        urlPath,
        title: data.title ?? slug,
        description: data.description ?? "",
        h1: data.h1 ?? data.title ?? slug,
        serviceType: data.serviceType,
        priceFrom: data.priceFrom,
        directAnswer: data.directAnswer,
        category: data.category,
        cover: data.cover,
        coverAlt: data.coverAlt,
        frozen: data.frozen ?? false,
        faq: (data.faq as FaqItem[]) ?? [],
        related: (data.related as string[]) ?? [],
        html: renderMd(content),
      } satisfies ServicePage;
    });
}

export function getServicePage(slug: string): ServicePage | undefined {
  return getServicePages().find((p) => p.slug === slug);
}

export function getBlogArticles(): BlogArticle[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug as string) ?? f.replace(/\.md$/, "");
      const category = data.category as string;
      return {
        slug,
        category,
        urlPath: `/${category}/${slug}/`,
        title: data.title ?? slug,
        description: data.description ?? "",
        h1: data.h1 ?? data.title ?? slug,
        datePublished: String(data.datePublished ?? "2020-01-01").slice(0, 10),
        dateModified: String(data.dateModified ?? "2026-07-11").slice(0, 10),
        author: data.author ?? "Георги Ненчовски",
        cover: data.cover,
        coverAlt: data.coverAlt,
        gscClicks: data.gscClicks,
        isNew: data.isNew ?? false,
        html: renderMd(content),
      } satisfies BlogArticle;
    })
    .sort((a, b) => (b.gscClicks ?? 0) - (a.gscClicks ?? 0));
}

export function getBlogArticle(
  category: string,
  slug: string
): BlogArticle | undefined {
  return getBlogArticles().find(
    (a) => a.category === category && a.slug === slug
  );
}
