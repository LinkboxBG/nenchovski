import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/data/site";
import {
  CORPORATE_CLIENTS,
  CORPORATE_TAGLINE,
  COMPANY_STATS,
} from "@/data/clients";
import type { CategoryTheme } from "@/data/categoryTheme";
import { CategoryGlyph } from "@/components/CategoryGlyph";
import { StarRating } from "@/components/StarRating";
import { PriceTeaser } from "@/components/PriceTable";
import { CountUp } from "@/components/CountUp";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  image: HeroImage;
  badges?: string[];
  breadcrumbsSlot?: ReactNode;
  variant?: "service" | "article";
  formSlot?: ReactNode;
  ctaPhone?: boolean;
  /** Категориен chip над h1 (дискретната сигнатура; не е heading). */
  categoryChip?: CategoryTheme;
  /** GMB блок: рейтинг + брой ревюта + линк към Google профила. */
  gmb?: { rating: number; count: number; url: string };
  /** Ценови индикатор „от X €" до GMB блока. */
  priceFrom?: number;
  /** B2B вариант: корпоративен кредибилити блок + тих лого marquee. */
  b2b?: boolean;
}

/** Full-bleed hero за услугови и статийни страници. */
export function Hero({
  title,
  subtitle,
  image,
  badges,
  breadcrumbsSlot,
  variant = "service",
  formSlot,
  ctaPhone = true,
  categoryChip,
  gmb,
  priceFrom,
  b2b = false,
}: HeroProps) {
  const isArticle = variant === "article";
  const showBadges = !isArticle && !!badges?.length;
  const showCta = !isArticle && ctaPhone !== false;
  const showMeta = !isArticle && !!(gmb || priceFrom);
  const b2bStat = COMPANY_STATS[1]; // 300+ преместени фирми и офиси

  return (
    <section
      className={`relative isolate overflow-hidden bg-carbon ${
        isArticle
          ? "min-h-[220px] sm:min-h-[260px] md:min-h-[300px]"
          : "min-h-[340px] sm:min-h-[400px] md:min-h-[420px]"
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/30"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-paper"
        aria-hidden
      />

      <div
        className={`relative mx-auto max-w-[1140px] px-4 ${
          isArticle ? "py-10 md:py-14" : "py-12 md:py-20"
        } ${formSlot ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10" : ""}`}
      >
        <div>
          {breadcrumbsSlot ? (
            <div className="mb-3 font-sans text-sm text-white/70">{breadcrumbsSlot}</div>
          ) : null}

          {categoryChip && !isArticle ? (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-(--cat-bright)/50 bg-(--cat)/25 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                <CategoryGlyph
                  id={categoryChip.id}
                  className="h-3.5 w-3.5 text-(--cat-bright)"
                />
                {categoryChip.chipLabel}
              </span>
            </div>
          ) : null}

          <h1
            className={`font-sans font-bold text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] ${
              isArticle ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
            }`}
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>
          ) : null}

          {showBadges ? (
            <ul data-reveal-stagger className="mt-6 flex flex-wrap gap-2.5">
              {badges!.map((badge) => (
                <li
                  key={badge}
                  data-reveal
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-sans text-sm font-medium text-white backdrop-blur"
                >
                  <CheckIcon />
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}

          {showMeta ? (
            <div
              data-reveal
              className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {gmb ? (
                <a
                  href={gmb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  <Image
                    src="/brand/social/google-g.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <StarRating dark rating={gmb.rating} />
                  <span className="underline-offset-2 group-hover:underline">
                    {String(gmb.rating).replace(".", ",")} · {gmb.count} ревюта
                    в Google
                  </span>
                </a>
              ) : null}
              {priceFrom ? <PriceTeaser from={priceFrom} dark /> : null}
            </div>
          ) : null}

          {b2b && !isArticle ? (
            <div data-reveal className="mt-6 max-w-2xl">
              <p className="font-sans text-sm font-medium text-white/85">
                {CORPORATE_TAGLINE} Основано и водено от{" "}
                <strong className="font-semibold text-white">
                  {SITE.owners.georgi}
                </strong>
                .
              </p>
              <p className="mt-2 flex items-baseline gap-2 font-sans">
                <CountUp
                  value={b2bStat.value}
                  suffix={b2bStat.suffix}
                  className="text-3xl font-bold text-white"
                />
                <span className="text-sm text-white/70">{b2bStat.label}</span>
              </p>
            </div>
          ) : null}

          {showCta ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`tel:+359${SITE.phone.slice(1)}`}
                data-ga-event="tel_click"
                className="inline-flex items-center gap-2 rounded-lg bg-red-gradient px-5 py-3 font-sans font-bold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-8px_rgba(228,34,34,0.55)]"
              >
                <PhoneIcon />
                {SITE.phoneDisplay}
              </a>
              <Link
                href="/porachai/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-sans font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Поискай оферта
              </Link>
            </div>
          ) : null}
        </div>

        {formSlot ? <div className="mt-8 lg:mt-0">{formSlot}</div> : null}
      </div>

      {b2b && !isArticle ? <LogoMarquee /> : null}
    </section>
  );
}

/**
 * Тих лого marquee за B2B hero — реалните корпоративни клиенти от clients.ts.
 * CSS-only: списъкът е дублиран (втората половина aria-hidden), keyframe
 * marquee = translateX(-50%); prefers-reduced-motion го спира (globals.css).
 */
function LogoMarquee() {
  const doubled = [...CORPORATE_CLIENTS, ...CORPORATE_CLIENTS];
  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-black/30 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max animate-marquee items-center py-3 [animation-duration:70s]">
        {doubled.map((client, i) => (
          <li
            key={`${client.name}-${i}`}
            aria-hidden={i >= CORPORATE_CLIENTS.length || undefined}
            className="mr-4 flex h-11 w-32 shrink-0 items-center justify-center rounded-lg bg-white px-3 py-1.5"
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={i < CORPORATE_CLIENTS.length ? client.name : ""}
                width={112}
                height={36}
                className="max-h-8 w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-center font-sans text-[11px] font-bold leading-tight tracking-tight text-carbon">
                {client.shortName ?? client.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
