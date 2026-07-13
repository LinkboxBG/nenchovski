"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Брояч с анимация 0→value при първо влизане в изгледа.
 * SSR/no-JS рендира директно крайната стойност (коректно за SEO).
 */
export function CountUp({ value, suffix = "", duration = 1200, className }: CountUpProps) {
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
      {display}
      {suffix ? <span className="text-primary">{suffix}</span> : null}
    </span>
  );
}
