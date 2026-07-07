import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/business";
import { getAllDocs, type ServiceFrontmatter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Garage Cleanout, Organization & Refresh",
  description:
    "Complete garage cleanout and junk removal, professional organization, and garage refresh services across D.C., Maryland, and Virginia.",
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
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Our Services</h1>
        <p className="mt-3 max-w-2xl text-brand-muted">
          From a full cleanout to a complete refresh, we handle the whole job in one day.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-xl border border-black/10 p-6 transition hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-brand-dark">{s.frontmatter.title}</h2>
              <p className="mt-3 text-brand-muted">{s.frontmatter.shortDescription}</p>
              {s.frontmatter.priceNote && (
                <p className="mt-3 text-sm font-semibold text-brand-accent">
                  {s.frontmatter.priceNote}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
