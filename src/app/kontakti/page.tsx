import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, CtaBanner } from "@/components/Sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакти — Хамали Ненчовски София | 0894 766 424",
  description:
    "Свържи се с Хамали Ненчовски: ☎ 0894 766 424, София, ж.к. Хаджи Димитър, ул. Резбарска 9. Работим 7 дни в седмицата — оферта до 1 час.",
  alternates: { canonical: `${SITE.domain}/kontakti/` },
};

export default function KontaktiPage() {
  return (
    <>
      <main className="mx-auto max-w-[1140px] px-4">
        <Breadcrumbs items={[{ name: "Контакти", url: "/kontakti/" }]} />
        <h1 className="text-3xl md:text-4xl">Контакти</h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <dl className="space-y-5 text-[17px]">
              <div>
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
                  Телефони
                </dt>
                <dd className="mt-1 font-sans text-xl font-bold">
                  <a
                    href={`tel:+359${SITE.phone.slice(1)}`}
                    data-ga-event="tel_click"
                    className="text-primary"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <span className="mx-2 text-black/20">·</span>
                  <a
                    href={`tel:+359${SITE.phoneSecondary.slice(1)}`}
                    data-ga-event="tel_click"
                    className="text-primary"
                  >
                    {SITE.phoneSecondaryDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
                  Viber
                </dt>
                <dd className="mt-1">
                  <a
                    href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
                    data-ga-event="viber_click"
                    className="text-primary underline underline-offset-2"
                  >
                    Пиши ни във Viber
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
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
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
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
                    className="text-primary underline underline-offset-2 text-sm"
                  >
                    Виж в Google Maps →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
                  Работно време
                </dt>
                <dd className="mt-1">{SITE.workingHours}</dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-semibold text-secondary uppercase tracking-wide">
                  Фирма
                </dt>
                <dd className="mt-1 text-secondary text-sm">
                  {SITE.legalName}, ЕИК {SITE.eik}
                </dd>
              </div>
            </dl>
          </div>
          <QuoteForm />
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-black/10">
          <iframe
            title="Хамали Ненчовски на картата"
            src={`https://www.google.com/maps?q=${SITE.address.lat},${SITE.address.lng}&z=15&output=embed`}
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>
      <CtaBanner />
    </>
  );
}
