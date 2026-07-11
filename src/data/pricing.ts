/**
 * ЕДИНСТВЕН ИЗТОЧНИК НА ЦЕНИ (source of truth).
 * Официални цени 2026, подадени от Силвия Ненчовска на 10.07.2026.
 * Източник: nenchovski-planning/00-data/ceni-hamalcho-2026.md
 *
 * Тези данни захранват: /ceni/, PriceTable/PriceTeaser на услуговите
 * страници, Offer/OfferCatalog schema и /pricing.md. Никога не
 * хардкодвай цена другаде — само оттук.
 */

export interface PriceItem {
  id: string;
  name: string;
  capacity?: string;
  sofia: { price: number; unit: string; extra?: string };
  country: { price: number; unit: string; extra?: string };
  /** Отворени въпроси към клиента — полетата остават null до изясняване */
  minCharge?: number | null;
  vatIncluded?: boolean | null;
  notes?: string;
}

export const PRICES: PriceItem[] = [
  {
    id: "hamalin",
    name: "Хамалин (един работник)",
    sofia: { price: 12.5, unit: "€/час" },
    country: { price: 15, unit: "€/час" },
    minCharge: null,
    vatIncluded: null,
  },
  {
    id: "minivan",
    name: "Мини ван",
    capacity: "2 м³",
    sofia: { price: 30, unit: "€/час" },
    country: { price: 0.4, unit: "€/км", extra: "в двете посоки" },
    minCharge: null,
    vatIncluded: null,
  },
  {
    id: "mikrobus",
    name: "Микробус",
    capacity: "14 м³",
    sofia: { price: 40, unit: "€/час" },
    country: { price: 0.5, unit: "€/км", extra: "в двете посоки" },
    minCharge: null,
    vatIncluded: null,
  },
  {
    id: "kamion",
    name: "Камион",
    capacity: "20 м³",
    sofia: { price: 60, unit: "€/курс", extra: "+ 10 € такса престой" },
    country: { price: 0.6, unit: "€/км", extra: "в двете посоки" },
    minCharge: null,
    vatIncluded: null,
  },
];

/** "от X €" стойности за ServiceCard/PriceTeaser и Offer schema */
export const PRICE_FROM = {
  hamalin: 12.5,
  minivan: 30,
  mikrobus: 40,
  kamion: 60,
} as const;

export const PRICE_DISCLAIMER =
  "Точната цена се потвърждава при безплатен оглед или по телефона — зависи от обем, етаж, асансьор и разстояние.";

export function formatPrice(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(2).replace(".", ",");
}
