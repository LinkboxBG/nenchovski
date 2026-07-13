import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PriceTable } from "@/components/PriceTable";
import {
  StepsHowWeWork,
  FAQAccordion,
  AreasServed,
  CtaBanner,
} from "@/components/Sections";
import { SITE } from "@/data/site";
import { NAV_GROUPS } from "@/data/nav";
import { getBlogArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Хамали София — цени от 12,50 €/ч | Хамали Ненчовски",
  description:
    "Хамалски услуги в София от Хамали Ненчовски: преместване, кърти-чисти-извозва, почистване. 18 години опит, оферта до 1 час. ☎ 0894 766 424",
  alternates: { canonical: `${SITE.domain}/` },
  openGraph: {
    title: "Хамали София — Хамали Ненчовски | 18 години опит",
    description:
      "Преместване на дома и офиса, кърти-чисти-извозва, почистване на мазета и тавани. Оферта до 1 час — 0894 766 424.",
    url: `${SITE.domain}/`,
    images: [{ url: `${SITE.domain}/og/home.jpg`, width: 1200, height: 630 }],
    locale: "bg_BG",
    type: "website",
  },
};

const HOME_FAQ = [
  {
    q: "Колко струват хамалските услуги в София?",
    a: "Един хамалин струва 12,50 € на час за София. Мини ван е 30 €/час, микробус (14 м³) — 40 €/час, а камион (20 м³) — 60 € на курс. Точната цена потвърждаваме при безплатен оглед или по телефона.",
  },
  {
    q: "Колко бързо можете да дойдете?",
    a: "Работим понеделник–събота, 08:00–18:00 ч., в цяла София. При свободен екип можем да реагираме още същия ден, а оферта получаваш до 1 час в работно време.",
  },
  {
    q: "Работите ли извън София?",
    a: "Да — извършваме премествания и транспорт в цялата страна, както и международни курсове от Гърция и Румъния до България. Извън София транспортът се таксува на километър в двете посоки.",
  },
  {
    q: "Правите ли оглед преди оферта?",
    a: "Да, огледът е безплатен. За по-малки премествания често е достатъчно да ни опишеш какво местим по телефона или да ни пратиш снимки през формата.",
  },
];

const HERO_VIDEO = encodeURI(
  "https://res.cloudinary.com/py4moij3/video/upload/w_1920,q_auto/Евтини_хамали_за_София_Ненчовски_хамали_Хамалчо_ЕООД_yoirlq.mp4"
);
// w_1080 (не 1920): постерът е LCP на мобилни — по-лек файл + preload по-долу
const HERO_POSTER = encodeURI(
  "https://res.cloudinary.com/py4moij3/video/upload/so_0,w_1080,q_auto,f_jpg/Евтини_хамали_за_София_Ненчовски_хамали_Хамалчо_ЕООД_yoirlq.jpg"
);

export default function HomePage() {
  const blogTeasers = getBlogArticles()
    .slice(0, 3)
    .map((a) => ({
      urlPath: a.urlPath,
      title: a.h1,
      cover: a.cover,
      coverAlt: a.coverAlt,
    }));

  return (
    <>
      {/* React 19 hoist-ва <link> в <head>: постерът е LCP — preload с висок приоритет */}
      <link
        rel="preload"
        as="image"
        href={HERO_POSTER}
        fetchPriority="high"
      />
      {/* Видео херо */}
      <section className="relative isolate overflow-hidden bg-carbon">
        {/* dangerouslySetInnerHTML: React не сериализира muted при SSR, а без него autoplay не тръгва */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          dangerouslySetInnerHTML={{
            __html: `<video class="h-full w-full object-cover" autoplay muted loop playsinline preload="metadata" poster="${HERO_POSTER}"><source src="${HERO_VIDEO}" type="video/mp4" /></video>`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45"
        />
        <div className="relative mx-auto grid max-w-[1140px] items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0">
            <h1 className="text-4xl leading-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] md:text-5xl">
              Хамали София — преместване без стрес
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              Хамали Ненчовски мести домове и офиси в София вече{" "}
              <strong>18 години (от 2008 г.)</strong>. Кърти, чисти, извозва.
              Реални цени, точни екипи и оферта до 1 час.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`tel:+359${SITE.phone.slice(1)}`}
                data-ga-event="tel_click"
                className="inline-flex items-center gap-2 rounded-lg bg-red-gradient px-6 py-3.5 font-sans text-lg font-bold text-white shadow-premium transition-transform duration-300 hover:-translate-y-0.5"
              >
                <PhoneIcon />
                {SITE.phoneDisplay}
              </a>
              <Link
                href="/hamalski-uslugi/#ceni"
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-white underline underline-offset-4"
              >
                Виж всички цени →
              </Link>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <AuthorityStrip variant="stats" />

      {/* Услуги по групи */}
      <section aria-labelledby="services-h" className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="services-h" data-reveal className="text-2xl md:text-3xl">
            Хамалски услуги в София
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div
            data-reveal-stagger
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {NAV_GROUPS.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
          <p className="mt-8 font-sans">
            <Link
              href="/hamalski-uslugi/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Всички услуги и цени →
            </Link>
          </p>
        </div>
      </section>

      <AuthorityStrip variant="corporate" />

      {/* Цени */}
      <section aria-labelledby="prices-h" className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="prices-h" data-reveal className="text-2xl md:text-3xl">
            Цени на хамалските услуги — 2026
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="mt-8" data-reveal>
            <PriceTable />
          </div>
        </div>
      </section>

      <StepsHowWeWork />

      {/* Ревюта + ЧЗВ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <ReviewsSection />
          <FAQAccordion faq={HOME_FAQ} />
          <AreasServed />
        </div>
      </section>

      {/* Блог тийзър */}
      <section className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <RelatedArticles articles={blogTeasers} title="Полезно от блога" />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

/* ---------- Групова карта (услуги) ---------- */
function GroupCard({ group }: { group: (typeof NAV_GROUPS)[number] }) {
  return (
    <div
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium"
    >
      <Link href={group.href} className="relative block aspect-[16/9] overflow-hidden bg-soft">
        <Image
          src={group.image}
          alt={group.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" aria-hidden />
        <span className="absolute bottom-3 left-4 right-4">
          <span className="block font-sans text-lg font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            {group.label}
          </span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-secondary">{group.tagline}</p>
        <ul className="mt-4 space-y-1.5 font-sans text-[15px]">
          {group.items.slice(0, 5).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group/link inline-flex items-center gap-1.5 text-ink transition-colors hover:text-primary"
              >
                <ArrowIcon className="text-primary transition-transform duration-300 group-hover/link:translate-x-0.5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={group.href}
          className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:text-accent"
        >
          Виж всички
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
