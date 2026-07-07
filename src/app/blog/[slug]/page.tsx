import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL, business } from "@/lib/business";
import { getDoc, getSlugs, type BlogFrontmatter } from "@/lib/content";

export async function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const doc = await getDoc<BlogFrontmatter>("blog", params.slug);
    const fm = doc.frontmatter;
    return {
      title: fm.metaTitle ?? fm.title,
      description: fm.metaDescription ?? fm.excerpt,
      alternates: { canonical: `/blog/${params.slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const doc = await getDoc<BlogFrontmatter>("blog", params.slug).catch(() => null);
  if (!doc) notFound();
  const fm = doc.frontmatter;
  const url = `${SITE_URL}/blog/${params.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    datePublished: fm.date,
    dateModified: fm.date,
    author: { "@type": "Organization", name: fm.author ?? business.name },
    publisher: { "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: fm.title, url },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{fm.title}</h1>
        <p className="mt-2 text-sm text-brand-muted">
          {new Date(fm.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="prose-content mt-8" dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
      </article>
      <CtaSection />
    </>
  );
}
