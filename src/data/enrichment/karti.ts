import type { PageEnrichment, ServiceSlug } from "../enrichment";

/** Групи „Кърти·Чисти·Извозва" + „Почистване" — попълва се от Фаза 3 работник K. */
export const KARTI_ENRICHMENT: Partial<
  Record<ServiceSlug, PageEnrichment>
> = {
  "karti-chisti-izvozva": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.07.webp",
      alt: "Кърти чисти извозва в София — екипът на Ненчовски по време на работа на обект",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Оферта до 1 час",
        "Извозване до лицензирано депо",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
        alt: "Къртене на стена по време на комплексна услуга кърти чисти извозва",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.07.webp",
        alt: "Натрошени строителни отпадъци след къртене",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.06.webp",
        alt: "Ремонтна дейност на обект — кърти чисти извозва",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.08.webp",
        alt: "Къртене на тухлена стена с перфоратор и защитна екипировка",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.09.webp",
        alt: "Премахване на стенни плочки с чук и лост",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D1%85%D0%B2%D1%8A%D1%80%D0%BB%D1%8F%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.11.webp",
        alt: "Разчистени стари мебели, готови за извозване",
      },
    ],
    relatedArticles: [
      "smyana-na-vrati-bez-kurtene",
      "kak-da-izberete-firma-za-hamalski-uslugi",
      "kolko-struvat-hamalskite-uslugi-v-sofia",
    ],
    formVariant: "onsite",
  },

  "kurtene-na-banya": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%BD%D1%8F.09.webp",
      alt: "Къртене на баня в София — плочки и замазка, преди монтаж на нови",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Оферта до 1 час",
        "Извозване до лицензирано депо",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%BD%D1%8F.07.webp",
        alt: "Баня преди къртене и ремонт",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.09.webp",
        alt: "Премахване на плочки от стена в баня",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
        alt: "Къртене на замазка и основа в баня",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.08.webp",
        alt: "Работник разбива тухлена стена с перфоратор при ремонт на баня",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.07.webp",
        alt: "Отломки от плочки и замазка след къртене на баня",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B5%D0%BD%D0%B8.05.webp",
        alt: "Разчистване на отпадъци след къртене на баня",
      },
    ],
    relatedArticles: [
      "smyana-na-vrati-bez-kurtene",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "onsite",
  },

  "kartene-na-beton-sofiya": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
      alt: "Къртене на бетонна стена с перфоратор — къртене на бетон София",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Оферта до 1 час",
        "Извозване до лицензирано депо",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.08.webp",
        alt: "Работник разбива бетонна конструкция с перфоратор",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B5%D1%82%D0%BE%D0%BD-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.05.webp",
        alt: "Почистване на отломки след къртене на бетон",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.07.webp",
        alt: "Натрошен бетон, готов за извозване",
      },
    ],
    relatedArticles: [
      "smyana-na-vrati-bez-kurtene",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "onsite",
  },

  "kartene-na-steni": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B5%D0%BD%D0%B8.02.webp",
      alt: "Къртене на тухлена стена в апартамент — Хамали Ненчовски",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Безплатен оглед или оферта по снимки",
        "Извозване до лицензирано депо",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
        alt: "Къртене на стена с перфоратор",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B5%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B5%D0%BD%D0%B8.05.webp",
        alt: "Разчистване на отломки след къртене на стена",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.08.webp",
        alt: "Разбиване на тухлена стена с перфоратор",
      },
    ],
    relatedArticles: [
      "smyana-na-vrati-bez-kurtene",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "onsite",
  },

  "izvozvane-na-stroitelni-otpadatsi-sofiya": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%98%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D0%BD%D0%B8-%D0%BE%D1%82%D0%BF%D0%B0%D0%B4%D1%8A%D1%86%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.01.webp",
      alt: "Извозване на строителни отпадъци от обект в София — Хамали Ненчовски",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Извозване до лицензирано депо",
        "Безплатен оглед или оферта по снимки",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D0%BD%D0%B8-%D0%BE%D1%82%D0%BF%D0%B0%D0%B4%D1%8A%D1%86%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
        alt: "Струпани строителни отпадъци, готови за извозване",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D0%BD%D0%B8-%D0%BE%D1%82%D0%BF%D0%B0%D0%B4%D1%8A%D1%86%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.04.webp",
        alt: "Сортиране на отпадъци за рециклиране",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9A%D1%8A%D1%80%D1%82%D0%B8-%D1%87%D0%B8%D1%81%D1%82%D0%B8-%D0%B8%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0.03.webp",
        alt: "Къртене преди извозване на строителни отпадъци",
      },
      {
        src: "/wp-content/uploads/2023/12/%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82-%D1%80%D1%83%D0%BC%D1%8A%D0%BD%D0%B8%D1%8F-%D0%B1%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F-%D1%81%D0%BD%D0%B8%D0%BC%D0%BA%D0%B0-3.webp",
        alt: "Товарене на отпадъци в камион за извозване",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D0%B2%D0%BE%D0%B7%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D0%BD%D0%B8-%D0%BE%D1%82%D0%BF%D0%B0%D0%B4%D1%8A%D1%86%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.07.webp",
        alt: "Обект в процес на разчистване след къртене",
      },
    ],
    relatedArticles: [
      "kak-da-izberete-firma-za-hamalski-uslugi",
      "kolko-struvat-hamalskite-uslugi-v-sofia",
    ],
    formVariant: "onsite",
  },

  "izhvurlyane-na-stari-mebeli": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%98%D0%B7%D1%85%D0%B2%D1%8A%D1%80%D0%BB%D1%8F%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.11.webp",
      alt: "Струпани стари мебели, готови за извозване",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Безплатен оглед или оферта по снимки",
        "Извозване до лицензирано депо",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D1%85%D0%B2%D1%8A%D1%80%D0%BB%D1%8F%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.09.webp",
        alt: "Оглед на стари мебели преди извозване",
      },
      {
        src: "/wp-content/uploads/2023/09/%D0%A0%D0%B0%D0%B7%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%B8-%D1%81%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8-3.jpg",
        alt: "Демонтаж на стар стол преди извозване",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B0%D0%B2%D0%B0%D0%BD%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
        alt: "Стара износена мебел, готова за извозване",
      },
      {
        src: "/wp-content/uploads/2023/09/%D0%A0%D0%B0%D0%B7%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%B8-%D1%81%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8-2.jpg",
        alt: "Разглобяване на мебели преди извозване",
      },
      {
        src: "/wp-content/uploads/2023/09/%D0%A0%D0%B0%D0%B7%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%B8-%D1%81%D0%B3%D0%BB%D0%BE%D0%B1%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8-1.jpg",
        alt: "Демонтаж на мебел с инструменти преди извозване",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%A5%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.04.webp",
        alt: "Извозване на стари мебели с камион",
      },
    ],
    relatedArticles: [
      "premestvane-na-tezhki-mebeli",
      "razglobyavane-i-sglobyavane-na-mebeli",
      "suveti-za-podrejdane-doma",
    ],
    formVariant: "onsite",
  },

  "pochistvane-na-mazeta-sofia": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B0%D0%B7%D0%B5%D1%82%D0%B0-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
      alt: "Почистване на мазе в София — изнасяне на стари вещи",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Извозване до лицензирано депо",
        "Безплатен оглед или оферта по снимки",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D1%85%D0%B2%D1%8A%D1%80%D0%BB%D1%8F%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.11.webp",
        alt: "Разчистени стари вещи от мазе",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%98%D0%B7%D1%85%D0%B2%D1%8A%D1%80%D0%BB%D1%8F%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%B8-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.09.webp",
        alt: "Стари вещи и мебели, събрани в мазе преди почистване",
      },
    ],
    relatedArticles: [
      "suveti-za-podrejdane-doma",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "onsite",
  },

  "pochistvane-na-tavani-sofia": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B0%D0%B2%D0%B0%D0%BD%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.02.webp",
      alt: "Почистване на таван в София — изнасяне на вещи по тесни стълби",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Извозване до лицензирано депо",
        "Безплатен оглед или оферта по снимки",
      ],
    },
    authority: "reviews",
    gallery: [
      {
        src: "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B0%D0%B2%D0%B0%D0%BD%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
        alt: "Стара износена мебел, намерена на тавана",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B0%D0%B7%D0%B5%D1%82%D0%B0-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.03.webp",
        alt: "Стари вещи, събрани на тавана за извозване",
      },
      {
        src: "/wp-content/uploads/2026/04/%D0%9F%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B0%D0%B2%D0%B0%D0%BD%D0%B8-%D0%A1%D0%BE%D1%84%D0%B8%D1%8F.06.webp",
        alt: "Пръскане с ароматизатор след почистване на таван",
      },
    ],
    relatedArticles: [
      "suveti-za-podrejdane-doma",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "onsite",
  },
};
