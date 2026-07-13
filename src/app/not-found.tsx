import Link from "next/link";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1140px] px-4 py-20 text-center">
      <p className="font-sans text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl">Страницата не е намерена</h1>
      <p className="mt-3 text-secondary max-w-md mx-auto">
        Може би търсиш нашите{" "}
        <Link href="/hamalski-uslugi/" className="text-primary underline">
          хамалски услуги
        </Link>
        ,{" "}
        <Link href="/hamalski-uslugi/#ceni" className="text-primary underline">
          цените
        </Link>{" "}
        или{" "}
        <Link href="/blog/" className="text-primary underline">
          блога
        </Link>
        ?
      </p>
      <a
        href={`tel:+359${SITE.phone.slice(1)}`}
        data-ga-event="tel_click"
        className="mt-8 inline-block rounded-lg bg-primary hover:bg-accent text-white font-sans font-bold px-6 py-3 transition-colors"
      >
        📞 {SITE.phoneDisplay}
      </a>
    </main>
  );
}
