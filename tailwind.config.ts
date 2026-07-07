import type { Config } from "tailwindcss";

// Brand palette — built around the logo (warm near-black + cream) with a
// rust-orange accent for calls-to-action. Edit hex values here to tune.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#1C1917",       // warm near-black (logo field) — primary
          cream: "#E8DFCB",      // logo lettering / on-dark text
          soft: "#F4EFE4",       // light section background
          accent: "#B5461E",     // rust-orange — CTAs & links
          "accent-dark": "#8F3616", // accent hover
          ink: "#1C1917",        // body text
          muted: "#6B6459",      // secondary text (warm gray)
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "Arial", "sans-serif"],
        // Condensed industrial display (Oswald) for headings — echoes the garage/
        // automotive feel of the badge logo.
        display: ["var(--font-display)", "'Arial Narrow'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Soft layered shadow for cards — subtler than Tailwind's defaults.
        card: "0 1px 2px rgba(28,25,23,0.06), 0 8px 24px -8px rgba(28,25,23,0.12)",
        "card-hover":
          "0 2px 4px rgba(28,25,23,0.08), 0 16px 40px -12px rgba(28,25,23,0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
