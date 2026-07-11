/**
 * NAP + бранд данни (source of truth: старият сайт /kontakti/ +
 * nenchovski-planning решения от 11.07.2026).
 */

export const SITE = {
  name: "Хамали Ненчовски",
  legalName: "Хамалчо ЕООД",
  eik: "206171476",
  domain: "https://nenchovski.com",
  foundingYear: 2008,
  yearsExperience: 18, // „18 години опит (от 2008 г.)" — никога „13"
  phone: "0894766424",
  phoneDisplay: "0894 766 424",
  phoneSecondary: "0878787554",
  phoneSecondaryDisplay: "0878 787 554",
  email: "ge.nenchovski@abv.bg",
  viber: "+359894766424",
  // NAP синхронизиран с GMB профила („ул. Резбарска" 9А) — 11.07.2026
  address: {
    street: "ул. Резбарска 9А, ет. 2",
    quarter: "ж.к. Хаджи Димитър",
    city: "София",
    postalCode: "1517",
    country: "BG",
    lat: 42.7164,
    lng: 23.3593,
  },
  workingHours: "Работим 7 дни в седмицата",
  // CID от актуалния GMB профил (share.google линк на клиента, 11.07.2026)
  googleMapsUrl:
    "https://www.google.com/maps?cid=11438262150166059315",
  owners: {
    georgi: "Георги Ненчовски",
    silvia: "Силвия Ненчовска",
  },
} as const;

export const AREAS_SERVED = [
  "Люлин",
  "Младост",
  "Дружба",
  "Надежда",
  "Овча купел",
  "Студентски град",
  "Красно село",
  "Витоша",
  "Бояна",
  "Хаджи Димитър",
  "Центъра",
  "Лозенец",
] as const;
