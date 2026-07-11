import { SITE } from "@/data/site";

/** Фиксирана долна лента — само мобилно. 📞 + Viber + оферта. */
export function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-black/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 divide-x divide-black/5 font-sans text-sm font-semibold">
        <a
          href={`tel:+359${SITE.phone.slice(1)}`}
          data-ga-event="tel_click"
          className="flex items-center justify-center gap-1.5 py-3 text-primary"
        >
          📞 Обади се
        </a>
        <a
          href={`viber://chat?number=%2B${SITE.viber.slice(1)}`}
          data-ga-event="viber_click"
          className="flex items-center justify-center gap-1.5 py-3 text-[#7360f2]"
        >
          Viber
        </a>
        <a
          href="/porachai/"
          className="flex items-center justify-center gap-1.5 py-3 bg-primary text-white"
        >
          Оферта
        </a>
      </div>
    </div>
  );
}
