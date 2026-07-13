/**
 * Системни съобщения по услуга (keyed by slug). Рендерират се като видима
 * лента най-горе в ServiceView. Само проверени факти — датата, услугите и
 * агенцията идват от клиента и от самата наредба (rta.government.bg).
 *
 * Таргетингът е по SLUG, не по категория: `bus-pod-naem` също е
 * category:transport, но е вътрешна услуга и НЕ трябва да носи това съобщение.
 */

export interface ServiceNotice {
  title: string;
  body: string;
  linkHref: string;
  linkLabel: string;
}

/** Временно спиране на международните услуги — нова наредба в сила от 01.07.2026 г. */
const INTL_SUSPENSION: ServiceNotice = {
  title: "Временно спрени услуги",
  body:
    "От 01.07.2026 г. „Хамали Ненчовски“ (Хамалчо ЕООД) временно преустановява " +
    "международните премествания и транспорта между България и Румъния, Гърция и " +
    "други държави. Причината е нова нормативна уредба на ИА „Автомобилна " +
    "администрация“, в сила от 1 юли 2026 г. Извиняваме се за неудобството и ще " +
    "възобновим услугата възможно най-скоро.",
  linkHref: "https://rta.government.bg/bg/news/4732",
  linkLabel: "Вижте официалната наредба",
};

export const SERVICE_NOTICES: Record<string, ServiceNotice> = {
  "mezhdunarodno-premestvane": INTL_SUSPENSION,
  "transport-ot-gartsiya-do-balgariya": INTL_SUSPENSION,
  "transport-ot-rumaniya-do-balgariya": INTL_SUSPENSION,
};
