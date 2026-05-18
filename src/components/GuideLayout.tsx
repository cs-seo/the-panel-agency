import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Shared layout for long-form learn / solutions pages.
 * Handles Nav, breadcrumb, Article + Breadcrumb JSON-LD, the CTA strip,
 * and Footer — so each page file can focus on its content.
 */
export function GuideLayout({
  category, // e.g. "Learn", "Solutions"
  categoryHref = "/",
  pageTitle,
  pageHref,
  eyebrow,
  heading,
  lede,
  datePublished = "2026-05-18",
  dateModified = "2026-05-18",
  image,
  children,
  faq,
}: {
  category: string;
  categoryHref?: string;
  pageTitle: string;
  pageHref: string;
  eyebrow: string;
  heading: React.ReactNode;
  lede: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  children: React.ReactNode;
  faq?: React.ReactNode;
}) {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";
  const fullUrl = `${SITE_URL}${pageHref}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: lede,
    url: fullUrl,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/entity-graph.webp`,
    author: { "@type": "Organization", name: "The Panel Agency" },
    publisher: {
      "@type": "Organization",
      name: "The Panel Agency",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: `${SITE_URL}${categoryHref}`,
      },
      { "@type": "ListItem", position: 3, name: pageTitle, item: fullUrl },
    ],
  };

  return (
    <>
      <Nav />
      <main className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Hero */}
        <header className="relative pt-36 sm:pt-44 pb-12 sm:pb-16 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 grid-bg radial-fade opacity-50"
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-dim">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>→</li>
                <li>
                  <span className="text-ink-muted">{category}</span>
                </li>
                <li aria-hidden>→</li>
                <li className="text-ink">{pageTitle}</li>
              </ol>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              {heading}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              {lede}
            </p>
          </div>
        </header>

        {children}

        {/* CTA */}
        <section className="relative py-20 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tightest text-balance">
              Want this done <span className="text-electric-glow">for you?</span>
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed max-w-2xl mx-auto">
              NDA on submission, fixed scope after audit. Founders, executives,
              attorneys, and public figures only.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                Apply for Representation <span aria-hidden>→</span>
              </Link>
              <Link
                href="/#previewer"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-[15px] font-medium text-ink hover:bg-white/[0.06] transition-colors"
              >
                Preview your panel
              </Link>
            </div>
          </div>
        </section>

        {faq}
      </main>
      <Footer />
    </>
  );
}

export function GuideSection({
  id,
  number,
  eyebrow,
  heading,
  children,
}: {
  id?: string;
  number?: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative py-14 sm:py-20 border-t border-line/60 scroll-mt-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
          {number ? `${number} — ${eyebrow}` : eyebrow}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest text-balance">
          {heading}
        </h2>
        <div className="mt-7 space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
          {children}
        </div>
      </div>
    </section>
  );
}
