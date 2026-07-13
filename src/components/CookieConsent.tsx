"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "nen-consent";
type Consent = "granted" | "denied";

function persist(consent: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // localStorage недостъпен (private mode и т.н.) — не е фатално
  }
  window.gtag?.("consent", "update", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
  });
}

/**
 * Ненатрапчив banner за съгласие (Google Consent Mode v2).
 * Ако вече има запазен избор в localStorage — не рендерира нищо.
 * Позициониран над мобилната sticky лента (bottom-16 md:bottom-4).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      stored = null;
    }
    if (stored === "granted" || stored === "denied") return;

    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  function choose(consent: Consent) {
    persist(consent);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Съгласие за бисквитки"
      className="fixed left-0 z-[60] m-4 max-w-sm bottom-16 md:bottom-4 animate-fade-up"
    >
      <div className="rounded-2xl border border-line bg-carbon p-5 text-white shadow-premium">
        <p className="font-sans text-sm leading-relaxed text-white/80">
          Бисквитки: ползваме само аналитични (Google Analytics), за да
          подобряваме сайта.{" "}
          <Link
            href="/politika-za-poveritelnost/"
            className="underline hover:text-white"
          >
            Научи повече
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 rounded-lg bg-red-gradient px-3 py-2.5 font-sans text-sm font-semibold text-white shadow-premium transition-transform hover:-translate-y-0.5"
          >
            Приемам
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 rounded-lg border border-white/20 px-3 py-2.5 font-sans text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Само необходимите
          </button>
        </div>
      </div>
    </div>
  );
}
