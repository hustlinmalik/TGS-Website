import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/business";
import { getAllDocs, type BlogFrontmatter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Garage Cleanout Tips & Guides",
  description:
    "Helpful guides on garage cleanout costs, organization, and junk removal for Maryland, Virginia, and D.C. homeowners.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = (await getAllDocs<BlogFrontmatter>("blog")).sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Blog</h1>
        <div className="mt-10 space-y-8">
          {posts.map((p) => (
            <article key={p.slug} className="border-b border-black/10 pb-8">
              <h2 className="text-2xl font-bold text-brand-dark">
                <Link href={`/blog/${p.slug}`} className="hover:text-brand-accent">
                  {p.frontmatter.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-brand-muted">
                {new Date(p.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-3 text-brand-ink">{p.frontmatter.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="mt-3 inline-block font-semibold text-brand-accent">
                Read more →
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-brand-muted">No posts yet. Add Markdown files to /content/blog.</p>
          )}
        </div>
      </section>
    </>
  );
}
