import Link from "next/link";
import { business, navLinks, serviceRegions } from "@/lib/business";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-cream">{business.name}</h3>
          <p className="mt-2 text-sm text-white/80">{business.tagline}</p>
          <p className="mt-4 text-sm">
            <a href={`tel:${business.phoneE164}`} className="hover:underline">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="hover:underline">
              {business.email}
            </a>
          </p>
          <p className="mt-3 text-sm text-white/70">
            Serving {business.serviceArea.join(", ")}
          </p>
          {/* Social icons render automatically once URLs are set in business.ts */}
          <SocialLinks className="mt-5" variant="dark" />
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/90 transition hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Service Areas
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceRegions.map((r) => (
              <li key={r.name} className="text-white/90">
                {r.name}
              </li>
            ))}
          </ul>
          <Link href="/locations" className="mt-3 inline-block text-sm text-white/70 hover:underline">
            View all service areas →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {business.legalName}. Fully insured.
      </div>
    </footer>
  );
}
