import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollFx } from "@/components/ScrollFx";
import { JsonLd } from "@/components/JsonLd";
import { movingCompanySchema } from "@/lib/schema";
import { SITE } from "@/data/site";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `Хамали София — Хамали Ненчовски | 18 години опит`,
    template: "%s",
  },
  openGraph: {
    locale: "bg_BG",
    siteName: SITE.name,
    type: "website",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${roboto.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Крие [data-reveal] само при работещ JS — crawlers/no-JS виждат всичко */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <JsonLd data={movingCompanySchema()} />
        <Header />
        <div className="flex-1 pb-16 md:pb-0">{children}</div>
        <Footer />
        <StickyMobileBar />
        <CookieConsent />
        <ScrollFx />
        <Analytics />
        {/* Google Consent Mode v2: default = denied, преди зареждане на GA.
            Ако вече има запазен избор (nen-consent=granted) — веднага update. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var nenConsent = localStorage.getItem('nen-consent');
  if (nenConsent === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}`,
          }}
        />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
