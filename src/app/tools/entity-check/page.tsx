import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { EntityCheckClient } from "./EntityCheckClient";

// 67 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Free Entity Check — Are You in Wikipedia & Wikidata? 🔍",
  // 156 chars · 3 emojis
  description:
    "🔍 Free entity check for Knowledge Panel readiness. ✅ Confirms Wikipedia & Wikidata presence in 2 seconds. 🆔 No signup, returns your entity score.",
  alternates: { canonical: "/tools/entity-check" },
  openGraph: {
    title: "Free Entity Check — Wikipedia & Wikidata Lookup 🔍",
    description:
      "🔍 Test if you exist as a recognised entity in the open knowledge graph. ✅ The 30-second diagnostic. 🆔 Free, no signup.",
    type: "website",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Why does this only check Wikipedia and Wikidata?",
    a: "Because those are the two public foundations of Google's Knowledge Graph. Wikipedia is the dominant authoritative source Google pulls bios from; Wikidata is the structured record that the Knowledge Graph reconciles entities against. Together they cover roughly 80% of the underlying signal for a person panel. Google's own Knowledge Graph API does exist but requires a separate API key and per-call pricing — we run that internally during paid audits, not in a free public tool.",
  },
  {
    q: "I'm not in Wikipedia or Wikidata. Is the panel game over for me?",
    a: "No. Most of the panels we build are for people who weren't in either when we started. The path is: build Wikidata first (lower notability bar, fully user-editable, no review process for adding entries), then build the citation graph that supports a future Wikipedia article, then deploy schema on your own site that references the new Wikidata QID. Wikidata-only is enough to trigger many Knowledge Panels, especially for founders, fund managers, and B2B executives where Wikipedia notability standards are deliberately strict.",
  },
  {
    q: "Does this check work for company names too?",
    a: "Yes, with caveats. The Wikipedia and Wikidata APIs return results for organisations as well as people. The 'entity_score' interpretation in the result is calibrated for personal entities but the underlying lookup is identical. For a brand or company check, focus on the description field returned by Wikidata — if it correctly names you as the company you are (industry, headquarters, founders), your organisation entity is already partially modelled. If the description is generic or absent, you have entity work to do.",
  },
];

export default function EntityCheckPage() {
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
              <span className="text-ink">Entity Check</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Free tool</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Are you a <span className="text-electric-glow">verified entity</span> yet?
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              The 30-second diagnostic. Type your name. We check Wikipedia and Wikidata
              live, score your entity readiness, and tell you which surface to deploy
              first. No signup, no email gate, no marketing list. Just the data.
            </p>
          </div>
        </header>

        <section className="relative py-8 sm:py-12 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6">
            <EntityCheckClient />
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— How to read your result</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
                What the score actually means.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
              <p>
                <strong>Score 100</strong> — both Wikipedia and Wikidata recognise
                you. The foundations of a Knowledge Panel are in place. If you do
                not already have a Knowledge Panel, the bottleneck is downstream
                signals (schema, citation graph, name disambiguation) — not entity
                existence.
              </p>
              <p>
                <strong>Score 50</strong> — one source sees you, the other does not.
                The most common configuration is &quot;Wikidata yes, Wikipedia
                no&quot; (Wikidata is much easier to populate). The fix is to use
                what you have, build the citation graph that supports a future
                Wikipedia article, and ensure your Wikidata entry is properly
                cross-linked.
              </p>
              <p>
                <strong>Score 0</strong> — neither source sees you. This is the
                most common starting point for our clients. The right first move is
                a clean Wikidata entry (user-editable, no review process to add).
                Wikipedia comes later, after enough press notability accumulates.
                Schema on your own site goes in parallel.
              </p>
            </div>
          </div>
        </section>

        <FAQ id="faq" eyebrow="FAQ" title="Entity check questions." intro="The three things people ask once they see their score." items={faqs} />
      </main>
      <Footer />
    </>
  );
}
