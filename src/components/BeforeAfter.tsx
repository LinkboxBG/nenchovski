"use client";

import Image from "next/image";
import { useRef } from "react";
import type { GalleryImage } from "@/data/enrichment";

export interface BeforeAfterPair {
  before: GalleryImage;
  after: GalleryImage;
}

/**
 * Преди/после слайдер за реални двойки снимки (почистване/къртене).
 * Чист range-input overlay: клавиатура, тъч и screen reader достъп идват
 * безплатно от нативния <input type="range">; clip-path вместо width →
 * нула layout shift. Без библиотеки.
 *
 * ВАЖНО: рендерира се само при подадени double-checked двойки от клиента —
 * НЕ сдвоявай несвързани снимки.
 */
export function BeforeAfter({
  pairs,
  title = "Преди и след",
}: {
  pairs: BeforeAfterPair[];
  title?: string;
}) {
  if (!pairs.length) return null;
  return (
    <section aria-labelledby="ba-h" className="my-12">
      <h2 id="ba-h" data-reveal className="text-2xl md:text-3xl">
        {title}
      </h2>
      <div className="mt-2 h-1 w-12 rounded-full bg-cat-gradient" aria-hidden />
      <div
        data-reveal-stagger
        className={`mt-6 grid gap-6 ${pairs.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {pairs.map((pair) => (
          <BeforeAfterFigure key={pair.after.src} pair={pair} />
        ))}
      </div>
    </section>
  );
}

function BeforeAfterFigure({ pair }: { pair: BeforeAfterPair }) {
  const figureRef = useRef<HTMLElement>(null);

  return (
    <figure
      ref={figureRef}
      data-reveal
      className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl shadow-card"
      style={{ "--ba": "50%" } as React.CSSProperties}
    >
      {/* СЛЕД (долен слой, винаги видим) */}
      <Image
        src={pair.after.src}
        alt={pair.after.alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {/* ПРЕДИ (горен слой, клипнат до --ba) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: "inset(0 calc(100% - var(--ba)) 0 0)" }}
      >
        <Image
          src={pair.before.src}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Разделител + дръжка */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: "var(--ba)" }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-premium">
          <ArrowsIcon className="h-5 w-5 text-(--cat)" />
        </span>
      </div>

      {/* Етикети */}
      <figcaption className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-3 font-sans text-xs font-bold uppercase tracking-wide text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
        <span>Преди</span>
        <span>След</span>
      </figcaption>

      {/* Контрол: невидим нативен range върху цялата фигура */}
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label="Плъзгач за сравнение преди и след"
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none opacity-0"
        onInput={(e) => {
          figureRef.current?.style.setProperty(
            "--ba",
            `${(e.target as HTMLInputElement).value}%`
          );
        }}
      />
    </figure>
  );
}

function ArrowsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
    </svg>
  );
}
