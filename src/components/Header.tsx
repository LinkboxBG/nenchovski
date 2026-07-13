import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { PRIMARY_CTA } from "@/data/nav";
import { MegaMenu } from "./nav/MegaMenu";
import { MobileMenu } from "./nav/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-premium">
      {/* Тънка утилитарна лента — само на по-широки екрани */}
      <div className="hidden lg:block bg-carbon-2 border-b border-line">
        <div className="mx-auto max-w-[1140px] px-4 h-8 flex items-center justify-end gap-6 font-sans text-xs text-white/60">
          <span>{SITE.workingHours}</span>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-white/90 transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="bg-carbon-gradient">
        <div className="mx-auto max-w-[1140px] px-4 flex items-center justify-between gap-4 h-16 lg:h-[76px]">
          <Link href="/" aria-label="Хамали Ненчовски — начало" className="shrink-0">
            <Image
              src="/wp-content/uploads/2026/04/nenchovski-logo-horizontal-for-black-background-1.png"
              alt="Хамали Ненчовски"
              width={190}
              height={40}
              priority
            />
          </Link>

          <MegaMenu />

          <div className="flex items-center gap-3">
            <a
              href={`tel:+359${SITE.phone.slice(1)}`}
              data-ga-event="tel_click"
              className="hidden md:flex items-center gap-2 font-sans font-bold text-white text-[15px] whitespace-nowrap hover:text-red-hot transition-colors"
            >
              <PhoneIcon className="text-primary shrink-0" />
              {SITE.phoneDisplay}
            </a>
            <Link
              href={PRIMARY_CTA.href}
              className="hidden md:inline-flex items-center rounded-lg bg-red-gradient text-white font-sans font-semibold px-4 py-2.5 text-sm shadow-card hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
            >
              {PRIMARY_CTA.label}
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
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
