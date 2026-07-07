"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business, navLinks } from "@/lib/business";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${business.name} — home`}
          onClick={() => setOpen(false)}
        >
          {/* Logo path is set by `logo` in src/lib/business.ts (/public/logo.png). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={business.logo} alt={`${business.name} logo`} className="h-16 w-auto sm:h-[4.5rem]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-brand-accent" : "text-brand-ink hover:text-brand-accent"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phoneE164}`}
            className="hidden text-sm font-semibold text-brand-dark hover:text-brand-accent md:inline"
          >
            {business.phone}
          </a>
          <Link
            href={business.quotePath}
            className="hidden rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-accent-dark sm:inline-block"
          >
            Free Quote
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-md text-brand-dark lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-black/5 bg-white px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-brand-ink hover:bg-brand-soft"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={business.quotePath}
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-accent px-5 py-3 text-center font-semibold text-white"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${business.phoneE164}`}
              className="rounded-full border border-brand-dark/20 px-5 py-3 text-center font-semibold text-brand-dark"
            >
              Call {business.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
