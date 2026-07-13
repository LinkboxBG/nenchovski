"use client";

import { useEffect } from "react";
import { trackEvent } from "@/components/Analytics";

/** ceni_view — секцията „Цени" живее тук след консолидацията на /ceni/. */
export function CeniViewTracker() {
  useEffect(() => {
    trackEvent("ceni_view");
  }, []);
  return null;
}
