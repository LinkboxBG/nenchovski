import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustStrip } from "@/components/TrustStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PriceTable } from "@/components/PriceTable";
import {
  ServiceCard,
  StepsHowWeWork,
  FAQAccordion,
  AreasServed,
  CtaBanner,
} from "@/components/Sections";
import { SITE } from "@/data/site";
import { PRICE_FROM } from "@/data/pricing";

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
    a: "Работим 7 дни в седмицата в цяла София. При свободен екип можем да реагираме още същия ден, а оферта получаваш до 1 час в работно време.",
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
const HERO_POSTER = encodeURI(
  "https://res.cloudinary.com/py4moij3/video/upload/so_0,w_1920,q_auto,f_jpg/Евтини_хамали_за_София_Ненчовски_хамали_Хамалчо_ЕООД_yoirlq.jpg"
);

const SERVICES = [
  {
    href: "/premestvane-na-doma/",
    title: "Преместване на дома",
    text: "Цялостно преместване на апартаменти и къщи — с опаковане, разглобяване и сглобяване на мебелите.",
    priceFrom: PRICE_FROM.hamalin,
    image:
      "/wp-content/uploads/2023/12/Хамали-София-Ненчовски-Транспорт-корица.webp",
    imageAlt: "Преместване на дома в София — екип на Хамали Ненчовски",
  },
  {
    href: "/premestvane-na-ofisi/",
    title: "Преместване на офиси",
    text: "Бързо преместване на офиси и търговски обекти — извън работно време, без прекъсване на бизнеса.",
    priceFrom: PRICE_FROM.hamalin,
  },
  {
    href: "/karti-chisti-izvozva/",
    title: "Кърти, чисти, извозва",
    text: "Къртене на бани, стени и бетон, почистване след ремонт и извозване на строителни отпадъци.",
    priceFrom: PRICE_FROM.hamalin,
  },
  {
    href: "/premestvane-na-mebeli/",
    title: "Преместване на мебели",
    text: "Пренасяне на тежки и обемни мебели — дивани, гардероби, хладилници, пиана.",
    priceFrom: PRICE_FROM.hamalin,
  },
  {
    href: "/bus-pod-naem/",
    title: "Бус под наем",
    text: "Мини ван, микробус 14 м³ или камион 20 м³ с шофьор — за София и цялата страна.",
    priceFrom: PRICE_FROM.minivan,
  },
  {
    href: "/pochistvane-na-mazeta-sofia/",
    title: "Почистване на мазета и тавани",
    text: "Разчистване на мазета, тавани и дворове с извозване на всичко ненужно.",
    priceFrom: PRICE_FROM.hamalin,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#1c1b1b] border-b border-black/5">
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
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45"
        />
        <div className="relative mx-auto max-w-[1140px] px-4 py-10 md:py-16 grid gap-10 lg:grid-cols-[1fr_400px] items-center">
          <div className="min-w-0">
            <h1
              className="text-4xl md:text-5xl leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
              style={{ color: "#fff" }}
            >
              Хамали София — преместване без стрес
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-xl leading-relaxed">
              Хамали Ненчовски мести домове и офиси в София вече{" "}
              <strong>18 години (от 2008 г.)</strong>. Кърти, чисти, извозва.
              Реални цени, точни екипи и оферта до 1 час.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`tel:+359${SITE.phone.slice(1)}`}
                data-ga-event="tel_click"
                className="rounded-lg bg-primary hover:bg-accent text-white font-sans font-bold text-lg px-6 py-3.5 transition-colors"
              >
                📞 {SITE.phoneDisplay}
              </a>
              <Link
                href="/ceni/"
                className="font-sans font-semibold text-white underline underline-offset-4"
              >
                Виж всички цени →
              </Link>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <TrustStrip />

      <main className="mx-auto max-w-[1140px] px-4">
        <section aria-labelledby="services-h" className="my-12">
          <h2 id="services-h" className="text-2xl md:text-3xl mb-6">
            Хамалски услуги в София
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
          <p className="mt-5 font-sans">
            <Link
              href="/hamalski-uslugi/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Всички услуги и цени →
            </Link>
          </p>
        </section>

        <StepsHowWeWork />

        <section aria-labelledby="prices-h" className="my-12">
          <h2 id="prices-h" className="text-2xl md:text-3xl mb-6">
            Цени на хамалските услуги — 2026
          </h2>
          <PriceTable />
        </section>

        <ReviewsSection />
        <FAQAccordion faq={HOME_FAQ} />
        <AreasServed />

        <section aria-labelledby="blog-h" className="my-12">
          <h2 id="blog-h" className="text-2xl mb-4">
            Полезно от блога
          </h2>
          <p className="text-secondary max-w-2xl">
            Съвети за преместване, опаковане и подреждане на дома —{" "}
            <Link
              href="/blog/"
              className="text-primary underline underline-offset-2"
            >
              разгледай блога ни
            </Link>
            .
          </p>
        </section>
      </main>
      <CtaBanner />
    </>
  );
}
