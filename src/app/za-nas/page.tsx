import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { aboutPageSchema } from "@/lib/schema";
import { TrustStrip } from "@/components/TrustStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Breadcrumbs, CtaBanner } from "@/components/Sections";
import { SITE } from "@/data/site";

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

export default function ZaNasPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <TrustStrip />
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs items={[{ name: "За нас", url: "/za-nas/" }]} />
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl">
            За нас — 18 години пренасяме София
          </h1>
          <div className="prose-nen mt-6">
            <p>
              Аз съм <strong>Георги Ненчовски</strong>. През 2008 г. започнах с
              един бус и много желание — днес, 18 години по-късно,{" "}
              <strong>Хамали Ненчовски</strong> е семейна фирма, която е
              преместила хиляди домове и офиси в София и цялата страна.
            </p>
            <p>
              През всичките тези години правилото ни е едно и също: отнасяме се
              с вещите на клиента като със свои. Затова хората, които сме
              местили преди десет години, ни търсят пак — и пращат приятелите
              си при нас. Голяма част от работата ни идва по препоръка, а това
              не се купува с реклама.
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
              графиците и офертите, се грижим всяко запитване да получи отговор
              до 1 час в работно време.
            </p>
            <h2>Защо клиентите ни избират</h2>
            <ul>
              <li>
                <strong>18 години опит (от 2008 г.)</strong> — виждали сме
                всякакви стълбища, тесни асансьори и тежки гардероби.
              </li>
              <li>
                <strong>Ясни цени</strong> — тарифите ни са публични на
                страницата <Link href="/ceni/">Цени</Link>, а офертата се
                потвърждава преди да започнем.
              </li>
              <li>
                <strong>Работим 7 дни в седмицата</strong> — включително уикенди
                и празници, когато на повечето хора им е удобно да се местят.
              </li>
              <li>
                <strong>Собствени превозни средства</strong> — мини ван,
                микробус 14 м³ и камион 20 м³, за да не плащаш повече от
                необходимото.
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
          <ReviewsSection />
        </div>
      </main>
      <CtaBanner />
    </>
  );
}
