import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogArticles } from "@/lib/content";
import { CtaBanner } from "@/components/Sections";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Блог за преместване и дома | Хамали Ненчовски",
  description:
    "Съвети от 18 години практика: какво се носи в нова къща, как се местят тежки мебели, опаковане и подреждане на дома. Блогът на Хамали Ненчовски.",
  alternates: { canonical: `${SITE.domain}/blog/` },
};

const MONTHS_BG = [
  "януари", "февруари", "март", "април", "май", "юни",
  "юли", "август", "септември", "октомври", "ноември", "декември",
];

export default function BlogHub() {
  const articles = getBlogArticles();
  return (
    <>
      {/* Заглавна лента */}
      <section className="bg-carbon-gradient">
        <div className="mx-auto max-w-[1140px] px-4 py-14 md:py-20">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Блог</h1>
          <div className="mt-3 h-1 w-12 rounded-full bg-red-gradient" aria-hidden />
          <p className="mt-4 max-w-2xl text-white/75">
            Практични съвети за преместване, опаковане и дома — от екипа на Хамали
            Ненчовски.
          </p>
        </div>
      </section>

      {/* Статии */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1140px] px-4 py-12 md:py-16">
          <div
            data-reveal-stagger
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((a) => {
              const [y, m] = a.datePublished.split("-").map(Number);
              return (
                <Link
                  key={a.urlPath}
                  href={a.urlPath}
                  data-reveal
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-carbon-gradient">
                    {a.cover ? (
                      <Image
                        src={a.cover}
                        alt={a.coverAlt ?? a.h1}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    {a.isNew ? (
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-red-gradient px-2.5 py-1 font-sans text-xs font-bold text-white shadow-premium">
                        Ново
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-sans text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                      {a.h1}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-secondary">
                      {a.description}
                    </p>
                    <p className="mt-3 font-sans text-xs text-secondary/80">
                      {m ? `${MONTHS_BG[m - 1]} ${y} г.` : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
