# Add your logo here

The site expects these files in this `public/` folder:

1. **`logo.png`** — your badge logo (the black + cream "The Garage Standard" emblem).
   - Used in the site header, the LocalBusiness schema, and social share previews.
   - PNG with a transparent background is ideal so it sits cleanly on the white header.
   - Any size works, but ~600–1200px wide keeps it crisp on high-res screens.

2. **`favicon.ico`** (optional but recommended) — the little icon in the browser tab.
   - You can generate one from the logo at a free tool like favicon.io.

3. **`og-image.png`** (optional) — a 1200×630 social-share banner. If you don't add one,
   the site falls back to `logo.png` for link previews.

Once `logo.png` is in this folder, it appears automatically in the header — no code
changes needed. To change the path or filename, edit `logo` / `ogImage` in
`src/lib/business.ts`.
