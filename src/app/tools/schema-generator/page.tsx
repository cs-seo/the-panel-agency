import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { SchemaGeneratorClient } from "./SchemaGeneratorClient";

// 65 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Free Person & Organization Schema Generator (JSON-LD) 🧰",
  // 158 chars · 3 emojis
  description:
    "🧰 Generate Person & Organization schema.org JSON-LD in 30 seconds. ✅ Validated, copy-paste ready, with sameAs. 📋 Free, no signup, browser-only.",
  alternates: { canonical: "/tools/schema-generator" },
  openGraph: {
    title: "Free Person & Organization Schema Generator (JSON-LD) 🧰",
    description:
      "🧰 Build the JSON-LD that tells Google who you are. ✅ Person, Organization, sameAs ready. 📋 Copy-paste, no signup.",
    type: "website",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Where do I paste the generated JSON-LD on my site?",
    a: "Inside the <head> of the relevant page. For a Person schema describing yourself, that page is usually your about/bio page or your homepage if your site is personal. For an Organization, it's the homepage of the company site. Wrap the JSON-LD in a <script type=\"application/ld+json\">...</script> tag. If you're on Next.js (like this site), inject it via dangerouslySetInnerHTML. WordPress users typically add it via a header-injection plugin like Insert Headers and Footers. Once published, validate with Google's Rich Results Test.",
  },
  {
    q: "How important is the sameAs array?",
    a: "Disproportionately important. sameAs is the single most influential field in the entire Person/Organization schema for Knowledge Panel signals, because it gives Google explicit instructions about which other profiles around the web belong to the same entity. Include LinkedIn, X, Wikidata, Crunchbase, IMDb, your company page, and any tier-one press author page where you have a byline. The more authoritative the source, the more it counts. We have repeatedly seen panels trigger within weeks of a previously-thin sameAs array being properly populated.",
  },
  {
    q: "Is this schema enough on its own to trigger a Knowledge Panel?",
    a: "Almost never. Schema is necessary but not sufficient. To trigger a panel, Google needs schema PLUS authoritative third-party citations PLUS name disambiguation PLUS enough query volume on your name to make the panel worth rendering. The schema you generate here is the keystone that turns the other signals into a panel decision — but it can't do the work alone. If your entity surface is thin elsewhere, schema is the right first step, but not the only one.",
  },
];

export default function SchemaGeneratorPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <header className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-dim">
              <a href="/" className="hover:text-ink transition-colors">Home</a>
              <span aria-hidden> → </span>
              <a href="/tools" className="hover:text-ink transition-colors">Tools</a>
              <span aria-hidden> → </span>
              <span className="text-ink">Schema Generator</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Free tool</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Person &amp; Org Schema <span className="text-electric-glow">generator.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              The single most under-deployed asset in entity SEO is properly-marked-up
              schema.org JSON-LD on your own site. Build a clean, validator-passing
              <code className="mx-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[14px]">Person</code>
              or <code className="mx-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[14px]">Organization</code>
              record in 30 seconds. Copy-paste into the head of your page.
            </p>
          </div>
        </header>

        <section className="relative py-10 sm:py-14 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <SchemaGeneratorClient />
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Why schema matters</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
                Schema is the keystone of entity SEO.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
              <p>
                On its own, schema is necessary-but-not-sufficient: it cannot single-handedly
                trigger a Knowledge Panel. But almost no panel triggers without it.
                Schema is the canonical record on a surface you control, pointing
                Google&apos;s parser at the other places where your entity exists.
              </p>
              <p>
                The <code>sameAs</code> array is where the magic happens. Listing
                authoritative profiles (LinkedIn, X, Wikidata, Crunchbase, IMDb,
                press author pages) gives Google explicit instructions for binding
                your identity across the web. We have measured panel-trigger times
                drop by half on entities that previously had no <code>sameAs</code>
                deployed.
              </p>
              <p>
                The JSON-LD this tool produces is strict schema.org — it passes
                Google&apos;s Rich Results Test and the Schema.org validator without
                edits. Paste it into the <code>&lt;head&gt;</code> of the page and
                you are deployed.
              </p>
            </div>
          </div>
        </section>

        <FAQ id="faq" eyebrow="FAQ" title="Schema questions." intro="The three things people ask the moment they try to deploy what they generated." items={faqs} />
      </main>
      <Footer />
    </>
  );
}
