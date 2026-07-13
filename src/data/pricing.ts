/**
 * ЕДИНСТВЕН ИЗТОЧНИК НА ЦЕНИ (source of truth).
 * Официални цени 2026, подадени от Силвия Ненчовска.
 *
 * Три ценови слоя:
 *  1. PRICES        — часова рейткарта по ресурс (файл A, 09.07). Вторична/детайлна
 *                     тарифа + основа на пилар калкулатора и извънградските км-цени.
 *  2. MOVING_PACKAGES + SERVICE_PACKAGES — пакетни/изходни цени по услуга
 *                     (файл B, 10.07 + пояснение C, 13.07). ВОДЕЩИЯТ слой.
 *  3. DEMOLITION_PRICES — детайлен ценоразпис за „кърти, чисти, извозва“
 *                     (файл D). Заменя рейткартата в тази категория.
 *
 * Тези данни захранват: услуговите страници (PackagePricing + PriceTable),
 * пилар #ceni, Offer/OfferCatalog schema, /pricing.md и /llms.txt.
 * Никога не хардкодвай цена другаде — само оттук.
 */

/* ============================================================= */
/* Слой 1 — часова рейткарта по ресурс (файл A, непроменена)      */
/* ============================================================= */

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

export const PRICE_DISCLAIMER =
  "Точната цена се потвърждава при безплатен оглед или по телефона — зависи от обем, етаж, асансьор и разстояние.";

export function formatPrice(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(2).replace(".", ",");
}

/* ============================================================= */
/* Слой 2 + 3 — пакетни цени (общ модел)                         */
/* ============================================================= */

/** Единична ценова форма — покрива всички варианти на подадените цени. */
export type Money =
  | { kind: "flat"; amount: number; unit?: string } // 100 €, 120 €, 20 €/м³
  | { kind: "range"; min: number; max: number; unit?: string } // 110–160 €, 35–90 €/куб.м
  | { kind: "from"; amount: number; unit?: string } // от 60 €
  | { kind: "quote" } // „по договорка“
  | { kind: "survey" }; // „само след оглед“

export interface PackageTier {
  label: string;
  price: Money;
  note?: string;
}

export interface ServicePackage {
  id: string;
  heading: string;
  tiers: PackageTier[];
  footnote?: string;
  /** Ако е зададено — hero тийзърът показва „от {heroFrom} €“. Пропуснато при
   *  единично-остойностени услуги (€/кв.м, €/куб.м) → без числов тийзър. */
  heroFrom?: number;
}

/** Форматира единична цена като четим низ. */
export function formatMoney(m: Money): string {
  switch (m.kind) {
    case "flat":
      return `${formatPrice(m.amount)} ${m.unit ?? "€"}`;
    case "from":
      return `от ${formatPrice(m.amount)} ${m.unit ?? "€"}`;
    case "range":
      return `${formatPrice(m.min)}–${formatPrice(m.max)} ${m.unit ?? "€"}`;
    case "quote":
      return "по договорка";
    case "survey":
      return "само след оглед";
  }
}

/** Най-ниската конкретна стойност в пакет — за Offer schema. */
export function packageFrom(pkg: ServicePackage): number | undefined {
  const nums = pkg.tiers.flatMap((t) => {
    switch (t.price.kind) {
      case "flat":
      case "from":
        return [t.price.amount];
      case "range":
        return [t.price.min];
      default:
        return [];
    }
  });
  return nums.length ? Math.min(...nums) : undefined;
}

/* ---------- Преместване по тип жилище (пояснение C, 13.07) ---------- */

export const MOVING_PACKAGES: ServicePackage = {
  id: "premestvane",
  heading: "Ориентировъчна цена според типа жилище",
  heroFrom: 110,
  tiers: [
    { label: "Гарсониера", price: { kind: "range", min: 110, max: 160 } },
    { label: "Двустаен апартамент", price: { kind: "range", min: 195, max: 300 } },
    { label: "Тристаен апартамент или къща", price: { kind: "flat", amount: 290 } },
  ],
  footnote:
    "Ориентировъчни цени — окончателната оферта се потвърждава след оглед или снимки по Viber.",
};

export const MOVING_LEAD_SLUGS = new Set([
  "premestvane-na-apartament",
  "premestvane-na-doma",
  "premestvane-na-kashti",
]);

const QUOTE_HIGH_FLOOR =
  "За висок етаж без асансьор — по договорка след уточняване на достъпа.";
const SURVEY_NOTE =
  "Ориентировъчни цени — точната оферта е след безплатен оглед или снимки по Viber.";

/* ---------- Пакетни цени по услуга (файл B, 10.07) ---------- */

export const SERVICE_PACKAGES: Record<string, ServicePackage> = {
  "premestvane-na-bagaj": {
    id: "bagaj",
    heading: "Цена за преместване на багаж",
    heroFrom: 20,
    tiers: [{ label: "На кубик багаж", price: { kind: "flat", amount: 20, unit: "€/м³" } }],
    footnote: SURVEY_NOTE,
  },
  "prevoz-na-divan": {
    id: "divan",
    heading: "Цена за превоз на диван",
    heroFrom: 120,
    tiers: [
      { label: "Сваляне и качване до 3-ти етаж (нисък → нисък)", price: { kind: "flat", amount: 120 } },
      { label: "Висок етаж → висок етаж", price: { kind: "quote" }, note: QUOTE_HIGH_FLOOR },
    ],
    footnote: SURVEY_NOTE,
  },
  "premestvane-na-hladilnik": {
    id: "hladilnik",
    heading: "Цена за преместване на хладилник",
    heroFrom: 100,
    tiers: [
      { label: "Сваляне и качване до 3-ти етаж", price: { kind: "flat", amount: 100 } },
      { label: "Висок етаж → висок етаж", price: { kind: "quote" }, note: QUOTE_HIGH_FLOOR },
    ],
    footnote: SURVEY_NOTE,
  },
  "premestvane-na-piano": {
    id: "piano",
    heading: "Цена за преместване на пиано",
    heroFrom: 150,
    tiers: [
      { label: "Руско пиано (до 3-ти етаж)", price: { kind: "flat", amount: 150 } },
      { label: "Немско пиано (до 3-ти етаж)", price: { kind: "flat", amount: 220 } },
      { label: "Висок етаж → висок етаж", price: { kind: "quote" }, note: QUOTE_HIGH_FLOOR },
    ],
    footnote: SURVEY_NOTE,
  },
  "premestvane-na-ofisi": {
    id: "ofisi",
    heading: "Цена за преместване на офис",
    heroFrom: 250,
    tiers: [
      { label: "До 10 работни места", price: { kind: "range", min: 250, max: 500 } },
      { label: "До 20 работни места", price: { kind: "range", min: 500, max: 750 } },
      { label: "Над 20 работни места", price: { kind: "survey" } },
    ],
    footnote: SURVEY_NOTE,
  },
  "bus-pod-naem": {
    id: "bus",
    heading: "Цена за бус под наем",
    heroFrom: 60,
    tiers: [
      { label: "Бус + шофьор", price: { kind: "from", amount: 60 }, note: "+ 10 € такса престой (на курс)" },
      { label: "Почасово в рамките на София (мини ван)", price: { kind: "from", amount: 30, unit: "€/ч" } },
    ],
    footnote: SURVEY_NOTE,
  },
  "pochistvane-na-mazeta-sofia": {
    id: "mazeta",
    heading: "Цена за почистване на мазе",
    heroFrom: 150,
    tiers: [
      {
        label: "Според кубатурата",
        price: { kind: "range", min: 150, max: 300 },
        note: "+ такса сепариране на депо „Враждебна“",
      },
    ],
    footnote: SURVEY_NOTE,
  },
  "pochistvane-na-tavani-sofia": {
    id: "tavani",
    heading: "Цена за почистване на таван",
    heroFrom: 150,
    tiers: [
      {
        label: "Според кубатурата",
        price: { kind: "range", min: 150, max: 300 },
        note: "+ такса сепариране; при липса на асансьор — доплащане",
      },
    ],
    footnote: SURVEY_NOTE,
  },
  "izhvurlyane-na-stari-mebeli": {
    id: "izhvurlyane",
    heading: "Цена за изхвърляне на стари мебели",
    tiers: [
      {
        label: "До 20 м³",
        price: { kind: "flat", amount: 400 },
        note: "+ такса сепариране на депо",
      },
    ],
    footnote: SURVEY_NOTE,
  },

  /* --- Кърти, чисти, извозва (файл D) — подмножества по страница --- */
  "kartene-na-beton-sofiya": {
    id: "kartene-beton",
    heading: "Цени за къртене на бетон",
    tiers: [
      { label: "Къртене на бетон", price: { kind: "range", min: 35, max: 90, unit: "€/куб.м" } },
      { label: "Отвор за врата в бетонна стена", price: { kind: "flat", amount: 50 } },
      { label: "Панелен комин", price: { kind: "flat", amount: 45 } },
      { label: "Бетонен подпрозорец", price: { kind: "flat", amount: 30 } },
    ],
    footnote:
      "Ориентировъчни цени, не крайни — точна оферта след безплатен оглед, според спецификата и обема.",
  },
  "kartene-na-steni": {
    id: "kartene-steni",
    heading: "Цени за къртене на стени",
    tiers: [
      { label: "Къртене на тухла", price: { kind: "range", min: 5, max: 7, unit: "€/кв.м" } },
      { label: "Къртене на мазилка", price: { kind: "range", min: 2, max: 3, unit: "€/кв.м" } },
      { label: "Къртене на фаянс", price: { kind: "range", min: 1, max: 2, unit: "€/кв.м" } },
      { label: "Отвор за врата в тухлена стена", price: { kind: "flat", amount: 25 } },
      { label: "Тухлен подпрозорец", price: { kind: "flat", amount: 25 } },
    ],
    footnote:
      "Ориентировъчни цени, не крайни — точна оферта след безплатен оглед, според спецификата и обема.",
  },
  "kurtene-na-banya": {
    id: "banya",
    heading: "Цена за къртене на баня",
    heroFrom: 60,
    tiers: [
      { label: "Кърти, чисти, извозва — баня (комплексно)", price: { kind: "range", min: 60, max: 85 } },
      { label: "Къртене на фаянс", price: { kind: "range", min: 1, max: 2, unit: "€/кв.м" } },
      { label: "Къртене на мозайка", price: { kind: "range", min: 2, max: 4, unit: "€/кв.м" } },
    ],
    footnote:
      "Ориентировъчни цени, не крайни — точна оферта след безплатен оглед, според спецификата и обема.",
  },
  "izvozvane-na-stroitelni-otpadatsi-sofiya": {
    id: "stroitelni-otpadatsi",
    heading: "Цени за извозване на строителни отпадъци",
    heroFrom: 35,
    tiers: [
      { label: "Контейнер до 3,0 куб.", price: { kind: "flat", amount: 35 } },
      { label: "Контейнер 4,0 куб.", price: { kind: "flat", amount: 40 } },
      { label: "Контейнер 6,0 куб.", price: { kind: "flat", amount: 65 } },
      { label: "Пълнене в наши чували + изнасяне с асансьор", price: { kind: "flat", amount: 4, unit: "€/чувал" }, note: "до 25 кг" },
      { label: "Пренасяне на пълен чувал по стълби", price: { kind: "flat", amount: 2, unit: "€/чувал" }, note: "на етаж, до 25 кг" },
    ],
    footnote:
      "Ориентировъчни цени, не крайни — точна оферта след безплатен оглед, според спецификата и обема.",
  },
};

/* ---------- Пълен групиран каталог „кърти, чисти, извозва“ (файл D) ---------- */
/* За хъб страницата /karti-chisti-izvozva/ и machine-readable файловете.        */

const DEMOLITION_FOOTNOTE =
  "Ориентировъчни цени, не крайни. Окончателна оферта след безплатен оглед, съобразно спецификата и обема от работа.";

export const DEMOLITION_GROUPS: ServicePackage[] = [
  {
    id: "kurtene",
    heading: "Къртене",
    footnote: DEMOLITION_FOOTNOTE,
    tiers: [
      { label: "Къртене на бетон", price: { kind: "range", min: 35, max: 90, unit: "€/куб.м" } },
      { label: "Къртене на тухла", price: { kind: "range", min: 5, max: 7, unit: "€/кв.м" } },
      { label: "Къртене на мазилка", price: { kind: "range", min: 2, max: 3, unit: "€/кв.м" } },
      { label: "Къртене на фаянс", price: { kind: "range", min: 1, max: 2, unit: "€/кв.м" } },
      { label: "Къртене на мозайка", price: { kind: "range", min: 2, max: 4, unit: "€/кв.м" } },
      { label: "Къртене на замазка", price: { kind: "range", min: 1, max: 2, unit: "€/кв.м" } },
      { label: "Комбинирано — мозайка и замазка", price: { kind: "range", min: 3, max: 4, unit: "€/кв.м" } },
      { label: "Комбинирано — фаянс и мазилка", price: { kind: "range", min: 2, max: 3, unit: "€/кв.м" } },
      { label: "Бетонен подпрозорец", price: { kind: "flat", amount: 30 } },
      { label: "Тухлен подпрозорец", price: { kind: "flat", amount: 25 } },
      { label: "Панелен комин", price: { kind: "flat", amount: 45 } },
      { label: "Тухлен комин", price: { kind: "flat", amount: 40 } },
      { label: "Отвор за врата в бетонна стена", price: { kind: "flat", amount: 50 } },
      { label: "Отвор за врата в тухлена стена", price: { kind: "flat", amount: 25 } },
    ],
  },
  {
    id: "izvozvane",
    heading: "Извозване на строителни отпадъци",
    footnote: DEMOLITION_FOOTNOTE,
    tiers: [
      { label: "Контейнер до 3,0 куб.", price: { kind: "flat", amount: 35 } },
      { label: "Контейнер 4,0 куб.", price: { kind: "flat", amount: 40 } },
      { label: "Контейнер 6,0 куб.", price: { kind: "flat", amount: 65 } },
    ],
  },
  {
    id: "kompleksni",
    heading: "Кърти, чисти, извозва — комплексно в апартамент",
    footnote: DEMOLITION_FOOTNOTE,
    tiers: [
      { label: "Бетонен подпрозорец", price: { kind: "range", min: 60, max: 80 } },
      { label: "Тухлен подпрозорец", price: { kind: "range", min: 55, max: 75 } },
      { label: "Отвор за врата в бетонна стена", price: { kind: "range", min: 70, max: 95 } },
      { label: "Отвор за врата в тухлена стена", price: { kind: "range", min: 55, max: 80 } },
      { label: "Панелен комин", price: { kind: "range", min: 75, max: 90 } },
      { label: "Баня", price: { kind: "range", min: 60, max: 85 } },
    ],
  },
  {
    id: "drugi",
    heading: "Демонтаж и пренасяне",
    footnote: DEMOLITION_FOOTNOTE,
    tiers: [
      { label: "Демонтаж на метални каси", price: { kind: "flat", amount: 8 } },
      { label: "Демонтаж на дървени каси и дограма", price: { kind: "flat", amount: 6 } },
      { label: "Демонтаж на метални остъкления", price: { kind: "flat", amount: 8, unit: "€/кв.м" } },
      { label: "Пълнене в наши чували + изнасяне с асансьор", price: { kind: "flat", amount: 4, unit: "€/чувал" }, note: "до 25 кг" },
      { label: "Пренасяне на пълен чувал по стълби", price: { kind: "flat", amount: 2, unit: "€/чувал" }, note: "на етаж, до 25 кг" },
      { label: "Качване на строителни материали с асансьор", price: { kind: "flat", amount: 1, unit: "€/чувал" } },
      { label: "Минимален ангажимент", price: { kind: "from", amount: 31 }, note: "≈ 60 лв" },
    ],
  },
];

/** Slug-ове от категорията „кърти, чисти, извозва“ — часовата рейткарта на
 *  преместването НЕ се показва тук (услугата е коренно различна). */
export const DEMOLITION_SLUGS = new Set([
  "kartene-na-beton-sofiya",
  "kartene-na-steni",
  "kurtene-na-banya",
  "izvozvane-na-stroitelni-otpadatsi-sofiya",
  "karti-chisti-izvozva",
]);

/** Хъб страницата рендерира целия групиран каталог, не единичен пакет. */
export const DEMOLITION_HUB_SLUG = "karti-chisti-izvozva";

/** Водещият пакет за услугова страница (или undefined → само рейткарта). */
export function getLeadPackage(slug: string): ServicePackage | undefined {
  if (MOVING_LEAD_SLUGS.has(slug)) return MOVING_PACKAGES;
  return SERVICE_PACKAGES[slug];
}
