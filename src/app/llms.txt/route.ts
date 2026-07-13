import { SITE } from "@/data/site";
import { NAV_GROUPS, FEATURED_ARTICLES } from "@/data/nav";
import {
  PRICES,
  formatPrice,
  formatMoney,
  MOVING_PACKAGES,
  SERVICE_PACKAGES,
  DEMOLITION_GROUPS,
  DEMOLITION_SLUGS,
  type ServicePackage,
} from "@/data/pricing";

export const dynamic = "force-static";

function pkgLines(pkg: ServicePackage): string {
  const tiers = pkg.tiers
    .map((t) => `${t.label} — ${formatMoney(t.price)}${t.note ? ` (${t.note})` : ""}`)
    .join("; ");
  return `- ${pkg.heading}: ${tiers}`;
}

/** /llms.txt — GEO: структуриран обзор за AI асистенти и търсачки. */
export function GET() {
  const prices = PRICES.map(
    (p) =>
      `- ${p.name}${p.capacity ? ` (${p.capacity})` : ""}: София ${formatPrice(p.sofia.price)} ${p.sofia.unit}${p.sofia.extra ? ` ${p.sofia.extra}` : ""}; страната ${formatPrice(p.country.price)} ${p.country.unit}${p.country.extra ? ` ${p.country.extra}` : ""}`
  ).join("\n");

  const packagePrices = [
    MOVING_PACKAGES,
    ...Object.entries(SERVICE_PACKAGES)
      .filter(([slug]) => !DEMOLITION_SLUGS.has(slug))
      .map(([, pkg]) => pkg),
  ]
    .map(pkgLines)
    .join("\n");
  const demolitionPrices = DEMOLITION_GROUPS.map(pkgLines).join("\n");

  // Услуги — data-driven от навигацията (4-те групи). Самосинхронизира се:
  // нова услуга в NAV_GROUPS → влиза автоматично и тук.
  const serviceGroups = NAV_GROUPS.map((g) => {
    const items = g.items
      .map((it) => `- [${it.label}](${SITE.domain}${encodeURI(it.href)})`)
      .join("\n");
    return `### ${g.label}\n${g.tagline}.\n\n${items}`;
  }).join("\n\n");

  // Водещи блог статии (Cyrillic href → encodeURI, както в sitemap.ts)
  const featured = FEATURED_ARTICLES.map(
    (a) => `- [${a.label}](${SITE.domain}${encodeURI(a.href)})`
  ).join("\n");

  const body = `# Хамали Ненчовски (nenchovski.com)

> Хамалски и транспортни услуги в София и цялата страна от ${SITE.foundingYear} г. (${SITE.yearsExperience} години опит). Преместване на домове и офиси, кърти-чисти-извозва, почистване на мазета и тавани, бус под наем, кашони и опаковъчни материали. ${SITE.workingHoursLong} Телефон: ${SITE.phoneDisplay}. Оферта до 1 час в работно време.

Фирма: ${SITE.legalName}, ЕИК ${SITE.eik}, ${SITE.address.city}, ${SITE.address.quarter}, ${SITE.address.street}. Собственици: ${SITE.owners.georgi} (управител) и ${SITE.owners.silvia} (счетоводство и корпоративни оферти).

## Пакетни цени 2026 (водещи, EUR)

${packagePrices}

## Кърти, чисти, извозва (EUR)

${demolitionPrices}

## Часова тарифа (хамалин и транспорт, EUR)

${prices}

Машинночетими цени: ${SITE.domain}/pricing.md

## Услуги

${serviceGroups}

[Пълна ценова листа 2026](${SITE.domain}/hamalski-uslugi/#ceni)

## Заяви оферта

- [Поискай оферта](${SITE.domain}/porachai/): безплатен оглед, оферта до 1 час в работно време. Тел. ${SITE.phoneDisplay}.

## Фирма

- [За нас](${SITE.domain}/za-nas/): историята от ${SITE.foundingYear} г., ${SITE.owners.georgi} и ${SITE.owners.silvia}
- [Клиенти и препоръки](${SITE.domain}/preporachai-hamali-nenhcovski/): портфолио и референции от клиенти
- [Контакти](${SITE.domain}/kontakti/): ${SITE.phoneDisplay}, ${SITE.email}
- [Блог](${SITE.domain}/blog/): съвети за преместване и дома

## Блог — водещи статии

${featured}

## Профили и отзиви

- Google Business профил (отзиви): ${SITE.social.google}
- Facebook: ${SITE.social.facebook}
- Instagram: ${SITE.social.instagram}
- TikTok: ${SITE.social.tiktok}

## Покритие

София (всички квартали) и цялата страна. Международни курсове: Гърция → България, Румъния → България.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
