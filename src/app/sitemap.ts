import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { getSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/services", "/locations", "/about", "/reviews", "/faq", "/blog", "/contact"].map(
    (p) => ({ url: `${SITE_URL}${p}`, lastModified: now })
  );

  const services = getSlugs("services").map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
  }));

  const posts = getSlugs("blog").map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...services, ...posts];
}
