import type { PageEnrichment, ServiceSlug } from "../enrichment";
import {
  PREMESTVANE_GALLERY,
  OFISI_GALLERY,
  HEAVY_GALLERY,
} from "../galleries";

/** Група „Преместване" — попълва се от Фаза 3 работник P. */
export const PREMESTVANE_ENRICHMENT: Partial<
  Record<ServiceSlug, PageEnrichment>
> = {
  // „hamalski-uslugi" няма запис: пилар страницата има dedicated route
  // (src/app/hamalski-uslugi/page.tsx) със собствени херо/галерия/ЧЗВ.

  "premestvane-na-doma": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B4%D0%BE%D0%BC%D0%B0.07.webp",
      alt: "Хамали товарят кашони в камион при преместване на дома",
      badges: [
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
        "Безплатно фолиране на мебелите",
        "Безплатен оглед",
      ],
    },
    authority: "reviews",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "premestvane-na-doma-s-kotka",
      "kakvo-se-nosi-v-nova-kashta",
    ],
    formVariant: "moving",
  },

  "premestvane-na-apartament": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B0%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82.03.webp",
      alt: "Разглобени и опаковани мебели преди преместване на апартамент",
      badges: [
        "От 2008 г. — 18 години опит",
        "2–3 хамали за стандартен апартамент",
        "4,9★ в Google (35 ревюта)",
        "Безплатна консултация",
      ],
    },
    authority: "reviews",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "kachvane-na-mebeli-po-stulbi",
      "suveti-za-podrejdane-doma",
    ],
    formVariant: "moving",
  },

  "premestvane-na-kashti": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BA%D1%8A%D1%89%D0%B8.04.webp",
      alt: "Преместване на къщи — екип на Ненчовски товари мебели",
      badges: [
        "От 2008 г. — 18 години опит",
        "Обикновено един работен ден",
        "4,9★ в Google (35 ревюта)",
        "Безплатен оглед",
      ],
    },
    authority: "reviews",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "kakvo-se-nosi-v-nova-kashta",
      "podgotovka-za-premestvane-na-doma",
      "suveti-za-podrejdane-doma",
    ],
    formVariant: "moving",
  },

  "premestvane-na-ofisi": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.01.webp",
      alt: "Разтоварване на офис техника с колесар — преместване на офиси",
      badges: [
        "Над 300 преместени фирми",
        "Плащане след свършена работа",
        "Собствен автопарк, 40+ хамали",
        "От 2008 г. — 18 години опит",
      ],
    },
    // B2B hero носи лого стената в самото херо → authority НЕ е "corporate"
    // (иначе двойна лого стена).
    heroVariant: "b2b",
    authority: "reviews",
    gallery: OFISI_GALLERY,
    relatedArticles: [
      "kolko-struvat-hamalskite-uslugi-v-sofia",
      "kak-da-izberete-firma-za-hamalski-uslugi",
    ],
    formVariant: "moving",
  },

  "premestvane-na-bagaj": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%B3%D0%B0%D0%B6.03.webp",
      alt: "Опаковане на куфар със стреч фолио — преместване на багаж",
      badges: [
        "От 2008 г. — 18 години опит",
        "Пренасяме и чупливи вещи",
        "4,9★ в Google (35 ревюта)",
        "Безплатен оглед",
      ],
    },
    authority: "corporate",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "razglobyavane-i-sglobyavane-na-mebeli",
      "podgotovka-za-premestvane-na-doma",
      "premestvane-na-tezhki-mebeli",
    ],
    formVariant: "moving",
  },

  "premestvane-na-mebeli": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D0%B8.04.webp",
      alt: "Хамали товарят кашони в камион — преместване на мебели",
      badges: [
        "От 2008 г. — 18 години опит",
        "Плащане след свършена работа",
        "Специализирано оборудване за тежки товари",
        "4,9★ в Google (35 ревюта)",
      ],
    },
    authority: "reviews",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "premestvane-na-tezhki-mebeli",
      "razglobyavane-i-sglobyavane-na-mebeli",
      "kachvane-na-mebeli-po-stulbi",
    ],
    formVariant: "moving",
  },

  "prevoz-na-divan": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%B2%D0%BE%D0%B7-%D0%BD%D0%B0-%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD.06.webp",
      alt: "Хамали товарят обезопасен диван в камион — превоз на диван",
      badges: [
        "Изхвърляме и стари дивани",
        "Безплатен оглед",
        "От 2008 г. — 18 години опит",
        "4,9★ в Google (35 ревюта)",
      ],
    },
    authority: "reviews",
    gallery: HEAVY_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "premestvane-na-doma-s-kotka",
      "premestvane-na-tezhki-mebeli",
    ],
    formVariant: "moving",
  },

  "premestvane-na-hladilnik": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D1%85%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%BD%D0%B8%D0%BA.01.webp",
      alt: "Хамали пренасят хладилник пред къща — преместване на хладилник",
      badges: [
        "Пренасяне без риск за компресора",
        "От 2008 г. — 18 години опит",
        "Безплатен оглед",
        "4,9★ в Google (35 ревюта)",
      ],
    },
    authority: "reviews",
    gallery: HEAVY_GALLERY,
    relatedArticles: [
      "podgotovka-za-premestvane-na-doma",
      "premestvane-na-doma-s-kotka",
      "premestvane-na-tezhki-mebeli",
    ],
    formVariant: "moving",
  },

  "premestvane-na-piano": {
    hero: {
      image:
        "/wp-content/uploads/2026/04/%D0%9F%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D0%BD%D0%B0-%D0%BF%D0%B8%D0%B0%D0%BD%D0%BE.01.webp",
      alt: "Хамали товарят пиано в камион по рампа — преместване на пиано",
      badges: [
        "Екип от 3–4 специализирани хамали",
        "Пренасяме и от 7–8 етаж без асансьор",
        "От 2008 г. — 18 години опит",
        "Безплатен оглед",
      ],
    },
    authority: "reviews",
    gallery: HEAVY_GALLERY,
    relatedArticles: [
      "premestvane-na-tezhki-mebeli",
      "kachvane-na-mebeli-po-stulbi",
      "razglobyavane-i-sglobyavane-na-mebeli",
    ],
    formVariant: "moving",
  },

  kashoni: {
    hero: {
      image:
        "/wp-content/uploads/2023/09/%D0%BA%D0%B0%D1%88%D0%BE%D0%BD%D0%B8-%D0%B7%D0%B0-%D0%BF%D1%80%D0%B5%D0%BC%D0%B5%D1%81%D1%82%D0%B2%D0%B0%D0%BD%D0%B5-%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D0%BD%D0%B5%D0%BD%D1%87%D0%BE%D0%B2%D1%81%D0%BA%D0%B8-%D1%85%D0%B0%D0%BC%D0%B0%D0%BB%D0%B8-%D0%BA%D0%BE%D1%80%D0%B8%D1%86%D0%B0-01.jpg",
      alt: "Кашони за преместване София — Хамали Ненчовски",
      badges: [
        "3 размера кашони на склад",
        "Трислойно и петслойно велпапе",
        "Доставка в София",
        "От 2008 г. — 18 години опит",
      ],
    },
    authority: "stats",
    gallery: PREMESTVANE_GALLERY,
    relatedArticles: [
      "kashoni-i-opakovachna-hartiq",
      "podgotovka-za-premestvane-na-doma",
      "suveti-za-podrejdane-doma",
    ],
    formVariant: "moving",
  },
};
