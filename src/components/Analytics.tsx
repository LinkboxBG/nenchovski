"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 event delegation: елементи с data-ga-event="tel_click|viber_click|..."
 * изпращат събитие при клик. ceni_view се изпраща от /ceni/ страницата.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-ga-event]"
      );
      if (el && window.gtag) {
        window.gtag("event", el.dataset.gaEvent, {
          event_category: "engagement",
          event_label: el.getAttribute("href") ?? "",
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
}
