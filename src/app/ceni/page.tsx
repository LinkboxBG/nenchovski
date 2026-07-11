import type { Metadata } from "next";
import Link from "next/link";
import { PriceTable } from "@/components/PriceTable";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustStrip } from "@/components/TrustStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import {
  Breadcrumbs,
  DirectAnswer,
  FAQAccordion,
  CtaBanner,
} from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { offerCatalogSchema } from "@/lib/schema";
import { CeniViewTracker } from "./tracker";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Хамали София цени 2026 — от 12,50 €/ч | Ненчовски",
  description:
    "Актуални цени на хамалски услуги в София: хамалин 12,50 €/ч, мини ван 30 €/ч, микробус 40 €/ч, камион 60 €/курс. Без скрити такси — виж всички тарифи.",
  alternates: { canonical: `${SITE.domain}/ceni/` },
  openGraph: {
    title: "Цени на хамалски услуги в София — 2026",
    description:
      "Хамалин 12,50 €/ч · Мини ван 30 €/ч · Микробус 40 €/ч · Камион 60 €/курс. Официалните тарифи на Хамали Ненчовски.",
    url: `${SITE.domain}/ceni/`,
    images: [{ url: `${SITE.domain}/og/ceni.jpg`, width: 1200, height: 630 }],
    locale: "bg_BG",
  },
};

const CENI_FAQ = [
  {
    q: "Има ли минимален брой часове?",
    a: "За малки задачи се разбираме индивидуално — обади се на 0894 766 424 и ще ти дадем точна цена за твоя случай, без ангажимент.",
  },
  {
    q: "Какво включва цената на час за хамалин?",
    a: "Пренасяне, качване и сваляне по стълби или с асансьор, внимателна работа с вещите и подреждане в превозното средство. Опаковъчни материали и кашони се договарят отделно.",
  },
  {
    q: "Как се изчислява цената извън София?",
    a: "За страната превозните средства се таксуват на километър в двете посоки: мини ван 0,40 €/км, микробус 0,50 €/км, камион 0,60 €/км. Работата на хамалите е 15 €/час.",
  },
  {
    q: "Мога ли да получа фиксирана оферта предварително?",
    a: "Да — след безплатен оглед или подробно описание със снимки през формата получаваш конкретна оферта, преди да започнем.",
  },
  {
    q: "Кое превозно средство ми трябва?",
    a: "Гарсониера или багаж — мини ван (2 м³). Двустаен до тристаен — микробус (14 м³). Голямо жилище или офис — камион (20 м³). Ако не си сигурен, ще преценим заедно по телефона.",
  },
];

export default function CeniPage() {
  return (
    <>
      <JsonLd data={offerCatalogSchema()} />
      <CeniViewTracker />
      <TrustStrip />
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs items={[{ name: "Цени", url: "/ceni/" }]} />
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h1 className="text-3xl md:text-4xl">
              Цени на хамалски услуги в София — 2026
            </h1>
            <DirectAnswer text="Хамалин струва 12,50 € на час в София (15 €/ч за страната). Мини ван — 30 €/час, микробус 14 м³ — 40 €/час, камион 20 м³ — 60 € на курс. Това са официалните ни тарифи за 2026 г. — без скрити такси, с оферта до 1 час в работно време." />
            <div className="my-6">
              <PriceTable />
            </div>

            <h2 className="text-2xl mt-10 mb-3">
              Кое превозно средство да избера?
            </h2>
            <div className="overflow-x-auto rounded-xl border border-black/10">
              <table className="w-full text-[15px] border-collapse">
                <thead>
                  <tr className="bg-soft font-sans text-left">
                    <th className="px-4 py-3 font-semibold">Ситуация</th>
                    <th className="px-4 py-3 font-semibold">Препоръка</th>
                    <th className="px-4 py-3 font-semibold">Защо</th>
                  </tr>
                </thead>
                <tbody className="[&_td]:px-4 [&_td]:py-3 [&_tr]:border-t [&_tr]:border-black/5">
                  <tr>
                    <td>Багаж, гарсониера, единични мебели</td>
                    <td className="font-sans font-medium">Мини ван (2 м³)</td>
                    <td>Най-евтин на час, пъргав в града</td>
                  </tr>
                  <tr>
                    <td>Двустаен / тристаен апартамент</td>
                    <td className="font-sans font-medium">Микробус (14 м³)</td>
                    <td>Побира цяло домакинство за 1–2 курса</td>
                  </tr>
                  <tr>
                    <td>Голямо жилище, къща, офис</td>
                    <td className="font-sans font-medium">Камион (20 м³)</td>
                    <td>Един курс вместо три — излиза по-евтино</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl mt-10 mb-3">Как определяме цената</h2>
            <div className="prose-nen">
              <p>
                Цената зависи от четири неща: <strong>обема</strong> (колко
                вещи местим), <strong>достъпа</strong> (етаж, асансьор,
                паркиране), <strong>разстоянието</strong> и{" "}
                <strong>допълнителните услуги</strong> (опаковане, разглобяване
                и сглобяване на мебели, кашони). Затова най-точната оферта се
                получава след кратък разговор или безплатен оглед — казваш ни
                какво местиш, ние казваме точна цена. Никакви изненади в деня
                на преместването.
              </p>
              <p>
                За кърти-чисти-извозва услугите (къртене на баня, стени, бетон
                и извозване на строителни отпадъци) цената се формира според
                обекта — виж подробности на страницата{" "}
                <Link href="/karti-chisti-izvozva/">кърти, чисти, извозва</Link>{" "}
                или се обади за оглед.
              </p>
            </div>

            <ReviewsSection />
            <FAQAccordion faq={CENI_FAQ} />
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
