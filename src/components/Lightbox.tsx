"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: GalleryImage[];
}

const MAX_TILES = 9;
const SWIPE_THRESHOLD = 40;

/** Клиентска решетка + <dialog> преглед на пълен размер, без външни библиотеки. */
export function Lightbox({ images }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const visible = images.slice(0, MAX_TILES);
  const extraCount = total - MAX_TILES;

  const open = useCallback((index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const goTo = useCallback(
    (delta: number) => {
      setActiveIndex((i) => (i + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(-1);
      else if (e.key === "ArrowRight") goTo(1);
      else if (e.key === "Escape" && dialog?.open) close();
    }

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [goTo, close]);

  function onBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) close();
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    touchStartX.current = e.clientX;
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  }

  const active = images[activeIndex];

  return (
    <>
      <div className="grid auto-rows-[130px] grid-cols-2 gap-2 sm:auto-rows-[150px] sm:grid-cols-3 md:auto-rows-[170px] md:grid-cols-4 md:gap-3">
        {visible.map((img, i) => {
          const isOverflowTile = i === MAX_TILES - 1 && extraCount > 0;
          return (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => open(i)}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-1 md:row-span-2" : ""
              }`}
              aria-label={`Отвори снимка ${i + 1}: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes={
                  i === 0
                    ? "(min-width: 768px) 50vw, 100vw"
                    : "(min-width: 768px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {isOverflowTile ? (
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 font-sans text-lg font-semibold text-white">
                  +{extraCount} още
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        onClose={() => {
          touchStartX.current = null;
        }}
        className="nen-lightbox m-auto max-w-[95vw] rounded-2xl border-none bg-transparent p-0 backdrop:bg-black/90"
        aria-label="Преглед на снимка"
      >
        {active ? (
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative flex max-h-[92vh] w-[min(95vw,1100px)] flex-col items-center justify-center gap-3 p-3"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Затвори"
              className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <CloseIcon />
            </button>

            {/* Пълноразмерна снимка при поискване — обикновен img, не next/image */}
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[78vh] w-auto select-none rounded-xl object-contain"
              draggable={false}
            />

            <div className="flex items-center gap-3 px-8 text-center font-sans text-sm text-white/80">
              <span className="truncate">{active.alt}</span>
              {total > 1 ? (
                <>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">
                    {activeIndex + 1} / {total}
                  </span>
                </>
              ) : null}
            </div>

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Предишна снимка"
                  className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 sm:left-2"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Следваща снимка"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 sm:right-2"
                >
                  <ChevronIcon direction="right" />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}
