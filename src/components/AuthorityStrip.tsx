import Image from "next/image";
import { CORPORATE_CLIENTS, COMPANY_STATS, type CorporateClient } from "@/data/clients";
import reviews from "@/data/reviews.json";
import { CountUp } from "@/components/CountUp";

interface AuthorityStripProps {
  variant: "corporate" | "reviews" | "stats";
  className?: string;
}

export function AuthorityStrip({ variant, className = "" }: AuthorityStripProps) {
  if (variant === "corporate") return <CorporateBand className={className} />;
  if (variant === "reviews") return <ReviewsBand className={className} />;
  return <StatsBand className={className} />;
}

/* ------------------------------------------------------------------ */
/* Corporate                                                          */
/* ------------------------------------------------------------------ */

function CorporateBand({ className }: { className: string }) {
  // Банки + институции първи, бизнес клиентите — последни.
  const sorted = [...CORPORATE_CLIENTS].sort((a, b) => {
    const rank = (s: CorporateClient["sector"]) => (s === "business" ? 1 : 0);
    return rank(a.sector) - rank(b.sector);
  });

  return (
    <div className={`bg-carbon py-10 md:py-12 ${className}`}>
      <div className="mx-auto max-w-[1140px] px-4">
        <p
          data-reveal
          className="mb-8 text-center font-sans text-xs font-semibold uppercase tracking-wider text-white/60"
        >
          Доверен партньор на институции и банки от 2008 г.
        </p>
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {sorted.map((client) => (
            <div key={client.name} className="flex flex-col items-center gap-1.5">
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={40}
                  className="h-9 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100 md:h-10"
                />
              ) : (
                <span className="inline-flex items-center rounded-lg border border-line px-3.5 py-2.5 font-sans text-sm font-medium text-white/70 transition-colors hover:text-white">
                  {client.shortName ?? client.name}
                </span>
              )}
              {client.since ? (
                <span className="hidden font-sans text-[11px] text-white/40 lg:block">
                  {client.since}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

interface ReviewItem {
  author: string;
  rating: number;
  text?: string;
}

function ReviewsBand({ className }: { className: string }) {
  const agg = reviews.aggregate as { rating: number; count: number; sourceUrl: string };
  const quotes = (reviews.reviews as ReviewItem[])
    .filter((r) => !!r.text)
    .slice(0, 2);

  return (
    <div className={`bg-soft py-6 ${className}`}>
      <div className="mx-auto max-w-[1140px] px-4 text-center" data-reveal>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Image src="/brand/social/google-g.svg" alt="Google" width={28} height={28} />
          <span className="font-sans text-lg font-semibold text-ink">
            {String(agg.rating).replace(".", ",")} от {agg.count} ревюта в Google
          </span>
          <StarRating rating={agg.rating} />
          <a
            href={agg.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium text-primary underline underline-offset-2 hover:text-accent"
          >
            Виж ревютата →
          </a>
        </div>

        {quotes.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {quotes.map((q) => (
              <blockquote
                key={q.author}
                className="mx-auto max-w-sm text-[15px] italic leading-relaxed text-secondary"
              >
                „{truncate(q.text!, 130)}“
                <footer className="mt-1 font-sans text-xs not-italic font-medium text-secondary/80">
                  — {q.author}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function StarRating({ rating }: { rating: number }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} от 5 звезди`}>
      {stars.map((i) => {
        const pct = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <StarIcon className="absolute inset-0 text-black/15" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
              <StarIcon className="text-primary" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5l2.98 6.04 6.67.97-4.83 4.7 1.14 6.65L12 17.77l-5.96 3.13 1.14-6.65-4.83-4.7 6.67-.97L12 2.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

function StatsBand({ className }: { className: string }) {
  return (
    <div className={`bg-carbon py-12 md:py-14 ${className}`}>
      <div className="mx-auto max-w-[1140px] px-4">
        <div
          data-reveal-stagger
          className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0"
        >
          {COMPANY_STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              className={`flex flex-col items-center gap-1 px-4 text-center ${
                i > 0 ? "md:border-l md:border-line" : ""
              }`}
            >
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="font-sans text-4xl font-bold text-white"
              />
              <span className="text-sm text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
