import { SITE } from "@/data/site";
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

  const body = `# Хамали Ненчовски (nenchovski.com)

> Хамалски и транспортни услуги в София и цялата страна от 2008 г. (18 години опит). Преместване на домове и офиси, кърти-чисти-извозва, почистване на мазета и тавани, бус под наем, кашони и опаковъчни материали. Работим понеделник–събота, 08:00–18:00 ч. (неделя — почивен ден). Телефон: ${SITE.phoneDisplay}. Оферта до 1 час в работно време.

Фирма: ${SITE.legalName}, ЕИК ${SITE.eik}, ${SITE.address.city}, ${SITE.address.quarter}, ${SITE.address.street}.

## Пакетни цени 2026 (водещи, EUR)

${packagePrices}

## Кърти, чисти, извозва (EUR)

${demolitionPrices}

## Часова тарифа (хамалин и транспорт, EUR)

${prices}

Машинночетими цени: ${SITE.domain}/pricing.md

## Основни услуги

- [Хамалски услуги София](${SITE.domain}/hamalski-uslugi/): пилар страница — всички услуги, квартали, междуградски и международни курсове
- [Цени](${SITE.domain}/hamalski-uslugi/#ceni): пълна ценова листа 2026
- [Преместване на дома](${SITE.domain}/premestvane-na-doma/)
- [Преместване на офиси](${SITE.domain}/premestvane-na-ofisi/)
- [Преместване на мебели](${SITE.domain}/premestvane-na-mebeli/)
- [Кърти, чисти, извозва](${SITE.domain}/karti-chisti-izvozva/): къртене на баня, стени, бетон + извозване
- [Извозване на строителни отпадъци](${SITE.domain}/izvozvane-na-stroitelni-otpadatsi-sofiya/)
- [Изхвърляне на стари мебели](${SITE.domain}/izhvurlyane-na-stari-mebeli/)
- [Почистване на мазета](${SITE.domain}/pochistvane-na-mazeta-sofia/)
- [Бус под наем](${SITE.domain}/bus-pod-naem/)
- [Кашони за преместване](${SITE.domain}/kashoni/)
- [Международно преместване](${SITE.domain}/mezhdunarodno-premestvane/)

## Фирма

- [За нас](${SITE.domain}/za-nas/): историята от 2008 г., Георги и Силвия Ненчовски
- [Контакти](${SITE.domain}/kontakti/): ${SITE.phoneDisplay}, ${SITE.email}
- [Блог](${SITE.domain}/blog/): съвети за преместване и дома

## Покритие

София (всички квартали) и цялата страна. Международни курсове: Гърция → България, Румъния → България.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
