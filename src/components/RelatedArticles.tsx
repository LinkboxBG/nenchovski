import Image from "next/image";
import Link from "next/link";

interface RelatedArticle {
  urlPath: string;
  title: string;
  cover?: string;
  coverAlt?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  title?: string;
}

/** Карти с препоръчано четиво — данните ги подава извикващата страница. */
export function RelatedArticles({
  articles,
  title = "Полезно четиво по темата",
}: RelatedArticlesProps) {
  if (!articles?.length) return null;

  return (
    <section aria-labelledby="related-articles-h" className="my-12">
      <h2 id="related-articles-h" className="mb-1 text-2xl">
        {title}
      </h2>
      <div className="mb-5 h-1 w-12 rounded-full bg-primary" aria-hidden />
      <div data-reveal-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.urlPath}
            href={article.urlPath}
            data-reveal
            className="group block overflow-hidden rounded-xl border border-black/10 bg-white shadow-card transition-shadow duration-300 hover:shadow-premium"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-carbon-gradient">
              {article.cover ? (
                <Image
                  src={article.cover}
                  alt={article.coverAlt ?? article.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <TruckIcon />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-sans font-semibold text-ink transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <span className="mt-2 inline-block font-sans text-sm font-medium text-primary">
                Прочети →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TruckIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/15"
      aria-hidden
    >
      <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
      <path d="M13 9h4l3 3v4h-2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M9 18h6" />
    </svg>
  );
}
