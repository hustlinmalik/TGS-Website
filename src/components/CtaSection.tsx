import Link from "next/link";
import { business } from "@/lib/business";

export default function CtaSection({
  heading = "Ready to reclaim your home or office?",
  sub = "Request a free, no-obligation quote. We handle everything — you don't lift a finger.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-5xl rounded-3xl bg-brand-dark px-6 py-14 text-center text-white sm:px-12">
        <h2 className="font-display text-2xl font-bold text-brand-cream sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">{sub}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={business.quotePath}
            className="rounded-full bg-brand-accent px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-brand-accent-dark"
          >
            Get a Free Quote
          </Link>
          <a
            href={`tel:${business.phoneE164}`}
            className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-brand-dark"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
