import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { business, SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} | Garage Cleanout & Junk Removal in the DMV`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: business.name,
    description: business.description,
    url: SITE_URL,
    images: [{ url: business.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.description,
    images: [business.ogImage],
  },
  icons: { icon: "/logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocalBusinessJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
