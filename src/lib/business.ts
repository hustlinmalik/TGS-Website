// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for business info (NAP), services, and service areas.
// Edit this file to update the whole site's contact info, schema, and footer.
// Keep NAP (Name, Address, Phone) IDENTICAL here, on Google Business Profile,
// and on every directory listing — consistency is a real local-SEO ranking factor.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.garagestandardllc.com";

export const business = {
  name: "The Garage Standard LLC",
  legalName: "The Garage Standard LLC",
  tagline: "Reclaim Your Garage in One Day",
  // Specific schema subtype is better for local SEO than generic "LocalBusiness".
  schemaType: "HomeAndConstructionBusiness",
  description:
    "Professional garage cleanout, junk removal, and organization serving Washington D.C., Maryland, and Virginia. We handle everything — you don't lift a finger.",
  yearsInBusiness: "3+",
  email: "thegaragestandardllc@gmail.com",
  phone: "(410) 774-6002",
  phoneE164: "+14107746002",
  bookingUrl: "https://thegaragestandardllc.as.me/",

  // Brand assets. The badge logo (transparent PNG) lives at /public/logo.png.
  logo: "/logo.png",
  // Social share image (Open Graph). The logo works as a fallback; for best results
  // add a 1200×630 banner at /public/og-image.png and point this at it before launch.
  ogImage: "/logo.png",

  // Pricing message — we do NOT publish flat prices. Edit these to change the
  // wording everywhere it appears.
  pricingShort: "Low rates · we'll beat any written quote",
  pricingLong:
    "Pricing is based on the amount of stuff and the size of your space, so you only pay for the job you have. Our rates are low, we'll beat any written quote, and we're always happy to provide a free, no-obligation quote.",

  // TODO: Replace with your real business address (needed for LocalBusiness schema &
  // NAP consistency). If you don't serve customers at a physical storefront, you can
  // keep the street private and rely on `serviceArea` — but a verified address still
  // strengthens Google Business Profile. Coordinates are Columbia, MD as a placeholder.
  address: {
    street: "REPLACE_WITH_STREET_ADDRESS",
    city: "Columbia",
    region: "MD",
    postalCode: "REPLACE_WITH_ZIP",
    country: "US",
  },
  geo: { lat: 39.2037, lng: -76.8610 }, // Columbia, MD (placeholder — update if needed)

  // Hours — edit to match reality. Used in LocalBusiness schema.
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "08:00", close: "18:00" },
    { days: ["Saturday", "Sunday"], open: "09:00", close: "17:00" },
  ],

  // High-level service area (shown in schema + copy).
  serviceArea: ["Washington, D.C.", "Maryland", "Virginia"],

  social: {
    // Add real profile URLs when available — they feed schema `sameAs` and trust signals.
    google: "", // Google Business Profile URL
    facebook: "",
    instagram: "",
    yelp: "",
  },

  priceRange: "$$",
} as const;

// Broad service regions — headline areas shown on the Service Areas page and
// included in LocalBusiness schema (areaServed). We serve everywhere in between too.
export type ServiceRegion = { name: string; blurb: string };
export const serviceRegions: ServiceRegion[] = [
  {
    name: "Central Maryland",
    blurb:
      "Our home base — Howard and Montgomery counties, including Columbia, Ellicott City, Silver Spring, Rockville, and Bethesda.",
  },
  {
    name: "Washington, D.C.",
    blurb: "Rowhomes, condos, and alley garages across all four quadrants of the District.",
  },
  {
    name: "Northern Virginia",
    blurb: "Arlington, Alexandria, Fairfax, and the surrounding communities.",
  },
  {
    name: "Southern Maryland",
    blurb: "Communities south of D.C., including Charles, Calvert, and St. Mary's counties.",
  },
];

// Cities & towns across our footprint — used for SEO keyword coverage on the
// single Service Areas page and in schema. These are NOT individual pages.
export const serviceCities: string[] = [
  "Columbia",
  "Ellicott City",
  "Clarksville",
  "Elkridge",
  "Laurel",
  "Fulton",
  "Silver Spring",
  "Rockville",
  "Bethesda",
  "Gaithersburg",
  "Germantown",
  "Bowie",
  "Annapolis",
  "Arlington",
  "Alexandria",
  "Fairfax",
  "Falls Church",
  "McLean",
  "Reston",
];

// Client types we serve — shown in the "Who we serve" section. Edit freely.
export const clientTypes: string[] = [
  "Homeowners",
  "Residential Property Management",
  "Commercial Property Management",
  "Businesses and Corporations",
  "Realtors and Investors",
  "Industrial",
  "Healthcare",
  "Hotels and Resorts",
  "Storage Facilities",
  "Educational Institutions",
  "Government Agencies & Municipalities",
  "Community and Charitable Organizations",
  "Contractors",
];

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Service Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
