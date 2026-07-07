import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/CtaSection";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/business";
import { getDoc, getSlugs, type ServiceFrontmatter } from "@/lib/content";

export async function generateStaticParams() {
  return getSlugs("services").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const doc = await getDoc<ServiceFrontmatter>("services", params.slug);
    const fm = doc.frontmatter;
    return {
      title: fm.metaTitle ?? fm.title,
      description: fm.metaDescription ?? fm.shortDescription,
      alternates: { canonical: `/services/${params.slug}` },
    };
  } catch {
    return {};
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const doc = await getDoc<ServiceFrontmatter>("services", params.slug).catch(() => null);
  if (!doc) notFound();
  const fm = doc.frontmatter;
  const url = `${SITE_URL}/services/${params.slug}`;

  return (
    <>
      <ServiceJsonLd name={fm.title} description={fm.shortDescription} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: fm.title, url },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 text-lg text-brand-muted">{fm.shortDescription}</p>
        {fm.priceNote && (
          <p className="mt-2 font-semibold text-brand-accent">{fm.priceNote}</p>
        )}
        <div
          className="prose-content mt-8"
          dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
        />
      </article>
      <CtaSection />
    </>
  );
}
