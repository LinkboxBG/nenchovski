"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Групиране на хилядите с тънък интервал (3838 → „3 838"). SSR-безопасно. */
  group?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Детерминирано групиране на хилядите (еднакво на сървър и клиент). */
function groupThousands(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Брояч с анимация 0→value при първо влизане в изгледа.
 * SSR/no-JS рендира директно крайната стойност (коректно за SEO).
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1200,
  className,
  group = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;
          observer.unobserve(el);

          const start = performance.now();
          setDisplay(0);

          const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const next = Math.round(value * easeOutCubic(t));
            setDisplay(next);
            if (t < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {group ? groupThousands(display) : display}
      {suffix ? <span className="text-primary">{suffix}</span> : null}
    </span>
  );
}
