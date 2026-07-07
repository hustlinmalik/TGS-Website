import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import SocialLinks from "@/components/SocialLinks";
import { SITE_URL, business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description:
    "Request a free quote for garage cleanout, junk removal, or organization across the DMV. Tell us about the job and we'll get back to you within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          Contact
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-dark sm:text-5xl">
          Get Your Free Quote
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">
          Tell us a little about the job and we&apos;ll get back to you within one business day
          with a free, no-obligation quote. Prefer to talk? Call or email anytime.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-brand-dark p-8 text-white">
              <h2 className="font-display text-xl font-bold text-brand-cream">
                Talk to a real person
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <span className="block text-white/60">Phone</span>
                  <a className="text-lg font-semibold hover:underline" href={`tel:${business.phoneE164}`}>
                    {business.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-white/60">Email</span>
                  <a className="font-semibold hover:underline" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </li>
                <li>
                  <span className="block text-white/60">Service area</span>
                  {business.serviceArea.join(", ")}
                </li>
              </ul>
              <SocialLinks className="mt-6" variant="dark" />
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-dark">What to expect</h2>
              <ol className="mt-4 space-y-3 text-sm text-brand-muted">
                <li className="flex gap-3">
                  <span className="font-bold text-brand-accent">1.</span>
                  Send the form — it goes straight to our inbox.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-accent">2.</span>
                  We reply within one business day to confirm a visit time.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-accent">3.</span>
                  Free on-site quote — {business.pricingShort.toLowerCase()}.
                </li>
              </ol>
            </div>
          </div>

          {/* Quote form */}
          <div id="quote" className="scroll-mt-24 rounded-2xl border border-black/10 bg-white p-6 shadow-card sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
