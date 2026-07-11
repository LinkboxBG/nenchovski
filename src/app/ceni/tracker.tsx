"use client";

import { useEffect } from "react";
import { trackEvent } from "@/components/Analytics";

export function CeniViewTracker() {
  useEffect(() => {
    trackEvent("ceni_view");
  }, []);
  return null;
}
