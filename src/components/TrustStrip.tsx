import reviews from "@/data/reviews.json";

const ITEMS = [
  { icon: "🏆", text: "18 години опит (от 2008 г.)" },
  { icon: "🛡️", text: "Внимание към всеки товар" },
  { icon: "📍", text: "София и цялата страна" },
  { icon: "📅", text: "Работим 7 дни в седмицата" },
];

export function TrustStrip() {
  const agg = reviews.aggregate;
  return (
    <div className="bg-soft border-y border-black/5">
      <ul className="mx-auto max-w-[1140px] px-4 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-sans text-sm font-medium text-secondary">
        {ITEMS.map((it) => (
          <li key={it.text} className="flex items-center gap-2">
            <span aria-hidden>{it.icon}</span>
            {it.text}
          </li>
        ))}
        {agg?.rating ? (
          <li className="flex items-center gap-2">
            <span aria-hidden>⭐</span>
            <a
              href={agg.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary"
            >
              {String(agg.rating).replace(".", ",")} в Google ({agg.count}{" "}
              ревюта)
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
