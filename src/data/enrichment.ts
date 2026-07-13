/**
 * Enrichment слой за дизайна: херо снимки, авторитетни ленти, галерии и
 * вътрешни връзки per страница — БЕЗ да се пипат Markdown файловете
 * (съдържанието и URL-ите са замразени за SEO).
 *
 * Ключът е slug-ът от frontmatter. Пътищата към изображения се пазят
 * percent-encoded, точно както в frontmatter `cover` (никога двойно
 * encodeURI). Липсващ запис → defaultsFor(category).
 */

/** Всички service slugs (src/content/pages) — typo тук или в записите = TS грешка. */
export type ServiceSlug =
  | "bus-pod-naem"
  | "hamali-rabota-sofia"
  | "hamalski-uslugi"
  | "izhvurlyane-na-stari-mebeli"
  | "izvozvane-na-stroitelni-otpadatsi-sofiya"
  | "kartene-na-beton-sofiya"
  | "kartene-na-steni"
  | "karti-chisti-izvozva"
  | "kashoni"
  | "kurtene-na-banya"
  | "mezhdunarodno-premestvane"
  | "pochistvane-na-mazeta-sofia"
  | "pochistvane-na-tavani-sofia"
  | "premestvane-na-apartament"
  | "premestvane-na-bagaj"
  | "premestvane-na-doma"
  | "premestvane-na-hladilnik"
  | "premestvane-na-kashti"
  | "premestvane-na-mebeli"
  | "premestvane-na-ofisi"
  | "premestvane-na-piano"
  | "preporachai-hamali-nenhcovski"
  | "prevoz-na-divan"
  | "sale-day__links-booster"
  | "transport-ot-gartsiya-do-balgariya"
  | "transport-ot-rumaniya-do-balgariya";

/** Всички blog slugs (src/content/blog). */
export type ArticleSlug =
  | "hamal-proizhod-na-dumata"
  | "kachvane-na-mebeli-po-stulbi"
  | "kak-da-izberete-firma-za-hamalski-uslugi"
  | "kak-da-si-napravim-barbequ-ot-tuhli"
  | "kak-se-pravi-kamina-ot-tuhli"
  | "kakvo-se-nosi-v-nova-kashta"
  | "kamina-ot-kashoni"
  | "kashoni-i-opakovachna-hartiq"
  | "kolko-struvat-hamalskite-uslugi-v-sofia"
  | "podgotovka-za-premestvane-na-doma"
  | "premestvane-na-akvarium"
  | "premestvane-na-doma-s-kotka"
  | "premestvane-na-tezhki-mebeli"
  | "razglobyavane-i-sglobyavane-na-mebeli"
  | "smyana-na-vrati-bez-kurtene"
  | "suveti-za-podrejdane-doma";

export type AuthorityVariant = "corporate" | "reviews" | "stats";
export type FormVariant = "moving" | "onsite";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface PageEnrichment {
  hero?: {
    /** percent-encoded път от /public; fallback: frontmatter cover */
    image?: string;
    alt?: string;
    /** Постижения, релевантни за услугата — само проверими факти от съдържанието */
    badges?: string[];
  };
  authority?: AuthorityVariant | null;
  /**
   * "b2b" → hero с корпоративен кредибилити блок + лого marquee.
   * Само за активни B2B услуги (ofisi, bus-pod-naem); страницата НЕ бива
   * да е и authority:"corporate" (двойна лого стена).
   */
  heroVariant?: "b2b";
  /**
   * Ред от pricing.ts PRICES за визуален highlight в ценовата таблица.
   * Липсва → heuristic в ServiceView (transport→mikrobus, иначе hamalin).
   */
  priceHighlight?: "hamalin" | "minivan" | "mikrobus" | "kamion";
  /**
   * Реални преди/после двойки (BeforeAfter слайдер). ПРАЗНО, докато клиентът
   * не подаде истински двойки — НЕ сдвоявай несвързани снимки от галериите.
   */
  beforeAfter?: { before: GalleryImage; after: GalleryImage }[];
  gallery?: GalleryImage[];
  relatedArticles?: ArticleSlug[];
  formVariant?: FormVariant;
}

export interface ArticleEnrichment {
  /** Услуги, към които статията праща (CTA секция в края) */
  relatedServices?: ServiceSlug[];
}

/** Defaults по frontmatter category, когато няма per-slug запис. */
export function defaultsFor(category?: string): Required<
  Pick<PageEnrichment, "authority" | "formVariant">
> {
  switch (category) {
    case "karti":
    case "pochistvane":
      return { authority: "reviews", formVariant: "onsite" };
    case "transport":
      return { authority: "stats", formVariant: "moving" };
    case "premestvane":
      return { authority: "reviews", formVariant: "moving" };
    default:
      return { authority: "stats", formVariant: "moving" };
  }
}

/* Per-slug overrides живеят в отделни файлове по групи (паралелна работа). */
import { PREMESTVANE_ENRICHMENT } from "./enrichment/premestvane";
import { KARTI_ENRICHMENT } from "./enrichment/karti";
import { TRANSPORT_ENRICHMENT } from "./enrichment/transport";
import { ARTICLES_ENRICHMENT } from "./enrichment/articles";

export const PAGE_ENRICHMENT: Partial<Record<ServiceSlug, PageEnrichment>> = {
  ...PREMESTVANE_ENRICHMENT,
  ...KARTI_ENRICHMENT,
  ...TRANSPORT_ENRICHMENT,
};

export const ARTICLE_ENRICHMENT: Partial<
  Record<ArticleSlug, ArticleEnrichment>
> = { ...ARTICLES_ENRICHMENT };

export function getPageEnrichment(
  slug: string,
  category?: string
): PageEnrichment & ReturnType<typeof defaultsFor> {
  const overrides = PAGE_ENRICHMENT[slug as ServiceSlug] ?? {};
  const defaults = defaultsFor(category);
  return {
    ...defaults,
    ...overrides,
    authority:
      overrides.authority === undefined
        ? defaults.authority
        : overrides.authority,
    formVariant: overrides.formVariant ?? defaults.formVariant,
  };
}

export function getArticleEnrichment(slug: string): ArticleEnrichment {
  return ARTICLE_ENRICHMENT[slug as ArticleSlug] ?? {};
}
