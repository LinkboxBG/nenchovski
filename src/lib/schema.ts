import { SITE } from "@/data/site";
import { FOUNDER, EDITOR } from "@/data/authors";
import { formatPrice } from "@/data/pricing";
import { PRICES } from "@/data/pricing";
import reviews from "@/data/reviews.json";

const ORG_ID = `${SITE.domain}/#organization`;

/** Sitewide MovingCompany (LocalBusiness) — рендерира се в layout */
export function movingCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: "Хамали София - Хамалчо ЕООД", // името на GMB профила
    legalName: SITE.legalName,
    url: `${SITE.domain}/`,
    logo: `${SITE.domain}/wp-content/uploads/2026/04/nenchovski-web-SMALL-header-home.png`,
    image: `${SITE.domain}/wp-content/uploads/2023/12/Хамали-София-Ненчовски-Транспорт-корица.webp`,
    telephone: `+359${SITE.phone.slice(1)}`,
    email: SITE.email,
    foundingDate: String(SITE.foundingYear),
    // Person entity: ЛИЧНИЯТ профил на основателя (не фирмените канали)
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      sameAs: [FOUNDER.profileUrl],
    },
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.street}, ${SITE.address.quarter}`,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.lat,
      longitude: SITE.address.lng,
    },
    areaServed: [
      { "@type": "City", name: "София" },
      { "@type": "Country", name: "България" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...SITE.openingHours.days],
      opens: SITE.openingHours.opens,
      closes: SITE.openingHours.closes,
    },
    // Organization entity: САМО фирмените канали (GMB + фирмен FB + IG).
    // Личните профили са в Person възлите (founder/author/reviewedBy).
    sameAs: [SITE.googleMapsUrl, SITE.social.facebook, SITE.social.instagram],
    inLanguage: "bg",
    // AggregateRating само при ≥5 реални ревюта (правилото „no fake data")
    ...(reviews.aggregate &&
    reviews.reviews.length >= 5 &&
    reviews.aggregate.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.aggregate.rating,
            reviewCount: reviews.aggregate.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function serviceSchema(opts: {
  name: string;
  url: string;
  description: string;
  priceFrom?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    url: `${SITE.domain}${opts.url}`,
    description: opts.description,
    serviceType: opts.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "София" },
    inLanguage: "bg",
    ...(opts.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: opts.priceFrom,
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: opts.priceFrom,
              priceCurrency: "EUR",
              unitText: "час",
            },
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  url: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    url: `${SITE.domain}${opts.url}`,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "bg",
    author: {
      "@type": "Person",
      name: SITE.owners.silvia,
      url: `${SITE.domain}/za-nas/`,
      sameAs: ["https://www.facebook.com/silvia.bencheva"],
    },
    // editor И reviewedBy — и двете са валидни CreativeWork свойства;
    // reviewedBy е сигналът, който Google/AI двигателите четат за ревизия.
    editor: {
      "@type": "Person",
      name: EDITOR.name,
      worksFor: { "@type": "Organization", name: "Linkbox.BG" },
      sameAs: [EDITOR.profileUrl],
    },
    reviewedBy: {
      "@type": "Person",
      name: EDITOR.name,
      worksFor: { "@type": "Organization", name: "Linkbox.BG" },
      sameAs: [EDITOR.profileUrl],
    },
    publisher: { "@id": ORG_ID },
    ...(opts.image ? { image: `${SITE.domain}${opts.image}` } : {}),
    mainEntityOfPage: `${SITE.domain}${opts.url}`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.domain}${it.url}`,
    })),
  };
}

/** Секция „Цени" на пилар страницата /hamalski-uslugi/#ceni — OfferCatalog от pricing.ts */
export function offerCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Цени на хамалски и транспортни услуги — Хамали Ненчовски",
    url: `${SITE.domain}/hamalski-uslugi/#ceni`,
    provider: { "@id": ORG_ID },
    itemListElement: PRICES.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.sofia.price,
      priceCurrency: "EUR",
      description: `${p.name}${p.capacity ? ` (${p.capacity})` : ""}: София ${formatPrice(p.sofia.price)} ${p.sofia.unit}${p.sofia.extra ? ` ${p.sofia.extra}` : ""}; страната ${formatPrice(p.country.price)} ${p.country.unit}${p.country.extra ? ` ${p.country.extra}` : ""}`,
    })),
  };
}

export function productSchema(opts: {
  name: string;
  url: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    url: `${SITE.domain}${opts.url}`,
    description: opts.description,
    ...(opts.image ? { image: `${SITE.domain}${opts.image}` } : {}),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: 0,
      availability: "https://schema.org/InStock",
      description: "Кашони и опаковъчни материали — цена според количество",
    },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "За нас — Хамали Ненчовски",
    url: `${SITE.domain}/za-nas/`,
    mainEntity: { "@id": ORG_ID },
    inLanguage: "bg",
  };
}
