import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { aboutPageSchema } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Breadcrumbs, CtaBanner } from "@/components/Sections";
import { SITE } from "@/data/site";
import { CORPORATE_CLIENTS } from "@/data/clients";

export const metadata: Metadata = {
  title: "За нас — Хамали Ненчовски | 18 години опит в София",
  description:
    "Историята на Хамали Ненчовски: семейна фирма от 2008 г., хиляди премествания в София и страната. Запознай се с Георги и Силвия Ненчовски.",
  alternates: { canonical: `${SITE.domain}/za-nas/` },
  openGraph: {
    title: "За нас — Хамали Ненчовски",
    description:
      "Семейна фирма за хамалски услуги в София от 2008 г. — 18 години пренасяме домове и офиси.",
    url: `${SITE.domain}/za-nas/`,
    images: [{ url: `${SITE.domain}/og/za-nas.jpg`, width: 1200, height: 630 }],
    locale: "bg_BG",
  },
};

const TEAM = [
  {
    name: "Георги Ненчовски",
    role: "Управител",
    photo:
      "/wp-content/uploads/2026/04/%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8.webp",
  },
  {
    name: "Силвия Ненчовска",
    role: "Организация и оферти",
    photo: "/wp-content/uploads/2026/04/%D0%97%D0%B0-%D0%BD%D0%B0%D1%81.27-1.webp",
  },
];

export default function ZaNasPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />

      <Hero
        title="За нас — 18 години пренасяме София"
        image={{
          src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.04.webp",
          alt: "Екипът на Хамали Ненчовски в София",
        }}
        breadcrumbsSlot={<Breadcrumbs dark items={[{ name: "За нас", url: "/za-nas/" }]} />}
      />

      {/* Разказ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-12 md:py-16">
          <div className="prose-nen mx-auto">
            <p>
              Аз съм <strong>Георги Ненчовски</strong>. През 2008 г. започнах с
              един бус и много желание — днес, 18 години по-късно,{" "}
              <strong>Хамали Ненчовски</strong> е семейна фирма, която е
              преместила хиляди домове и офиси в София и цялата страна.
            </p>
            <p>
              През всичките тези години правилото ни е едно и също: отнасяме се с
              вещите на клиента като със свои. Затова хората, които сме местили
              преди десет години, ни търсят пак — и пращат приятелите си при нас.
              Голяма част от работата ни идва по препоръка, а това не се купува с
              реклама.
            </p>
            <p>
              Днес екипът ни покрива всичко около преместването:{" "}
              <Link href="/premestvane-na-doma/">преместване на дома</Link> и{" "}
              <Link href="/premestvane-na-ofisi/">офиса</Link>,{" "}
              <Link href="/karti-chisti-izvozva/">
                кърти-чисти-извозва услуги
              </Link>
              , <Link href="/pochistvane-na-mazeta-sofia/">почистване на мазета</Link>{" "}
              и <Link href="/pochistvane-na-tavani-sofia/">тавани</Link>,{" "}
              <Link href="/bus-pod-naem/">бус под наем</Link> и{" "}
              <Link href="/mezhdunarodno-premestvane/">
                международен транспорт
              </Link>
              . Заедно със <strong>Силвия Ненчовска</strong>, която организира
              графиците и офертите, се грижим всяко запитване да получи отговор до
              1 час в работно време.
            </p>
            <h2>Защо клиентите ни избират</h2>
            <ul>
              <li>
                <strong>18 години опит (от 2008 г.)</strong> — виждали сме
                всякакви стълбища, тесни асансьори и тежки гардероби.
              </li>
              <li>
                <strong>Ясни цени</strong> — тарифите ни са публични на страницата{" "}
                <Link href="/ceni/">Цени</Link>, а офертата се потвърждава преди да
                започнем.
              </li>
              <li>
                <strong>Работим понеделник–събота, 08:00–18:00 ч.</strong> —
                включително в събота, когато на повечето хора им е удобно да се
                местят.
              </li>
              <li>
                <strong>Собствени превозни средства</strong> — мини ван, микробус
                14 м³ и камион 20 м³, за да не плащаш повече от необходимото.
              </li>
            </ul>
            <h2>Данни за фирмата</h2>
            <p>
              {SITE.legalName}, ЕИК {SITE.eik}
              <br />
              {SITE.address.city}, {SITE.address.quarter}, {SITE.address.street}
              <br />
              Телефон:{" "}
              <a href={`tel:+359${SITE.phone.slice(1)}`} data-ga-event="tel_click">
                {SITE.phoneDisplay}
              </a>{" "}
              · Имейл: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Екип */}
      <section aria-labelledby="team-h" className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="team-h" data-reveal className="text-2xl md:text-3xl">
            Хората зад Хамали Ненчовски
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div data-reveal-stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div
                key={member.name}
                data-reveal
                className="flex items-center gap-5 rounded-2xl border border-black/10 bg-white p-5 shadow-card sm:p-6"
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 shrink-0 rounded-full border border-black/10 object-cover"
                />
                <div>
                  <p className="font-sans text-lg font-semibold text-ink">
                    {member.name}
                  </p>
                  <p className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-sans text-sm font-medium text-primary">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Портфолио / институции */}
      <AuthorityStrip variant="corporate" />
      <section aria-labelledby="clients-h" className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="clients-h" data-reveal className="text-2xl md:text-3xl">
            Институции и компании, които ни се довериха
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <ul
            data-reveal-stagger
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CORPORATE_CLIENTS.map((client) => (
              <li
                key={client.name}
                data-reveal
                className="rounded-xl border border-black/10 bg-soft px-4 py-3.5"
              >
                <span className="block font-sans font-medium text-ink">
                  {client.name}
                </span>
                {client.since ? (
                  <span className="mt-0.5 block text-sm text-secondary">
                    {client.since}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AuthorityStrip variant="stats" />

      {/* Ревюта */}
      <section className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <ReviewsSection />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
