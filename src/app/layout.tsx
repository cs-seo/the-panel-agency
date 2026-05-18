import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Google Knowledge Panel Setup & Entity Verification 🔍✨",
  description:
    "🔍 Build a verified Google Knowledge Panel for your name. ✅ For founders, execs & investors. 📋 Confidential intake — apply for a free SERP audit.",
  keywords: [
    "google knowledge panel",
    "knowledge panel setup",
    "knowledge graph entity",
    "entity SEO",
    "verified knowledge panel",
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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Panel Agency" }],
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
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Panel Agency",
  url: SITE_URL,
  logo: SITE_URL + "/icon.svg",
  description: "White-glove Google Knowledge Panel establishment and entity management.",
  sameAs: [] as string[],
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "hello@thepanelagency.com", availableLanguage: ["en"] }],
};

// Raw HTML form declarations for Netlify's build-time scraper.
// Injected via dangerouslySetInnerHTML so React doesn't have to render them.
const netlifyFormsHtml = `
<div hidden aria-hidden="true">
  <form name="newsletter" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="text" name="bot-field" />
    <input type="email" name="email" />
  </form>
  <form name="lead-magnet" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="text" name="bot-field" />
    <input type="text" name="name" />
    <input type="email" name="email" />
  </form>
  <form name="consult-request" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="text" name="bot-field" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="role" />
    <textarea name="brief"></textarea>
  </form>
</div>
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable + " " + GeistMono.variable}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div dangerouslySetInnerHTML={{ __html: netlifyFormsHtml }} />
        {children}
      </body>
    </html>
  );
}
