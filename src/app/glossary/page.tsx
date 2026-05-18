import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import {
  KnowledgePanelMock,
  FeaturedSnippetMock,
  PeopleAlsoAskMock,
  AiOverviewMock,
  SiteLinksMock,
} from "@/components/SerpMocks";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Google Search Features Glossary 🔍 Visual Guide & Definitions",
  description:
    "🔍 Google search features explained — Knowledge Panel, Knowledge Graph, Featured Snippet, People Also Ask, AI Overview, Sitelinks, KGMID. ✅ With live visual mocks. 📖",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "Google Search Features Glossary 🔍 Visual Guide",
    description:
      "🔍 Every Google SERP feature explained with live visual mocks. ✅ Knowledge Panel, Knowledge Graph, AI Overview, PAA. 📖 Free reference.",
    type: "website",
  },
};

const entries = [
  { href: "/glossary/knowledge-panel", title: "Knowledge Panel", blurb: "The information card Google renders for recognised people, companies, and works. The single most valuable surface in entity SEO." },
  { href: "/glossary/knowledge-graph", title: "Knowledge Graph", blurb: "Google's internal database of entities and their relationships — the engine that powers Knowledge Panels, AI overviews, and entity-based search." },
  { href: "/glossary/featured-snippet", title: "Featured Snippet", blurb: "The answer box that appears above the organic results, lifting a passage of text from a specific page. Sometimes called 'position zero.'" },
  { href: "/glossary/people-also-ask", title: "People Also Ask", blurb: "The expandable Q&A cluster that surfaces queries Google believes searchers want answered next on the same topic." },
  { href: "/glossary/ai-overview", title: "AI Overview", blurb: "Google's AI-generated summary at the top of the SERP — citing multiple sources, replacing the old featured snippet for many queries." },
  { href: "/glossary/site-links", title: "Site Links", blurb: "The grid of secondary links that appear under a top organic result — usually for brand-name queries Google deems navigationally significant." },
  { href: "/glossary/kgmid", title: "KGMID", blurb: "Knowledge Graph Machine ID — the stable internal identifier Google assigns to every recognised entity. The most reliable canonical reference for entity SEO." },
] as const;

const faqs: FAQItem[] = [
  {
    q: "Why does this matter for an SEO agency?",
    a: "Because in 2026, the most valuable surfaces on a Google search result page are no longer the ten blue links. They are the Knowledge Panel, the AI Overview, the People Also Ask cluster, and the Featured Snippet — each governed by a different mechanic. Knowing the names and rules of each surface is the difference between an SEO strategy that wins page-one rankings nobody clicks and one that wins the real estate that actually converts.",
  },
  {
    q: "Are these definitions sourced from Google's official documentation?",
    a: "Where Google has published official definitions (Knowledge Panel, AI Overview, Featured Snippet), our copy aligns with theirs. Where the terminology is community-defined (KGMID, entity SEO, brand SERP), we use the conventions of the entity-SEO professional community and our own decade of practitioner work.",
  },
  {
    q: "Will this glossary expand over time?",
    a: "Yes. We add new entries as Google rolls out new SERP features (the AI Mode tab, Shopping Knowledge Panels, etc.) and as the entity-SEO community settles on terminology. If there's a feature you'd like us to cover, email hello@thepanelagency.com.",
  },
];

export default function GlossaryIndex() {
  return (
    <>
      <Nav />
      <main className="relative">
        <header className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Reference</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Google search <span className="text-electric-glow">features</span> glossary.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              Every Google SERP feature, in plain English, with a live visual mock you
              can hover and inspect. The Knowledge Panel, the Knowledge Graph, the
              Featured Snippet, AI Overviews, People Also Ask, and the lesser-known
              ones that quietly carry most of your discoverability in 2026.
            </p>
          </div>
        </header>

        <section className="relative py-10 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">
              A live preview of what we mean
            </p>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
              <div className="space-y-4">
                <AiOverviewMock />
                <PeopleAlsoAskMock />
              </div>
              <div>
                <KnowledgePanelMock />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">
              Browse the glossary
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {entries.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className="group rounded-2xl glass p-6 transition-colors border border-white/[0.06] hover:border-white/[0.16]"
                >
                  <div className="flex items-start justify-between">
                    <h2 className="text-[20px] font-medium tracking-tight">{e.title}</h2>
                    <ArrowUpRight size={16} className="text-ink-dim group-hover:text-electric-glow transition-colors" />
                  </div>
                  <p className="mt-3 text-[14px] text-ink-muted leading-relaxed">{e.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">
              And here is a Featured Snippet, for comparison
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <FeaturedSnippetMock />
              <SiteLinksMock />
            </div>
          </div>
        </section>

        <FAQ id="faq" eyebrow="FAQ" title="Glossary questions." intro="Three things every reader asks before settling in for the long read." items={faqs} />

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6">
            <LeadCaptureForm
              name="newsletter"
              eyebrow="— Stay current"
              title="The Friday SERP-feature briefing."
              blurb="When Google ships a new SERP feature we tear it down the same week — what it is, how it renders, who it wins for. One email, Fridays."
              buttonLabel="Subscribe"
              successMessage="You are in. Friday briefing on the way."
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
