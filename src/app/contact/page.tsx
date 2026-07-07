import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description:
    "Book a free on-site consultation for garage cleanout, junk removal, or organization across the DMV. Call, email, or schedule online.",
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
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Get in Touch</h1>
        <p className="mt-3 max-w-2xl text-brand-muted">
          Schedule a free 1:1 on-site consultation to discuss your garage improvement needs.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-black/10 p-6">
            <h2 className="text-xl font-bold text-brand-dark">Contact details</h2>
            <ul className="mt-4 space-y-3 text-brand-ink">
              <li>
                Phone:{" "}
                <a className="font-semibold text-brand-accent" href={`tel:${business.phoneE164}`}>
                  {business.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a className="font-semibold text-brand-accent" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </li>
              <li>Service area: {business.serviceArea.join(", ")}</li>
            </ul>
            <a
              href={business.bookingUrl}
              className="mt-6 inline-block rounded-md bg-brand-accent px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Book a Free Onsite Quote
            </a>
          </div>

          <div className="rounded-xl border border-black/10 p-2">
            {/* Acuity Scheduling embed. Loads the existing booking flow inline. */}
            <iframe
              src={business.bookingUrl}
              title="Book an appointment with The Garage Standard"
              width="100%"
              height="650"
              frameBorder="0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
