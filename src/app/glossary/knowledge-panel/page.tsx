import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { KnowledgePanelMock, SerpBrowserShell } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "Knowledge Panel — Definition, Example & Visual Mock 🔍",
  description:
    "🔍 Google Knowledge Panel explained — what it is, where it appears, and how Google decides who gets one. ✅ With a live visual example. 📖 Free glossary.",
  alternates: { canonical: "/glossary/knowledge-panel" },
};

const faqs: FAQItem[] = [
  {
    q: "Is a Knowledge Panel the same as a Google Business Profile?",
    a: "No. A Google Business Profile is a separate product specifically for local businesses (the panel that appears on Google Maps and in local searches, with hours, address, reviews, and photos). A Knowledge Panel is the entity card that appears for any recognised entity in search — a person, a company, a film, a place, a book. Some local businesses have both, but they are administered through different systems.",
  },
  {
    q: "Can two people share one Knowledge Panel?",
    a: "Almost never. Google's Knowledge Graph is designed around one entity per identifier (the KGMID). When two people share a name, Google either picks the more notable one for the panel and treats the other as a disambiguation candidate, or splits them into two separate panels triggered by different queries (e.g. 'Jane Doe author' vs 'Jane Doe founder'). The 'two people, one panel' configuration is so rare we have never seen it in production.",
  },
  {
    q: "What's the difference between a Knowledge Panel and a Wikipedia infobox?",
    a: "A Wikipedia infobox is the structured table on the right side of a Wikipedia article, listing facts about the article subject. A Google Knowledge Panel is rendered by Google directly in search results. The two often share data (Wikipedia and Wikidata are major sources for Knowledge Panels) but they live on different platforms, are governed by different policies, and serve different roles. The Wikipedia infobox is the source; the Knowledge Panel is one of its downstream renderings.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="Knowledge Panel"
      pageHref="/glossary/knowledge-panel"
      eyebrow="Glossary · 4 min read"
      heading={<>Knowledge Panel.</>}
      lede="The information card Google renders in search results for a recognised entity — a person, a company, a place, a book, or a film. The most valuable single surface on the modern Google SERP, because it is the answer rather than a link to the answer."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Knowledge Panel questions."
          intro="The three things people most often confuse about Knowledge Panels."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— Live preview</p>
          <div className="flex justify-center">
            <SerpBrowserShell query="elon musk">
              <div className="grid sm:grid-cols-[1fr_auto] gap-6">
                <div className="space-y-3 text-[#202124]">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="w-5 h-5 rounded-full bg-[#e8eaed]" />
                    <span>en.wikipedia.org</span>
                  </div>
                  <a className="text-[20px] text-[#1a0dab] leading-tight block">
                    Elon Musk — Wikipedia
                  </a>
                  <p className="text-[14px] text-[#4d5156] leading-snug">
                    Elon Reeve Musk is a businessman known for founding companies including
                    SpaceX and Tesla. He is the richest person in the world...
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[12px]">
                    <span className="w-5 h-5 rounded-full bg-[#e8eaed]" />
                    <span>x.com</span>
                  </div>
                  <a className="text-[20px] text-[#1a0dab] leading-tight block">
                    Elon Musk (@elonmusk) / X
                  </a>
                </div>
                <KnowledgePanelMock
                  name="Elon Musk"
                  subtitle="Businessman"
                  bio="Elon Reeve Musk is a businessman known for founding SpaceX and Tesla. As of 2026, he is the richest person in the world according to both Bloomberg and Forbes."
                  born="Born: June 28, 1971 · Pretoria, South Africa"
                  education="University of Pennsylvania"
                  awards="Time Person of the Year (2021)"
                  books={[]}
                  peers={[
                    { name: "Jeff Bezos" },
                    { name: "Sam Altman" },
                    { name: "Larry Page" },
                    { name: "Mark Zuckerberg" },
                  ]}
                />
              </div>
            </SerpBrowserShell>
          </div>
        </div>
      </section>

      <GuideSection
        id="definition"
        number="01"
        eyebrow="Definition"
        heading="What a Knowledge Panel is, technically."
      >
        <p>
          A Knowledge Panel is the visual rendering of a Google Knowledge Graph
          entry. It typically contains: the entity&apos;s name, a one-line role
          or category, a representative photo, a short bio, a set of structured
          facts (date of birth, education, awards, affiliations), and a
          &quot;People also search for&quot; carousel of related entities.
        </p>
        <p>
          For organisations, the panel additionally renders logo, founding date,
          parent or subsidiary relationships, and where applicable a product or
          executive carousel. For creative works (books, films, songs) it
          renders cast/crew/contributors, awards, and links to streaming or
          purchasing surfaces.
        </p>
        <p>
          Under the hood, each Knowledge Panel maps to a stable internal
          identifier called a KGMID — typically of the form{" "}
          <code>/g/...</code> or <code>/m/...</code> — visible in the URL
          parameters when you click through.
        </p>
      </GuideSection>

      <GuideSection
        id="trigger"
        number="02"
        eyebrow="How it triggers"
        heading="What it takes for a panel to render."
      >
        <p>
          A Knowledge Panel renders only after Google has decided you exist as
          a verifiable, notable entity. That decision is the cumulative
          output of: structured-data on your own site (schema.org), structured
          records on Wikidata, authoritative third-party citations
          (Wikipedia, tier-one press, industry databases), name consistency
          across the web, and enough search-query volume to make the panel
          worth rendering.
        </p>
        <p>
          You cannot pay Google to create a Knowledge Panel. You cannot
          register for one. The panel renders when the upstream entity record
          becomes confident enough — and disappears when that confidence drops
          below threshold.
        </p>
      </GuideSection>

      <GuideSection
        id="claim"
        number="03"
        eyebrow="Ownership"
        heading="Can you claim and edit your own panel?"
      >
        <p>
          Yes, once it exists. Verified managers can suggest factual edits,
          upload an authoritative photo, dispute incorrect information, and
          curate which social profiles appear in the panel. The claim process
          requires identity verification through a Google account — usually
          government-issued ID plus a matching authoritative third-party
          profile. The full step-by-step claim flow is documented separately
          in our{" "}
          <a className="underline" href="/learn/how-to-claim-a-google-knowledge-panel">
            claim guide
          </a>
          .
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
