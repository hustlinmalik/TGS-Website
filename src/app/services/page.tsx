import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business } from "@/lib/business";
import { getAllDocs, type ServiceFrontmatter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Garage Cleanout, Junk Removal & House Cleanout",
  description:
    "Full-service garage cleanout, residential & commercial junk removal, and whole-home house cleanouts across D.C., Maryland, and Virginia. Professional organization and garage refresh available as add-ons.",
  alternates: { canonical: "/services" },
};

export default async function ServicesIndex() {
  const services = (await getAllDocs<ServiceFrontmatter>("services")).sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">Our Services</h1>
        <p className="mt-3 max-w-2xl text-brand-muted">
          From a full cleanout to a complete refresh, we handle the whole job in one day.
        </p>
        <p className="mt-4 max-w-2xl font-semibold text-brand-accent">
          Low rates · we&apos;ll beat any written quote · free, no-obligation quotes.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-brand-muted">
          Most cleanouts are done in a single day — single-car garages take 3–5 hours,
          two-car garages 4–8 hours. Pricing is based on the amount of stuff and the size of
          your space; we keep rates low and will beat any written quote.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <h2 className="font-display text-xl font-bold text-brand-dark">
                {s.frontmatter.title}
              </h2>
              <p className="mt-3 flex-1 text-brand-muted">{s.frontmatter.shortDescription}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href={business.quotePath}
                  className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-accent-dark"
                >
                  Get a Quote
                </Link>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm font-semibold text-brand-accent hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
