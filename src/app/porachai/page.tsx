import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { Breadcrumbs, CtaBanner } from "@/components/Sections";
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
  "Работим понеделник–събота, 08:00–18:00 ч.",
  "18 години опит (от 2008 г.)",
  "Собствени бусове и камион",
];

export default function PorachaiPage() {
  return (
    <>
      <Hero
        title="Поръчай хамалски услуги онлайн"
        subtitle="Опиши какво ще местим, къртим или извозваме — колкото повече детайли (етаж, асансьор, снимки), толкова по-точна оферта ще получиш. Връщаме се с цена до 1 час в работно време."
        image={{
          src: "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B4%D0%BE%D0%BC%D0%B0.02.webp",
          alt: "Поръчай хамалски услуги в София — Хамали Ненчовски",
        }}
        breadcrumbsSlot={
          <Breadcrumbs dark items={[{ name: "Поръчай", url: "/porachai/" }]} />
        }
      />

      {/* Форма + предимства */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1140px] items-start gap-10 px-4 py-12 md:py-16 lg:grid-cols-2">
          <div data-reveal>
            <h2 className="text-2xl md:text-3xl">Защо да поръчаш при нас</h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
            <ul className="mt-6 space-y-3 font-sans text-[15px] font-medium">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckIcon />
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
                className="whitespace-nowrap font-sans font-bold text-primary"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
          <div data-reveal>
            <QuoteForm />
          </div>
        </div>
      </section>

      <AuthorityStrip variant="reviews" />

      <CtaBanner />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
