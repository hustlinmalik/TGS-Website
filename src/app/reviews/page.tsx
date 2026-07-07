import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business } from "@/lib/business";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "See what DMV homeowners say about The Garage Standard's garage cleanout and organization services.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Reviews", url: `${SITE_URL}/reviews` },
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">What Clients Are Saying</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.author} className="rounded-xl border border-black/10 p-6">
              <div className="text-brand-accent" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              <blockquote className="mt-3 text-lg text-brand-ink">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-dark">
                {r.author} <span className="font-normal text-brand-muted">— {r.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center text-brand-muted">
          Worked with us recently? We&apos;d love your feedback — call {business.phone} or email{" "}
          <a className="text-brand-accent underline" href={`mailto:${business.email}`}>
            {business.email}
          </a>
          .
        </p>
      </section>
      <CtaSection />
    </>
  );
}
