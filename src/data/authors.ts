/**
 * E-E-A-T слой: основател + автор + главен редактор за всяка услуга и статия.
 * Решение на клиента (13.07.2026): автор — Силвия Ненчовска,
 * гл. редактор — Иван Колев (Linkbox.BG); основател — Георги Ненчовски.
 *
 * ВАЖНО (social/entity мапинг): profileUrl тук са ЛИЧНИТЕ профили и влизат
 * само в Person schema — никога в Organization sameAs или footer (фирмените
 * канали живеят в site.ts SITE.social).
 */

export interface Person {
  name: string;
  role: string;
  /** Липсва → AuthorBox рендерира инициали-аватар (не слагай непотвърдени снимки). */
  photo?: string;
  profileUrl: string;
  profileLabel: string;
  bio: string;
}

/**
 * Основателят — E-E-A-T стълб „Опит". Снимка: бизнес портрет, предоставен
 * от клиента (13.07.2026). bio само с проверими факти (основател, управител,
 * от 2008 г.).
 */
export const FOUNDER: Person = {
  name: "Георги Ненчовски",
  role: "Създател на услугата · от 2008 г.",
  photo: "/brand/team/georgi-nenchovski-avatar.webp",
  profileUrl: "https://www.facebook.com/ge.nenchovski",
  profileLabel: "Facebook",
  bio: "Основател и управител на „Хамали Ненчовски“ (Хамалчо ЕООД). Ръководи екипите от 2008 г.",
};

export const AUTHOR: Person = {
  name: "Силвия Ненчовска",
  role: "Автор",
  photo: "/brand/team/silviya-nenchovska-avatar.webp",
  profileUrl: "https://www.facebook.com/silvia.bencheva",
  profileLabel: "Facebook",
  bio: "Съосновател на Хамали Ненчовски (Хамалчо ЕООД). От 2008 г. организира графиците, офертите и работата с корпоративни клиенти.",
};

export const EDITOR: Person = {
  name: "Иван Колев",
  role: "Гл. редактор",
  photo: "/brand/team/ivan-kolev.webp",
  profileUrl: "https://www.linkedin.com/in/ivnkolev/",
  profileLabel: "LinkedIn",
  bio: "SEO консултант, Linkbox.BG. Отговаря за точността и актуалността на публикуваната информация.",
};
