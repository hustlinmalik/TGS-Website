# The Garage Standard — Website Project Context

A running summary of what this project is, the decisions behind it, where everything
lives, and what's left to do. Read this first before making future changes. For
hands-on "how to edit" steps, see `README.md` (this file is the *why* and the *history*).

_Last updated: July 2026._

---

## 1. What this is

A full rebuild of the website for **The Garage Standard LLC**, a garage cleanout, junk
removal, and organization business based in **Columbia, MD**, serving the greater DMV.

- **Old site:** was on **Squarespace** at `garagestandardllc.com` (originally assumed to
  be WordPress — it wasn't). Being fully replaced; no old content is kept.
- **New site:** Next.js app deployed to **Vercel**, with content managed as Markdown files
  in this GitHub repo ("GitHub as CMS").
- **Goal:** be the top result in Google, the Google Map Pack, and AI assistants
  (ChatGPT, Gemini, Perplexity, Copilot) for garage cleanout / junk removal in the DMV.

### Business facts (source of truth: `src/lib/business.ts`)
- Phone: **(410) 774-6002** · Email: **thegaragestandardllc@gmail.com**
- Booking: **Acuity** — https://thegaragestandardllc.as.me/
- Based in Columbia, MD; serves D.C., Maryland, and Virginia.
- Family-owned, 3+ years, licensed & insured. Discounts for seniors, people with
  disabilities, and those in need. Donates usable items to Goodwill / Habitat ReStore.

---

## 2. Key decisions (and why)

| Decision | Choice | Why |
|---|---|---|
| Leave Squarespace | Yes | Wanted full control of SEO, schema, and performance |
| Framework | **Next.js 14 (App Router) + TypeScript + Tailwind** | Best Core Web Vitals, full schema/metadata control, first-class on Vercel, room to grow into app features |
| Content management | **Markdown in the repo (GitHub as CMS)** — no paid CMS for now | Free, version-controlled; add a free git-based CMS (Decap) later only if non-technical editing is needed |
| Hosting | **Vercel** | Native Next.js host: global CDN, auto previews, image optimization |
| Pricing display | **No dollar amounts** | Priced by amount of stuff/space; "low rates, we'll beat any written quote, free quotes" |
| Service areas | **One consolidated page**, not per-city pages | Per-city pages felt like overkill and risk thin/duplicate content |

---

## 3. Tech stack & how content flows

- **Next.js App Router** renders every page as fast, server-rendered HTML.
- **Content** lives as Markdown in `/content` (services, blog) plus structured data files
  in `/src/lib` (business info, FAQ, reviews, service areas).
- Edit a file → commit → push → **Vercel rebuilds and deploys automatically.**
- Markdown is parsed by `src/lib/content.ts` (gray-matter + remark).

---

## 4. Where everything lives (edit map)

| To change… | Edit… |
|---|---|
| Phone, email, address, hours, social links, logo path | `src/lib/business.ts` (the `business` object) |
| Pricing message | `src/lib/business.ts` → `pricingShort` / `pricingLong` |
| "Who we serve" client types | `src/lib/business.ts` → `clientTypes` (shows on Home + About) |
| Service areas (regions + city list) | `src/lib/business.ts` → `serviceRegions` / `serviceCities` |
| Brand colors | `tailwind.config.ts` → `brand` colors |
| FAQ questions/answers | `src/lib/faq.ts` |
| Testimonials + star rating | `src/lib/reviews.ts` |
| A service page (Cleanout, Organization, Refresh) | `content/services/<name>.md` |
| A blog post | add a file in `content/blog/` |
| 301 redirects from old URLs | `vercel.json` |
| Structured data (schema) | `src/components/JsonLd.tsx` |

### Pages that exist
Home (`/`), Services index + 3 dynamic service pages (`/services`, `/services/[slug]`),
**single** Service Areas page (`/locations`), About (`/about`), Reviews (`/reviews`),
FAQ (`/faq`), Blog + posts (`/blog`, `/blog/[slug]`), Contact w/ Acuity embed (`/contact`).

---

## 5. Content & messaging decisions

- **Pricing:** never publish flat prices anywhere. Standard line: *"Pricing is based on the
  amount of stuff and the size of your space… our rates are low, we'll beat any written
  quote, and we're always happy to provide a free, no-obligation quote."* Centralized in
  `business.ts` (`pricingLong` / `pricingShort`). The cost blog post keeps its
  "how much does it cost" title for SEO but answers without numbers.
- **Who we serve:** 13 client types (Homeowners, Residential/Commercial Property
  Management, Businesses & Corporations, Realtors & Investors, Industrial, Healthcare,
  Hotels & Resorts, Storage Facilities, Educational Institutions, Government/Municipalities,
  Community & Charitable Orgs, Contractors). Shown on **Home and About**.
- **Service areas:** based in Columbia; serves all of DC/MD/VA "and everywhere in between."
  Broad regions = **Central Maryland, Washington D.C., Northern Virginia, Southern Maryland**
  (Central MD was added since it's the home base — remove/rename freely). Plus a tag list of
  ~19 towns for SEO keyword coverage. All on one page; no individual town pages.

---

## 6. Branding

- **Logo:** vintage black badge with cream "THE GARAGE STANDARD" lettering. The real
  transparent PNG is in place at `public/logo.png` (path set by `logo` in `business.ts`).
  Wired into the header, LocalBusiness schema, and social-share preview.
- **Palette** (in `tailwind.config.ts`), built around the logo:
  - `brand.dark` `#1C1917` (warm near-black) — primary
  - `brand.cream` `#E8DFCB` — logo lettering / on-dark text
  - `brand.soft` `#F4EFE4` — light section backgrounds
  - `brand.accent` `#B5461E` (rust-orange) — all CTAs & links
  - `brand.muted` `#6B6459` — secondary text
- A serif display font option (`font-display`) is available to echo the logo lettering.

---

## 7. SEO / GEO features already built in

- Per-page metadata: unique titles, descriptions, canonicals, Open Graph + Twitter cards.
- Auto-generated `sitemap.xml` (`src/app/sitemap.ts`) and `robots.txt` (`src/app/robots.ts`).
- **JSON-LD schema** (`src/components/JsonLd.tsx`), identical on mobile & desktop:
  LocalBusiness (site-wide, with logo/image/areaServed), Service, FAQPage, Review /
  AggregateRating, Article (blog), BreadcrumbList.
- GEO tactics: fact-dense "quick answer" copy in the hero, prompt-aligned FAQ questions.
- **Media rule:** keep images/video **out of the repo**. Use Vercel image optimization or
  Cloudinary for images; embed video from YouTube/Vimeo. (GitHub isn't for serving media.)

---

## 8. Deployment

- **GitHub repo:** `TGS-Website` (github.com/hustlinmalik/TGS-Website). The repo root **is**
  the `garage-standard-web` folder, so Vercel auto-detects Next.js with no config.
- **Vercel:** project created and connected to the repo. Every push to `main` auto-deploys;
  the first Vercel build is also the real `npm run build` test (can't run it in this
  environment).
- **`vercel.json`:** holds the **301 redirects** from the 7 old Squarespace URLs
  (`/home`→`/`, `/scheduling` `/scheduling-old` `/book-appointments`→`/contact`, and three
  leftover template pages `/sauce-slice` `/sofia-pazari` `/collette-noll`→`/`) plus baseline
  security headers. `next.config.mjs` intentionally has no redirects — `vercel.json` is the
  single source of truth.
- **Deploy vs DNS cutover — important distinction:**
  - Pushing/deploying only affects the Vercel `.vercel.app` URL. It does **not** change
    `garagestandardllc.com`, which still serves Squarespace until DNS changes.
  - **DNS cutover** = pointing `garagestandardllc.com` at Vercel. That's the moment the new
    site replaces the old one. Redirects only fire after the domain is on Vercel.

---

## 9. Outstanding TODOs

**Before the site looks complete / before launch:**
- [x] Logo added at `public/logo.png`. (Optional: add a dedicated `favicon.ico` and a
      1200×630 `og-image.png` social banner.)
- [ ] Set real **street address + ZIP** in `business.ts` (for LocalBusiness schema / NAP).
- [ ] Confirm business **hours** in `business.ts`.
- [ ] Add real **Google Business Profile + social URLs** in `business.social` (schema `sameAs`).
- [ ] Update `aggregateRating` in `src/lib/reviews.ts` to the true rating/count.
- [ ] Push the pending `vercel.json` commit and confirm the Vercel build is green.

**Launch (domain switch):**
- [ ] In Vercel, add `garagestandardllc.com` and update DNS at the registrar to point to Vercel.
- [ ] Verify redirects fire (e.g., `/scheduling` → `/contact`) on the live domain.
- [ ] Submit the new sitemap in Google Search Console + Bing Webmaster Tools.
- [ ] Cancel Squarespace once everything is confirmed.

**Ongoing growth (from the project plan):**
- [ ] Optimize Google Business Profile (primary category is the #1 Map Pack factor).
- [ ] Build/clean directory citations with consistent NAP.
- [ ] Launch a review-request workflow (reviews are the strongest local trust signal).
- [ ] Keep publishing helpful, fact-dense content on a light cadence.

---

## 10. Related files
- `README.md` — how to run locally, edit content, and deploy.
- `../The_Garage_Standard_Website_SEO_Project_Plan.docx` — the full strategy/plan doc
  (audit, tech-stack comparison, SEO/GEO strategy, phases, migration checklist).
- `public/ADD-LOGO-HERE.md` — logo/favicon/OG instructions.

---

## 11. Change history (this build)
1. Researched 2026 SEO/GEO best practices and WP/Squarespace→Vercel migration; produced the
   Word project plan.
2. Scaffolded the Next.js + TS + Tailwind app; content as Markdown; full page set.
3. Built JSON-LD schema, sitemap, robots, metadata; populated real business content.
4. Chose Next.js (Option B) + GitHub-as-CMS; documented CMS-vs-git tradeoffs.
5. Added logo wiring + rebranded palette around the badge (black/cream/rust).
6. Removed all published prices → value-based pricing message (centralized).
7. Added "Who we serve" (Home + About).
8. Consolidated service areas to one page; added broad regions + city tag list for SEO;
   removed per-city pages.
9. Initialized git, first commit; connected GitHub repo `TGS-Website` and Vercel project.
10. Added `vercel.json` (301 redirects from the live Squarespace sitemap + security headers).
