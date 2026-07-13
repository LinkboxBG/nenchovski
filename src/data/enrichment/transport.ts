import type { PageEnrichment, ServiceSlug } from "../enrichment";
import { TRANSPORT_GALLERY } from "../galleries";

/** Групи „Транспорт" + utility страници — попълва се от Фаза 3 работник T. */
export const TRANSPORT_ENRICHMENT: Partial<
  Record<ServiceSlug, PageEnrichment>
> = {
  "bus-pod-naem": {
    hero: {
      // Хамали-София.10 (1366px) — брандиран камион, най-силният кадър за херо;
      // thumb-ът .01 (1016×350) отива в галерията
      image:
        "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.10.webp",
      alt: "Брандиран камион на Хамали Ненчовски — бус под наем с шофьор",
      badges: ["От 2008 г. — 18 години опит", "Плащане след свършена работа"],
    },
    // B2B hero (лого marquee в херото); stats лентата няма лога → няма конфликт.
    heroVariant: "b2b",
    authority: "stats",
    gallery: TRANSPORT_GALLERY,
    formVariant: "moving",
  },

  "mezhdunarodno-premestvane": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.04.webp",
      alt: "Международно преместване — хамали товарят обезопасена мебел в камион",
      badges: ["От 2008 г. — 18 години опит", "Оферта до 1 час"],
    },
    authority: "corporate",
    gallery: TRANSPORT_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "kashoni-i-opakovachna-hartiq",
    ],
    formVariant: "moving",
  },

  "transport-ot-gartsiya-do-balgariya": {
    hero: {
      // Хамали-София.06 е стара 300px снимка — негодна за херо
      image:
        "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.04.webp",
      alt: "Товарене на обезопасени мебели в камион — Хамали Ненчовски",
      badges: ["От 2008 г. — 18 години опит"],
    },
    authority: "stats",
    gallery: TRANSPORT_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "kashoni-i-opakovachna-hartiq",
    ],
    formVariant: "moving",
  },

  "transport-ot-rumaniya-do-balgariya": {
    hero: {
      // Хамали-София.07 е снимка на отломки (къртене) — грешна тема; ползваме
      // автентичната снимка от самия курс Румъния–България
      image:
        "/wp-content/uploads/2023/12/%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D1%80%D1%83%D0%BC%D1%8A%D0%BD%D0%B8%D1%8F-%D0%B1%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F-%D1%81%D0%BD%D0%B8%D0%BC%D0%BA%D0%B0-3.webp",
      alt: "Транспорт от Румъния до България — обезопасен товар на Ненчовски",
      badges: ["От 2008 г. — 18 години опит"],
    },
    authority: "stats",
    gallery: TRANSPORT_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "kashoni-i-opakovachna-hartiq",
    ],
    formVariant: "moving",
  },

  "hamali-rabota-sofia": {
    hero: {
      image:
        "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D1%81%D0%BD%D0%B8%D0%BC%D0%BA%D0%B0-2.webp",
      alt: "Работа за хамали в София — екипът на Хамали Ненчовски",
      badges: ["От 2008 г. — 18 години опит"],
    },
    authority: "stats",
    formVariant: "moving",
  },

  "preporachai-hamali-nenhcovski": {
    hero: {
      // За-нас.02–.04 са банкови лога — не стават за херо; логата се показват
      // от AuthorityStrip "corporate". Тук: реални мнения на клиенти.
      image:
        "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.05.webp",
      alt: "Подготвен за преместване дом — Хамали Ненчовски",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
      ],
    },
    authority: "corporate",
    // Галерията тук са ревю-скрийншоти, не „наши обекти" → собствено заглавие.
    galleryTitle: "Мнения от клиенти",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9C%D0%B8%D0%BB%D0%B5%D0%BD%D0%BE-%D0%A8%D0%BE%D0%BF%D0%BE%D0%B2%D0%B0-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5.webp",
        alt: "Мнение на клиент — Милена Шопова за Хамали Ненчовски",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A2%D0%B0%D0%BD%D1%8F-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5.webp",
        alt: "Мнение на клиент — Таня Божинова, Гопет Логистикс",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A0%D1%83%D0%BC%D1%8F%D0%BD%D0%B0-%D0%9F%D0%B5%D1%82%D0%BA%D0%BE%D0%B2%D0%B0-%D0%BC%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5.webp",
        alt: "Мнение на клиент — Румяна Петкова за Хамали Ненчовски",
      },
      {
        src: "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D1%86%D0%B5%D0%BD%D0%B8-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D0%A0%D0%B5%D0%B2%D1%8E-%D0%9C%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D1%82-%D0%98%D0%B2%D0%B0-%D0%9B%D1%8E%D0%B1%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0.png",
        alt: "Google ревю от Ива Любенова за Хамали Ненчовски",
      },
      {
        src: "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D1%86%D0%B5%D0%BD%D0%B8-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D0%A0%D0%B5%D0%B2%D1%8E-%D0%BE%D1%82-M-BG.png",
        alt: "Google ревю от клиент M-BG за Хамали Ненчовски",
      },
      {
        src: "/wp-content/uploads/2023/12/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F-%D1%86%D0%B5%D0%BD%D0%B8-%D0%9D%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D0%A0%D0%B5%D0%B2%D1%8E-%D0%BE%D1%82-%D0%9C%D0%B8%D0%BB%D0%B5%D0%BD%D0%B0-%D0%97%D0%B0%D1%85%D0%B0%D1%80%D0%B8%D0%B5%D0%B2%D0%B0.png",
        alt: "Google ревю от Милена Захариева за Хамали Ненчовски",
      },
    ],
    relatedArticles: ["kak-da-izberete-firma-za-hamalski-uslugi"],
    formVariant: "moving",
  },

  "sale-day__links-booster": {
    authority: null,
  },
};
