import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustStrip } from "@/components/TrustStrip";
import { Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Поръчай хамали онлайн — оферта до 1 час | Ненчовски",
  description:
    "Поръчай хамалски услуги в София за 1 минута: опиши какво местим, прикачи снимки и получи оферта до 1 час в работно време. Или звънни: 0894 766 424.",
  alternates: { canonical: `${SITE.domain}/porachai/` },
};

const BULLETS = [
  "Оферта до 1 час в работно време",
  "Безплатен оглед при нужда",
  "Работим 7 дни в седмицата",
  "18 години опит (от 2008 г.)",
  "Собствени бусове и камион",
];

export default function PorachaiPage() {
  return (
    <>
      <TrustStrip />
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs items={[{ name: "Поръчай", url: "/porachai/" }]} />
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl">
              Поръчай хамалски услуги онлайн
            </h1>
            <p className="mt-4 text-lg text-secondary leading-relaxed">
              Опиши какво ще местим, къртим или извозваме — колкото повече
              детайли (етаж, асансьор, снимки), толкова по-точна оферта ще
              получиш. Връщаме се с цена до 1 час в работно време.
            </p>
            <ul className="mt-6 space-y-2.5 font-sans text-[15px] font-medium">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-secondary">
              Предпочиташ телефона?{" "}
              <a
                href={`tel:+359${SITE.phone.slice(1)}`}
                data-ga-event="tel_click"
                className="font-sans font-bold text-primary whitespace-nowrap"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
          <QuoteForm />
        </div>
      </main>
    </>
  );
}
