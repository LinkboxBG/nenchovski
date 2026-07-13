import type { ReactNode } from "react";
import { CheckGlyph } from "@/components/CategoryGlyph";

/**
 * Преизползваеми info-карти, извлечени 1:1 от pillar страницата
 * (/hamalski-uslugi/) — markup-ът е дословен, за нулев визуален diff там.
 */

export interface PriceFactor {
  n: string;
  t: string;
  d: string;
}

/** „Как се формира крайната цена" — тъмни карти с ghost номер. */
export function FactorGrid({ factors }: { factors: PriceFactor[] }) {
  return (
    <div
      data-reveal-stagger
      className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {factors.map((f) => (
        <div
          key={f.n}
          data-reveal
          className="relative overflow-hidden rounded-2xl bg-carbon p-6 text-white"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-5 font-sans text-[72px] font-bold leading-none text-white/[0.06]"
          >
            {f.n}
          </span>
          <span className="font-sans text-sm font-bold text-red-hot">
            {f.n}
          </span>
          <h4 className="mt-2 font-sans text-base font-semibold">{f.t}</h4>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{f.d}</p>
        </div>
      ))}
    </div>
  );
}

/** Бяла карта със зелени check-точки („Без скрити такси" и подобни). */
export function ChecklistCard({
  title,
  items,
}: {
  title: string;
  /** ReactNode, за да се пазят inline <strong> акцентите. */
  items: ReactNode[];
}) {
  return (
    <div
      data-reveal
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-card"
    >
      <h3 className="font-sans text-xl font-bold">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-secondary">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <CheckGlyph className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
