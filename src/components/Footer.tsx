import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { NAV_GROUPS, COMPANY_LINKS, type NavItem } from "@/data/nav";

const [premestvane, karti, pochistvane, transport] = NAV_GROUPS;

export function Footer() {
  return (
    <footer className="bg-carbon text-white mt-16">
      <div className="mx-auto max-w-[1140px] px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/wp-content/uploads/2026/04/nenchovski-logo-horizontal-for-black-background-1.png"
            alt="Хамали Ненчовски"
            width={190}
            height={40}
          />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Хамалски, транспортни и ремонтни услуги в София и цялата страна.
            18 години опит (от 2008 г.).
          </p>

          <p className="mt-4 font-sans font-bold text-lg">
            <a
              href={`tel:+359${SITE.phone.slice(1)}`}
              data-ga-event="tel_click"
              className="hover:text-primary transition-colors"
            >
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="text-sm text-white/70">
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            {SITE.workingHoursLong}
          </p>
          <a
            href={SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-white/70 hover:text-white transition-colors"
          >
            {SITE.address.street}, {SITE.address.quarter}, {SITE.address.city}
          </a>

          <div className="mt-5 flex items-center gap-3">
            <SocialLink
              href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
              src="/brand/social/viber.svg"
              label="Viber"
              gaEvent="viber_click"
            />
            <SocialLink
              href="https://www.facebook.com/silvia.bencheva"
              src="/brand/social/facebook.svg"
              label="Facebook"
            />
            <SocialLink
              href={SITE.googleMapsUrl}
              src="/brand/social/google-g.svg"
              label="Отзиви в Google"
            />
          </div>
        </div>

        <FooterCol title={premestvane.label} href={premestvane.href} items={premestvane.items} />
        <FooterCol title={karti.label} href={karti.href} items={karti.items} />

        <div>
          <FooterColTitle title={pochistvane.label} href={pochistvane.href} />
          <ul className="space-y-2 text-sm">
            {pochistvane.items.map((l) => (
              <FooterLink key={l.href} item={l} />
            ))}
          </ul>

          <div className="mt-6">
            <FooterColTitle title={transport.label} href={transport.href} />
            <ul className="space-y-2 text-sm">
              {transport.items.map((l) => (
                <FooterLink key={l.href} item={l} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1140px] px-4 py-5">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-white/70">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1140px] px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.legalName}, ЕИК{" "}
            {SITE.eik} · {SITE.address.city}, {SITE.address.quarter},{" "}
            {SITE.address.street}
          </p>
          <Link
            href="/politika-za-poveritelnost/"
            className="hover:text-white transition-colors"
          >
            Политика за поверителност и бисквитки
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ title, href }: { title: string; href: string }) {
  return (
    <h2 className="mb-3">
      <Link
        href={href}
        className="inline-block font-sans font-semibold text-white text-base pb-1.5 border-b-2 border-primary hover:text-primary transition-colors"
      >
        {title}
      </Link>
    </h2>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  return (
    <li>
      <Link
        href={item.href}
        className="inline-block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
      >
        {item.label}
      </Link>
    </li>
  );
}

function FooterCol({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: NavItem[];
}) {
  return (
    <nav aria-label={title}>
      <FooterColTitle title={title} href={href} />
      <ul className="space-y-2 text-sm">
        {items.map((l) => (
          <FooterLink key={l.href} item={l} />
        ))}
      </ul>
    </nav>
  );
}

function SocialLink({
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
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-line hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
    >
      <Image src={src} alt="" width={18} height={18} aria-hidden />
    </a>
  );
}
