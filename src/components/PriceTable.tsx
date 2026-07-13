import Link from "next/link";
import { PRICES, PRICE_DISCLAIMER, formatPrice } from "@/data/pricing";

/**
 * Пълна ценова таблица — данни само от pricing.ts.
 * `highlightId` маркира най-релевантното перо за страницата (само визуално —
 * фон + inset лента в категорийния цвят; нула нови думи).
 */
export function PriceTable({ highlightId }: { highlightId?: string }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full text-[15px] border-collapse">
          <thead>
            <tr className="bg-soft font-sans text-left">
              <th className="px-4 py-3 font-semibold">Услуга</th>
              <th className="px-4 py-3 font-semibold">Капацитет</th>
              <th className="px-4 py-3 font-semibold">София</th>
              <th className="px-4 py-3 font-semibold">Извън София</th>
            </tr>
          </thead>
          <tbody>
            {PRICES.map((p) => (
              <tr
                key={p.id}
                className={`border-t border-black/5 transition-colors hover:bg-(--cat)/[0.04] ${
                  p.id === highlightId
                    ? "bg-(--cat)/[0.06] shadow-[inset_3px_0_0_0_var(--cat)]"
                    : ""
                }`}
              >
                <td className="px-4 py-3 font-sans font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.capacity ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <strong className="font-sans text-[17px] font-bold text-primary">
                    {formatPrice(p.sofia.price)} {p.sofia.unit}
                  </strong>
                  {p.sofia.extra ? ` ${p.sofia.extra}` : ""}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatPrice(p.country.price)} {p.country.unit}
                  {p.country.extra ? ` ${p.country.extra}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-secondary">
        {PRICE_DISCLAIMER} Виж всички подробности в секцията{" "}
        <Link
          href="/hamalski-uslugi/#ceni"
          className="text-primary underline underline-offset-2"
        >
          Цени
        </Link>
        .
      </p>
    </div>
  );
}

/** Кратък тийзър „от X €" за секции/карти; dark = върху тъмен фон (hero). */
export function PriceTeaser({
  from,
  dark = false,
}: {
  from: number;
  dark?: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-1 font-sans">
      <span className={`text-sm ${dark ? "text-white/70" : "text-secondary"}`}>
        от
      </span>
      <span
        className={`text-2xl font-bold ${dark ? "text-white" : "text-primary"}`}
      >
        {formatPrice(from)} €
      </span>
    </span>
  );
}
