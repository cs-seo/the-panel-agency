import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { KnowledgePanelMock, AiOverviewMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "Knowledge Graph — What It Is & How It Powers Google Search 🧠",
  description:
    "🧠 Google's Knowledge Graph explained — the entity database behind Knowledge Panels, AI Overviews, and modern semantic search. ✅ With visual examples. 📖 Free glossary.",
  alternates: { canonical: "/glossary/knowledge-graph" },
};

const faqs: FAQItem[] = [
  {
    q: "How big is the Google Knowledge Graph?",
    a: "Google has publicly stated the Knowledge Graph contains over 500 billion facts about more than 5 billion entities (as of the most recent official disclosure). For context, that is roughly two orders of magnitude larger than the public Wikidata, which itself is the largest open entity database. The vast majority of those entities are not famous people — they are obscure works, places, products, organisations, and concepts that nonetheless need stable identifiers for Google to disambiguate everyday searches.",
  },
  {
    q: "Is the Knowledge Graph the same as Wikidata?",
    a: "No, but they overlap heavily. Wikidata is a public, user-editable, open knowledge base maintained by the Wikimedia Foundation. Google's Knowledge Graph is a proprietary, Google-internal database. Google pulls extensively from Wikidata (it's one of the most reliable inputs for adding new entities to the Graph) but also from many other sources — Wikipedia, Crunchbase, IMDb, MusicBrainz, the open web. The Graph is the union and disambiguation of all of those.",
  },
  {
    q: "Can I see what Google's Knowledge Graph thinks about me?",
    a: "Partially, yes. Google publishes a Knowledge Graph Search API that returns the structured record for any entity it recognises — including the KGMID, the canonical name, description, and types. The API requires a Google Cloud key. Our paid audits include a Knowledge Graph Search API check as standard; our free /tools/entity-check uses the public Wikipedia and Wikidata signals, which together correlate roughly 80% with Knowledge Graph status.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="Knowledge Graph"
      pageHref="/glossary/knowledge-graph"
      eyebrow="Glossary · 5 min read"
      heading={<>Knowledge Graph.</>}
      lede="The proprietary entity database that powers most of modern Google search. Every Knowledge Panel, AI Overview, and entity-related answer Google gives is rendered from this graph. It is the substrate of semantic search."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Knowledge Graph questions."
          intro="The three things every SEO professional gets wrong on first contact with the Knowledge Graph."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">
            — What it renders into
          </p>
          <p className="text-ink-muted leading-relaxed mb-8 max-w-3xl">
            The Knowledge Graph is invisible to searchers, but its outputs are
            everywhere. The two most visible: Knowledge Panels (right) and AI
            Overviews (left). Both are downstream renderings of the same
            underlying entity records.
          </p>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
            <AiOverviewMock />
            <KnowledgePanelMock />
          </div>
        </div>
      </section>

      <GuideSection
        id="what"
        number="01"
        eyebrow="Definition"
        heading="What the Knowledge Graph is, in plain English."
      >
        <p>
          The Google Knowledge Graph is a massive database of entities — people,
          companies, places, products, films, songs, concepts — and the
          relationships between them. Each entity is stored as a structured
          record with a stable internal identifier (the KGMID) and a set of
          attributes (name, type, dates, related entities, sources).
        </p>
        <p>
          Google launched the Knowledge Graph publicly in 2012, building on its
          2010 acquisition of Freebase. The original goal was to move Google
          from a string-matching engine (looking for documents that contain
          words) to a meaning-matching engine (looking for entities that match
          the searcher&apos;s intent). Every major Google search feature shipped
          since 2012 — from Knowledge Panels to AI Overviews — is downstream of
          this shift.
        </p>
      </GuideSection>

      <GuideSection
        id="sources"
        number="02"
        eyebrow="Inputs"
        heading="Where the graph's data comes from."
      >
        <p>
          No single source dominates. The graph is stitched together from
          dozens of inputs. The most influential, in roughly descending order:
          Wikipedia (especially for biographical and historical facts),
          Wikidata (for structured relationships and cross-language coverage),
          authoritative third-party databases (Crunchbase for companies, IMDb
          for film, MusicBrainz for music, etc.), schema.org markup on the
          open web, and Google&apos;s own crawl-derived signals from
          authoritative press surfaces.
        </p>
        <p>
          For entity-SEO purposes, the practical lever is Wikidata + schema.org.
          Wikidata is the most accessible (anyone can edit), and schema.org is
          the most controllable (it lives on your own site). Together they
          account for most of what an external practitioner can actually move.
        </p>
      </GuideSection>

      <GuideSection
        id="ai-era"
        number="03"
        eyebrow="The AI era"
        heading="Why the Knowledge Graph matters more, not less, in 2026."
      >
        <p>
          The arrival of AI Overviews, Perplexity, and ChatGPT changed the
          relationship between the Knowledge Graph and search visibility — but
          not in the direction many predicted. Far from making structured
          entity data obsolete, generative search engines have become more
          dependent on it. AI Overviews are grounded against Knowledge Graph
          entities to prevent hallucination. ChatGPT cites Wikipedia and
          Wikidata heavily because both have stable identifiers it can verify
          against. Perplexity surfaces Knowledge Graph entity cards in its
          search results.
        </p>
        <p>
          Net effect: in 2026 your Knowledge Graph entity is the foundation of
          how every major search-and-answer surface introduces you. Without it,
          you are invisible to the new top of funnel.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
