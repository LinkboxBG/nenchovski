import Link from "next/link";
import Image from "next/image";
import { SITE, AREAS_SERVED } from "@/data/site";
import { PriceTeaser } from "@/components/PriceTable";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/content";

/* ---------- StepsHowWeWork (full-width dark band) ---------- */
const STEPS = [
  {
    n: "1",
    t: "Обаждаш се или пращаш запитване",
    d: "Разказваш ни какво местим, къртим или извозваме — по телефона, Viber или през формата.",
  },
  {
    n: "2",
    t: "Получаваш оферта до 1 час",
    d: "В работно време се връщаме с цена до 1 час. При нужда правим безплатен оглед.",
  },
  {
    n: "3",
    t: "Идваме навреме и си вършим работата",
    d: "Екипът пристига в уговорения час с нужната техника, опаковъчни материали и бус.",
  },
  {
    n: "4",
    t: "Плащаш каквото сме се разбрали",
    d: "Без скрити такси. Работим понеделник–събота, в цяла София и страната.",
  },
];

export function StepsHowWeWork() {
  return (
    <section aria-labelledby="steps-h" className="bg-carbon-gradient py-16 md:py-20">
      <div className="mx-auto max-w-[1140px] px-4">
        <h2
          id="steps-h"
          data-reveal
          className="text-2xl md:text-3xl text-white"
        >
          Как работим
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
        <ol
          data-reveal-stagger
          className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* свързваща линия — „рисува се" при скрол (reveal-draw, CSS-only) */}
          <span
            aria-hidden
            data-reveal
            className="reveal-draw pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-(--cat-bright)/50 lg:block"
          />
          {STEPS.map((s) => (
            <li
              key={s.n}
              data-reveal
              className="relative rounded-2xl border border-line bg-carbon-2 p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cat-gradient font-sans text-lg font-bold text-white shadow-premium">
                {s.n}
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold text-white">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- ServiceCard ---------- */
export function ServiceCard({
  href,
  title,
  text,
  priceFrom,
  image,
  imageAlt,
}: {
  href: string;
  title: string;
  text: string;
  priceFrom?: number;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <Link
      href={href}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium"
    >
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-soft">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-lg font-semibold transition-colors group-hover:text-primary">
          {title}
          <span className="mt-1 block h-0.5 w-0 rounded-full bg-red-gradient transition-all duration-300 group-hover:w-10" />
        </h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-secondary">
          {text}
        </p>
        <div className="mt-3 flex items-center justify-between">
          {priceFrom ? <PriceTeaser from={priceFrom} /> : <span />}
          <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-primary">
            Виж повече
            <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- FAQAccordion (+ FAQPage schema) ---------- */
export function FAQAccordion({
  faq,
  title = "Често задавани въпроси",
}: {
  faq: FaqItem[];
  title?: string;
}) {
  if (!faq?.length) return null;
  return (
    <section aria-labelledby="faq-h" className="my-12">
      <JsonLd data={faqSchema(faq)} />
      <h2 id="faq-h" data-reveal className="text-2xl md:text-3xl">
        {title}
      </h2>
      <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
      <div data-reveal-stagger className="mt-6 space-y-3">
        {faq.map((f) => (
          <details
            key={f.q}
            data-reveal
            className="group rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-card transition-colors open:border-(--cat)/40 hover:border-(--cat)/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans font-medium">
              {f.q}
              <span
                aria-hidden
                className="relative h-5 w-5 shrink-0 text-(--cat)"
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-0" />
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- AreasServed (chip grid) ---------- */
export function AreasServed() {
  return (
    <section aria-labelledby="areas-h" className="my-12">
      <h2 id="areas-h" data-reveal className="text-2xl md:text-3xl">
        Къде работим
      </h2>
      <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
      <p className="mt-4 max-w-2xl text-secondary">
        Покриваме цяла София — {AREAS_SERVED.slice(0, 8).join(", ")} и всички
        останали квартали — както и превози до всяка точка на страната.
      </p>
      <ul
        data-reveal-stagger
        className="mt-5 flex flex-wrap gap-2.5 font-sans text-sm"
      >
        {AREAS_SERVED.map((area) => (
          <li
            key={area}
            data-reveal
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-soft px-3.5 py-1.5 font-medium text-secondary transition-colors hover:border-primary hover:text-primary"
          >
            <PinIcon />
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Breadcrumbs (UI + schema) ---------- */
export function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { name: string; url: string }[];
  dark?: boolean;
}) {
  const all = [{ name: "Начало", url: "/" }, ...items];
  return (
    <nav aria-label="Пътечка" className={dark ? "" : "my-4"}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol
        className={`flex flex-wrap items-center gap-1.5 font-sans text-sm ${
          dark ? "text-white/70" : "text-secondary"
        }`}
      >
        {all.map((it, i) => (
          <li key={it.url} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden>›</span> : null}
            {i === all.length - 1 ? (
              <span
                aria-current="page"
                className={dark ? "text-white" : "text-ink"}
              >
                {it.name}
              </span>
            ) : (
              <Link
                href={it.url}
                className={dark ? "hover:text-white" : "hover:text-primary"}
              >
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- DirectAnswer (GEO блок) ---------- */
export function DirectAnswer({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="my-5 rounded-xl border-l-4 border-primary bg-soft px-5 py-4 text-[17px] leading-relaxed">
      {text}
    </p>
  );
}

/* ---------- CtaBanner (pre-footer, на всяка страница) ---------- */
export function CtaBanner() {
  return (
    <section className="relative mt-16 overflow-hidden bg-red-gradient text-white">
      {/* фина радиална светлина + диагонален детайл */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 120% at 85% 0%, rgba(255,255,255,0.22) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rotate-45 rounded-3xl bg-white/5"
      />
      <div
        data-reveal
        className="relative mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-6 px-4 py-14 text-center md:flex-row md:text-left"
      >
        <div>
          <p className="font-sans text-2xl font-bold md:text-3xl">
            Готов ли си за преместване без стрес?
          </p>
          <p className="mt-2 text-white/90">
            Обади се сега или поискай оферта — отговаряме до 1 час в работно
            време.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:+359${SITE.phone.slice(1)}`}
            data-ga-event="tel_click"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3.5 font-sans text-lg font-bold text-primary shadow-premium transition-transform duration-300 hover:-translate-y-0.5"
          >
            <PhoneIcon />
            {SITE.phoneDisplay}
          </a>
          <Link
            href="/porachai/"
            className="inline-flex items-center whitespace-nowrap rounded-lg border-2 border-white/70 px-5 py-3 font-sans font-semibold transition-colors hover:bg-white/10"
          >
            Поискай оферта
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Inline SVG icons ---------- */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
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

function PinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}
