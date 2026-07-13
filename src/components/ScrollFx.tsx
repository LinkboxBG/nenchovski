"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";
const STAGGER_SELECTOR = "[data-reveal-stagger]";
const STAGGER_STEP = 0.08;
const STAGGER_CAP = 0.4;

/**
 * Мотор за scroll-reveal анимациите (виж globals.css за CSS частта).
 * Монтира се веднъж в layout-а. Не рендира нищо — само наблюдава DOM-а.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    // Скрол най-горе при смяна на страница. App Router вика scrollTo(0,0), но
    // глобалният scroll-behavior:smooth (globals.css) го анимира и [data-reveal]
    // височинните промени го прекъсват мид-страница. behavior:"instant" бие CSS-а.
    // Пропускаме, ако URL има #котва → оставяме котвената навигация (напр. #ceni).
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Стъпка 1: разпредели --reveal-delay на децата на [data-reveal-stagger].
    const staggerParents = document.querySelectorAll<HTMLElement>(STAGGER_SELECTOR);
    staggerParents.forEach((parent) => {
      let step = 0;
      Array.from(parent.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (!child.hasAttribute("data-reveal")) return;
        const delay = Math.min(step * STAGGER_STEP, STAGGER_CAP);
        child.style.setProperty("--reveal-delay", `${delay}s`);
        step += 1;
      });
    });

    const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
      if (el.classList.contains("is-inview")) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
