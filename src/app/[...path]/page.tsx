import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import { TrustStrip } from "@/components/TrustStrip";
import {
  Breadcrumbs,
  DirectAnswer,
  FAQAccordion,
  StepsHowWeWork,
  CtaBanner,
} from "@/components/Sections";
import { SITE } from "@/data/site";
import { ogImage } from "@/lib/og";

export const dynamicParams = false;

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

function resolve(path: string[]): Resolved | null {
  const segs = path.map(decodeSeg);
  if (segs.length === 1) {
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

  return (
    <>
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
      <TrustStrip />
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs
          items={[
            { name: "Хамалски услуги", url: "/hamalski-uslugi/" },
            ...(page.slug !== "hamalski-uslugi"
              ? [{ name: page.h1, url: page.urlPath }]
              : []),
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl">{page.h1}</h1>
            <DirectAnswer text={page.directAnswer} />
            <article
              className="prose-nen"
              dangerouslySetInnerHTML={{ __html: before }}
            />
            {after !== undefined ? (
              <>
                <div className="my-6">
                  <PriceTable />
                </div>
                <article
                  className="prose-nen"
                  dangerouslySetInnerHTML={{ __html: after }}
                />
              </>
            ) : null}
            {isService ? <StepsHowWeWork /> : null}
            <ReviewsSection />
            <FAQAccordion faq={page.faq} />
            {related.length ? (
              <section aria-labelledby="rel-h" className="my-12">
                <h2 id="rel-h" className="text-2xl mb-4">
                  Свързани услуги
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {related.map((rp) => (
                    <li key={rp.slug}>
                      <Link
                        href={rp.urlPath}
                        className="inline-block rounded-full border border-black/15 bg-white px-4 py-2 font-sans text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                      >
                        {rp.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-24 self-start">
            <QuoteForm />
          </aside>
        </div>
      </main>
      <CtaBanner />
    </>
  );
}

/* ================= Blog article ================= */

function ArticleView({ article }: { article: BlogArticle }) {
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
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs
          items={[
            { name: "Блог", url: "/blog/" },
            { name: article.h1, url: article.urlPath },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="min-w-0">
            <header>
              <h1 className="text-3xl md:text-4xl">{article.h1}</h1>
              <p className="mt-3 font-sans text-sm text-secondary">
                {article.author} ·{" "}
                <time dateTime={article.datePublished}>
                  {formatDateBg(article.datePublished)}
                </time>
              </p>
            </header>
            {article.cover ? (
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-soft">
                <Image
                  src={article.cover}
                  alt={article.coverAlt ?? article.h1}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="object-cover"
                />
              </div>
            ) : null}
            <div
              className="prose-nen mt-8"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </article>
          <aside className="lg:sticky lg:top-24 self-start">
            <QuoteForm compact />
            <MoreArticles current={article} />
          </aside>
        </div>
      </main>
      <CtaBanner />
    </>
  );
}

function MoreArticles({ current }: { current: BlogArticle }) {
  const others = getBlogArticles()
    .filter((a) => a.slug !== current.slug)
    .slice(0, 4);
  return (
    <nav aria-label="Още от блога" className="mt-6 rounded-xl border border-black/10 bg-white p-5">
      <h2 className="font-sans text-base font-semibold mb-3">Още от блога</h2>
      <ul className="space-y-2.5 text-[15px]">
        {others.map((a) => (
          <li key={a.slug}>
            <Link
              href={a.urlPath}
              className="text-secondary hover:text-primary leading-snug"
            >
              {a.h1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
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
