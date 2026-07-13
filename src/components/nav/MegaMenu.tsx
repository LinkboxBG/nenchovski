import Link from "next/link";
import Image from "next/image";
import {
  NAV_GROUPS,
  FEATURED_ARTICLES,
  COMPANY_LINKS,
  type GroupId,
} from "@/data/nav";

/**
 * Server-rendered, CSS-only mega menu (hover + focus-within, без JS).
 * Всеки връх на групите отваря пълноширочинен панел, позициониран
 * спрямо <header> (position: sticky = containing block), затова
 * междинните <li>/<ul>/<nav> НЕ трябва да получават position — иначе
 * панелът губи пълната ширина.
 */

const TOP_STATIC_HREFS = ["/ceni/", "/blog/", "/za-nas/", "/kontakti/"] as const;

const linkCls =
  "flex items-center gap-1.5 px-3 py-2 rounded-md font-sans text-[14px] font-medium text-white/90 hover:text-white transition-colors";

export function MegaMenu() {
  const staticLinks = TOP_STATIC_HREFS.map((href) =>
    COMPANY_LINKS.find((l) => l.href === href)
  ).filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <nav aria-label="Основна навигация" className="hidden lg:block">
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {NAV_GROUPS.map((group) => (
          <li key={group.id} className="group">
            <Link href={group.href} className={linkCls}>
              <GroupIcon id={group.id} className="h-4 w-4 text-primary" />
              {group.label}
              <ChevronIcon className="h-2.5 w-2.5 rotate-90 opacity-50" />
            </Link>

            <div
              className="invisible absolute inset-x-0 top-full translate-y-1 opacity-0 pointer-events-none transition-all duration-300 ease-[var(--ease-premium)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
            >
              <div className="border-t-2 border-primary bg-white shadow-premium rounded-b-2xl">
                <div className="mx-auto max-w-[1140px] px-4">
                  <div className="grid grid-cols-[280px_1fr] gap-10 py-8">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
                      <Image
                        src={group.image}
                        alt={group.imageAlt}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 pt-10">
                        <p className="font-sans text-sm font-semibold leading-snug text-white">
                          {group.tagline}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center gap-2 border-b border-black/5 pb-3">
                        <GroupIcon id={group.id} className="h-5 w-5 text-primary" />
                        <Link
                          href={group.href}
                          className="font-sans text-lg font-bold text-ink hover:text-primary transition-colors"
                        >
                          {group.label}
                        </Link>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-8 gap-y-0.5">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="group/link flex items-center gap-1.5 py-1.5 text-[14px] text-secondary hover:text-primary transition-colors"
                            >
                              <ChevronIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}

        {staticLinks.map((link) =>
          link.href === "/blog/" ? (
            <li key={link.href} className="group relative">
              <Link href={link.href} className={linkCls}>
                {link.label}
                <ChevronIcon className="h-2.5 w-2.5 rotate-90 opacity-50" />
              </Link>
              <div className="invisible absolute right-0 top-full w-80 translate-y-1 opacity-0 pointer-events-none transition-all duration-300 ease-[var(--ease-premium)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                <div className="rounded-2xl border-t-2 border-primary bg-white p-4 shadow-premium">
                  <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-secondary/70">
                    Полезни статии
                  </p>
                  <ul className="space-y-0.5">
                    {FEATURED_ARTICLES.map((article) => (
                      <li key={article.href}>
                        <Link
                          href={article.href}
                          className="group/link flex items-start gap-1.5 py-1 text-[13.5px] leading-snug text-ink hover:text-primary transition-colors"
                        >
                          <ChevronIcon className="mt-0.5 h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                          {article.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ) : (
            <li key={link.href}>
              <Link href={link.href} className={linkCls}>
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
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
