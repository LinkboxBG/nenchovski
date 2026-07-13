import { formatMoney, type ServicePackage } from "@/data/pricing";

/**
 * Водещ пакетен ценови блок (по услуга). Чете само от pricing.ts.
 * Категорийната сигнатура идва през --cat (default = бранд червено), затова е
 * безопасен и на страници без data-cat. Решетката wrap-ва → без хоризонтален
 * скрол на тесни екрани.
 */
export function PackagePricing({ pkg }: { pkg: ServicePackage }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-card md:p-7">
      <h3 className="font-sans text-base font-semibold text-ink">{pkg.heading}</h3>

      <ul className="mt-4 divide-y divide-black/5">
        {pkg.tiers.map((t) => {
          const isText = t.price.kind === "quote" || t.price.kind === "survey";
          return (
            <li
              key={t.label}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
            >
              <span className="min-w-0 text-[15px] leading-snug">
                <span className="font-medium text-ink">{t.label}</span>
                {t.note ? (
                  <span className="mt-0.5 block text-sm text-secondary">{t.note}</span>
                ) : null}
              </span>
              <span
                className={
                  isText
                    ? "shrink-0 text-sm italic text-secondary"
                    : "shrink-0 whitespace-nowrap font-sans text-lg font-bold text-(--cat)"
                }
              >
                {formatMoney(t.price)}
              </span>
            </li>
          );
        })}
      </ul>

      {pkg.footnote ? (
        <p className="mt-4 text-sm text-secondary">{pkg.footnote}</p>
      ) : null}
    </div>
  );
}

/**
 * Групиран каталог за хъб страницата „Кърти, чисти, извозва“ — рендерира
 * няколко пакета (групи) един под друг.
 */
export function PackageCatalog({ groups }: { groups: ServicePackage[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {groups.map((g) => (
        <PackagePricing key={g.id} pkg={g} />
      ))}
    </div>
  );
}
