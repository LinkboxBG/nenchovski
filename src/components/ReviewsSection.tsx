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
            className="font-sans text-sm font-medium text-secondary hover:text-primary"
          >
            ⭐ {String(agg.rating).replace(".", ",")} от {agg.count} ревюта в
            Google →
          </a>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {list.map((r) => (
          <figure
            key={r.author + (r.date ?? "")}
            className="rounded-xl border border-black/10 bg-white p-5 shadow-sm"
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
