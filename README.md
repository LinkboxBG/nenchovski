# nenchovski.com — v1 (Next.js rebuild)

Статичен, бърз и сигурен сайт на **Хамали Ненчовски** (Хамалчо ЕООД, София).
Замества хакнатия WordPress сайт. Спецификация: `nenchovski-planning/12-ZADANIE-website.md`.

- **Stack:** Next.js 16 (App Router, SSG) + Tailwind 4 + TypeScript
- **Hosting:** Vercel (nenchovski.vercel.app → nenchovski.com след DNS cutover)
- **Repo:** https://github.com/LinkboxBG/nenchovski

## Как работи

| Какво | Къде |
|---|---|
| Цени (single source of truth) | `src/data/pricing.ts` → захранва /ceni/, PriceTable, Offer schema, /pricing.md, llms.txt |
| NAP/бранд данни | `src/data/site.ts` |
| Redirect карта | `data/redirect-map.csv` → `npm run gen:redirects` → 14×301 (next.config) + 238×410 (src/proxy.ts) |
| Услугови страници (26) | `src/content/pages/*.md` (frontmatter: title/description/h1/faq/priceFrom/directAnswer; `<!--PRICE_TABLE-->` маркер вмъква таблицата) |
| Блог (14 вербатим + 2 нови) | `src/content/blog/*.md` (кирилска категория = URL сегмент) |
| Ревюта (реални Google) | `src/data/reviews.json` — 35 ревюта, събрани 11.07.2026 |
| Стари изображения | `public/wp-content/uploads/**` — 1:1 на старите URL пътища (keep-asset + вербатим статии) |
| OG изображения 1200×630 | `npm run gen:og` → `public/og/*.jpg` |

## Команди

```bash
npm run dev              # локална разработка
npm run build            # production build (SSG)
npm run gen:redirects    # регенерира redirects от CSV
npm run gen:og           # генерира OG изображения от cover-ите
npm run verify:redirects # тест на всичките 302 реда (изисква npm start)
```

## Env vars (Vercel → Settings → Environment Variables)

Виж `.env.example`: `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.
Без Resend ключ формата валидира и логва, но не праща имейл.

## Staging noindex

На `*.vercel.app` proxy-то (`src/proxy.ts`) слага `X-Robots-Tag: noindex` и подменя
robots.txt с `Disallow: /`. На nenchovski.com това отпада автоматично — нищо не се
превключва на ръка при cutover.

## ЗАДАЧИ ЗА КЛИЕНТА (преди launch)

- [ ] Реални корици за 3 статии без снимки в скрейпа: `smyana-na-vrati-bez-kurtene`
      (911 клика!), `podgotovka-za-premestvane-na-doma`, `kachvane-na-mebeli-po-stulbi`
- [ ] 16-те изгубени изображения (`nenchovski-old/scrape/image-failed.txt`) — нови снимки
- [ ] Отговори на 9-те ценови въпроса (`nenchovski-planning/00-data/ceni-hamalcho-2026.md`)
- [ ] Resend акаунт + домейн верификация + env vars
- [ ] GA4 property + `NEXT_PUBLIC_GA_ID`
- [ ] Потвърждение за гаранцията „фиксирана оферта" (Гошо) → TrustStrip

## Phase 2 (извън v1)

Многостъпков wizard (flatrate §4), PromoPackage, 6–10 квартални страници, P1 landing
страници (/kartene-na-plochki/, /kartene-na-podprozorets/, /sabaryane-na-sgradi/),
/konteineri-pod-naem/ (чака Гошо), Пловдив (чака реално покритие), Google Sheets append,
DNS cutover протокол (`nenchovski-planning/08-seo-migration-plan.md` §Фаза B).
