import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { FaqJsonLd } from "@/components/JsonLd";
import { business, clientTypes } from "@/lib/business";
import { getAllDocs, type ServiceFrontmatter } from "@/lib/content";
import { reviews } from "@/lib/reviews";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Garage Cleanout, Junk Removal & Organization | Columbia, MD & the DMV",
  description:
    "Professional garage cleanout, junk removal, and organization across D.C., Maryland & Virginia. Most cleanouts done in one day. Low rates, we'll beat any written quote, and free on-site quotes.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const services = (await getAllDocs<ServiceFrontmatter>("services")).sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );

  return (
    <>
      <FaqJsonLd items={faqs} />

      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Reclaim Your Garage in One Day</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Professional garage cleanout and organization serving all of Washington D.C.,
            Maryland, and Virginia. We handle everything — you don&apos;t lift a finger.
          </p>
          {/* Quick-answer block — direct, fact-dense copy that AI assistants tend to lift. */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
            Most cleanouts are done in a single day — single-car garages take 3–5 hours,
            two-car garages 4–8 hours. Pricing is based on the amount of stuff and the size of
            your space; we keep rates low and will beat any written quote.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={business.bookingUrl}
              className="rounded-md bg-brand-accent px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Book a Free Onsite Quote
            </a>
            <a
              href={`tel:${business.phoneE164}`}
              className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white hover:text-brand-dark"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-brand-dark">Our Services</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-xl border border-black/10 p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-dark">{s.frontmatter.title}</h3>
              <p className="mt-3 text-brand-muted">{s.frontmatter.shortDescription}</p>
              <span className="mt-4 inline-block font-semibold text-brand-accent">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {[
            { t: "Proudly serving the DMV", d: "Services available across Washington D.C., Maryland, and Virginia." },
            { t: `${business.yearsInBusiness} years of experience`, d: "Family-owned and operated." },
            { t: "Community-oriented", d: "Discounts available for seniors, people with disabilities, and those in need." },
          ].map((b) => (
            <div key={b.t} className="text-center">
              <h3 className="text-lg font-bold text-brand-dark">{b.t}</h3>
              <p className="mt-2 text-brand-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-brand-dark">Who We Serve</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-muted">
          We serve customers all over Washington D.C., Maryland, and Virginia — from a single
          homeowner&apos;s garage to large-scale commercial and institutional cleanouts. We&apos;re
          proudly based in Columbia, MD.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-brand-dark">What Clients Are Saying</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.author} className="rounded-xl border border-black/10 p-6">
              <blockquote className="text-lg text-brand-ink">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-dark">
                {r.author} <span className="font-normal text-brand-muted">— {r.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/reviews" className="font-semibold text-brand-accent">
            Read more reviews →
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
