import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { FeaturedSnippetMock, AiOverviewMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "Featured Snippet — Definition, Example & How to Win One 🥇",
  description:
    "🥇 Featured snippets explained — the 'position zero' answer box Google lifts from a page. ✅ With visual mock. 📖 How they relate to AI Overviews and entity SEO.",
  alternates: { canonical: "/glossary/featured-snippet" },
};

const faqs: FAQItem[] = [
  {
    q: "Is a Featured Snippet the same as 'position zero'?",
    a: "Yes — the two terms describe the same surface, used at different times by the community. 'Position zero' was the early-2010s framing because the Featured Snippet appears above the first organic result (position one). Google never officially used the term and the community has largely shifted to 'Featured Snippet' or just 'answer box.' Functionally identical concept.",
  },
  {
    q: "Will AI Overviews kill the Featured Snippet?",
    a: "They are eroding it but not killing it. For factual single-answer queries, AI Overviews are increasingly rendered instead of Featured Snippets — the trade is one answer source for several with attribution. But for many query types (recipes, definitions, simple how-tos), the Featured Snippet still renders alongside or above the AI Overview. The net result is that the Featured Snippet has become a 'second prize' rather than the dominant answer surface it was in 2018-2022.",
  },
  {
    q: "How do you actually win a Featured Snippet?",
    a: "Three signals carry most of the work. First, structure your content to answer the target question explicitly in the first paragraph — Google prefers passages it can lift cleanly. Second, target queries phrased as questions (who/what/how/why), because that's the pattern Google's snippet logic was trained against. Third, demonstrate topical authority on the surrounding content cluster, not just the one page — Google preferentially picks snippets from pages that sit inside well-developed topic territories.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="Featured Snippet"
      pageHref="/glossary/featured-snippet"
      eyebrow="Glossary · 4 min read"
      heading={<>Featured Snippet.</>}
      lede="The answer box at the top of the search results — Google's attempt to give the searcher the answer directly, with attribution to the source page. Sometimes called 'position zero' because it renders above the first organic result."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Featured Snippet questions."
          intro="The three questions everyone asks before chasing position zero."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What it looks like</p>
          <FeaturedSnippetMock />
        </div>
      </section>

      <GuideSection
        id="how"
        number="01"
        eyebrow="Mechanics"
        heading="How Google picks the snippet."
      >
        <p>
          Google&apos;s algorithm for selecting Featured Snippets has never
          been published in full, but a decade of observation gives a working
          model. The system identifies the searcher&apos;s question, scans the
          top-ranking pages for passages that directly answer it, and lifts
          the cleanest passage into the snippet position. The page Google
          chooses is not always the highest-ranked organic result — frequently
          a page at position three or four wins the snippet because its answer
          paragraph is more cleanly extractable.
        </p>
        <p>
          The implication: ranking on page one is necessary but not sufficient.
          You also need to write in a way that makes the answer trivially
          extractable — short, declarative, ideally with the question
          paraphrased in the surrounding context.
        </p>
      </GuideSection>

      <GuideSection
        id="ai-era"
        number="02"
        eyebrow="AI Overviews"
        heading="The Featured Snippet vs the AI Overview."
      >
        <p>
          For roughly a decade, the Featured Snippet was the dominant
          answer-surface on the Google SERP. That changed in 2024 when AI
          Overviews began rolling out. The two now compete for the same
          real estate: Google generally renders one but not both at the top
          of the result page.
        </p>
        <div className="mt-6">
          <p className="text-[12px] uppercase tracking-[0.18em] text-ink-dim mb-3">
            The new contender — AI Overview
          </p>
          <AiOverviewMock />
        </div>
      </GuideSection>

      <GuideSection
        id="entity-relevance"
        number="03"
        eyebrow="Entity relevance"
        heading="Why Featured Snippets still matter for entity SEO."
      >
        <p>
          For brand-name and personal-name queries, the most valuable surface
          is the Knowledge Panel — that&apos;s the work we focus on. But for
          the topical queries your audience runs <em>around</em> your name
          (&quot;how to claim a Google Knowledge Panel,&quot; &quot;what is a
          KGMID,&quot; &quot;why did my Knowledge Panel disappear&quot;) the
          Featured Snippet is still the highest-leverage non-AI answer surface.
        </p>
        <p>
          Winning Featured Snippets on supporting queries is what builds the
          topical authority that, in turn, makes your owned content more
          citable inside AI Overviews. The two surfaces are complementary, not
          substitutes — and an entity-SEO strategy should target both.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
