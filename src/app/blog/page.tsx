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
      <main className="mx-auto max-w-[1140px] px-4">
        <header className="py-10">
          <h1 className="text-3xl md:text-4xl">Блог</h1>
          <p className="mt-3 text-secondary max-w-2xl">
            Практични съвети за преместване, опаковане и дома — от екипа на
            Хамали Ненчовски.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => {
            const [y, m] = a.datePublished.split("-").map(Number);
            return (
              <Link
                key={a.urlPath}
                href={a.urlPath}
                className="group flex flex-col rounded-xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
              >
                {a.cover ? (
                  <div className="relative aspect-[16/9] bg-soft">
                    <Image
                      src={a.cover}
                      alt={a.coverAlt ?? a.h1}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-sans text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                    {a.h1}
                  </h2>
                  <p className="mt-2 text-sm text-secondary leading-relaxed flex-1 line-clamp-3">
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
      </main>
      <CtaBanner />
    </>
  );
}
