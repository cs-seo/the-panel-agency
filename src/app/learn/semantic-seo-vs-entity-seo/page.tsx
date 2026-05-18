import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 65 chars · 1 emoji · no brand · primary keyword in title
export const metadata: Metadata = {
  title: "Semantic SEO vs Entity SEO — Differences & How to Use Both 🧠",
  // 156 chars · 3 emojis
  description:
    "🧠 Semantic SEO vs entity SEO explained. ✅ How keyword clusters, topical authority, and Knowledge Graph entities actually overlap. 📈 With practical examples.",
  alternates: { canonical: "/learn/semantic-seo-vs-entity-seo" },
  openGraph: {
    title: "Semantic SEO vs Entity SEO — Differences & How to Use Both 🧠",
    description:
      "🧠 The real differences between semantic SEO and entity SEO, and why modern strategies must combine them. ✅ Examples, schema, AI-search angles. 📈",
    type: "article",
    images: ["/semantic-network.webp"],
  },
};

const faqs: FAQItem[] = [
  {
    q: "Are 'semantic SEO' and 'entity SEO' just two names for the same thing?",
    a: "No. They share a worldview — that Google understands meaning, not strings — but they target different layers of the search system. Semantic SEO is mainly about content structure: writing pages that cover a topic comprehensively, signal topical authority, and earn featured snippets and AI-overview citations. Entity SEO is about the underlying Knowledge Graph: getting Google to recognise you (or your brand) as a verified entity with stable identifiers, schema, and citation graph. A complete modern strategy uses both, but you do them with different tools, on different timelines, and against different KPIs.",
  },
  {
    q: "Which one should I prioritise if I can only do one?",
    a: "If your goal is rankings and traffic, prioritise semantic SEO — it pays off faster on the content you control. If your goal is to be recognised as a trusted entity (person, brand, expert) by Google and AI engines, prioritise entity SEO — there is no semantic-SEO shortcut to a Knowledge Panel. Most agencies who hire us are already doing competent semantic SEO and have hit the ceiling of what content-only work can do. The entity layer is what unlocks the next plateau.",
  },
  {
    q: "Does semantic SEO still matter in the age of AI Overviews?",
    a: "Yes, arguably more than ever. The Google AI Overview and competitors like Perplexity ground their answers in pages that demonstrate topical authority — which is literally what semantic SEO produces. The shift is in the KPI: instead of measuring rank position on a single keyword, you measure citation share inside AI answers. Pages built with semantic-SEO discipline (clear topic boundaries, internal linking, schema, FAQ coverage) are disproportionately cited by AI engines.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="Semantic SEO vs Entity SEO"
      pageHref="/learn/semantic-seo-vs-entity-seo"
      eyebrow="Reference · 7 min read"
      heading={<>Semantic SEO vs Entity SEO.</>}
      lede="The two terms get used interchangeably and they shouldn't. Here is what each actually means, where they overlap, and how a complete 2026 strategy combines both — including what changes in the AI-overview era."
      image="/semantic-network.webp"
      faq={
        <FAQ id="faq" eyebrow="FAQ" title="Common confusions." intro="The three questions every marketing lead asks once they realise these are not the same thing." items={faqs} />
      }
    >
      <GuideSection
        id="definitions"
        number="01"
        eyebrow="Definitions"
        heading="What each one actually means."
      >
        <p>
          <strong>Semantic SEO</strong> is the discipline of writing and
          structuring content so that Google understands it as a
          comprehensive treatment of a topic — not just a page that happens
          to contain the right keywords. The lever is on-page: topic
          clusters, internal linking, FAQ coverage, entity mentions woven
          through prose, structured data that describes what the page is
          actually about, and schema that helps Google decide what type of
          rich result the page should earn.
        </p>
        <p>
          <strong>Entity SEO</strong> is the discipline of getting a person,
          brand, product, or place recognised by Google&apos;s Knowledge
          Graph as a verified entity with a stable identifier (KGMID),
          structured facts, and corroborating signals across the web. The
          lever is off-page: Wikidata, authoritative third-party citations,
          schema-marked references on your own site that bind your identity
          across surfaces, and the relationship graph that connects your
          entity to other recognised entities.
        </p>
        <p>
          They share a worldview — both assume Google understands meaning,
          not strings — but they aim at different layers. Semantic SEO
          shapes the content layer. Entity SEO shapes the graph beneath it.
        </p>
      </GuideSection>

      <GuideSection
        id="overlap"
        number="02"
        eyebrow="Where they meet"
        heading="The overlap is bigger than people admit."
      >
        <p>
          Pure semantic SEO and pure entity SEO are textbook fictions. In
          practice, the most effective content strategy starts at the
          entity layer: define which entities you want Google to associate
          you with, build the structured-data scaffolding that names them
          explicitly, then write semantic-SEO content that reinforces those
          entity relationships through prose, internal linking, and FAQ
          coverage.
        </p>
        <p>
          A well-marked-up <code>Article</code> page that references your
          <code>Person</code> entity inside <code>about</code> or{" "}
          <code>mentions</code> properties is doing both disciplines at
          once. A topic cluster that covers a concept comprehensively while
          consistently linking each sub-topic page to a canonical entity
          page is doing both. The bifurcation between the two practices is
          mostly an artefact of how agencies sell their services.
        </p>
      </GuideSection>

      <GuideSection
        id="when-to-prioritise"
        number="03"
        eyebrow="Prioritisation"
        heading="Which one to lean into first."
      >
        <p>
          If you are starting from zero, semantic SEO compounds faster.
          Topic clusters can rank inside three to six months; comprehensive
          coverage earns featured snippets quickly; AI overviews
          increasingly cite well-structured topic pages. The investment is
          in writing and information architecture.
        </p>
        <p>
          If you have hit the ceiling of what content-only SEO can produce
          — usually because your traffic plateaus around 30-60k organic
          visits and additional content stops adding much — the bottleneck
          is almost always entity recognition. Google sees your content but
          does not see <em>you</em> as a verified expert entity. Until that
          changes, additional content marginally moves rankings but
          dramatically improves no other metrics.
        </p>
        <p>
          Most clients who engage us have done two or three years of
          competent semantic SEO and are looking for the next plateau.
          Entity SEO is what they need next. For new sites the inverse is
          usually true.
        </p>
      </GuideSection>

      <GuideSection
        id="ai-era"
        number="04"
        eyebrow="AI overviews"
        heading="How AI search shifts the balance."
      >
        <p>
          The arrival of AI overviews (Google, Perplexity, ChatGPT,
          Gemini) has not killed semantic SEO; it has shifted the KPI.
          Instead of measuring rank position for a keyword, the meaningful
          metric is now <em>citation share</em>: how often does the AI
          engine include your page or your bio when answering a relevant
          query. Pages built with semantic-SEO discipline — clear topic
          boundaries, internal linking, FAQ schema, declarative answers in
          the first paragraph — are disproportionately cited by every AI
          engine we have measured.
        </p>
        <p>
          On the entity side, the shift is even more dramatic. AI engines
          ground entity-related answers (&quot;who is X,&quot; &quot;what
          does Y company do,&quot; &quot;why is Z notable&quot;) almost
          entirely against Knowledge Graph signals. If you have not done
          the entity work, the AI bio it recites is a hallucinated
          patchwork of whatever it could ground.
        </p>
      </GuideSection>

      <GuideSection
        id="practical"
        number="05"
        eyebrow="Practical"
        heading="A working sequence for 2026."
      >
        <p>
          The right sequence we recommend to clients: first, define the
          handful of entities the brand or person needs Google to
          recognise. Second, build the entity scaffolding — schema on
          owned surfaces, Wikidata reconciliation, citation graph — that
          gives those entities a stable Knowledge Graph footing. Third,
          write the semantic-SEO content layer that reinforces those
          entities through topic clusters, FAQ coverage, and internal
          linking, while citing the entity pages internally as canonical
          references.
        </p>
        <p>
          This sequence produces compounding effects. Content gets cited
          because the underlying entity is recognised. The entity gets
          stronger because the content cites it consistently. Each new
          piece of work lifts both layers, instead of fighting against an
          unrecognised entity foundation.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
