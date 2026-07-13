/**
 * E-E-A-T слой: автор и главен редактор за всяка услуга и статия.
 * Решение на клиента (13.07.2026): автор — Силвия Ненчовска,
 * гл. редактор — Иван Колев (Linkbox.BG).
 */

export interface Person {
  name: string;
  role: string;
  photo: string;
  profileUrl: string;
  profileLabel: string;
  bio: string;
}

export const AUTHOR: Person = {
  name: "Силвия Ненчовска",
  role: "Автор",
  photo:
    "/wp-content/uploads/2026/04/%D0%97%D0%B0-%D0%BD%D0%B0%D1%81.27-1.webp",
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
