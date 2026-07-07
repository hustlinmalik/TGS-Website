import Link from "next/link";
import { business, navLinks } from "@/lib/business";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center" aria-label={`${business.name} — home`}>
          {/* Logo path is set by `logo` in src/lib/business.ts (/public/logo.png). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={business.logo} alt={`${business.name} logo`} className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-ink hover:text-brand-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phoneE164}`}
            className="hidden text-sm font-semibold text-brand-dark sm:inline"
          >
            {business.phone}
          </a>
          <a
            href={business.bookingUrl}
            className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
