import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";

/** Фиксирана долна лента — само мобилно. Обади се / Viber / Оферта. */
export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-carbon border-t border-line shadow-[0_-8px_24px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-line font-sans">
        <a
          href={`tel:+359${SITE.phone.slice(1)}`}
          data-ga-event="tel_click"
          className="flex flex-col items-center justify-center gap-1 py-2 text-red-hot active:bg-white/5"
        >
          <PhoneIcon className="h-4 w-4" />
          <span className="text-[13px] font-semibold leading-none">Обади се</span>
        </a>

        <a
          href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
          data-ga-event="viber_click"
          className="flex flex-col items-center justify-center gap-1 py-2 text-white/85 active:bg-white/5"
        >
          <Image src="/brand/social/viber.svg" alt="" width={16} height={16} aria-hidden />
          <span className="text-[13px] font-semibold leading-none">Viber</span>
          <span className="text-[10px] leading-none text-white/45">снимки тук</span>
        </a>

        <Link
          href="/porachai/"
          className="flex items-center justify-center gap-1.5 py-2 bg-red-gradient text-[13px] font-semibold text-white"
        >
          Оферта
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
