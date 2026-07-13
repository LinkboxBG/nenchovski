import Image from "next/image";
import { FOUNDER, AUTHOR, EDITOR, type Person } from "@/data/authors";

interface AuthorBoxProps {
  variant?: "service" | "article";
  dateModified?: string;
}

/**
 * E-E-A-T authority band: основателят като котва (голяма карта, първи в DOM
 * → пръв на mobile) + автор и гл. редактор като подкрепящи карти.
 */
export function AuthorBox({ variant = "service", dateModified }: AuthorBoxProps) {
  return (
    <div
      data-reveal
      className={`rounded-2xl border border-black/10 bg-soft p-5 sm:p-6 ${
        variant === "article" ? "my-10" : "my-8"
      }`}
    >
      <FounderCard person={FOUNDER} />
      <div className="mt-5 grid gap-5 border-t border-black/10 pt-5 sm:grid-cols-2">
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

/** Голямата founder карта — червен акцент, по-голям аватар. */
function FounderCard({ person }: { person: Person }) {
  return (
    <div className="flex items-start gap-4 sm:gap-5">
      <Avatar person={person} size={72} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-lg font-bold text-ink">
            {person.name}
          </span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-primary">
            {person.role}
          </span>
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
          {person.bio}
        </p>
        <ProfileLink person={person} />
      </div>
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <Avatar person={person} size={56} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans font-semibold text-ink">{person.name}</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-sans text-[11px] font-medium text-primary">
            {person.role}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-secondary">{person.bio}</p>
        <ProfileLink person={person} />
      </div>
    </div>
  );
}

/** Снимка или инициали-аватар (докато клиентът потвърди снимка). */
function Avatar({ person, size }: { person: Person; size: number }) {
  const cls = `shrink-0 rounded-full border border-black/10 object-cover`;
  if (person.photo) {
    return (
      <Image
        src={person.photo}
        alt={person.name}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={cls}
      />
    );
  }
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      className="flex shrink-0 items-center justify-center rounded-full bg-red-gradient font-sans font-bold text-white"
    >
      {initials}
    </span>
  );
}

function ProfileLink({ person }: { person: Person }) {
  return (
    <a
      href={person.profileUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="mt-1.5 inline-flex items-center gap-1 font-sans text-sm font-medium text-primary hover:text-accent"
    >
      {person.profileLabel}
      <ExternalLinkIcon />
    </a>
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
