import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/business";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about garage cleanout cost, timing, what happens to your items, service areas, and licensing.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "FAQ", url: `${SITE_URL}/faq` },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <dl className="mt-10 divide-y divide-black/10">
          {faqs.map((f) => (
            <div key={f.question} className="py-6">
              <dt className="text-lg font-semibold text-brand-dark">{f.question}</dt>
              <dd className="mt-2 text-brand-muted">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
      <CtaSection />
    </>
  );
}
