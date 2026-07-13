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
  // Основен CTA номер — Георги го носи на обектите (решение на клиента, 13.07.2026)
  phone: "0894766424",
  phoneDisplay: "0894 766 424",
  // Номерът с Viber (голям смартфон, стои в офиса) — всички Viber линкове сочат тук
  phoneSecondary: "0878787554",
  phoneSecondaryDisplay: "0878 787 554",
  // Силвия Ненчовска — счетоводство, фактури, корпоративни оферти (само на /kontakti/)
  phoneSilvia: "0887492669",
  phoneSilviaDisplay: "0887 492 669",
  email: "ge.nenchovski@abv.bg",
  viber: "+359878787554",
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
  // Реално работно време (потвърдено от клиента, 13.07.2026): пон–съб 08–18, неделя почивен
  workingHours: "Пон–съб 08:00–18:00 ч.",
  workingHoursLong: "Понеделник – събота: 08:00–18:00 ч. Неделя: почивен ден.",
  openingHours: {
    opens: "08:00",
    closes: "18:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
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
