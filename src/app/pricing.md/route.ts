import { SITE } from "@/data/site";
import {
  PRICES,
  PRICE_DISCLAIMER,
  formatPrice,
  formatMoney,
  MOVING_PACKAGES,
  SERVICE_PACKAGES,
  DEMOLITION_GROUPS,
  DEMOLITION_SLUGS,
  type ServicePackage,
} from "@/data/pricing";

export const dynamic = "force-static";

function packageBlock(pkg: ServicePackage): string {
  const lines = pkg.tiers
    .map((t) => `- ${t.label}: ${formatMoney(t.price)}${t.note ? ` (${t.note})` : ""}`)
    .join("\n");
  return `### ${pkg.heading}\n${lines}${pkg.footnote ? `\n\n_${pkg.footnote}_` : ""}`;
}

/** /pricing.md — машинночетими цени от СЪЩИЯ източник като #ceni секцията (pricing.ts). */
export function GET() {
  const rows = PRICES.map(
    (p) =>
      `| ${p.name} | ${p.capacity ?? "—"} | ${formatPrice(p.sofia.price)} ${p.sofia.unit}${p.sofia.extra ? ` ${p.sofia.extra}` : ""} | ${formatPrice(p.country.price)} ${p.country.unit}${p.country.extra ? ` ${p.country.extra}` : ""} |`
  ).join("\n");

  const packagePkgs = [
    MOVING_PACKAGES,
    ...Object.entries(SERVICE_PACKAGES)
      .filter(([slug]) => !DEMOLITION_SLUGS.has(slug))
      .map(([, pkg]) => pkg),
  ];
  const packagesMd = packagePkgs.map(packageBlock).join("\n\n");
  const demolitionMd = DEMOLITION_GROUPS.map(packageBlock).join("\n\n");

  const body = `# Цени — Хамали Ненчовски (nenchovski.com)

Официални цени 2026 г. Валута: EUR. Пакетните цени водят; часовата тарифа е за детайл.

## Пакетни цени (по услуга)

${packagesMd}

## Кърти, чисти, извозва

${demolitionMd}

## Часова тарифа (хамалин и транспорт)

| Услуга | Капацитет | София | Извън София |
|---|---|---|---|
${rows}

${PRICE_DISCLAIMER}

Пълна информация: ${SITE.domain}/hamalski-uslugi/#ceni
Телефон за оферта: ${SITE.phoneDisplay} (оферта до 1 час в работно време)
Фирма: ${SITE.legalName}, ЕИК ${SITE.eik}, София. 18 години опит (от 2008 г.).
`;

  return new Response(body, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
