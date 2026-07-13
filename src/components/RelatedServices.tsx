import Link from "next/link";

interface RelatedService {
  href: string;
  label: string;
  /** Готов ценови етикет, напр. „от 110 €“ или „от 12,50 €/ч“. */
  priceLabel?: string;
}

interface RelatedServicesProps {
  services: RelatedService[];
  title?: string;
}

/** Компактна лента с препоръчани услуги — за долната част на страници. */
export function RelatedServices({
  services,
  title = "Услуги, които ще ти помогнат",
}: RelatedServicesProps) {
  if (!services?.length) return null;

  return (
    <section aria-labelledby="related-services-h" className="my-12 rounded-2xl bg-soft p-5 sm:p-6">
      <h2 id="related-services-h" className="mb-4 text-xl">
        {title}
      </h2>
      <div data-reveal-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            data-reveal
            className="group flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 transition-colors hover:border-primary"
          >
            <span>
              <span className="block font-sans font-medium text-ink">{service.label}</span>
              {service.priceLabel ? (
                <span className="mt-0.5 block text-sm text-secondary">
                  {service.priceLabel}
                </span>
              ) : null}
            </span>
            <ArrowIcon className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
