import type { ArticleEnrichment, ArticleSlug } from "../enrichment";

/** Вътрешни връзки статия → услуги — попълва се от Фаза 3 работник Art. */
export const ARTICLES_ENRICHMENT: Partial<
  Record<ArticleSlug, ArticleEnrichment>
> = {
  "hamal-proizhod-na-dumata": {
    relatedServices: ["hamalski-uslugi", "hamali-rabota-sofia", "premestvane-na-doma"],
  },
  "kachvane-na-mebeli-po-stulbi": {
    relatedServices: ["premestvane-na-mebeli", "premestvane-na-doma", "hamalski-uslugi"],
  },
  "kak-da-izberete-firma-za-hamalski-uslugi": {
    relatedServices: ["hamalski-uslugi", "hamali-rabota-sofia", "premestvane-na-doma"],
  },
  "kak-da-si-napravim-barbequ-ot-tuhli": {
    relatedServices: ["izvozvane-na-stroitelni-otpadatsi-sofiya", "premestvane-na-doma"],
  },
  "kak-se-pravi-kamina-ot-tuhli": {
    relatedServices: ["izvozvane-na-stroitelni-otpadatsi-sofiya", "kartene-na-steni"],
  },
  "kakvo-se-nosi-v-nova-kashta": {
    relatedServices: ["premestvane-na-doma", "premestvane-na-apartament", "premestvane-na-kashti"],
  },
  "kamina-ot-kashoni": {
    relatedServices: ["kashoni", "premestvane-na-doma"],
  },
  "kashoni-i-opakovachna-hartiq": {
    relatedServices: ["kashoni", "premestvane-na-bagaj", "premestvane-na-doma"],
  },
  "kolko-struvat-hamalskite-uslugi-v-sofia": {
    relatedServices: ["hamalski-uslugi", "premestvane-na-doma", "bus-pod-naem"],
  },
  "podgotovka-za-premestvane-na-doma": {
    relatedServices: ["premestvane-na-doma", "kashoni", "hamalski-uslugi"],
  },
  "premestvane-na-akvarium": {
    relatedServices: ["premestvane-na-mebeli", "premestvane-na-doma"],
  },
  "premestvane-na-doma-s-kotka": {
    relatedServices: ["premestvane-na-doma", "premestvane-na-apartament", "hamalski-uslugi"],
  },
  "premestvane-na-tezhki-mebeli": {
    relatedServices: ["premestvane-na-mebeli", "hamalski-uslugi", "premestvane-na-doma"],
  },
  "razglobyavane-i-sglobyavane-na-mebeli": {
    relatedServices: ["premestvane-na-mebeli", "premestvane-na-doma", "hamalski-uslugi"],
  },
  "smyana-na-vrati-bez-kurtene": {
    relatedServices: ["kartene-na-steni", "kurtene-na-banya", "karti-chisti-izvozva"],
  },
  "suveti-za-podrejdane-doma": {
    relatedServices: ["izhvurlyane-na-stari-mebeli", "premestvane-na-doma", "kashoni"],
  },
};
