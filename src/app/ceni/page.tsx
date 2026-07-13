import type { Metadata } from "next";
import Link from "next/link";
import { PriceTable } from "@/components/PriceTable";
import { QuoteForm } from "@/components/QuoteForm";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Breadcrumbs, FAQAccordion, CtaBanner } from "@/components/Sections";
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

      <Hero
        title="Цени на хамалски услуги в София — 2026"
        subtitle="Хамалин струва 12,50 € на час в София (15 €/ч за страната). Мини ван — 30 €/час, микробус 14 м³ — 40 €/час, камион 20 м³ — 60 € на курс. Това са официалните ни тарифи за 2026 г. — без скрити такси, с оферта до 1 час в работно време."
        image={{
          src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.02.webp",
          alt: "Цени на хамалски услуги в София — Хамали Ненчовски",
        }}
        breadcrumbsSlot={<Breadcrumbs dark items={[{ name: "Цени", url: "/ceni/" }]} />}
      />

      {/* Ценова таблица + разяснения */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[860px] px-4 py-12 md:py-16">
          <div data-reveal>
            <PriceTable />
          </div>

          <h2 className="mb-3 mt-10 text-2xl">Кое превозно средство да избера?</h2>
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-soft text-left font-sans">
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

          <h2 className="mb-3 mt-10 text-2xl">
            Колко струва на практика — три примера
          </h2>
          <div className="prose-nen">
            <p>
              Ориентировъчни сметки по официалните ни тарифи (точната цена
              потвърждаваме след оглед или снимки):
            </p>
            <ul>
              <li>
                <strong>Гарсониера или багаж</strong> — 2 хамали за 2 часа (50 €)
                + мини ван за 2 часа (60 €) ≈ <strong>110 €</strong>
              </li>
              <li>
                <strong>Двустаен апартамент</strong> — 2 хамали за 3 часа (75 €) +
                микробус 14 м³ за 3 часа (120 €) ≈ <strong>195 €</strong>
              </li>
              <li>
                <strong>Тристаен или къща</strong> — 3 хамали за 4 часа (150 €) +
                камион 20 м³, 2 курса (140 €) ≈ <strong>290 €</strong>
              </li>
            </ul>
            <p>
              Часовете зависят от етажа, асансьора и колко е опакован багажът —
              затова примерите са ориентир, а офертата ти е конкретна.
            </p>
          </div>

          <h2 className="mb-3 mt-10 text-2xl">Без скрити такси</h2>
          <div className="prose-nen">
            <ul>
              <li>
                <strong>Фолирането на мебелите е безплатно</strong> — част е от
                услугата, не допълнителен ред във фактурата.
              </li>
              <li>
                <strong>
                  Етаж, асансьор и паркиране уточняваме предварително
                </strong>{" "}
                — преди екипът да тръгне, не на място.
              </li>
              <li>
                <strong>
                  Кашоните и опаковъчните материали се договарят отделно
                </strong>{" "}
                — казваме цената им заедно с офертата.
              </li>
            </ul>
            <p className="text-sm text-secondary">
              Цените на тази страница са официалните ни тарифи, актуални към юли
              2026 г.
            </p>
          </div>

          <h2 className="mb-3 mt-10 text-2xl">Как определяме цената</h2>
          <div className="prose-nen">
            <p>
              Цената зависи от четири неща: <strong>обема</strong> (колко вещи
              местим), <strong>достъпа</strong> (етаж, асансьор, паркиране),{" "}
              <strong>разстоянието</strong> и{" "}
              <strong>допълнителните услуги</strong> (опаковане, разглобяване и
              сглобяване на мебели, кашони). Затова най-точната оферта се получава
              след кратък разговор или безплатен оглед — казваш ни какво местиш,
              ние казваме точна цена. Никакви изненади в деня на преместването.
            </p>
            <p>
              За кърти-чисти-извозва услугите (къртене на баня, стени, бетон и
              извозване на строителни отпадъци) цената се формира според обекта —
              виж подробности на страницата{" "}
              <Link href="/karti-chisti-izvozva/">кърти, чисти, извозва</Link> или
              се обади за оглед.
            </p>
          </div>
        </div>
      </section>

      <AuthorityStrip variant="reviews" />

      {/* Ревюта + ЧЗВ */}
      <section className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <ReviewsSection />
          <FAQAccordion faq={CENI_FAQ} />
        </div>
      </section>

      {/* Оферта */}
      <section className="bg-carbon-gradient py-16 md:py-20">
        <div className="mx-auto max-w-[1140px] px-4 text-center">
          <h2 data-reveal className="text-2xl font-bold text-white md:text-3xl">
            Вземи оферта до 1 час
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-white/70">
            Опиши какво местим — връщаме се с точна цена до 1 час в работно време.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <QuoteForm dark />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
