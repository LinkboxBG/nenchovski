/**
 * Корпоративни и институционални клиенти — фактите са от старата
 * страница „За нас" (preporachai-hamali-nenhcovski). Не добавяй
 * клиенти без потвърждение от Ненчовски.
 *
 * Логата се сервират локално (CSP img-src 'self'). Когато `logo`
 * липсва, AuthorityStrip рендерира стилизиран текстов badge.
 */

export interface CorporateClient {
  name: string;
  /** Кратко име за тесни ленти */
  shortName?: string;
  logo?: string;
  /** Период на съвместна работа (от „За нас") */
  since?: string;
  sector: "bank" | "institution" | "business";
  url?: string;
}

export const CORPORATE_CLIENTS: CorporateClient[] = [
  {
    name: "Българска банка за развитие",
    shortName: "ББР",
    logo: "/brand/clients/bbr.webp",
    since: "от 2011 г.",
    sector: "bank",
    url: "https://bbr.bg",
  },
  {
    name: "Банка Пиреос България",
    shortName: "Пиреос",
    logo: "/brand/clients/piraeus.webp",
    since: "от 2008 г.",
    sector: "bank",
  },
  {
    name: "ProCredit Bank",
    logo: "/brand/clients/procredit.webp",
    since: "2010–2011 г.",
    sector: "bank",
    url: "https://procreditbank.bg",
  },
  {
    name: "Finance Leasing",
    logo: "/brand/clients/finance-leasing.webp",
    since: "от 2010 г.",
    sector: "bank",
  },
  {
    name: "ТП НОИ — Хасково, Кърджали, Пловдив",
    shortName: "НОИ",
    logo: "/brand/clients/noi.webp",
    sector: "institution",
    url: "https://nssi.bg",
  },
  {
    name: "Министерство на икономиката",
    shortName: "Мин. на икономиката",
    logo: "/brand/clients/mi.webp",
    sector: "institution",
  },
  {
    name: "Институт по публична администрация",
    shortName: "ИПА",
    logo: "/brand/clients/ipa.webp",
    sector: "institution",
    url: "https://www.ipa.government.bg",
  },
  {
    name: "Гопет Транс",
    shortName: "Гопет",
    logo: "/brand/clients/gopet.webp",
    sector: "business",
  },
  {
    name: "Диджипол",
    logo: "/brand/clients/digipol.webp",
    sector: "business",
  },
];

/** Ключови постижения за stat-ленти (от съдържанието на сайта — не измисляй нови). */
export const COMPANY_STATS = [
  { value: 18, suffix: " години", label: "опит от 2008 г." },
  { value: 300, suffix: "+", label: "преместени фирми и офиси" },
  { value: 40, suffix: "+", label: "души разширен екип" },
] as const;
