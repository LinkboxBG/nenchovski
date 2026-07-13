import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema, offerCatalogSchema } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { Gallery } from "@/components/Gallery";
import { AuthorBox } from "@/components/AuthorBox";
import { QuoteForm } from "@/components/QuoteForm";
import { RateCardDetails } from "@/components/PriceTable";
import { PackagePricing } from "@/components/PackagePricing";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import {
  MOVING_PACKAGES,
  SERVICE_PACKAGES,
  DEMOLITION_GROUPS,
} from "@/data/pricing";
import {
  Breadcrumbs,
  FAQAccordion,
  StepsHowWeWork,
  CtaBanner,
} from "@/components/Sections";
import {
  CategoryGlyph,
  CheckGlyph,
  ArrowGlyph,
  PinGlyph,
} from "@/components/CategoryGlyph";
import { FactorGrid, ChecklistCard } from "@/components/InfoCards";
import { SITE } from "@/data/site";
import { NAV_GROUPS } from "@/data/nav";
import { getBlogArticles } from "@/lib/content";
import { CeniViewTracker } from "./tracker";

/**
 * ПИЛАР СТРАНИЦА „Хамалски услуги" — най-важната търговска страница в сайта.
 * Клъстер: Хамалски услуги → категории (Преместване / Кърти / Почистване /
 * Транспорт) → конкретни услуги. Секцията „Цени" (#ceni) е водеща и е
 * 301-target на бившата /ceni/. Съдържанието е ръчно и е ИЗКЛЮЧЕНО от
 * catch-all рендера на src/content/pages/hamalski-uslugi.md (виж
 * [...path]/page.tsx) — MD файлът остава само като данни за related-връзки.
 */

const URL_PATH = "/hamalski-uslugi/";

export const metadata: Metadata = {
  title: "Хамалски услуги София — пакетни цени 2026 от 110 € | Ненчовски",
  description:
    "Хамалски услуги в София, страната и чужбина: преместване от 110 €, кърти-чисти-извозва, почистване, транспорт. Ясни пакетни цени, без скрити такси, оферта до 1 час. ☎ 0894 766 424",
  alternates: { canonical: `${SITE.domain}${URL_PATH}` },
  openGraph: {
    title: "Хамалски услуги София — пакетни цени 2026 | Хамали Ненчовски",
    description:
      "Всички хамалски услуги на едно място: преместване от 110 €, кърти-чисти-извозва, почистване и транспорт. Ясни пакетни цени, оферта до 1 час — 0894 766 424.",
    url: `${SITE.domain}${URL_PATH}`,
    images: [
      { url: `${SITE.domain}/og/hamalski-uslugi.jpg`, width: 1200, height: 630 },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

/* ------------------------------------------------------------------ */
/* Данни на страницата                                                 */
/* ------------------------------------------------------------------ */

/** Котви за бързата навигация под херото. */
const ANCHORS = [
  { href: "#ceni", label: "Цени" },
  { href: "#uslugi", label: "Всички услуги" },
  { href: "#kvartali", label: "Квартали" },
  { href: "#mezhdugradski", label: "Междуградски" },
  { href: "#mezhdunarodni", label: "Международни" },
  { href: "#chzv", label: "Въпроси" },
];

/** 4-те пера в ценовата секция — само официални тарифи от pricing.ts. */
const PRICE_CATEGORIES = [
  {
    title: "Преместване и хамали",
    href: "/premestvane-na-doma/",
    lines: [
      "Преместване на дом — от 110 € (по тип жилище)",
      "Фолиране и обезопасяване на мебелите — безплатно",
      "Или почасово: хамалин 12,50 €/ч в София, 15 €/ч страната",
    ],
    note: "Дом, офис, отделни мебели и багаж",
    icon: "premestvane" as const,
  },
  {
    title: "Кърти · Чисти · Извозва",
    href: "/karti-chisti-izvozva/",
    lines: [
      "Къртене — тухла от 5 €/кв.м, бетон 35–90 €/куб.м",
      "Извозване с контейнер — от 35 €",
      "Комплексно (кърти-чисти-извозва) — баня 60–85 €",
    ],
    note: "Баня, стени, бетон, строителни отпадъци",
    icon: "karti" as const,
  },
  {
    title: "Почистване на мазета и тавани",
    href: "/pochistvane-na-mazeta-sofia/",
    lines: [
      "От 150 € според кубатурата + такса сепариране",
      "Оферта по снимки — не е нужен оглед за малки обекти",
      "Изнасяме, товарим и оставяме помещението празно",
    ],
    note: "Разчистване до голо, с извозване",
    icon: "pochistvane" as const,
  },
  {
    title: "Транспортни услуги",
    href: "/bus-pod-naem/",
    lines: [
      "Бус + шофьор — от 60 € на курс (+ 10 € престой)",
      "Почасово в София: мини ван 30 €/ч · микробус 40 €/ч",
      "Извън София: 0,40 / 0,50 / 0,60 €/км в двете посоки",
    ],
    note: "Бус с шофьор — София, страната, чужбина",
    icon: "transport" as const,
  },
];

/** Услугови пакети, показани в #ceni (водещият слой; редът е търговски). */
const PILLAR_PACKAGE_SLUGS = [
  "premestvane-na-ofisi",
  "premestvane-na-piano",
  "prevoz-na-divan",
  "premestvane-na-hladilnik",
  "premestvane-na-bagaj",
  "bus-pod-naem",
  "pochistvane-na-mazeta-sofia",
  "izhvurlyane-na-stari-mebeli",
] as const;

/** Фактори, от които зависи крайната цена (инфографика). */
const PRICE_FACTORS = [
  {
    n: "01",
    t: "Обем и вид на багажа",
    d: "Гарсониера, тристаен или цял офис — обемът определя броя хамали и превозното средство.",
  },
  {
    n: "02",
    t: "Етаж и достъп",
    d: "Асансьор, тесни стълбища, паркиране пред входа — уточняваме ги предварително, не на място.",
  },
  {
    n: "03",
    t: "Разстояние",
    d: "В София важи часовата ставка. Извън града транспортът се смята на километър в двете посоки.",
  },
  {
    n: "04",
    t: "Допълнителни услуги",
    d: "Опаковане, демонтаж и монтаж на мебели, кашони — казваме цената им заедно с офертата.",
  },
];

/** Примерни сметки по официалните тарифи (пренесени от бившата /ceni/). */
const PRICE_EXAMPLES = [
  {
    t: "Гарсониера",
    calc: "2 хамали × 2 ч (50 €) + мини ван × 2 ч (60 €)",
    total: "110–160 €",
  },
  {
    t: "Двустаен апартамент",
    calc: "2 хамали × 3 ч (75 €) + микробус 14 м³ × 3 ч (120 €)",
    total: "195–300 €",
  },
  {
    t: "Тристаен или къща",
    calc: "3 хамали × 4 ч (150 €) + камион 20 м³, 2 курса (140 €)",
    total: "290 €",
  },
];

/** Превозни средства — визуално сравнение (инфографика). */
const VEHICLES = [
  {
    name: "Мини ван",
    capacity: 2,
    price: "30 €/ч",
    fit: "Багаж, гарсониера, единични мебели",
  },
  {
    name: "Микробус",
    capacity: 14,
    price: "40 €/ч",
    fit: "Двустаен / тристаен апартамент, малък офис",
  },
  {
    name: "Камион",
    capacity: 20,
    price: "60 €/курс",
    fit: "Голямо жилище, къща, цял офис или склад",
  },
];

/** Квартали на София — текстово покритие (не отделни страници). */
const QUARTERS = [
  "Люлин",
  "Младост",
  "Обеля",
  "Лозенец",
  "Център",
  "Дружба",
  "Надежда",
  "Красно село",
  "Красна поляна",
  "Витоша",
  "Бояна",
  "Драгалевци",
  "Хаджи Димитър",
  "Подуяне",
  "Левски",
  "Слатина",
  "Гео Милев",
  "Изток",
  "Изгрев",
  "Оборище",
  "Банишора",
  "Сердика",
  "Овча купел",
  "Студентски град",
  "Дианабад",
  "Стрелбище",
  "Гоце Делчев",
  "Люлин Център",
];

/**
 * Междуградски направления — ориентировъчният транспорт е сметнат по
 * официалната тарифа на километър (0,50 €/км микробус / 0,60 €/км камион,
 * в двете посоки) върху приблизителното шосейно разстояние.
 */
const INTERCITY_ROUTES = [
  { route: "София – Перник", km: 30 },
  { route: "София – Враца", km: 115 },
  { route: "София – Пловдив", km: 145 },
  { route: "София – Плевен", km: 170 },
  { route: "София – Стара Загора", km: 230 },
  { route: "София – Русе", km: 300 },
  { route: "София – Сливен", km: 300 },
  { route: "София – Бургас", km: 385 },
  { route: "София – Варна", km: 470 },
];

/** Кратки описания на всяка услуга за пилар каталога (по групи от nav.ts). */
const SERVICE_BLURBS: Record<string, string> = {
  "/premestvane-na-doma/": "Цялостно преместване на дома — от фолирането до подреждането.",
  "/premestvane-na-apartament/": "Апартаменти на всякакъв етаж, със или без асансьор.",
  "/premestvane-na-kashti/": "Къщи и по-големи домакинства, с комбинирани екипи и коли.",
  "/premestvane-na-ofisi/": "Офиси и институции — вечер и в събота, без да спира работата ви.",
  "/premestvane-na-bagaj/": "Багаж и отделни вещи — бързо и без риск за съдържанието.",
  "/premestvane-na-mebeli/": "Отделни мебели с фолиране и внимателно пренасяне.",
  "/prevoz-na-divan/": "Диван или мека мебел — с подходящия бус, не с камион.",
  "/premestvane-na-hladilnik/": "Хладилници и бяла техника — с колани и колесар.",
  "/premestvane-na-piano/": "Пиана и рояли — със специализирана екипировка и опит.",
  "/kashoni/": "Кашони и опаковъчни материали, доставени преди деня Х.",
  "/karti-chisti-izvozva/": "Къртене, почистване и извозване до депо — с един екип.",
  "/kurtene-na-banya/": "Плочки, замазка и санитария — банята готова за ремонт.",
  "/kartene-na-beton-sofiya/": "Бетонни елементи, замазки и основи — с професионални къртачи.",
  "/kartene-na-steni/": "Тухлени и панелни стени — след проверка дали са носещи.",
  "/izvozvane-na-stroitelni-otpadatsi-sofiya/": "Товарене и извозване само до лицензирани депа.",
  "/izhvurlyane-na-stari-mebeli/": "Изнасяне и извозване на стари мебели — и без асансьор.",
  "/pochistvane-na-mazeta-sofia/": "Мазета, разчистени до голо, с извозване на всичко.",
  "/pochistvane-na-tavani-sofia/": "Тавански помещения — изнасяне, товарене, чисто предаване.",
  "/bus-pod-naem/": "Бус с шофьор на час — когато ви трябва само транспорт.",
  "/mezhdunarodno-premestvane/": "Преместване от и до чужбина — организирано и застраховано.",
  "/transport-ot-gartsiya-do-balgariya/": "Редовни курсове Гърция – България, вкл. островите.",
  "/transport-ot-rumaniya-do-balgariya/": "Транспорт Румъния – България, в двете посоки.",
};

/** Детайлни ЧЗВ — лонгтейл покритие. Само проверими факти от сайта. */
const PILLAR_FAQ = [
  {
    q: "Колко струват хамалските услуги в София?",
    a: "Преместване на дом е ориентировъчно от 110 € (гарсониера), двустаен 195–300 €, тристаен или къща 290 €. Отделните услуги имат свои пакетни цени — превоз на диван от 120 €, хладилник от 100 €, пиано от 150 €, офис от 250 €. Ако предпочитате, работим и на часова тарифа: хамалин 12,50 €/ч, мини ван 30 €/ч, микробус 40 €/ч, камион 60 €/курс. Крайната цена зависи от обема — изготвяме индивидуална оферта след безплатна консултация.",
  },
  {
    q: "Колко струват хамалските услуги извън София?",
    a: "Извън София хамалинът е 15 €/ч, а превозните средства се таксуват на километър в двете посоки: мини ван 0,40 €/км, микробус 0,50 €/км, камион 0,60 €/км. Изчисляваме курса предварително, за да знаете точната цена, преди да потеглим.",
  },
  {
    q: "Защо не давате фиксирана цена по телефона?",
    a: "Защото цената зависи от реалния обем работа — етаж, асансьор, разстояние, брой вещи. Ако кажем число, без да знаем тези неща, или подценяваме нарочно, или ви изненадваме после с доплащания. Затова питаме за детайлите първо, за да получите реална оферта, а не примамка.",
  },
  {
    q: "Има ли минимален брой часове?",
    a: "За малки задачи се разбираме индивидуално — обадете се на 0894 766 424 и ще получите точна цена за вашия случай, без ангажимент.",
  },
  {
    q: "Какво включва цената на час за хамалин?",
    a: "Пренасяне, качване и сваляне по стълби или с асансьор, внимателна работа с вещите и подреждане в превозното средство. Фолирането на мебелите е безплатно. Кашоните и опаковъчните материали се договарят отделно.",
  },
  {
    q: "Мога ли да получа фиксирана оферта предварително?",
    a: "Да — след безплатен оглед или подробно описание със снимки получавате конкретна оферта, преди да започнем. Офертата вече включва това, което знаем за задачата ви, затова е близка до крайната сметка.",
  },
  {
    q: "Кое превозно средство ми трябва?",
    a: "Гарсониера или багаж — мини ван (2 м³). Двустаен до тристаен — микробус (14 м³). Голямо жилище или офис — камион (20 м³). Ако не сте сигурни, ще преценим заедно по телефона.",
  },
  {
    q: "Колко дни предварително трябва да направя заявка?",
    a: "Препоръчваме да се свържете с нас около една седмица преди желаната дата, за да ви включим в графика. При спешни случаи се обадете директно на 0894 766 424 — ще направим всичко възможно да реагираме бързо.",
  },
  {
    q: "Работите ли в неделя?",
    a: "Работим понеделник–събота, от 08:00 до 18:00 ч. Неделя е почивен ден за екипа. Съботата е включена именно защото повечето клиенти местят в почивните дни.",
  },
  {
    q: "Във всички квартали на София ли работите?",
    a: "Да — Люлин, Младост, Обеля, Лозенец, Център, Дружба, Надежда и всички останали. Цената не зависи от квартала: ставките са едни и същи, разликата идва само от обема работа, етажа и достъпа.",
  },
  {
    q: "Правите ли междуградски премествания?",
    a: "Да, ежеседмично пътуваме по направления като София–Пловдив, София–Варна, София–Бургас, София–Русе и всички останали градове. Транспортът се смята на километър в двете посоки, а хамалската работа е 15 €/ч — получавате точната сума преди да потеглим.",
  },
  {
    q: "Извършвате ли международни хамалски услуги?",
    a: "Да — най-често по маршрутите Гърция–България и Румъния–България, включително гръцките острови. Поемаме и други европейски дестинации след уточняване по телефона. За международен курс се обадете поне 1–2 седмици предварително.",
  },
  {
    q: "Предлагате ли разглобяване и сглобяване на мебели?",
    a: "Да, екипът ни има дългогодишен опит в демонтажа и монтажа на мебели. Единствено ни предупредете предварително, за да подготвим необходимите инструменти.",
  },
  {
    q: "Какво става при повреда по време на преместването?",
    a: "Ако по наша вина се стигне до щета по вещите ви, поемаме изцяло отговорност. Работим с прецизност, а фолирането на мебелите е задължителна и безплатна част от всяка услуга.",
  },
  {
    q: "Обезопасявате ли мебелите преди преместване?",
    a: "Да, фолирането е първата стъпка на всяка наша задача и е напълно безплатно. Използваме стреч фолио, аеропласт и кашони, за да опазим мебелите ви от надраскване и удари по време на пренасянето.",
  },
  {
    q: "Местите ли пиано, сейф или други тежки вещи?",
    a: "Да. Пианата местим с колани и рампа, сейфовете — с количка с подходяща товароносимост, а стъклото и аквариумите опаковаме отделно от останалия багаж. Кажете ни за специфичната вещ при първия разговор, за да дойдем с точните инструменти.",
  },
  {
    q: "Издавате ли фактура? Работите ли с фирми?",
    a: "Да — „Хамалчо“ ЕООД издава фактура за всяка услуга. Работим с малки фирми, счетоводни кантори, складове и институции, а за редовни корпоративни курсове уговаряме индивидуални условия и постоянен екип.",
  },
  {
    q: "Как мога да намаля крайната цена?",
    a: "Опаковайте дребния багаж предварително, освободете достъпа до мебелите и ни дайте точна информация за етажа и асансьора — така екипът работи по-бързо, а вие плащате по-малко часове. Заявките през сайта ползват и 10% отстъпка от крайната цена.",
  },
  {
    q: "Мога ли да наема само бус, без хамали?",
    a: "Да — бус под наем с шофьор е от 60 € на курс (+ 10 € престой). За кратки задачи в рамките на София работим и почасово — мини ван от 30 €/ч. Шофьорът кара и помага при товаренето, а ако по средата решите, че ви трябват още ръце, изпращаме хамали допълнително.",
  },
  {
    q: "Какво се случва след първия разговор с вас?",
    a: "Ако обемът е ясен от разговора или от снимки, изготвяме оферта директно. При по-голям обем идваме на безплатен оглед на място, за да преценим точно колко хора и коя кола ще ни трябват. После уговаряме дата и час — и идваме навреме.",
  },
];

/** Галерия — реални снимки от обекти (същите активи като досега). */
const GALLERY = [
  {
    src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.08.webp",
    alt: "Хамали местят офис шкаф на количка — хамалски услуги",
  },
  {
    src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.05.webp",
    alt: "Стек от опаковани кашони, готови за преместване",
  },
  {
    src: "/wp-content/uploads/elementor/thumbs/%D0%BF%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%B6%D0%BA%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8-3-rmc37cv9ysbdi7f29qpb05w3wbbvw7ohx00nqvgamc.jpg",
    alt: "Опаковане на голяма мебел със стреч фолио преди пренасяне",
  },
  {
    src: "/wp-content/uploads/elementor/thumbs/%D0%BF%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%B6%D0%BA%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8-7-1-rmc372j1vlx7yhu2y48eqqi1d2qujjjg7kubgtvmis.webp",
    alt: "Хамали повдигат тежка техника с транспортни ремъци",
  },
  {
    src: "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.01.webp",
    alt: "Разтоварване на едрогабаритна техника с колесар",
  },
  {
    src: "/wp-content/uploads/elementor/thumbs/%D0%91%D1%83%D1%81-%D0%BF%D0%BE%D0%B4-%D0%BD%D0%B0%D0%B5%D0%BC.05-rmfygbslozld4zbpfg6cw4wgm6ge2ya77md86ewot4.webp",
    alt: "Бус с отворен товарен отсек и спусната рампа",
  },
  {
    src: "/wp-content/uploads/elementor/thumbs/%D0%91%D1%83%D1%81-%D0%BF%D0%BE%D0%B4-%D0%BD%D0%B0%D0%B5%D0%BC.01-rmfyal0ew4pt51kober0zkr8auly606m1htm9bx964.webp",
    alt: "Бус на Хамали Ненчовски, готов за товарене",
  },
  {
    src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.17.webp",
    alt: "Хамалин товари кашони в бус на Ненчовски на улица в София",
  },
];

/* ------------------------------------------------------------------ */
/* Страницата                                                          */
/* ------------------------------------------------------------------ */

export default function HamalskiUslugiPage() {
  const relatedArticles = getBlogArticles()
    .filter((a) =>
      [
        "kak-da-izberete-firma-za-hamalski-uslugi",
        "kolko-struvat-hamalskite-uslugi-v-sofia",
        "hamal-proizhod-na-dumata",
      ].includes(a.slug)
    )
    .map((a) => ({
      urlPath: a.urlPath,
      title: a.h1,
      cover: a.cover,
      coverAlt: a.coverAlt,
    }));

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Хамалски услуги",
          url: URL_PATH,
          description: metadata.description as string,
          pkg: MOVING_PACKAGES,
        })}
      />
      <JsonLd data={offerCatalogSchema()} />
      <CeniViewTracker />

      <Hero
        title="Хамалски услуги в София и цялата страна"
        subtitle="Преместване, кърти-чисти-извозва, почистване и транспорт от Хамали Ненчовски — 18 години опит (от 2008 г.). Преместване на дом от 110 €, ясни пакетни цени, без скрити такси, оферта до 1 час в работно време."
        image={{
          src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D1%81%D0%BA%D0%B8-%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8.02.webp",
          alt: "Хамали Ненчовски товарят мебели — хамалски услуги София",
        }}
        badges={[
          "От 2008 г. — 18 години опит",
          "4,9★ в Google (35 ревюта)",
          "Работим понеделник–събота",
          "10% отстъпка за онлайн заявка",
        ]}
        breadcrumbsSlot={
          <Breadcrumbs
            dark
            items={[{ name: "Хамалски услуги", url: URL_PATH }]}
          />
        }
      />

      {/* Бърза навигация по секции */}
      {/* top = височината на sticky header-а: 68px мобилно, 116px desktop (36px помощна лента + 80px основен ред) */}
      <nav
        aria-label="Съдържание на страницата"
        className="sticky top-[68px] z-30 border-b border-black/5 bg-paper/95 backdrop-blur lg:top-[116px]"
      >
        <div className="mx-auto max-w-[1140px] overflow-x-auto px-4">
          <ul className="flex items-center gap-1 whitespace-nowrap py-2 font-sans text-sm">
            {ANCHORS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="inline-block rounded-full px-3.5 py-1.5 font-medium text-secondary transition-colors hover:bg-soft hover:text-primary"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ================= ЦЕНИ (#ceni) — водещата секция ================= */}
      <section id="ceni" aria-labelledby="ceni-h" className="scroll-mt-44 bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="ceni-h" data-reveal className="text-2xl md:text-3xl">
            Хамалски услуги София — цени 2026
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <p data-reveal className="mt-5 max-w-3xl text-[17px] leading-relaxed">
            Ясни пакетни цени по услуга — за да знаете рамката, преди да се
            обадите. Цените са едни и същи за всеки клиент: не различаваме
            тарифа според това дали местите апартамент под наем или собствен
            дом, нито дали сте домакинство или фирма. Разликата в крайната
            сметка идва единствено от обема работа. Актуални към юли 2026 г. —
            без скрити такси.
          </p>

          {/* Водещ слой: пакетни цени */}
          <div className="mt-8" data-reveal>
            <PackagePricing pkg={MOVING_PACKAGES} />
          </div>

          <div data-reveal-stagger className="mt-5 grid gap-5 md:grid-cols-2">
            {PILLAR_PACKAGE_SLUGS.map((slug) => (
              <div key={slug} data-reveal>
                <PackagePricing pkg={SERVICE_PACKAGES[slug]} />
              </div>
            ))}
          </div>

          {/* Кърти, чисти, извозва — комплексни пакети (файл D) */}
          <h3 className="mt-12 font-sans text-xl font-bold">
            Кърти, чисти, извозва — цени по вид
          </h3>
          <p data-reveal className="mt-3 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Отделна услуга с отделно ценообразуване — по кубик/квадрат за
            къртене, по контейнер за извозване и комплексни all-in пакети.{" "}
            <Link
              href="/karti-chisti-izvozva/"
              className="text-primary underline underline-offset-2"
            >
              Виж пълния ценоразпис
            </Link>
            .
          </p>
          <div data-reveal-stagger className="mt-6 grid gap-5 md:grid-cols-2">
            {DEMOLITION_GROUPS.filter((g) => g.id === "kompleksni" || g.id === "izvozvane").map(
              (g) => (
                <div key={g.id} data-reveal>
                  <PackagePricing pkg={g} />
                </div>
              ),
            )}
          </div>

          {/* Вторичен слой: детайлна часова тарифа + калкулатор (прозрачност) */}
          <h3 className="mt-14 font-sans text-xl font-bold">
            Детайлна часова тарифа (хамалин и транспорт)
          </h3>
          <p data-reveal className="mt-3 max-w-3xl text-[15px] leading-relaxed text-secondary">
            За прозрачност — така се калкулират пакетите по-горе. Ставка на
            хамалин и превозно средство, в София и извън града.
          </p>
          <div className="mt-6" data-reveal>
            <RateCardDetails open />
          </div>

          {/* Пера по категории услуги */}
          <h3 className="mt-12 font-sans text-xl font-bold">
            Какво струват отделните видове услуги
          </h3>
          <div data-reveal-stagger className="mt-6 grid gap-5 md:grid-cols-2">
            {PRICE_CATEGORIES.map((c) => (
              <div
                key={c.title}
                data-reveal
                className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-sans text-lg font-bold">
                    <Link href={c.href} className="transition-colors hover:text-primary">
                      {c.title}
                    </Link>
                  </h4>
                  <CategoryGlyph id={c.icon} className="h-8 w-8 shrink-0 text-primary" />
                </div>
                <p className="mt-1 font-sans text-[13px] font-medium uppercase tracking-wide text-secondary/70">
                  {c.note}
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-[15px] leading-relaxed text-secondary">
                  {c.lines.map((l) => (
                    <li key={l} className="flex gap-2.5">
                      <CheckGlyph className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={c.href}
                  className="mt-5 inline-flex items-center gap-1 font-sans text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Виж услугата
                  <ArrowGlyph className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* Инфографика: как се формира цената */}
          <h3 className="mt-14 font-sans text-xl font-bold">
            Как се формира крайната цена
          </h3>
          <FactorGrid factors={PRICE_FACTORS} />

          {/* Примерни сметки */}
          <h3 className="mt-14 font-sans text-xl font-bold">
            Колко струва на практика — три примера
          </h3>
          <div data-reveal-stagger className="mt-6 grid gap-4 md:grid-cols-3">
            {PRICE_EXAMPLES.map((e) => (
              <div
                key={e.t}
                data-reveal
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-card"
              >
                <h4 className="font-sans font-semibold">{e.t}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary">
                  {e.calc}
                </p>
                <p className="mt-3 font-sans text-2xl font-bold text-primary">
                  {e.total}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm text-secondary">
            Часовете зависят от етажа, асансьора и колко е опакован багажът —
            затова примерите са ориентир, а офертата ви е конкретна. Точната
            цена се потвърждава при безплатен оглед или по телефона.
          </p>

          {/* Инфографика: кое превозно средство */}
          <h3 className="mt-14 font-sans text-xl font-bold">
            Кое превозно средство да изберете
          </h3>
          <div data-reveal-stagger className="mt-6 space-y-4">
            {VEHICLES.map((v) => (
              <div
                key={v.name}
                data-reveal
                className="grid items-center gap-x-6 gap-y-2 rounded-2xl border border-black/10 bg-white p-5 shadow-card sm:grid-cols-[150px_1fr_auto]"
              >
                <div>
                  <p className="font-sans font-bold">{v.name}</p>
                  <p className="font-sans text-sm text-secondary">{v.capacity} м³</p>
                </div>
                <div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-soft">
                    <div
                      className="h-full rounded-full bg-red-gradient"
                      style={{ width: `${Math.max(10, (v.capacity / 20) * 100)}%` }}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm text-secondary">{v.fit}</p>
                </div>
                <p className="font-sans text-xl font-bold text-primary sm:text-right">
                  {v.price}
                </p>
              </div>
            ))}
          </div>

          {/* Без скрити такси + отстъпка */}
          <div className="mt-14 grid gap-5 md:grid-cols-[1fr_340px]">
            <ChecklistCard
              title="Без скрити такси"
              items={[
                <>
                  <strong className="text-ink">Фолирането на мебелите е безплатно</strong>{" "}
                  — част е от услугата, не допълнителен ред във фактурата.
                </>,
                <>
                  <strong className="text-ink">Етаж, асансьор и паркиране уточняваме предварително</strong>{" "}
                  — преди екипът да тръгне, не на място пред входа.
                </>,
                <>
                  <strong className="text-ink">Ако нещо се промени в деня</strong> — например
                  асансьорът не работи — казваме го веднага и коригираме цената
                  прозрачно, преди да продължим.
                </>,
                <>
                  <strong className="text-ink">Кашоните и опаковъчните материали</strong> се
                  договарят отделно — казваме цената им заедно с офертата.
                </>,
              ]}
            />
            <div
              data-reveal
              className="flex flex-col justify-center rounded-2xl bg-red-gradient p-6 text-white shadow-premium"
            >
              <p className="font-sans text-4xl font-bold">−10%</p>
              <p className="mt-2 font-sans text-lg font-semibold leading-snug">
                отстъпка от крайната цена за заявки през сайта
              </p>
              <p className="mt-2 text-sm text-white/85">
                Малък бонус за това, че сте намерили пътя до нас онлайн, а не по
                препоръка.
              </p>
              <Link
                href="/porachai/"
                className="mt-5 inline-flex w-fit items-center rounded-lg bg-white px-5 py-2.5 font-sans font-bold text-primary transition-transform hover:-translate-y-0.5"
              >
                Поискай оферта
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AuthorityStrip variant="corporate" />

      {/* ================= КАТАЛОГ НА ВСИЧКИ УСЛУГИ (#uslugi) ================= */}
      <section id="uslugi" aria-labelledby="uslugi-h" className="scroll-mt-44 bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="uslugi-h" data-reveal className="text-2xl md:text-3xl">
            Всички видове хамалски услуги
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <p data-reveal className="mt-5 max-w-3xl text-[17px] leading-relaxed">
            „Хамалски услуги“ при нас не значи само носене на кашони. Под един
            покрив събираме четири групи услуги — преместване, кърти-чисти-извозва,
            почистване и транспорт — с общ екип, общи коли и една обща логика:
            уточняваме детайлите предварително и си вършим работата докрай.
            Изберете конкретната услуга, за да видите как протича и какво включва.
          </p>

          <div className="mt-10 space-y-10">
            {NAV_GROUPS.map((group) => (
              <div key={group.id} data-reveal>
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-black/10 pb-3">
                  <h3 className="font-sans text-xl font-bold">
                    <Link href={group.href} className="transition-colors hover:text-primary">
                      {group.label}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-secondary">{group.tagline}</p>
                </div>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items
                    .filter((item) => item.href !== URL_PATH)
                    .map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group/svc block rounded-xl border border-black/5 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-premium"
                        >
                          <span className="flex items-center justify-between gap-2 font-sans font-semibold text-ink transition-colors group-hover/svc:text-primary">
                            {item.label}
                            <ArrowGlyph className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover/svc:translate-x-0.5 group-hover/svc:opacity-100" />
                          </span>
                          {SERVICE_BLURBS[item.href] ? (
                            <span className="mt-1 block text-sm leading-snug text-secondary">
                              {SERVICE_BLURBS[item.href]}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Транспортни и хамалски услуги ================= */}
      <section aria-labelledby="transport-h" className="bg-paper">
        <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <h2 id="transport-h" data-reveal className="text-2xl md:text-3xl">
              Транспортни и хамалски услуги под един покрив
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
            <div className="prose-nen mt-5">
              <p>
                Не е нужно да търсите превозвач отделно от хамалите. Разполагаме
                с три коли и избираме подходящата според обема на работата —
                мини ван за няколко кашона, микробус за двустаен, камион за цял
                дом или офис.
              </p>
              <p>
                За по-големи задачи — цял офис, склад, преместване на институция
                — комбинираме коли и екипи, за да приключим за един ден вместо
                за два-три курса. При такива случаи по-евтино и по-бързо е да
                пратим две коли едновременно, отколкото една кола да обикаля
                напред-назад целия ден.
              </p>
              <p>
                Ако ви трябва само превоз, без носене —{" "}
                <Link href="/bus-pod-naem/">бус под наем с шофьор</Link> от 60 €
                на курс решава въпроса.
              </p>
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
            <Image
              src="/wp-content/uploads/elementor/thumbs/%D0%91%D1%83%D1%81-%D0%BF%D0%BE%D0%B4-%D0%BD%D0%B0%D0%B5%D0%BC.01-rmfyal0ew4pt51kober0zkr8auly606m1htm9bx964.webp"
              alt="Бус на Хамали Ненчовски, готов за товарене — транспортни и хамалски услуги"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= Евтини хамалски услуги ================= */}
      <section aria-labelledby="evtini-h" className="bg-carbon">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="evtini-h" data-reveal className="text-2xl text-white md:text-3xl">
            Евтини хамалски услуги или коректна крайна цена?
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-[16px] leading-relaxed text-white/80">
              <p>
                Всеки ден получавам обаждания, които започват с „колко ще ми
                вземете“ — преди да съм чул адреса, етажа или какво точно
                местим. Разбирам защо. Търсенето на евтини хамали в София е
                нормално, парите не идват от дървото. Но ще ви кажа нещо, което
                съм видял десетки пъти за 18 години:{" "}
                <strong className="text-white">
                  най-ниската цена, чута по телефона, рядко е най-ниската цена,
                  платена накрая.
                </strong>
              </p>
              <p>
                Ето как обикновено се случва. Обаждате се на трима хамали.
                Единият казва число по-ниско от другите двама, защото знае, че
                точно така печели обаждането. На място обаче излизат
                „доплащания“ — за етажа без асансьор, за фолирането, за
                чакането, докато опаковате багажа. Крайната сметка става
                по-висока от офертата на този, който отначало е бил честен с
                вас.
              </p>
            </div>
            <div className="space-y-4 text-[16px] leading-relaxed text-white/80">
              <p>
                Не е измислица. Клиент ни звъни за преместване на двустаен —
                друга фирма му казала число по телефона и той приел. Вечерта се
                обажда пак: на място му поискали доплащане за етажа, за
                фолирането на дивана и за часа чакане. Крайната сметка излязла
                почти двойно по-висока от офертата, която му бяхме дали ние
                същия следобед — само защото първо бяхме попитали за етажа.
              </p>
              <p>
                Ние правим обратното. Питаме за детайлите, преди да кажем число.
                Ставката е ясна —{" "}
                <strong className="text-white">12,50 €/ч за хамалин в София</strong> —
                не „гарантирана крайна цена“, която после се разпада на добавки.
                Затова офертата, която чувате от нас, е близка до крайната
                сметка.
              </p>
              <p className="rounded-xl border border-line bg-carbon-2 p-4 font-sans text-[15px] text-white/90">
                Евтината хамалска услуга е тази, при която платеното накрая
                съвпада с обещаното в началото. Точно това продаваме.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Квартали (#kvartali) ================= */}
      <section id="kvartali" aria-labelledby="kvartali-h" className="scroll-mt-44 bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="kvartali-h" data-reveal className="text-2xl md:text-3xl">
            Хамалски услуги по квартали в София
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="prose-nen mt-5 max-w-3xl">
            <p>
              Офисът ни е на ул. Резбарска 9А в кв. Хаджи Димитър, но екипите
              работят на терен из целия град — от Люлин и Обеля на запад до
              Младост и Дружба на изток, от Надежда на север до Лозенец, Витоша
              и Бояна на юг. Няма квартал в София, в който да не сме местили.
            </p>
            <p>
              Кварталът не променя цената — ставките са едни и същи навсякъде в
              София. Той обаче променя <em>организацията</em>, и точно затова
              питаме за адреса още в първия разговор. В Центъра и Оборище
              планираме паркирането и часовия прозорец предварително. В
              панелните комплекси — Люлин, Младост, Обеля, Дружба — ключът е
              асансьорът: работи ли, колко е голям, минава ли диванът през
              вратата му. В кварталите с къщи — Бояна, Драгалевци, Витоша —
              смятаме стълбите и дългите алеи от портата до входа.
            </p>
          </div>
          <ul data-reveal-stagger className="mt-7 flex flex-wrap gap-2.5 font-sans text-sm">
            {QUARTERS.map((q) => (
              <li
                key={q}
                data-reveal
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-soft px-3.5 py-1.5 font-medium text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                <PinGlyph className="h-3 w-3" />
                {q}
              </li>
            ))}
            <li className="inline-flex items-center rounded-full border border-dashed border-black/20 px-3.5 py-1.5 font-medium text-secondary/70">
              + всички останали квартали
            </li>
          </ul>
        </div>
      </section>

      {/* ================= Междуградски (#mezhdugradski) ================= */}
      <section
        id="mezhdugradski"
        aria-labelledby="mezhdugradski-h"
        className="scroll-mt-44 bg-soft"
      >
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="mezhdugradski-h" data-reveal className="text-2xl md:text-3xl">
            Междуградски хамалски услуги
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="prose-nen mt-5 max-w-3xl">
            <p>
              Приемаме поръчки от и до всяка точка на страната — най-често по
              направленията Пловдив–София, Варна–София, Бургас–София,
              Русе–София, Плевен–София, Стара Загора–София, Сливен–София,
              Враца–София и Перник–София. Работи се в двете посоки: местим и от
              София към провинцията, и обратно.
            </p>
            <p>
              Сметката е проста и я знаете предварително: транспортът се таксува
              на километър в двете посоки (0,40 €/км мини ван, 0,50 €/км
              микробус, 0,60 €/км камион), а хамалската работа извън София е 15
              €/ч. Изчисляваме курса преди да потеглим — никакви изненади при
              разтоварването.
            </p>
          </div>

          <div data-reveal className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-card">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-soft text-left font-sans">
                  <th className="px-4 py-3 font-semibold">Направление</th>
                  <th className="px-4 py-3 font-semibold">≈ км (посока)</th>
                  <th className="px-4 py-3 font-semibold">Микробус 14 м³</th>
                  <th className="px-4 py-3 font-semibold">Камион 20 м³</th>
                </tr>
              </thead>
              <tbody className="[&_td]:px-4 [&_td]:py-3 [&_tr]:border-t [&_tr]:border-black/5">
                {INTERCITY_ROUTES.map((r) => (
                  <tr key={r.route}>
                    <td className="font-sans font-medium">{r.route}</td>
                    <td>≈ {r.km} км</td>
                    <td className="whitespace-nowrap">
                      <strong className="text-primary">≈ {r.km} €</strong>
                    </td>
                    <td className="whitespace-nowrap">≈ {Math.round(r.km * 1.2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-secondary">
            Ориентировъчен транспорт по официалната ни тарифа на километър в
            двете посоки, върху приблизително шосейно разстояние. Работата на
            хамалите (15 €/ч извън София) се добавя според обема. Точната цена
            получавате преди курса — по реалния маршрут.
          </p>
        </div>
      </section>

      {/* ================= Международни (#mezhdunarodni) ================= */}
      <section
        id="mezhdunarodni"
        aria-labelledby="mezhdunarodni-h"
        className="scroll-mt-44 bg-paper"
      >
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="mezhdunarodni-h" data-reveal className="text-2xl md:text-3xl">
            Международни хамалски услуги
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="prose-nen">
              <p>
                Извършваме международни премествания от години — със собствени
                бусове и камиони, застраховка и екип, който пътува по едни и
                същи маршрути целогодишно. Поемаме целия процес: опаковане и
                фолиране, товарене, транспорт, разтоварване и качване до
                жилището на крайния адрес.
              </p>
              <p>
                Най-често изпълняваните ни направления са{" "}
                <Link href="/transport-ot-gartsiya-do-balgariya/">
                  Гърция – България
                </Link>{" "}
                (включително континентална Гърция и населените острови) и{" "}
                <Link href="/transport-ot-rumaniya-do-balgariya/">
                  Румъния – България
                </Link>{" "}
                — и в двете посоки. Приемаме запитвания и за други дестинации —
                Сърбия, Северна Македония, Турция и останалата част от Европа —
                след уточняване на маршрута по телефона.
              </p>
              <p>
                Цената се изготвя индивидуално според дестинацията, обема и броя
                хамали. За международен курс се обадете поне 1–2 седмици
                предварително — маршрутът, транспортът и екипът се планират.
                Вижте и цялостната услуга{" "}
                <Link href="/mezhdunarodno-premestvane/">
                  международно преместване
                </Link>
                .
              </p>
            </div>
            <div data-reveal className="space-y-3">
              {[
                { route: "Гърция ⇄ България", note: "редовни курсове, вкл. островите", href: "/transport-ot-gartsiya-do-balgariya/" },
                { route: "Румъния ⇄ България", note: "редовни курсове, в двете посоки", href: "/transport-ot-rumaniya-do-balgariya/" },
                { route: "Сърбия · Сев. Македония · Турция", note: "по индивидуална заявка", href: "/mezhdunarodno-premestvane/" },
                { route: "Останалата част от Европа", note: "след уточняване по телефона", href: "/mezhdunarodno-premestvane/" },
              ].map((r) => (
                <Link
                  key={r.route}
                  href={r.href}
                  className="group/int flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-premium"
                >
                  <span>
                    <span className="block font-sans font-semibold transition-colors group-hover/int:text-primary">
                      {r.route}
                    </span>
                    <span className="block text-sm text-secondary">{r.note}</span>
                  </span>
                  <ArrowGlyph className="h-4 w-4 shrink-0 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Тежки и специфични вещи ================= */}
      <section aria-labelledby="tezhki-h" className="bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="tezhki-h" data-reveal className="text-2xl md:text-3xl">
            Тежки и специфични вещи
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="prose-nen mt-5 max-w-3xl">
            <p>
              Пиано, сейф, стъклена витрина, аквариум с риби, барел с вино — не
              са рядкост в нашата работа, макар да звучат необичайно за
              „хамалска услуга“. Всяка от тези вещи изисква различен подход и
              различни инструменти, не просто повече хора.
            </p>
            <p>
              <Link href="/premestvane-na-piano/">Пианата</Link> местим с колани
              и рампа, никога само на ръка по стълбите. Сейфовете преценяваме по
              тегло — понякога трябва количка с по-голяма товароносимост, а не
              повече хора да бутат. Стъклото и аквариумите опаковаме отделно от
              останалия багаж, за да не поемат удар от друга мебел по пътя.
            </p>
            <p>
              Ако имате нещо специфично за преместване, кажете ни го при първия
              разговор — така идваме с точните инструменти, а не импровизираме
              на място. Именно тук личи разликата между хамалин с опит и случаен
              работник за деня.
            </p>
          </div>
        </div>
      </section>

      <StepsHowWeWork />

      {/* ================= E-E-A-T: кой стои зад услугата ================= */}
      <section aria-labelledby="za-nas-h" className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h2 id="za-nas-h" data-reveal className="text-2xl md:text-3xl">
            Кой стои зад Хамали Ненчовски
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <div className="mt-5 grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12">
            <figure data-reveal className="mx-auto max-w-[300px] lg:sticky lg:top-24">
              <Image
                src="/brand/team/biz-portrait-georgi-nenchovski.webp"
                alt="Георги Ненчовски — основател и управител на Хамали Ненчовски"
                width={300}
                height={375}
                sizes="(max-width: 1024px) 300px, 300px"
                className="w-full rounded-2xl border border-black/10 object-cover shadow-premium"
              />
              <figcaption className="mt-3 text-center font-sans text-sm text-secondary">
                Георги Ненчовски — основател и управител
              </figcaption>
            </figure>
            <div className="prose-nen max-w-3xl">
            <p>
              Аз съм Георги Ненчовски. От 2008 година вдигам мебели, кашони и
              всякакъв багаж из София — първо сам, с един стар бус и колкото
              сила имах, после с все по-голям екип. 18 години по-късно с жена ми
              Силвия управляваме заедно „Хамалчо“ ЕООД. Не сме кол-център, който
              препраща обаждания към някой подизпълнител, нито франчайз с чужд
              номер отгоре. Вдигате телефона — говорите с мен.
            </p>
            <p>
              Днес имаме 35 реални ревюта в Google с оценка 4,9 звезди — не
              купени, а от хора, на които сме местили дома или офиса. Сред
              клиентите ни има домакинства и малки фирми, но и институции като
              НОИ и банки, които не биха работили с нас втора и трета поредна
              година, ако първия път не бяхме си свършили работата както трябва.
            </p>
            <p>
              Работим понеделник–събота, от 08:00 до 18:00 ч. — включително в
              събота, защото графикът на клиента, не нашият, определя кога е
              удобно за преместване. Прочетете повече{" "}
              <Link href="/za-nas/">за нас</Link> или вижте{" "}
              <Link href="/preporachai-hamali-nenhcovski/">
                референциите от институции и фирми
              </Link>
              .
            </p>
            </div>
          </div>
          <AuthorBox variant="service" />
          <Gallery images={GALLERY} />
        </div>
      </section>

      {/* Ревюта + детайлни ЧЗВ */}
      <section id="chzv" className="scroll-mt-44 bg-soft">
        <div className="mx-auto max-w-[1140px] px-4 py-2">
          <ReviewsSection />
          <FAQAccordion
            faq={PILLAR_FAQ}
            title="Хамалски услуги — всички въпроси и отговори"
          />
        </div>
      </section>

      <AuthorityStrip variant="stats" />

      {/* Оферта */}
      <section className="bg-carbon-gradient py-16 md:py-20">
        <div className="mx-auto max-w-[1140px] px-4 text-center">
          <h2 data-reveal className="text-2xl font-bold text-white md:text-3xl">
            Вземи оферта до 1 час
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-white/70">
            Опиши какво местим, къртим или извозваме — връщаме се с точна цена
            до 1 час в работно време.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <QuoteForm variant="moving" dark />
          </div>
        </div>
      </section>

      {relatedArticles.length ? (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1140px] px-4 py-2">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}
