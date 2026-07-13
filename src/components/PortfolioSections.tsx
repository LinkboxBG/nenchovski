import Image from "next/image";
import {
  STATE_WORK_INTRO,
  STATE_INSTITUTIONS,
  STATE_WORK_BULLETS,
  IPA_CASE,
  CLIENT_CASE_STUDIES,
} from "@/data/portfolio";

/* ------------------------------------------------------------------ */
/* Обща заглавна част на секция                                        */
/* ------------------------------------------------------------------ */

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 id={id} data-reveal className="mt-2 text-2xl md:text-3xl">
        {title}
      </h2>
      <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
      {intro ? (
        <p data-reveal className="mt-5 text-[15px] leading-relaxed text-secondary">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Работата ни с държавни институции                                */
/* ------------------------------------------------------------------ */

export function StateInstitutions() {
  return (
    <section aria-labelledby="state-h" className="bg-paper">
      <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
        <SectionHeading
          id="state-h"
          eyebrow="Портфолио"
          title="Работата ни с държавни институции"
          intro={STATE_WORK_INTRO}
        />

        <ul
          data-reveal-stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATE_INSTITUTIONS.map((inst) => (
            <li
              key={inst.src}
              data-reveal
              className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] bg-soft">
                <Image
                  src={inst.src}
                  alt={inst.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-3 text-center font-sans text-sm font-medium text-ink">
                {inst.alt}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-card md:p-8">
          <h3 className="font-sans text-base font-semibold text-ink">
            Какво включва работата ни с институции
          </h3>
          <ul
            data-reveal-stagger
            className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2"
          >
            {STATE_WORK_BULLETS.map((bullet) => (
              <li
                key={bullet}
                data-reveal
                className="flex items-start gap-3 text-[15px] leading-relaxed text-secondary"
              >
                <CheckIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Казус: Институт по публична администрация                        */
/* ------------------------------------------------------------------ */

export function IpaCaseStudy() {
  return (
    <section aria-labelledby="ipa-h" className="bg-soft">
      <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            id="ipa-h"
            eyebrow="Казус"
            title="Преместване за Института по публична администрация"
            intro={IPA_CASE.intro}
          />
          <div
            data-reveal
            className="flex h-24 w-56 shrink-0 items-center justify-center self-start rounded-2xl border border-black/10 bg-white px-6 shadow-card md:self-center"
          >
            <Image
              src={IPA_CASE.logo}
              alt={IPA_CASE.name}
              width={200}
              height={80}
              className="max-h-16 w-auto max-w-full object-contain"
            />
          </div>
        </div>

        <ol
          data-reveal-stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {IPA_CASE.activities.map((act, i) => (
            <li
              key={i}
              data-reveal
              className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cat-gradient font-sans text-base font-bold text-white shadow-premium">
                {i + 1}
              </span>
              <p className="text-[15px] leading-relaxed text-secondary">{act}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Клиентски казуси с реални отзиви                                 */
/* ------------------------------------------------------------------ */

export function ClientCaseStudies() {
  return (
    <section aria-labelledby="cases-h" className="bg-paper">
      <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
        <SectionHeading
          id="cases-h"
          eyebrow="Бизнес клиенти"
          title="Казуси и отзиви от фирми"
        />

        <div data-reveal-stagger className="mt-10 grid gap-6 lg:grid-cols-2">
          {CLIENT_CASE_STUDIES.map((cs) => (
            <figure
              key={cs.name}
              data-reveal
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card md:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white px-3">
                  <Image
                    src={cs.logo}
                    alt={cs.name}
                    width={140}
                    height={56}
                    className="max-h-12 w-auto max-w-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-sans text-base font-semibold text-ink">
                    {cs.name}
                  </p>
                  <p className="mt-0.5 text-sm text-secondary">{cs.scope}</p>
                </div>
              </div>

              <blockquote className="relative mt-6 flex-1">
                <QuoteIcon className="absolute -left-1 -top-2 text-primary/15" />
                <p className="relative pl-6 text-[15px] italic leading-relaxed text-ink/90">
                  {cs.quote}
                </p>
              </blockquote>

              <figcaption className="mt-5 border-t border-black/5 pt-4 font-sans text-sm">
                <span className="font-semibold text-ink">{cs.author}</span>
                <span className="text-secondary"> · {cs.authorRole}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Иконки                                                              */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-primary"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="fill-primary/10" />
      <path
        d="M8 12.5l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 0 1 7.17 9.5V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5A1.67 1.67 0 0 1 17.17 9.5V6Z" />
    </svg>
  );
}
