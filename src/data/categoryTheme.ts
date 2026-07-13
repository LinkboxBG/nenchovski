/**
 * Дискретна сигнатурна система по категория услуга.
 *
 * ЦВЕТОВЕТЕ НЕ ЖИВЕЯТ ТУК — единственият им източник е globals.css
 * ([data-cat="…"] → --cat/--cat-deep/--cat-bright). Тук е само мета
 * информацията за UI-то (chip етикет + глиф). ServiceView слага
 * data-cat={theme.id} на wrapper и компонентите четат променливите
 * през статични класове (text-(--cat), border-(--cat)/40 …).
 */

export type CategoryId = "premestvane" | "karti" | "pochistvane" | "transport";

export interface CategoryTheme {
  id: CategoryId;
  /** Етикет за hero chip-а — категорийните имена от навигацията/заданието. */
  chipLabel: string;
}

export const CATEGORY_THEMES: Record<CategoryId, CategoryTheme> = {
  premestvane: { id: "premestvane", chipLabel: "Преместване" },
  karti: { id: "karti", chipLabel: "Кърти · Чисти · Извозва" },
  pochistvane: { id: "pochistvane", chipLabel: "Почистване" },
  transport: { id: "transport", chipLabel: "Транспорт" },
};

/** null за utility/непозната категория → без chip, без data-cat, червен default. */
export function themeFor(category?: string): CategoryTheme | null {
  if (!category) return null;
  return CATEGORY_THEMES[category as CategoryId] ?? null;
}
