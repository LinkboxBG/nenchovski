/**
 * Единствен източник на навигацията: Header (mega menu), MobileMenu,
 * Footer и homepage услуги четат ОТТУК. Не дублирай линкове другаде.
 *
 * Групите отразяват разнородните услуги (преместването не е къртене,
 * чистенето на мазета не е преместване) — виж дизайн решението в плана.
 */

export type GroupId = "premestvane" | "karti" | "pochistvane" | "transport";

export interface NavItem {
  href: string;
  label: string;
  /** Кратко пояснение за mega menu (по желание) */
  short?: string;
}

export interface NavGroup {
  id: GroupId;
  label: string;
  href: string; // hub страницата на групата
  tagline: string;
  /** Снимка-визитка за mega menu (автентична, от uploads) */
  image: string;
  imageAlt: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    // Първа позиция в менюто: пилар страницата „Хамалски услуги"
    // (изискване на клиента, 13.07.2026) — групата носи нейното име.
    id: "premestvane",
    label: "Хамалски услуги",
    href: "/hamalski-uslugi/",
    tagline: "Преместване на домове, офиси и мебели — от врата до врата",
    image:
      "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D0%BA%D0%BE%D1%80%D0%B8%D1%86%D0%B0.webp",
    imageAlt: "Екип на Хамали Ненчовски пренася мебели",
    items: [
      { href: "/hamalski-uslugi/", label: "Всички хамалски услуги" },
      { href: "/premestvane-na-doma/", label: "Преместване на дома" },
      { href: "/premestvane-na-apartament/", label: "Преместване на апартамент" },
      { href: "/premestvane-na-kashti/", label: "Преместване на къщи" },
      { href: "/premestvane-na-ofisi/", label: "Преместване на офиси" },
      { href: "/premestvane-na-bagaj/", label: "Преместване на багаж" },
      { href: "/premestvane-na-mebeli/", label: "Преместване на мебели" },
      { href: "/prevoz-na-divan/", label: "Превоз на диван" },
      { href: "/premestvane-na-hladilnik/", label: "Преместване на хладилник" },
      { href: "/premestvane-na-piano/", label: "Преместване на пиано" },
      { href: "/kashoni/", label: "Кашони и опаковане" },
    ],
  },
  {
    id: "karti",
    label: "Кърти · Чисти · Извозва",
    href: "/karti-chisti-izvozva/",
    tagline: "Къртене и извозване до лицензирано депо",
    image:
      "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
    imageAlt: "Кърти чисти извозва — обект на Ненчовски",
    items: [
      { href: "/karti-chisti-izvozva/", label: "Кърти, чисти, извозва" },
      { href: "/kurtene-na-banya/", label: "Къртене на баня" },
      { href: "/kartene-na-beton-sofiya/", label: "Къртене на бетон" },
      { href: "/kartene-na-steni/", label: "Къртене на стени" },
      {
        href: "/izvozvane-na-stroitelni-otpadatsi-sofiya/",
        label: "Извозване на строителни отпадъци",
      },
      { href: "/izhvurlyane-na-stari-mebeli/", label: "Изхвърляне на стари мебели" },
    ],
  },
  {
    id: "pochistvane",
    label: "Почистване",
    href: "/pochistvane-na-mazeta-sofia/",
    tagline: "Разчистваме мазета и тавани до голо",
    image:
      "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B0%D0%B7%D0%B5%D1%82%D0%B0-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
    imageAlt: "Почистване на мазе — Хамали Ненчовски",
    items: [
      { href: "/pochistvane-na-mazeta-sofia/", label: "Почистване на мазета" },
      { href: "/pochistvane-na-tavani-sofia/", label: "Почистване на тавани" },
    ],
  },
  {
    id: "transport",
    label: "Транспорт",
    href: "/bus-pod-naem/",
    tagline: "Бусове и камиони с шофьор — София, страната, чужбина",
    image:
      "/wp-content/uploads/2026/04/%D0%91%D1%83%D1%81-%D0%BF%D0%BE%D0%B4-%D0%BD%D0%B0%D0%B5%D0%BC.03.webp",
    imageAlt: "Бус под наем — Хамали Ненчовски",
    items: [
      { href: "/bus-pod-naem/", label: "Бус под наем" },
      { href: "/mezhdunarodno-premestvane/", label: "Международно преместване" },
      {
        href: "/transport-ot-gartsiya-do-balgariya/",
        label: "Транспорт от Гърция",
      },
      {
        href: "/transport-ot-rumaniya-do-balgariya/",
        label: "Транспорт от Румъния",
      },
    ],
  },
];

/** Водещи статии — достъпни от навигацията с един клик (по GSC кликове + комерсиална стойност). */
export const FEATURED_ARTICLES: NavItem[] = [
  {
    href: "/блог/kolko-struvat-hamalskite-uslugi-v-sofia/",
    label: "Колко струват хамалските услуги в София",
  },
  {
    href: "/блог/kak-da-izberete-firma-za-hamalski-uslugi/",
    label: "Как да изберете фирма за хамалски услуги",
  },
  {
    href: "/преместване-на-дома/kakvo-se-nosi-v-nova-kashta/",
    label: "Какво се носи в нова къща",
  },
  {
    href: "/блог/smyana-na-vrati-bez-kurtene/",
    label: "Смяна на врати без къртене",
  },
  {
    href: "/преместване-на-мебели/premestvane-na-tezhki-mebeli/",
    label: "8 трика за тежки мебели",
  },
  {
    href: "/преместване-на-дома/podgotovka-za-premestvane-na-doma/",
    label: "Подготовка за преместване",
  },
];

export const COMPANY_LINKS: NavItem[] = [
  { href: "/za-nas/", label: "За нас" },
  { href: "/preporachai-hamali-nenhcovski/", label: "Клиенти и препоръки" },
  // /ceni/ е консолидирана в пилар страницата (301 → #ceni секцията)
  { href: "/hamalski-uslugi/#ceni", label: "Цени" },
  { href: "/blog/", label: "Блог" },
  { href: "/hamali-rabota-sofia/", label: "Работа при нас" },
  { href: "/kontakti/", label: "Контакти" },
];

export const PRIMARY_CTA = { href: "/porachai/", label: "Поискай оферта" };
