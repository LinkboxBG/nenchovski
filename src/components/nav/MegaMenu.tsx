"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { NAV_GROUPS, COMPANY_LINKS, type GroupId } from "@/data/nav";

/**
 * Premium mega menu с hover-intent (без излишен клик):
 *  - отваря се на hover/focus, курсорът може да „слезе" в панела (невидим bridge
 *    + 140ms close-delay премахват мъртвата зона под тригера);
 *  - затваря се сам при смяна на страницата (usePathname), при Escape и при
 *    клик на линк — старият CSS-only :hover оставаше „закачен" след SPA навигация.
 * Панелите са пълноширочинни спрямо <header> (sticky = containing block),
 * затова междинните <li> НЕ получават position.
 */

// Само комерсиалните връхни линкове остават тук — „За нас"/„Контакти"/„Блог"
// минаха в помощната лента (мястото се освободи за пилар групата „Хамалски
// услуги" на първа позиция). „Цени" сочи към #ceni секцията на пилара.
const TOP_STATIC_HREFS = ["/hamalski-uslugi/#ceni"] as const;

const linkCls =
  "flex h-full items-center gap-1.5 whitespace-nowrap px-2 font-sans text-[14px] font-medium text-white/85 hover:text-white transition-colors";

export function MegaMenu() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Затвори при навигация (render-time reset — виж MobileMenu за същия патерн)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpenId(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const open = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), 200);
  };
  // При напускане на групата с фокус (Tab навън) затваряме веднага.
  const onBlurGroup = (id: string) => (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpenId((cur) => (cur === id ? null : cur));
    }
  };

  const staticLinks = TOP_STATIC_HREFS.map((href) =>
    COMPANY_LINKS.find((l) => l.href === href)
  ).filter((l): l is NonNullable<typeof l> => Boolean(l));

  const panelWrap = (id: string) =>
    `transition-all duration-300 ease-[var(--ease-premium)] ${
      openId === id
        ? "visible translate-y-0 opacity-100 pointer-events-auto"
        : "invisible translate-y-1 opacity-0 pointer-events-none"
    }`;

  return (
    <nav aria-label="Основна навигация" className="hidden self-stretch xl:block">
      <ul className="flex h-full items-stretch gap-0">
        {NAV_GROUPS.map((group) => {
          const isOpen = openId === group.id;
          return (
            <li
              key={group.id}
              onMouseEnter={() => open(group.id)}
              onMouseLeave={scheduleClose}
              onFocus={() => open(group.id)}
              onBlur={onBlurGroup(group.id)}
            >
              <Link
                href={group.href}
                aria-expanded={isOpen}
                className={`${linkCls} ${isOpen ? "text-white" : ""}`}
              >
                {group.label}
                <ChevronIcon
                  className={`h-2.5 w-2.5 rotate-90 opacity-50 transition-transform duration-300 ${
                    isOpen ? "-rotate-90 opacity-90" : ""
                  }`}
                />
              </Link>

              <div className={`absolute inset-x-0 top-full ${panelWrap(group.id)}`}>
                {/* невидим bridge — курсорът минава от тригера към панела без прекъсване */}
                <div className="pt-2">
                  <div className="border-t-2 border-primary bg-white shadow-premium rounded-b-2xl">
                    <div className="mx-auto max-w-[1280px] px-4">
                      <div className="grid grid-cols-[220px_1fr] gap-8 py-6">
                        <Link
                          href={group.href}
                          className="group/vis relative block aspect-[5/4] overflow-hidden rounded-xl shadow-card"
                        >
                          <Image
                            src={group.image}
                            alt={group.imageAlt}
                            fill
                            sizes="220px"
                            className="object-cover transition-transform duration-500 group-hover/vis:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 pt-8">
                            <p className="font-sans text-[13px] font-semibold leading-snug text-white">
                              {group.tagline}
                            </p>
                          </div>
                        </Link>

                        <div className="flex flex-col">
                          <div className="mb-3 flex items-center justify-between gap-2 border-b border-black/5 pb-2.5">
                            <Link
                              href={group.href}
                              className="flex items-center gap-2 font-sans text-base font-bold text-ink hover:text-primary transition-colors"
                            >
                              <GroupIcon id={group.id} className="h-5 w-5 text-primary" />
                              {group.label}
                            </Link>
                            <Link
                              href="/hamalski-uslugi/"
                              className="hidden xl:inline-flex items-center gap-1 whitespace-nowrap font-sans text-xs font-semibold text-primary hover:text-accent transition-colors"
                            >
                              Всички услуги
                              <ChevronIcon className="h-3 w-3" />
                            </Link>
                          </div>

                          <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpenId(null)}
                                  className="group/link flex items-center gap-1.5 rounded py-1.5 text-[13.5px] text-secondary hover:text-primary transition-colors"
                                >
                                  <ChevronIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                                  <span className="-ml-4 group-hover/link:ml-0 transition-all duration-200">
                                    {item.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          {/* Конверсионна лента — запълва празното при малки групи */}
                          <div className="mt-auto flex items-center justify-between gap-4 rounded-xl bg-soft px-4 py-3">
                            <p className="font-sans text-[13px] leading-snug text-secondary">
                              <span className="font-semibold text-ink">
                                Безплатен оглед
                              </span>{" "}
                              и оферта до 1 час в работно време.
                            </p>
                            <a
                              href={`tel:+359${SITE.phone.slice(1)}`}
                              data-ga-event="tel_click"
                              onClick={() => setOpenId(null)}
                              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-gradient px-3.5 py-2 font-sans text-sm font-bold text-white shadow-card transition-transform hover:-translate-y-0.5"
                            >
                              <PhoneGlyph className="h-4 w-4" />
                              {SITE.phoneDisplay}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}

        {staticLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkCls}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

/** Прости 2px-line SVG глифи (без библиотеки, без емоджита) за 4-те групи услуги. */
export function GroupIcon({ id, className }: { id: GroupId; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (id) {
    case "premestvane":
      return (
        <svg {...common}>
          <path d="M3 8l9-4 9 4-9 4-9-4Z" />
          <path d="M3 8v8l9 4 9-4V8" />
          <path d="M12 12v8" />
        </svg>
      );
    case "karti":
      return (
        <svg {...common}>
          <rect x="12.5" y="2.8" width="4.6" height="7.4" rx="1" transform="rotate(45 14.8 6.5)" />
          <path d="M12.2 8.8L4 17" />
          <path d="M3 21l3-3" />
        </svg>
      );
    case "pochistvane":
      return (
        <svg {...common}>
          <path d="M15 3l-4 4" />
          <path d="M11 7L5 20" />
          <path d="M11 7l6 3-4 8-7-3.2Z" />
        </svg>
      );
    case "transport":
      return (
        <svg {...common}>
          <path d="M2 7h11v9H2z" />
          <path d="M13 10h4l3 3v3h-7z" />
          <circle cx="6" cy="18" r="1.6" />
          <circle cx="17" cy="18" r="1.6" />
        </svg>
      );
    default:
      return null;
  }
}

/** Малка стрелка/chevron за hover микро-анимация върху линкове. */
export function ChevronIcon({ className }: { className?: string }) {
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
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
