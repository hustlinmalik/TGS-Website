import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business, serviceRegions, serviceCities } from "@/lib/business";

export const metadata: Metadata = {
  title: "Service Areas — Garage Cleanout Across D.C., Maryland & Virginia",
  description:
    "Based in Columbia, MD, The Garage Standard provides garage cleanout, junk removal, and organization across Washington D.C., Northern Virginia, and Maryland — and everywhere in between.",
  alternates: { canonical: "/locations" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Service Areas", url: `${SITE_URL}/locations` },
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Service Areas</h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">
          Based in Columbia, Maryland, we serve customers all over Washington D.C., Maryland, and
          Virginia — and everywhere in between. No matter where you are in the DMV, we&apos;ll come
          to you, clear the space, and haul everything away, usually in a single day.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-brand-dark">Regions we serve</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {serviceRegions.map((r) => (
            <div key={r.name} className="rounded-xl border border-black/10 bg-brand-soft p-5">
              <h3 className="text-lg font-bold text-brand-dark">{r.name}</h3>
              <p className="mt-2 text-brand-muted">{r.blurb}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-brand-dark">Cities &amp; towns we serve</h2>
        <p className="mt-3 text-brand-muted">
          We regularly work in these communities and the surrounding areas:
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {serviceCities.map((c) => (
            <li
              key={c}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-brand-ink"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-brand-muted">
          Don&apos;t see your town? We serve the areas in between, too — just give us a call at{" "}
          <a className="font-semibold text-brand-accent" href={`tel:${business.phoneE164}`}>
            {business.phone}
          </a>{" "}
          and we&apos;ll let you know.
        </p>
      </section>
      <CtaSection />
    </>
  );
}
