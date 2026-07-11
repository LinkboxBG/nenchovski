import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";

const SERVICES = [
  { href: "/premestvane-na-doma/", label: "Преместване на дома" },
  { href: "/premestvane-na-ofisi/", label: "Преместване на офиси" },
  { href: "/premestvane-na-mebeli/", label: "Преместване на мебели" },
  { href: "/premestvane-na-bagaj/", label: "Преместване на багаж" },
  { href: "/bus-pod-naem/", label: "Бус под наем" },
  { href: "/kashoni/", label: "Кашони за преместване" },
];

const KARTI = [
  { href: "/karti-chisti-izvozva/", label: "Кърти, чисти, извозва" },
  { href: "/kurtene-na-banya/", label: "Къртене на баня" },
  { href: "/kartene-na-beton-sofiya/", label: "Къртене на бетон" },
  { href: "/izvozvane-na-stroitelni-otpadatsi-sofiya/", label: "Извозване на отпадъци" },
  { href: "/izhvurlyane-na-stari-mebeli/", label: "Изхвърляне на стари мебели" },
  { href: "/pochistvane-na-mazeta-sofia/", label: "Почистване на мазета" },
];

const COMPANY = [
  { href: "/za-nas/", label: "За нас" },
  { href: "/ceni/", label: "Цени" },
  { href: "/blog/", label: "Блог" },
  { href: "/hamali-rabota-sofia/", label: "Работа при нас" },
  { href: "/kontakti/", label: "Контакти" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="mx-auto max-w-[1140px] px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Image
            src="/wp-content/uploads/2026/04/nenchovski-logo-horizontal-for-black-background-1.png"
            alt="Хамали Ненчовски"
            width={212}
            height={45}
          />
          <p className="mt-4 text-sm text-white/80 leading-relaxed">
            Хамалски и транспортни услуги в София и цялата страна. 18 години
            опит (от 2008 г.). {SITE.workingHours}.
          </p>
          <p className="mt-4 font-sans font-bold text-lg">
            <a
              href={`tel:+359${SITE.phone.slice(1)}`}
              data-ga-event="tel_click"
              className="hover:text-white/80"
            >
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="text-sm text-white/80">
            <a href={`mailto:${SITE.email}`} className="hover:text-white">
              {SITE.email}
            </a>
          </p>
        </div>
        <FooterCol title="Преместване" links={SERVICES} />
        <FooterCol title="Кърти, чисти, извозва" links={KARTI} />
        <FooterCol title="Фирмата" links={COMPANY} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1140px] px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.legalName}, ЕИК{" "}
            {SITE.eik} · {SITE.address.city}, {SITE.address.quarter},{" "}
            {SITE.address.street}
          </p>
          <a
            href={SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Google Maps профил
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans font-semibold text-white text-base mb-3">
        {title}
      </h2>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
