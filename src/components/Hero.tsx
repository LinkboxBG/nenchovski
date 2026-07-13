import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/data/site";

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
}: HeroProps) {
  const isArticle = variant === "article";
  const showBadges = !isArticle && !!badges?.length;
  const showCta = !isArticle && ctaPhone !== false;

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
    </section>
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
