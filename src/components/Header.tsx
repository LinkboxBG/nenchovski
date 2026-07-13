import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { PRIMARY_CTA } from "@/data/nav";
import { MegaMenu } from "./nav/MegaMenu";
import { MobileMenu } from "./nav/MobileMenu";

const UTILITY_LINKS = [
  { href: "/za-nas/", label: "За нас" },
  { href: "/kontakti/", label: "Контакти" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-premium">
      {/* Помощна лента (desktop) — работно време вляво, соц. профили вдясно */}
      <div className="hidden lg:block bg-carbon-2 border-b border-line">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between gap-6 px-4 font-sans text-[13px] text-white/80">
          <span className="inline-flex items-center gap-2">
            <ClockIcon className="h-3.5 w-3.5 text-primary" />
            <span className="text-white/55">Работно време:</span>
            <span className="font-medium text-white/90">{SITE.workingHours}</span>
          </span>

          <div className="flex items-center gap-1">
            {UTILITY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-2 py-1 font-medium text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}

            <span className="mx-2 h-4 w-px bg-white/15" aria-hidden />

            <div className="flex items-center gap-1.5">
              <SocialIcon
                href={SITE.social.google}
                src="/brand/social/google-g.svg"
                label="Отзиви в Google"
              />
              <SocialIcon
                href={SITE.social.facebook}
                src="/brand/social/facebook.svg"
                label="Facebook"
              />
              <SocialIcon
                href={SITE.social.instagram}
                src="/brand/social/instagram.svg"
                label="Instagram"
              />
              <SocialIcon
                href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
                src="/brand/social/viber.svg"
                label="Viber"
                gaEvent="viber_click"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Основен ред — лого, навигация, телефон + CTA */}
      <div className="bg-carbon-gradient">
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-3 px-4 lg:h-[80px]">
          <Link href="/" aria-label="Хамали Ненчовски — начало" className="shrink-0">
            <Image
              src="/wp-content/uploads/2026/04/nenchovski-logo-horizontal-for-black-background-1.png"
              alt="Хамали Ненчовски — хамалски услуги от Хамалчо ЕООД"
              width={283}
              height={60}
              priority
              className="h-11 w-auto lg:h-[52px]"
            />
          </Link>

          <MegaMenu />

          <div className="flex items-center gap-3">
            <a
              href={`tel:+359${SITE.phone.slice(1)}`}
              data-ga-event="tel_click"
              className="hidden items-center gap-1.5 whitespace-nowrap font-sans text-[15px] font-bold text-white transition-colors hover:text-red-hot xl:flex"
            >
              <PhoneIcon className="h-4 w-4 text-primary" />
              {SITE.phoneDisplay}
            </a>

            <OfferCta />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Основен CTA — shine sweep + плъзгаща стрелка + червено сияние при hover. */
function OfferCta() {
  return (
    <Link
      href={PRIMARY_CTA.href}
      data-ga-event="cta_offer"
      className="group/cta relative hidden items-center gap-2 overflow-hidden rounded-lg bg-red-gradient px-4 py-2.5 font-sans text-sm font-bold whitespace-nowrap text-white shadow-[0_6px_20px_-6px_rgba(228,34,34,0.7)] ring-1 ring-inset ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-6px_rgba(228,34,34,0.9)] focus-visible:-translate-y-0.5 md:inline-flex"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-2/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-[left] duration-700 ease-out group-hover/cta:left-[130%]"
      />
      <span className="relative">{PRIMARY_CTA.label}</span>
      <ArrowIcon className="relative h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </Link>
  );
}

function SocialIcon({
  href,
  src,
  label,
  gaEvent,
}: {
  href: string;
  src: string;
  label: string;
  gaEvent?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      data-ga-event={gaEvent}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/12"
    >
      <Image src={src} alt="" width={16} height={16} aria-hidden />
    </a>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
