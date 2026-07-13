import type { Metadata } from "next";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import { Hero } from "@/components/Hero";
import { Breadcrumbs, CtaBanner } from "@/components/Sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакти — Хамали Ненчовски София | 0894 766 424",
  description:
    "Свържи се с Хамали Ненчовски: ☎ 0894 766 424, София, ж.к. Хаджи Димитър, ул. Резбарска 9. Работим пон–съб 08:00–18:00 ч. — оферта до 1 час.",
  alternates: { canonical: `${SITE.domain}/kontakti/` },
};

const DAYS_BG = [
  { day: "Понеделник", hours: "08:00–18:00" },
  { day: "Вторник", hours: "08:00–18:00" },
  { day: "Сряда", hours: "08:00–18:00" },
  { day: "Четвъртък", hours: "08:00–18:00" },
  { day: "Петък", hours: "08:00–18:00" },
  { day: "Събота", hours: "08:00–18:00" },
  { day: "Неделя", hours: "Затворено", closed: true },
];

export default function KontaktiPage() {
  return (
    <>
      <Hero
        title="Контакти"
        image={{
          src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.06.webp",
          alt: "Свържи се с Хамали Ненчовски в София",
        }}
        breadcrumbsSlot={
          <Breadcrumbs dark items={[{ name: "Контакти", url: "/kontakti/" }]} />
        }
      />

      {/* Телефонни карти */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-12 md:py-16">
          <div data-reveal-stagger className="grid gap-5 lg:grid-cols-3">
            {/* Георги — основен телефон */}
            <div
              data-reveal
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-gradient text-white">
                <PhoneIcon />
              </span>
              <h2 className="mt-4 font-sans text-lg font-semibold text-ink">
                Георги Ненчовски — основен телефон
              </h2>
              <a
                href={`tel:+359${SITE.phone.slice(1)}`}
                data-ga-event="tel_click"
                className="mt-2 font-sans text-2xl font-bold text-primary"
              >
                {SITE.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-secondary">
                Обажданията се приемат на този номер.
              </p>
            </div>

            {/* Viber */}
            <div
              data-reveal
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card"
            >
              <Image
                src="/brand/social/viber.svg"
                alt="Viber"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <h2 className="mt-4 font-sans text-lg font-semibold text-ink">
                Viber — пратете снимки на обекта
              </h2>
              <a
                href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
                data-ga-event="viber_click"
                className="mt-2 font-sans text-2xl font-bold text-primary"
              >
                {SITE.phoneSecondaryDisplay}
              </a>
              <p className="mt-2 text-sm text-secondary">
                Изпратете снимки за по-точна оферта.
              </p>
            </div>

            {/* Силвия */}
            <div
              data-reveal
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-carbon text-white">
                <PhoneIcon />
              </span>
              <h2 className="mt-4 font-sans text-lg font-semibold text-ink">
                Силвия Ненчовска
              </h2>
              <a
                href="tel:+359887492669"
                data-ga-event="tel_click"
                className="mt-2 font-sans text-2xl font-bold text-primary"
              >
                {SITE.phoneSilviaDisplay}
              </a>
              <p className="mt-2 text-sm text-secondary">
                Счетоводство, фактури и оферти за корпоративни клиенти (ако Георги
                не вдига).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Работно време, адрес, форма */}
      <section className="bg-soft">
        <div className="mx-auto grid max-w-[1140px] gap-10 px-4 py-12 md:py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Работно време</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
              <table className="w-full text-[15px]">
                <tbody className="[&_td]:px-4 [&_td]:py-3 [&_tr]:border-t [&_tr]:border-black/5 [&_tr:first-child]:border-t-0">
                  {DAYS_BG.map((d) => (
                    <tr key={d.day}>
                      <td className="font-sans font-medium">{d.day}</td>
                      <td
                        className={`text-right ${
                          d.closed ? "text-secondary" : "text-ink"
                        }`}
                      >
                        {d.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-8 space-y-5 text-[17px]">
              <div>
                <dt className="font-sans text-sm font-semibold uppercase tracking-wide text-secondary">
                  Имейл
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-primary underline underline-offset-2"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold uppercase tracking-wide text-secondary">
                  Адрес
                </dt>
                <dd className="mt-1">
                  {SITE.address.city} {SITE.address.postalCode},{" "}
                  {SITE.address.quarter}, {SITE.address.street}
                  <br />
                  <a
                    href={SITE.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline underline-offset-2"
                  >
                    Виж в Google Maps →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold uppercase tracking-wide text-secondary">
                  Фирма
                </dt>
                <dd className="mt-1 text-sm text-secondary">
                  {SITE.legalName}, ЕИК {SITE.eik}
                </dd>
              </div>
            </dl>

            <div className="mt-8 overflow-hidden rounded-2xl border border-black/10">
              <iframe
                title="Хамали Ненчовски на картата"
                src={`https://www.google.com/maps?q=${SITE.address.lat},${SITE.address.lng}&z=15&output=embed`}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
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
