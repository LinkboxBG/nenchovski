import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getServicePages,
  getServicePage,
  getBlogArticles,
  getBlogArticle,
  type ServicePage,
  type BlogArticle,
} from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, articleSchema, productSchema } from "@/lib/schema";
import { QuoteForm } from "@/components/QuoteForm";
import { PriceTable } from "@/components/PriceTable";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { Gallery } from "@/components/Gallery";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedArticles } from "@/components/RelatedArticles";
import { RelatedServices } from "@/components/RelatedServices";
import { ServiceNotice } from "@/components/ServiceNotice";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SERVICE_NOTICES } from "@/data/notices";
import {
  getPageEnrichment,
  getArticleEnrichment,
} from "@/data/enrichment";
import { themeFor } from "@/data/categoryTheme";
import reviews from "@/data/reviews.json";
import {
  Breadcrumbs,
  FAQAccordion,
  StepsHowWeWork,
  CtaBanner,
} from "@/components/Sections";
import { SITE } from "@/data/site";
import { ogImage } from "@/lib/og";

export const dynamicParams = false;

/** Fallback херо снимка, когато няма enrichment.hero.image и няма frontmatter cover. */
const HERO_FALLBACK =
  "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%BA%D0%BE%D1%80%D0%B8%D1%86%D0%B0.webp";

function decodeSeg(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

type Resolved =
  | { kind: "service"; page: ServicePage }
  | { kind: "article"; article: BlogArticle };

/**
 * Slug-ове с dedicated route в src/app — MD файлът им остава само като
 * данни (related-връзки, sitemap), но НЕ се рендерира от catch-all.
 */
const DEDICATED_ROUTES = new Set(["hamalski-uslugi"]);

function resolve(path: string[]): Resolved | null {
  const segs = path.map(decodeSeg);
  if (segs.length === 1) {
    if (DEDICATED_ROUTES.has(segs[0])) return null;
    const page = getServicePage(segs[0]);
    return page ? { kind: "service", page } : null;
  }
  if (segs.length === 2) {
    const article = getBlogArticle(segs[0], segs[1]);
    if (article) return { kind: "article", article };
    const page = getServicePage(segs.join("__"));
    return page ? { kind: "service", page } : null;
  }
  return null;
}

export function generateStaticParams() {
  const params: { path: string[] }[] = [];
  for (const p of getServicePages()) {
    if (DEDICATED_ROUTES.has(p.slug)) continue;
    params.push({ path: p.slug.split("__") });
  }
  for (const a of getBlogArticles()) {
    params.push({ path: [a.category, a.slug] });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const r = resolve(path);
  if (!r) return {};
  const meta = r.kind === "service" ? r.page : r.article;
  const url = r.kind === "service" ? r.page.urlPath : r.article.urlPath;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE.domain}${encodeURI(url)}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE.domain}${encodeURI(url)}`,
      images: [
        { url: ogImage(meta.slug, meta.cover), width: 1200, height: 630 },
      ],
      type: r.kind === "article" ? "article" : "website",
      locale: "bg_BG",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const r = resolve(path);
  if (!r) notFound();
  return r.kind === "service" ? (
    <ServiceView page={r.page} />
  ) : (
    <ArticleView article={r.article} />
  );
}

/* ================= Service page ================= */

function ServiceView({ page }: { page: ServicePage }) {
  const [before, after] = page.html.split("<!--PRICE_TABLE-->");
  const isService = page.category && page.category !== "utility";
  const related = page.related
    .map((slug) => getServicePage(slug))
    .filter(Boolean) as ServicePage[];

  const enrichment = getPageEnrichment(page.slug, page.category);
  const heroImage = enrichment.hero?.image
    ? { src: enrichment.hero.image, alt: enrichment.hero.alt ?? page.h1 }
    : page.cover
      ? { src: page.cover, alt: page.coverAlt ?? page.h1 }
      : { src: HERO_FALLBACK, alt: page.h1 };

  const gallery = enrichment.gallery ?? [];

  // Дискретна категорийна сигнатура: data-cat сетва --cat/--cat-deep/--cat-bright
  // (globals.css); null (utility) → без атрибут → червен default навсякъде.
  const theme = themeFor(page.category);

  // Най-релевантното перо в ценовата таблица за тази услуга (само визуално).
  const priceHighlight =
    enrichment.priceHighlight ??
    (page.category === "transport" ? "mikrobus" : "hamalin");

  const relatedArticles = (enrichment.relatedArticles ?? [])
    .map((slug) => getBlogArticles().find((a) => a.slug === slug))
    .filter(Boolean)
    .map((a) => ({
      urlPath: a!.urlPath,
      title: a!.h1,
      cover: a!.cover,
      coverAlt: a!.coverAlt,
    }));

  return (
    <div data-cat={theme?.id} className="contents">
      {page.slug === "kashoni" ? (
        <JsonLd
          data={productSchema({
            name: "Кашони за преместване",
            url: page.urlPath,
            description: page.description,
            image: page.cover,
          })}
        />
      ) : isService ? (
        <JsonLd
          data={serviceSchema({
            name: page.serviceType ?? page.h1,
            url: page.urlPath,
            description: page.description,
            priceFrom: page.priceFrom,
          })}
        />
      ) : null}

      <Hero
        title={page.h1}
        subtitle={page.directAnswer}
        image={heroImage}
        // GMB блокът в hero-то поема рейтинг badge-а → филтрираме „4,9★…" дубликата
        badges={enrichment.hero?.badges?.filter((b) => !b.includes("★"))}
        categoryChip={theme ?? undefined}
        gmb={
          isService
            ? {
                rating: reviews.aggregate.rating,
                count: reviews.aggregate.count,
                url: reviews.aggregate.sourceUrl,
              }
            : undefined
        }
        priceFrom={isService ? page.priceFrom : undefined}
        b2b={enrichment.heroVariant === "b2b"}
        breadcrumbsSlot={
          <Breadcrumbs
            dark
            items={[
              { name: "Хамалски услуги", url: "/hamalski-uslugi/" },
              ...(page.slug !== "hamalski-uslugi"
                ? [{ name: page.h1, url: page.urlPath }]
                : []),
            ]}
          />
        }
      />

      {SERVICE_NOTICES[page.slug] ? (
        <ServiceNotice notice={SERVICE_NOTICES[page.slug]} />
      ) : null}

      {enrichment.authority ? (
        <AuthorityStrip variant={enrichment.authority} />
      ) : null}

      {/* Съдържание (светла лента) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-12 md:py-16">
          <article
            className="prose-nen mx-auto"
            dangerouslySetInnerHTML={{ __html: before }}
          />
          {after !== undefined ? (
            <>
              <div className="mx-auto my-8 max-w-[72ch]">
                <PriceTable highlightId={priceHighlight} />
              </div>
              <article
                className="prose-nen mx-auto"
                dangerouslySetInnerHTML={{ __html: after }}
              />
            </>
          ) : null}
        </div>
      </section>

      {enrichment.beforeAfter?.length ? (
        <section className="bg-soft">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <BeforeAfter pairs={enrichment.beforeAfter} />
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="bg-soft">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <Gallery images={gallery} />
          </div>
        </section>
      ) : null}

      {isService ? <StepsHowWeWork /> : null}

      {/* Ревюта + ЧЗВ (светла лента) */}
      <section className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <ReviewsSection />
          <FAQAccordion faq={page.faq} />
        </div>
      </section>

      {related.length ? (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <RelatedServices
              title="Свързани услуги"
              services={related.map((rp) => ({
                href: rp.urlPath,
                label: rp.h1,
                priceFrom: rp.priceFrom,
              }))}
            />
          </div>
        </section>
      ) : null}

      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <AuthorBox variant="service" />
        </div>
      </section>

      {/* Оферта (тъмна лента) */}
      <section className="bg-carbon-gradient py-16 md:py-20">
        <div className="mx-auto max-w-[1140px] px-4 text-center">
          <h2 data-reveal className="text-2xl font-bold text-white md:text-3xl">
            Вземи оферта до 1 час
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-white/70">
            Опиши какво местим, къртим или извозваме — връщаме се с цена до 1 час
            в работно време.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <QuoteForm variant={enrichment.formVariant} dark />
          </div>
        </div>
      </section>

      {relatedArticles.length ? (
        <section className="bg-soft">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </div>
  );
}

/* ================= Blog article ================= */

function ArticleView({ article }: { article: BlogArticle }) {
  const relatedServices = (getArticleEnrichment(article.slug).relatedServices ?? [])
    .map((slug) => getServicePage(slug))
    .filter(Boolean)
    .map((p) => ({
      href: p!.urlPath,
      label: p!.h1,
      priceFrom: p!.priceFrom,
    }));

  const moreArticles = getBlogArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({
      urlPath: a.urlPath,
      title: a.h1,
      cover: a.cover,
      coverAlt: a.coverAlt,
    }));

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.h1,
          url: article.urlPath,
          description: article.description,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          image: article.cover,
        })}
      />

      <Hero
        variant="article"
        title={article.h1}
        image={{
          src: article.cover ?? HERO_FALLBACK,
          alt: article.coverAlt ?? article.h1,
        }}
        breadcrumbsSlot={
          <Breadcrumbs
            dark
            items={[
              { name: "Блог", url: "/blog/" },
              { name: article.h1, url: article.urlPath },
            ]}
          />
        }
      />

      {/* Съдържание (светла лента) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-12 md:py-16">
          <p className="mx-auto max-w-[72ch] font-sans text-sm text-secondary">
            Автор: {article.author} ·{" "}
            <time dateTime={article.datePublished}>
              {formatDateBg(article.datePublished)}
            </time>
          </p>
          <div
            className="prose-nen mx-auto mt-6"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </div>
      </section>

      {relatedServices.length ? (
        <section className="bg-soft">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <RelatedServices services={relatedServices} />
          </div>
        </section>
      ) : null}

      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <AuthorBox variant="article" dateModified={article.dateModified} />
        </div>
      </section>

      {/* Оферта (тъмна лента) */}
      <section className="bg-carbon-gradient py-16 md:py-20">
        <div className="mx-auto max-w-[1140px] px-4 text-center">
          <h2 data-reveal className="text-2xl font-bold text-white md:text-3xl">
            Вземи оферта до 1 час
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-white/70">
            Опиши какво местим — връщаме се с цена до 1 час в работно време.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <QuoteForm variant="moving" compact dark />
          </div>
        </div>
      </section>

      {moreArticles.length ? (
        <section className="bg-soft">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <RelatedArticles articles={moreArticles} title="Още от блога" />
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}

const MONTHS_BG = [
  "януари", "февруари", "март", "април", "май", "юни",
  "юли", "август", "септември", "октомври", "ноември", "декември",
];

function formatDateBg(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS_BG[m - 1]} ${y} г.`;
}
