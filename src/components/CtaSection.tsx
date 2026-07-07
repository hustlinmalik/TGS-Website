import { business } from "@/lib/business";

export default function CtaSection({
  heading = "Ready to reclaim your garage?",
  sub = "Schedule a free, no-obligation on-site consultation. We handle everything — you don't lift a finger.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="bg-brand-soft">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center">
        <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-muted">{sub}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={business.bookingUrl}
            className="rounded-md bg-brand-accent px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Book a Free Onsite Quote
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            className="rounded-md border border-brand-dark px-6 py-3 font-semibold text-brand-dark hover:bg-brand-dark hover:text-white"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
