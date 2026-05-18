import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { PeopleAlsoAskMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "People Also Ask — How the PAA Cluster Works on Google 🤔",
  description:
    "🤔 People Also Ask explained — Google's expandable Q&A cluster. ✅ Why it appears, how to win placements. 📖 With visual mock. Free glossary.",
  alternates: { canonical: "/glossary/people-also-ask" },
};

const faqs: FAQItem[] = [
  {
    q: "Why does the PAA cluster keep expanding when I click questions?",
    a: "It's a deliberate design choice. Every time you expand a question, Google appends two or three new related questions to the bottom of the cluster — the user behaviour signal is that you wanted more, so Google offers more. The recursive expansion creates an effectively infinite cluster, which is why PAA is one of Google's stickiest engagement surfaces. From an SEO perspective, this means PAA is not a fixed list of questions you can audit once; it shifts with user behaviour.",
  },
  {
    q: "How is PAA different from a Featured Snippet?",
    a: "Featured Snippets surface one answer prominently above the organic results. People Also Ask surfaces several adjacent questions, each with its own collapsible mini-snippet, lower on the page. Functionally: Featured Snippets answer the literal question; PAA answers the questions Google believes you're going to ask next. Many pages rank in PAA without ever holding the Featured Snippet on the same query.",
  },
  {
    q: "Does ranking in PAA send meaningful traffic?",
    a: "Modest but real. PAA click-through rates vary from roughly 3% to 12% depending on query type — much lower than the Featured Snippet's 30%+ but higher than positions four through ten of the organic listings. The strategic value of PAA is less about the direct click-through and more about the topical-authority signal: if Google ranks your page in PAA across multiple variations of a question, it implies your domain is the authoritative answer source for the topic cluster, which lifts your other rankings.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="People Also Ask"
      pageHref="/glossary/people-also-ask"
      eyebrow="Glossary · 4 min read"
      heading={<>People Also Ask.</>}
      lede="The expandable Q&A cluster that appears mid-SERP, offering related questions Google believes searchers want answered next. Recursive, infinite, and one of the most reliable signals of topical-authority potential."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="People Also Ask questions."
          intro="Three things SEO teams get wrong about PAA."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What it looks like</p>
          <PeopleAlsoAskMock />
        </div>
      </section>

      <GuideSection
        id="why-shows"
        number="01"
        eyebrow="Mechanics"
        heading="Why and where PAA appears."
      >
        <p>
          PAA renders on the majority of informational queries — questions
          phrased as &quot;how&quot;, &quot;what&quot;, &quot;why&quot;, or
          &quot;can.&quot; It usually appears below the first one to three
          organic results, before the second page-fold. For transactional or
          navigational queries, PAA is far rarer (Google&apos;s assumption is
          that someone Googling &quot;Amazon&quot; doesn&apos;t need a list of
          adjacent questions).
        </p>
        <p>
          The four-question initial cluster is just the seed. Each expansion
          appends another two or three questions, drawn from Google&apos;s
          model of what searchers tend to ask after the initial question. This
          recursive expansion is why a single PAA cluster can balloon to twenty
          questions if a user keeps clicking.
        </p>
      </GuideSection>

      <GuideSection
        id="entity-signal"
        number="02"
        eyebrow="Strategy"
        heading="PAA as an entity-authority signal."
      >
        <p>
          The most valuable strategic use of PAA isn&apos;t winning clicks from
          it — it&apos;s mining the questions for content planning. If you
          target a head-term keyword and run the PAA expansion three or four
          times, you have an empirical map of every adjacent question the
          searcher might ask next. That map becomes your content cluster.
        </p>
        <p>
          The pages you build to answer those PAA questions cluster topically
          around the head term. As they accrue links and rankings, Google&apos;s
          topical-authority signal for your domain strengthens — and your head
          page rises in turn. This is one of the cleanest applications of the
          semantic-SEO mindset, and it works whether or not you ever rank
          inside the PAA cluster itself.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
