import type { ServiceNotice as ServiceNoticeData } from "@/data/notices";

/**
 * Постоянна информационна лента (без затваряне) най-горе в ServiceView.
 * Server Component — без JS, за да не тежи на PSI/CLS. Warning-тонирана
 * (amber) за да контрастира с бранд-червеното и да чете като „важна инфо“.
 */
export function ServiceNotice({ notice }: { notice: ServiceNoticeData }) {
  return (
    <aside
      role="note"
      aria-label="Важно съобщение"
      className="border-y border-[#f0c674] bg-[#fff8ec]"
    >
      <div
        data-reveal
        className="mx-auto flex max-w-[1140px] items-start gap-3.5 px-4 py-4 md:gap-4 md:py-5"
      >
        <WarnIcon className="mt-0.5 h-6 w-6 shrink-0 text-[#b45309]" />
        <div className="min-w-0">
          <p className="font-sans text-sm font-bold uppercase tracking-wide text-[#92400e] md:text-[15px]">
            {notice.title}
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-[#5a4630]">
            {notice.body}
          </p>
          <a
            href={notice.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#b45309] underline underline-offset-2 hover:text-[#92400e]"
          >
            {notice.linkLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

function WarnIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
