import Image from "next/image";
import { AUTHOR, EDITOR, type Person } from "@/data/authors";

interface AuthorBoxProps {
  variant?: "service" | "article";
  dateModified?: string;
}

/** E-E-A-T карта: автор + гл. редактор, с линкове към профилите им. */
export function AuthorBox({ variant = "service", dateModified }: AuthorBoxProps) {
  return (
    <div
      data-reveal
      className={`rounded-2xl border border-black/10 bg-soft p-5 sm:p-6 ${
        variant === "article" ? "my-10" : "my-8"
      }`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <PersonCard person={AUTHOR} />
        <PersonCard person={EDITOR} />
      </div>
      {dateModified ? (
        <p className="mt-4 border-t border-black/10 pt-3 font-sans text-xs text-secondary">
          Последна редакция: {formatBgDate(dateModified)}
        </p>
      ) : null}
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <Image
        src={person.photo}
        alt={person.name}
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-full border border-black/10 object-cover"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans font-semibold text-ink">{person.name}</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-sans text-[11px] font-medium text-primary">
            {person.role}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-secondary">{person.bio}</p>
        <a
          href={person.profileUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-1.5 inline-flex items-center gap-1 font-sans text-sm font-medium text-primary hover:text-accent"
        >
          {person.profileLabel}
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
}

function formatBgDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${new Intl.DateTimeFormat("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d)} г.`;
}

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
