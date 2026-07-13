"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { NAV_GROUPS, FEATURED_ARTICLES, COMPANY_LINKS, PRIMARY_CTA } from "@/data/nav";
import { GroupIcon, ChevronIcon } from "./MegaMenu";

/** Пълноекранно мобилно меню — заменя старото <details>. Плъзга се отдясно. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Затвори при смяна на страницата (render-time reset, не в useEffect —
  // виж react-hooks/set-state-in-effect + https://react.dev/learn/you-might-not-need-an-effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Затвори с Escape + заключи скрола на body докато менюто е отворено
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);
  let delayIndex = 0;
  const nextDelay = () => `${80 + delayIndex++ * 60}ms`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Затвори менюто" : "Отвори менюто"}
        className="relative z-[60] -mr-2 flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
      >
        <span className="relative block h-5 w-6">
          <span
            className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition-all duration-[220ms] ease-[var(--ease-premium)] ${
              open ? "translate-y-[9px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[9px] h-0.5 w-6 bg-primary transition-all duration-[220ms] ease-[var(--ease-premium)] ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-6 bg-white transition-all duration-[220ms] ease-[var(--ease-premium)] ${
              open ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Мобилно меню"
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-carbon shadow-premium transition-transform duration-300 ease-[var(--ease-premium)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-red-gradient" />

        <div className="flex-1 px-5 pb-6 pt-20">
          {/* 4 групи услуги — accordion */}
          <div>
            {NAV_GROUPS.map((group) => (
              <details
                key={group.id}
                className="group border-b border-line marker:hidden [&::-webkit-details-marker]:hidden transition-all duration-500 ease-[var(--ease-premium)]"
                style={{
                  transitionDelay: open ? nextDelay() : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(12px)",
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-sans font-semibold text-white">
                  <span className="flex items-center gap-2.5">
                    <GroupIcon id={group.id} className="h-5 w-5 shrink-0 text-primary" />
                    {group.label}
                  </span>
                  <ChevronIcon className="h-4 w-4 shrink-0 rotate-90 text-white/50 transition-transform duration-300 group-open:rotate-[270deg]" />
                </summary>
                <ul className="space-y-1 pb-3 pl-7">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-1.5 text-[14px] text-white/75 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          {/* Полезни статии */}
          <div
            className="border-b border-line py-4 transition-all duration-500 ease-[var(--ease-premium)]"
            style={{
              transitionDelay: open ? nextDelay() : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(12px)",
            }}
          >
            <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-white/40">
              Полезни статии
            </p>
            <ul className="space-y-1">
              {FEATURED_ARTICLES.map((article) => (
                <li key={article.href}>
                  <Link
                    href={article.href}
                    onClick={close}
                    className="block py-1 text-[13.5px] leading-snug text-white/75 hover:text-white transition-colors"
                  >
                    {article.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Фирмата */}
          <nav
            aria-label="Фирмата"
            className="border-b border-line py-4 transition-all duration-500 ease-[var(--ease-premium)]"
            style={{
              transitionDelay: open ? nextDelay() : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(12px)",
            }}
          >
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="text-[14px] font-medium text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA блок */}
          <div
            className="flex flex-col gap-3 pt-5 transition-all duration-500 ease-[var(--ease-premium)]"
            style={{
              transitionDelay: open ? nextDelay() : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(12px)",
            }}
          >
            <a
              href={`tel:+359${SITE.phone.slice(1)}`}
              data-ga-event="tel_click"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-gradient px-5 py-3.5 font-sans text-base font-bold text-white shadow-card transition-transform hover:-translate-y-0.5"
            >
              <PhoneIcon className="h-5 w-5" />
              {SITE.phoneDisplay}
            </a>

            <a
              href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
              data-ga-event="viber_click"
              onClick={close}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-line bg-white/5 px-5 py-3 transition-colors hover:bg-white/10"
            >
              <Image src="/brand/social/viber.svg" alt="" width={20} height={20} aria-hidden />
              <span className="flex flex-col items-start leading-tight">
                <span className="font-sans text-sm font-semibold text-white">Viber</span>
                <span className="text-[10px] text-white/50">Пратете снимките си тук</span>
              </span>
            </a>

            <Link
              href={PRIMARY_CTA.href}
              onClick={close}
              className="flex items-center justify-center rounded-xl bg-white px-5 py-3.5 font-sans text-base font-bold text-primary shadow-card transition-transform hover:-translate-y-0.5"
            >
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}
