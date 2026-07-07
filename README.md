# The Garage Standard — Website

Next.js (App Router) + TypeScript + Tailwind CSS. Content is managed as Markdown
files in this repo — **GitHub is your CMS**. Edit a file, commit, and Vercel
rebuilds and deploys automatically.

---

## Quick start (local)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Requires Node 18.18+ (Node 20 LTS recommended).

---

## How to edit content (no code required)

You can edit these directly in GitHub's web editor (pencil icon → commit), or locally.

| What you want to change | File / folder |
|---|---|
| Phone, email, address, hours, social links, service areas | `src/lib/business.ts` |
| Brand colors | `tailwind.config.ts` (the `brand` colors) |
| FAQ questions/answers | `src/lib/faq.ts` |
| Testimonials + star rating | `src/lib/reviews.ts` |
| A service page | `content/services/<name>.md` |
| Service areas (regions + city list) | `serviceRegions` / `serviceCities` in `src/lib/business.ts` |
| A blog post | add a file in `content/blog/` |

Each Markdown file starts with a **frontmatter** block between `---` lines (title,
description, etc.), followed by the page body in Markdown. Copy an existing file as
a template when adding a new one.

### Changing service areas
There is a single Service Areas page (`/locations`) — no per-city pages. To adjust
coverage, edit `src/lib/business.ts`:
- `serviceRegions` — the broad regions (D.C., Northern Virginia, Southern Maryland, etc.),
  each with a short blurb. Also feeds LocalBusiness schema.
- `serviceCities` — a flat list of towns shown as tags for SEO keyword coverage.
Both update the Service Areas page, the footer, and schema automatically.

### Adding a blog post
Create `content/blog/my-post.md`:
```md
---
title: My Post Title
date: 2026-07-01
excerpt: One-sentence summary used in listings and meta description.
author: The Garage Standard
---

## A heading
Your content here...
```

---

## Before you launch — checklist

- [ ] Add your logo as `public/logo.png` (see `public/ADD-LOGO-HERE.md`). Optionally
      add `public/favicon.ico` and a `public/og-image.png` social banner.
- [ ] Set the real street address + ZIP in `src/lib/business.ts` (`address`) for
      LocalBusiness schema and NAP consistency. Update `geo` coordinates too.
- [ ] Confirm business hours in `business.ts`.
- [ ] Add real social/Google Business Profile URLs in `business.social`
      (feeds schema `sameAs`).
- [ ] Update `aggregateRating` in `src/lib/reviews.ts` to your true rating/count.
- [ ] Replace brand colors in `tailwind.config.ts` with your final palette.
- [ ] Build the **301 redirect map** in `next.config.mjs` from your old Squarespace
      URLs (pull them from Google Search Console + the old sitemap). Every old URL
      must 301 to its closest new page so rankings carry over.
- [ ] Verify `SITE_URL` in `src/lib/business.ts` matches your production domain.

---

## Media & assets (important)

**Do not commit photos or videos to this repo.** Keep the repo small and fast.
- **Images:** use Next.js `<Image>` with a host like Cloudinary, or Vercel image
  optimization. Add the image host to `images.remotePatterns` in `next.config.mjs`.
- **Video:** embed from YouTube/Vimeo. Never store video files in git.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **New Project → Import** the repo. Framework preset auto-detects
   Next.js; no build settings changes needed.
3. Deploy. Every push to your main branch auto-deploys; pull requests get preview URLs.
4. Add your custom domain in **Vercel → Project → Settings → Domains** and update
   DNS at your registrar. Lower the DNS TTL beforehand for a fast cutover.
5. After go-live, submit `https://yourdomain.com/sitemap.xml` in Google Search
   Console and Bing Webmaster Tools.

---

## SEO / GEO features already built in

- Per-page metadata (title, description, canonical, Open Graph, Twitter).
- `sitemap.xml` and `robots.txt` generated automatically (`src/app/sitemap.ts`,
  `src/app/robots.ts`).
- JSON-LD structured data (`src/components/JsonLd.tsx`): LocalBusiness (site-wide),
  Service (service pages), FAQPage (home + FAQ), Review/AggregateRating,
  Article (blog), and BreadcrumbList. Identical on mobile and desktop.
- Fact-dense "quick answer" copy and prompt-aligned FAQs to support AI-search (GEO)
  citations.
- Service pages, a consolidated Service Areas page, and a blog — one strong page per search intent.

---

## Project structure

```
content/                 # ← your editable content (Markdown)
  services/  blog/
src/
  app/                   # routes (App Router)
    services/[slug]/   blog/[slug]/   locations/ (single Service Areas page)
    sitemap.ts  robots.ts  layout.tsx  page.tsx
  components/            # Header, Footer, CtaSection, JsonLd
  lib/                   # business.ts (NAP), content.ts (md loader), faq.ts, reviews.ts
```
