import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { AiOverviewMock, FeaturedSnippetMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "AI Overview — Google's Generative Answer Box Explained ✨",
  description:
    "✨ Google AI Overview explained — the AI-generated summary at the top of search. ✅ How citations work, how to be cited. 📖 With visual mock.",
  alternates: { canonical: "/glossary/ai-overview" },
};

const faqs: FAQItem[] = [
  {
    q: "Does the AI Overview appear for every search now?",
    a: "No — it renders selectively, mostly on informational queries where Google's AI is confident it can synthesise a useful answer. For transactional queries (buying intent), navigational queries (looking for a specific site), and very recent news, AI Overviews are rarer. Google's coverage has expanded steadily since launch, but as of late 2026 it's still probably under half of all SERPs in English markets.",
  },
  {
    q: "How does Google decide which sources to cite in an AI Overview?",
    a: "The citation logic is similar to traditional ranking — authority, relevance, structure — but with a heavier weight on whether the page contains an explicit, extractable answer that aligns with what the AI is saying. Pages with clear FAQ sections, definitional opening paragraphs, and structured data are disproportionately cited. Google is also less likely to cite a page whose claim contradicts its other citation sources, which means cross-source consistency matters more than ever.",
  },
  {
    q: "Will AI Overviews kill organic SEO?",
    a: "They will reshape it, not kill it. Empirically, the average click-through rate on organic results below an AI Overview is roughly 30-50% lower than it was pre-Overview. The traffic doesn't disappear though — it's redistributed. Sources cited inside the AI Overview receive 2-5x higher click rates than they did at their previous organic position. So the new game is winning the citation, not winning the rank. Entity SEO is the most reliable way to win citations because the AI grounds against the same entity data Google's Knowledge Graph holds.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="AI Overview"
      pageHref="/glossary/ai-overview"
      eyebrow="Glossary · 5 min read"
      heading={<>AI Overview.</>}
      lede="Google's AI-generated summary at the top of the SERP for many informational queries. Synthesises a multi-source answer with citations. The dominant top-of-SERP surface for the post-2024 era."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="AI Overview questions."
          intro="The three things every SEO team is currently arguing about."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What it looks like</p>
          <AiOverviewMock />
        </div>
      </section>

      <GuideSection
        id="what"
        number="01"
        eyebrow="Definition"
        heading="What AI Overview replaced — and what it didn't."
      >
        <p>
          AI Overview is the visible front-end of Google&apos;s Search
          Generative Experience (SGE), which began public rollout in late
          2023 and went general-availability in 2024. It renders at the top
          of the search results for queries Google&apos;s AI deems worth
          summarising, displacing or coexisting with the older Featured
          Snippet box.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-ink-dim mb-3">
              The newer surface
            </p>
            <AiOverviewMock />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-ink-dim mb-3">
              The older surface it competes with
            </p>
            <FeaturedSnippetMock />
          </div>
        </div>
      </GuideSection>

      <GuideSection
        id="citation-game"
        number="02"
        eyebrow="The new game"
        heading="Why citation share is the new ranking."
      >
        <p>
          Before AI Overviews, the goal of SEO was to win the top organic
          position because that was where most clicks landed. After AI
          Overviews, the goal is to be one of the three to six cited sources
          inside the Overview itself — that placement attracts far more clicks
          than position one of the organic listings below.
        </p>
        <p>
          What changes about the work: instead of optimising one page for one
          keyword, you optimise the entity (the brand, the person, the
          concept) for citation across many query variations. The leverage is
          on entity recognition, structured data, citation graph, and
          factual consistency across owned and earned surfaces. This is
          entity SEO by another name.
        </p>
      </GuideSection>

      <GuideSection
        id="entity-overlap"
        number="03"
        eyebrow="Knowledge Graph"
        heading="How AI Overviews lean on the Knowledge Graph."
      >
        <p>
          Google&apos;s AI is grounded against the Knowledge Graph wherever
          possible — partly to reduce hallucination, partly because the Graph
          already encodes the relationships the AI would otherwise have to
          infer at runtime. If you are a recognised entity in the Knowledge
          Graph, the AI Overview that mentions you will recite the facts the
          Graph has on you. If you are not a recognised entity, the AI either
          omits you entirely or hallucinates plausibly.
        </p>
        <p>
          This is why entity SEO has become disproportionately important in
          2026: the Graph is no longer just the engine behind Knowledge
          Panels. It is also the grounding layer behind every AI Overview
          mention of you.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
