import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business, clientTypes } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Garage Standard is a family-owned garage cleanout and organization company serving the DMV for 3+ years. Licensed, insured, and community-oriented.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">About The Garage Standard</h1>
        <div className="prose-content mt-8">
          <p>
            The Garage Standard is a family-owned and operated garage cleanout, junk removal, and
            organization company serving Washington D.C., Maryland, and Virginia for {business.yearsInBusiness} years.
            Our promise is simple: we handle everything, and you don&apos;t lift a finger.
          </p>
          <p>
            From a complete cleanout to custom organization and a full garage refresh, we transform
            cluttered, unusable garages into clean, functional spaces — most often in a single day.
          </p>
          <h2>Community-oriented</h2>
          <p>
            We offer discounts for seniors, people with disabilities, and those in need. Usable items
            are donated to local centers such as Goodwill and Habitat for Humanity ReStore, and
            everything else is disposed of responsibly and legally.
          </p>
          <h2>Licensed &amp; insured</h2>
          <p>We are fully licensed and insured for your protection on every job.</p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-brand-dark">Who We Serve</h2>
        <p className="mt-3 text-brand-muted">
          We serve customers all over Washington D.C., Maryland, and Virginia — from a single
          homeowner&apos;s garage to large-scale commercial and institutional cleanouts. We&apos;re
          proudly based in Columbia, MD.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {clientTypes.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-brand-soft px-4 py-3"
            >
              <span aria-hidden className="font-bold text-brand-accent">✓</span>
              <span className="text-brand-ink">{c}</span>
            </li>
          ))}
        </ul>
      </section>
      <CtaSection />
    </>
  );
}
