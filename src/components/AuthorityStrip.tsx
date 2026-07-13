import Image from "next/image";
import {
  CORPORATE_CLIENTS,
  CORPORATE_TAGLINE,
  COMPANY_STATS,
  type CorporateClient,
} from "@/data/clients";
import reviews from "@/data/reviews.json";
import { CountUp } from "@/components/CountUp";
import { StarRating } from "@/components/StarRating";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface AuthorityStripProps {
  variant: "corporate" | "reviews" | "stats";
  className?: string;
  /** Само за variant="stats" — заменя глобалните COMPANY_STATS за конкретна страница. */
  items?: readonly StatItem[];
}

export function AuthorityStrip({ variant, className = "", items }: AuthorityStripProps) {
  if (variant === "corporate") return <CorporateBand className={className} />;
  if (variant === "reviews") return <ReviewsBand className={className} />;
  return <StatsBand className={className} items={items} />;
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
    <section
      className={`relative overflow-hidden bg-carbon py-14 md:py-16 ${className}`}
    >
      {/* Горна червена нишка + мек ореол за дълбочина */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1140px] px-4">
        <header className="mb-10 text-center" data-reveal>
          <span className="mb-3 inline-flex items-center gap-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <span aria-hidden className="h-px w-7 bg-gradient-to-r from-transparent to-primary" />
            Нашите клиенти
            <span aria-hidden className="h-px w-7 bg-gradient-to-l from-transparent to-primary" />
          </span>
          <p className="mx-auto max-w-2xl font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
            {CORPORATE_TAGLINE}
          </p>
        </header>

        <ul
          data-reveal-stagger
          className="mx-auto grid max-w-4xl grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5"
        >
          {sorted.map((client) => (
            <li key={client.name} data-reveal>
              <ClientTile client={client} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Едно клиентско лого/име върху чиста бяла плочка — чете се на всеки фон. */
function ClientTile({ client }: { client: CorporateClient }) {
  return (
    <div className="group flex h-full flex-col items-center gap-3">
      <div className="flex h-[96px] w-full items-center justify-center rounded-xl border border-white/10 bg-white px-5 py-4 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-premium">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={200}
            height={128}
            className="max-h-[64px] w-auto max-w-full object-contain"
          />
        ) : (
          <span className="text-center font-sans text-base font-bold leading-tight tracking-tight text-carbon">
            {client.shortName ?? client.name}
          </span>
        )}
      </div>
      {client.since ? (
      <span className="rounded-full bg-white/[0.07] px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-white/80 transition-colors group-hover:bg-primary/15 group-hover:text-white">
        {client.since}
      </span>
      ) : (
        <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-white/55 transition-colors group-hover:text-primary">
          Клиент на Ненчовски
        </span>
      )}
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

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

function StatsBand({
  className,
  items = COMPANY_STATS,
}: {
  className: string;
  items?: readonly StatItem[];
}) {
  // Решетка според броя: 4 числа → 2×2 на мобилен, 4 в ред на desktop.
  const cols =
    items.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3 md:grid-cols-3";

  return (
    <div className={`bg-carbon py-12 md:py-14 ${className}`}>
      <div className="mx-auto max-w-[1140px] px-4">
        <div data-reveal-stagger className={`grid ${cols} gap-y-8 md:gap-y-0`}>
          {items.map((stat, i) => (
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
                group
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
