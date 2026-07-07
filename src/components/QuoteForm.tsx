"use client";

import { useState } from "react";
import { business } from "@/lib/business";

// ─────────────────────────────────────────────────────────────────────────────
// Quote request form, powered by Web3Forms (free): submissions are emailed to
// the inbox tied to the access key in src/lib/business.ts (web3formsAccessKey).
//
// Google Calendar integration: before submitting, we build a Google Calendar
// "event template" link from the visitor's preferred date + time window and
// include it as a form field. The notification email therefore contains a
// one-click "add to Google Calendar" link with the customer's name, phone,
// service, and location pre-filled.
// ─────────────────────────────────────────────────────────────────────────────

const SERVICES = [
  "Garage Cleanout",
  "Junk Removal",
  "House Cleanout",
  "Garage Cleanout + Professional Organization",
  "Garage Cleanout + Garage Refresh",
  "Not sure / something else",
];

// Label → starting hour (24h). Each visit is blocked as a 2-hour window.
const TIME_WINDOWS: Record<string, number> = {
  "Morning (8–11am)": 8,
  "Midday (11am–2pm)": 11,
  "Afternoon (2–5pm)": 14,
};

function buildCalendarLink(fields: Record<string, string>): string {
  const { name, phone, service, date, timeWindow, city } = fields;
  if (!date) return "No preferred date given — schedule manually.";
  const startHour = TIME_WINDOWS[timeWindow] ?? 9;
  const d = date.replace(/-/g, "");
  const pad = (h: number) => String(h).padStart(2, "0");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Free quote: ${service} — ${name}`,
    dates: `${d}T${pad(startHour)}0000/${d}T${pad(startHour + 2)}0000`,
    details: `Quote request from the website.\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred window: ${timeWindow}`,
    location: city,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30";
const labelCls = "block text-sm font-semibold text-brand-dark";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this hidden field.
    if (data.get("botcheck")) return;

    const fields = Object.fromEntries(
      Array.from(data.entries()).map(([k, v]) => [k, String(v)])
    );

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: business.web3formsAccessKey,
          subject: `New quote request — ${fields.name} (${fields.service})`,
          from_name: "Garage Standard Website",
          name: fields.name,
          email: fields.email, // Web3Forms uses this as the reply-to address
          phone: fields.phone,
          "Service Requested": fields.service,
          "City / Town": fields.city,
          "Preferred Date": fields.date || "None given",
          "Preferred Time": fields.timeWindow,
          "Job Details": fields.details || "—",
          "➕ Add to Google Calendar": buildCalendarLink(fields),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-2xl">✅</p>
        <h3 className="mt-2 font-display text-xl font-bold text-brand-dark">
          Request sent!
        </h3>
        <p className="mt-2 text-brand-muted">
          Thanks — we&apos;ve received your quote request and will get back to you within one
          business day. Need us sooner? Call{" "}
          <a href={`tel:${business.phoneE164}`} className="font-semibold text-brand-accent">
            {business.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-accent hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-spam field (hidden from humans) */}
      <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className={labelCls}>
            Name *
          </label>
          <input id="qf-name" name="name" required autoComplete="name" placeholder="Your name" className={`mt-1.5 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor="qf-phone" className={labelCls}>
            Phone *
          </label>
          <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(555) 555-5555" className={`mt-1.5 ${inputCls}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-email" className={labelCls}>
            Email *
          </label>
          <input id="qf-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`mt-1.5 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor="qf-city" className={labelCls}>
            City / town *
          </label>
          <input id="qf-city" name="city" required autoComplete="address-level2" placeholder="e.g. Columbia, MD" className={`mt-1.5 ${inputCls}`} />
        </div>
      </div>

      <div>
        <label htmlFor="qf-service" className={labelCls}>
          What do you need? *
        </label>
        <select id="qf-service" name="service" required className={`mt-1.5 ${inputCls}`} defaultValue="">
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-date" className={labelCls}>
            Preferred date <span className="font-normal text-brand-muted">(optional)</span>
          </label>
          <input id="qf-date" name="date" type="date" className={`mt-1.5 ${inputCls}`} />
        </div>
        <div>
          <label htmlFor="qf-time" className={labelCls}>
            Preferred time
          </label>
          <select id="qf-time" name="timeWindow" className={`mt-1.5 ${inputCls}`} defaultValue="Morning (8–11am)">
            {Object.keys(TIME_WINDOWS).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="qf-details" className={labelCls}>
          Tell us about the job <span className="font-normal text-brand-muted">(optional)</span>
        </label>
        <textarea
          id="qf-details"
          name="details"
          rows={4}
          placeholder="e.g. Two-car garage, mostly boxes and old furniture. A few heavy items."
          className={`mt-1.5 ${inputCls}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-accent px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-brand-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request My Free Quote"}
      </button>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href={`tel:${business.phoneE164}`} className="font-semibold underline">
            {business.phone}
          </a>
          .
        </p>
      )}

      <p className="text-center text-xs text-brand-muted">
        Free, no-obligation quotes. We never share your information.
      </p>
    </form>
  );
}
