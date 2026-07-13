import type { CategoryId } from "@/data/categoryTheme";

/* ------------------------------------------------------------------ */
/* Локални SVG глифи (2px line, без библиотеки) — извлечени от          */
/* pillar страницата, за да се преизползват в Hero chip и секциите.     */
/* ------------------------------------------------------------------ */

export function CategoryGlyph({
  id,
  className,
}: {
  id: CategoryId;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  switch (id) {
    case "premestvane":
      return (
        <svg {...common}>
          <path d="M3 8l9-4 9 4-9 4-9-4Z" />
          <path d="M3 8v8l9 4 9-4V8" />
          <path d="M12 12v8" />
        </svg>
      );
    case "karti":
      return (
        <svg {...common}>
          <rect x="12.5" y="2.8" width="4.6" height="7.4" rx="1" transform="rotate(45 14.8 6.5)" />
          <path d="M12.2 8.8L4 17" />
          <path d="M3 21l3-3" />
        </svg>
      );
    case "pochistvane":
      return (
        <svg {...common}>
          <path d="M15 3l-4 4" />
          <path d="M11 7L5 20" />
          <path d="M11 7l6 3-4 8-7-3.2Z" />
        </svg>
      );
    case "transport":
      return (
        <svg {...common}>
          <path d="M2 7h11v9H2z" />
          <path d="M13 10h4l3 3v3h-7z" />
          <circle cx="6" cy="18" r="1.6" />
          <circle cx="17" cy="18" r="1.6" />
        </svg>
      );
  }
}

export function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}
