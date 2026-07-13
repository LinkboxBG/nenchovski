import reviews from "@/data/reviews.json";
import { SITE } from "@/data/site";

interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
  sourceUrl?: string;
}

/**
 * Реални Google ревюта (reviews.json). Без review/aggregateRating schema
 * докато няма ≥5 реални — trust-ът се доказва с линк към първоизточника.
 */
export function ReviewsSection({ limit = 3 }: { limit?: number }) {
  const list = (reviews.reviews as Review[]).slice(0, limit);
  const agg = reviews.aggregate as {
    rating?: number;
    count?: number;
    sourceUrl?: string;
  } | null;

  if (!list.length && !agg) return null;

  return (
    <section aria-labelledby="reviews-h" className="my-12">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <h2 id="reviews-h" className="text-2xl">
          Какво казват клиентите ни
        </h2>
        {agg?.rating ? (
          <a
            href={agg.sourceUrl ?? SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-secondary hover:text-primary"
          >
            <StarIcon />
            {String(agg.rating).replace(".", ",")} от {agg.count} ревюта в Google
            →
          </a>
        ) : null}
      </div>
      <div data-reveal-stagger className="grid gap-4 md:grid-cols-3">
        {list.map((r) => (
          <figure
            key={r.author + (r.date ?? "")}
            data-reveal
            className="rounded-2xl border border-black/10 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-premium"
          >
            <div className="text-amber-500 text-sm" aria-label={`${r.rating} от 5 звезди`}>
              {"★".repeat(Math.round(r.rating))}
              <span className="text-black/20">
                {"★".repeat(5 - Math.round(r.rating))}
              </span>
            </div>
            <blockquote className="mt-2 text-[15px] leading-relaxed">
              „{r.text}“
            </blockquote>
            <figcaption className="mt-3 font-sans text-sm font-medium text-secondary">
              {r.author}
              {r.date ? ` · ${r.date}` : ""}
              {r.sourceUrl ? (
                <>
                  {" · "}
                  <a
                    href={r.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    виж в Google
                  </a>
                </>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-primary"
      aria-hidden
    >
      <path d="M12 2.5l2.98 6.04 6.67.97-4.83 4.7 1.14 6.65L12 17.77l-5.96 3.13 1.14-6.65-4.83-4.7 6.67-.97L12 2.5Z" />
    </svg>
  );
}
