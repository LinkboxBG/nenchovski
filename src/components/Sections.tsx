import Link from "next/link";
import Image from "next/image";
import { SITE, AREAS_SERVED } from "@/data/site";
import { PriceTeaser } from "@/components/PriceTable";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/content";

/* ---------- StepsHowWeWork ---------- */
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
    d: "Без скрити такси. Работим 7 дни в седмицата, в цяла София и страната.",
  },
];

export function StepsHowWeWork() {
  return (
    <section aria-labelledby="steps-h" className="my-12">
      <h2 id="steps-h" className="text-2xl mb-6">
        Как работим
      </h2>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-xl border border-black/10 bg-white p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-sans font-bold text-white">
              {s.n}
            </span>
            <h3 className="mt-3 font-sans text-base font-semibold">{s.t}</h3>
            <p className="mt-1.5 text-sm text-secondary leading-relaxed">
              {s.d}
            </p>
          </li>
        ))}
      </ol>
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
      className="group flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
    >
      {image ? (
        <div className="relative aspect-[16/9] bg-soft">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-sans text-lg font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-secondary leading-relaxed flex-1">
          {text}
        </p>
        <div className="mt-3 flex items-center justify-between">
          {priceFrom ? <PriceTeaser from={priceFrom} /> : <span />}
          <span className="font-sans text-sm font-medium text-primary">
            Виж повече →
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
      <h2 id="faq-h" className="text-2xl mb-5">
        {title}
      </h2>
      <div className="divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
        {faq.map((f) => (
          <details key={f.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans font-medium">
              {f.q}
              <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <p className="mt-2 text-[15px] text-secondary leading-relaxed">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- AreasServed ---------- */
export function AreasServed() {
  return (
    <section aria-labelledby="areas-h" className="my-12">
      <h2 id="areas-h" className="text-2xl mb-3">
        Къде работим
      </h2>
      <p className="text-secondary max-w-2xl">
        Покриваме цяла София — {AREAS_SERVED.slice(0, 8).join(", ")} и всички
        останали квартали — както и превози до всяка точка на страната.
      </p>
    </section>
  );
}

/* ---------- Breadcrumbs (UI + schema) ---------- */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const all = [{ name: "Начало", url: "/" }, ...items];
  return (
    <nav aria-label="Пътечка" className="my-4">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-sm text-secondary">
        {all.map((it, i) => (
          <li key={it.url} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden>›</span> : null}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {it.name}
              </span>
            ) : (
              <Link href={it.url} className="hover:text-primary">
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
    <section className="mt-16 bg-primary text-white">
      <div className="mx-auto max-w-[1140px] px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div>
          <p className="font-sans text-2xl font-bold">
            Готов ли си за преместване без стрес?
          </p>
          <p className="mt-1 text-white/90">
            Обади се сега или поискай оферта — отговаряме до 1 час в работно
            време.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:+359${SITE.phone.slice(1)}`}
            data-ga-event="tel_click"
            className="rounded-lg bg-white text-primary font-sans font-bold px-5 py-3 whitespace-nowrap"
          >
            📞 {SITE.phoneDisplay}
          </a>
          <Link
            href="/porachai/"
            className="rounded-lg border-2 border-white/70 hover:bg-white/10 font-sans font-semibold px-5 py-2.5 whitespace-nowrap transition-colors"
          >
            Поискай оферта
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- GalleryStrip ---------- */
export function GalleryStrip({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  if (!images?.length) return null;
  return (
    <section aria-label="Галерия" className="my-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.slice(0, 4).map((img) => (
          <div
            key={img.src}
            className="relative aspect-square overflow-hidden rounded-xl bg-soft"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
