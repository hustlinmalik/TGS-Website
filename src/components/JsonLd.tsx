// ─────────────────────────────────────────────────────────────────────────────
// Structured data (JSON-LD). This is the shared engine for both Google rich
// results and AI-search (GEO) citations. Render the relevant schema on each page.
// Schema must be identical on mobile and desktop — server-rendered here, so it is.
// ─────────────────────────────────────────────────────────────────────────────
import { business, SITE_URL, serviceRegions, serviceCities } from "@/lib/business";
import { aggregateRating } from "@/lib/reviews";
import type { FaqItem } from "@/lib/faq";

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    logo: `${SITE_URL}${business.logo}`,
    image: `${SITE_URL}${business.ogImage}`,
    telephone: business.phoneE164,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: [
      ...serviceRegions.map((r) => ({ "@type": "AdministrativeArea", name: r.name })),
      ...serviceCities.map((c) => ({ "@type": "City", name: c })),
    ],
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    },
    sameAs: Object.values(business.social).filter(Boolean),
  };
  return <JsonLdScript data={data} />;
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: business.serviceArea.map((a) => ({ "@type": "AdministrativeArea", name: a })),
  };
  return <JsonLdScript data={data} />;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLdScript data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <JsonLdScript data={data} />;
}
