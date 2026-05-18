import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { RiskScoreClient } from "./RiskScoreClient";

// 67 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Free Knowledge Panel Verification Risk Score 🛡️ Test Yours",
  // 158 chars · 3 emojis
  description:
    "🛡️ Free Knowledge Panel risk score. ✅ Scored 0-100 from Wikipedia + Wikidata signals. 📊 See exactly which entity layers need work. No signup.",
  alternates: { canonical: "/tools/verification-risk-score" },
  openGraph: {
    title: "Free Knowledge Panel Verification Risk Score 🛡️",
    description:
      "🛡️ Score your entity stack 0-100 against the Knowledge Graph foundations. ✅ Five-signal breakdown. 📊 Free, no signup.",
    type: "website",
  },
};

const faqs: FAQItem[] = [
  {
    q: "How does this differ from the Entity Check tool?",
    a: "The Entity Check is binary — does Wikipedia know you, yes or no — and treats each source independently. The Verification Risk Score weighs five different layers (Wikipedia presence, Wikidata presence, sameAs density, image asset coverage, bio strength) into a single 0-100 score with a four-band verdict (Low / Moderate / High / Critical risk). It also fetches deeper data from Wikidata — sitelinks across languages, image claims, structured description quality — that the basic check doesn't probe. Use Entity Check for a 30-second yes/no diagnosis; use the Risk Score when you want to know what to fix.",
  },
  {
    q: "Why isn't Google Knowledge Graph included as a direct signal?",
    a: "Google's Knowledge Graph Search API requires a Google Cloud API key with per-call pricing, and would expose us to abuse if offered freely. We probe the Wikipedia + Wikidata foundations because those are the two public, free, and authoritative inputs that Google's own graph derives most of its facts from. In practice, a Wikipedia-and-Wikidata signal is roughly 75-80% predictive of Google Knowledge Graph status. For the remaining accuracy, we run the Knowledge Graph API as part of paid strategist audits.",
  },
  {
    q: "Can a low risk score guarantee I'll get a Knowledge Panel?",
    a: "No. A low risk score (high entity-stack strength) means the foundations are in place — but the path from foundations to a rendered panel also depends on factors this tool doesn't measure: name uniqueness, search query volume, time accumulated since signals went live, and Google's own confidence thresholds (which move). Most clients with a Low band score on this tool DO have a Knowledge Panel; the exceptions are usually about disambiguation against same-name namesakes, which needs a human read.",
  },
];

export default function RiskScorePage() {
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
              <span className="text-ink">Verification Risk Score</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Free tool</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              How <span className="text-electric-glow">verifiable</span> are you?
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              Score your entity stack against the five foundation layers Google uses
              to decide whether you exist as a verifiable entity. Wikipedia, Wikidata,
              cross-language coverage, image assets, and bio strength — weighted into
              a single 0-100 number, with a per-layer breakdown of what to fix first.
            </p>
          </div>
        </header>

        <section className="relative py-8 sm:py-12 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6">
            <RiskScoreClient />
          </div>
        </section>

        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Risk score questions."
          intro="The three things people ask after running their first audit."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
