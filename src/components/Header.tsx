import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/hamalski-uslugi/", label: "Услуги" },
  { href: "/karti-chisti-izvozva/", label: "Кърти-чисти-извозва" },
  { href: "/ceni/", label: "Цени" },
  { href: "/kashoni/", label: "Кашони" },
  { href: "/blog/", label: "Блог" },
  { href: "/za-nas/", label: "За нас" },
  { href: "/kontakti/", label: "Контакти" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/5 shadow-sm">
      <div className="mx-auto max-w-[1140px] px-4 flex items-center justify-between gap-4 h-16 md:h-[72px]">
        <Link href="/" aria-label="Хамали Ненчовски — начало" className="shrink-0">
          <Image
            src="/wp-content/uploads/2026/04/nenchovski-web-SMALL-header-home.png"
            alt="Хамали Ненчовски лого"
            width={186}
            height={37}
            priority
          />
        </Link>
        <nav aria-label="Основна навигация" className="hidden lg:block">
          <ul className="flex items-center gap-5 font-sans text-[15px] font-medium">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:+359${SITE.phone.slice(1)}`}
            data-ga-event="tel_click"
            className="hidden sm:flex items-center gap-2 font-sans font-bold text-primary text-lg whitespace-nowrap"
          >
            <PhoneIcon />
            {SITE.phoneDisplay}
          </a>
          <Link
            href="/porachai/"
            className="hidden md:inline-block rounded-lg bg-primary hover:bg-accent text-white font-sans font-semibold px-4 py-2.5 text-sm transition-colors"
          >
            Поискай оферта
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function MobileMenu() {
  return (
    <details className="lg:hidden relative">
      <summary
        className="list-none cursor-pointer p-2 -mr-2 text-ink"
        aria-label="Меню"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>
      <nav
        aria-label="Мобилна навигация"
        className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-black/10 bg-white shadow-xl p-2"
      >
        <ul className="font-sans text-[15px] font-medium">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2.5 hover:bg-soft"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-black/5 mt-1 pt-1">
            <Link
              href="/porachai/"
              className="block rounded-lg px-3 py-2.5 text-primary font-semibold"
            >
              Поискай оферта
            </Link>
          </li>
        </ul>
      </nav>
    </details>
  );
}
