/**
 * 5-звезден рейтинг с частично запълване — извлечен от AuthorityStrip,
 * за да се преизползва в Hero (GMB блока). `dark` сменя цвета на
 * празните звезди за тъмен фон.
 */
export function StarRating({
  rating,
  dark = false,
}: {
  rating: number;
  dark?: boolean;
}) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} от 5 звезди`}
    >
      {stars.map((i) => {
        const pct = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <StarIcon
              className={`absolute inset-0 ${dark ? "text-white/25" : "text-black/15"}`}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct}%` }}
            >
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
