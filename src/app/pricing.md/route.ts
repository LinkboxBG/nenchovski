import { SITE } from "@/data/site";
import { PRICES, PRICE_DISCLAIMER, formatPrice } from "@/data/pricing";

export const dynamic = "force-static";

/** /pricing.md — машинночетими цени от СЪЩИЯ източник като /ceni/ (pricing.ts). */
export function GET() {
  const rows = PRICES.map(
    (p) =>
      `| ${p.name} | ${p.capacity ?? "—"} | ${formatPrice(p.sofia.price)} ${p.sofia.unit}${p.sofia.extra ? ` ${p.sofia.extra}` : ""} | ${formatPrice(p.country.price)} ${p.country.unit}${p.country.extra ? ` ${p.country.extra}` : ""} |`
  ).join("\n");

  const body = `# Цени — Хамали Ненчовски (nenchovski.com)

Официални цени 2026 г. Валута: EUR. Обновено: 2026-07-11.

| Услуга | Капацитет | София | Извън София |
|---|---|---|---|
${rows}

${PRICE_DISCLAIMER}

Пълна информация: ${SITE.domain}/ceni/
Телефон за оферта: ${SITE.phoneDisplay} (оферта до 1 час в работно време)
Фирма: ${SITE.legalName}, ЕИК ${SITE.eik}, София. 18 години опит (от 2008 г.).
`;

  return new Response(body, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
