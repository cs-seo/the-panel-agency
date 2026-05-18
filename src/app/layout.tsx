import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 56 chars, 2 emojis, no brand in title, keyword-led
  title: "Google Knowledge Panel Setup & Entity Verification 🔍✨",
  // 152 chars, exactly 3 emojis, CTR-led
  description:
    "🔍 Build a verified Google Knowledge Panel for your name. ✅ For founders, execs & investors. 📋 Confidential intake — apply for a free SERP audit.",
  keywords: [
    "google knowledge panel",
    "knowledge panel setup",
    "knowledge graph entity",
    "entity SEO",
    "verified knowledge panel",
    "knowledge panel for founders",
    "knowledge panel for authors",
    "google verification badge",
    "wikidata entity",
    "schema markup person",
  ],
  authors: [{ name: "The Panel Agency" }],
  creator: "The Panel Agency",
  publisher: "The Panel Agency",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Panel Agency",
    title: "Google Knowledge Panel Setup & Entity Verification 🔍✨",
    description:
      "🔍 Verified Google Knowledge Panels for founders, execs & public figures. ✅ Discreet entity engineering. 📋 Apply for a free SERP audit.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "The Panel Agency — Google Knowledge Panel Setup & Entity Verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Knowledge Panel Setup & Entity Verification 🔍✨",
    description:
      "🔍 Verified Google Knowledge Panels for founders & execs. ✅ Schema, signals, claim. 📋 Apply for a free SERP audit.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
};

/**
 * Organization JSON-LD — sitewide.
 * Helps Google understand the agency entity, which is doubly important for
 * an agency that itself builds Knowledge Panels.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Panel Agency",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "White-glove Google Knowledge Panel establishment and entity management for founders, executives, and public figures.",
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@thepanelagency.com",
      availableLanguage: ["en"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
