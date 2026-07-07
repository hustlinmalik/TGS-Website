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

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default async function HomePage() {
  const services = (await getAllDocs<ServiceFrontmatter>("services")).sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );

  return (
    <>
      <FaqJsonLd items={faqs} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        {/* Subtle warm glow behind the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(181,70,30,0.28) 0%, rgba(28,25,23,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:py-28">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-brand-cream/90">
            {["Fully Insured", "Family-Owned", `${business.yearsInBusiness} Years in the DMV`].map(
              (chip) => (
                <span key={chip} className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
                  {chip}
                </span>
              )
            )}
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-brand-cream sm:text-6xl">
            Reclaim Your Home in One Day
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Professional garage cleanout and junk removal services serving all of Washington
            D.C., Maryland, and Virginia. We handle everything — you don&apos;t lift a finger.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={business.quotePath}
              className="rounded-full bg-brand-accent px-8 py-4 font-semibold text-white shadow-lg shadow-brand-accent/25 transition hover:bg-brand-accent-dark"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${business.phoneE164}`}
              className="rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-brand-dark"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="What we do" title="Our Services" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-black/5 bg-white p-8 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {s.frontmatter.title}
              </h3>
              <p className="mt-3 text-brand-muted">{s.frontmatter.shortDescription}</p>
              <span className="mt-5 inline-block font-semibold text-brand-accent transition group-hover:translate-x-1">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-3">
          {[
            { t: "Proudly serving the DMV", d: "Services available across Washington D.C., Maryland, and Virginia." },
            { t: `${business.yearsInBusiness} years of experience`, d: "Family-owned and operated." },
            { t: "Community-oriented", d: "Discounts available for seniors, people with disabilities, and those in need." },
          ].map((b) => (
            <div key={b.t} className="text-center">
              <h3 className="font-display text-lg font-bold text-brand-dark">{b.t}</h3>
              <p className="mt-2 text-brand-muted">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="Residential & commercial" title="Who We Serve" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-brand-muted">
          We serve customers all over Washington D.C., Maryland, and Virginia — from a single
          homeowner&apos;s garage to large-scale commercial and institutional cleanouts. We&apos;re
          proudly based in Columbia, MD.
        </p>
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clientTypes.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3.5 shadow-card"
            >
              <span aria-hidden className="font-bold text-brand-accent">✓</span>
              <span className="text-brand-ink">{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="Reviews" title="What Clients Are Saying" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.author} className="rounded-2xl border border-black/5 bg-white p-8 shadow-card">
              <div aria-hidden className="text-brand-accent">★★★★★</div>
              <blockquote className="mt-3 text-lg leading-relaxed text-brand-ink">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-dark">
                {r.author} <span className="font-normal text-brand-muted">— {r.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/reviews" className="font-semibold text-brand-accent hover:underline">
            Read more reviews →
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
