import { NextRequest, NextResponse } from "next/server";
import { GONE_410, REDIRECTS_301 } from "@/data/redirects.generated";

/**
 * 1) 410 Gone за всички хак-спам URL-и (точен списък от FINAL-REDIRECT-MAP
 *    + шаблони за цели спам-директории).
 * 2) Staging noindex: на *.vercel.app всичко получава X-Robots-Tag noindex
 *    и robots.txt забранява всичко — на nenchovski.com автоматично отпада.
 */

const GONE_SET = new Set(GONE_410.map((p) => p.replace(/\/$/, "")));

// next.config redirects() не мачва кирилски sources → тези 301-ци се
// обслужват тук с decoded сравнение (латинските остават в next.config).
const REDIRECT_MAP = new Map(
  REDIRECTS_301.map((r) => [r.source.replace(/\/$/, ""), r.destination])
);

// Директории, които съществуваха САМО заради хака (без запазените изключения)
const GONE_PATTERNS = [
  /^\/news\//,
  /^\/post\//,
  /^\/1\//,
  /^\/2\//,
  /^\/author\//,
  /^\/category\//, // легитимните /category/* са 301-нати в next.config преди proxy-то
  /^\/ai-news\//,
  /^\/casino\//,
  /^\/crazy-time\//,
  /^\/1winrussia\//,
  /^\/1xbet-casino-bd\//,
  /^\/22bet\//,
  /^\/22bet-it\//,
  /^\/king-johnnie\//,
  /^\/basaribet\//,
  /^\/plinko\//,
  /^\/verde-casino-hungary\//,
  /^\/casino-zonder-crucks-netherlands\//,
];

// /sale-day/* е спам директория, НО /sale-day/links-booster/ се пази
const SALE_DAY_KEEP = "/sale-day/links-booster";

function isGone(pathname: string): boolean {
  const p = decodeSafe(pathname).replace(/\/$/, "");
  if (GONE_SET.has(p)) return true;
  if (p.startsWith("/sale-day/") && p !== SALE_DAY_KEEP) return true;
  return GONE_PATTERNS.some((re) => re.test(p + "/"));
}

function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const isStaging = host.endsWith(".vercel.app");

  const decoded = decodeSafe(pathname).replace(/\/$/, "");
  const redirectTarget = REDIRECT_MAP.get(decoded);
  if (redirectTarget) {
    const url = new URL(encodeURI(redirectTarget), request.nextUrl.origin);
    return NextResponse.redirect(url, 301);
  }

  if (isGone(pathname)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (isStaging && pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const response = NextResponse.next();
  if (isStaging) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: [
    // прескачаме статичните активи на Next; wp-content остава (може да е 410 target? не — keep-asset)
    "/((?!_next/|favicon.ico|images/|wp-content/|og/).*)",
  ],
};
