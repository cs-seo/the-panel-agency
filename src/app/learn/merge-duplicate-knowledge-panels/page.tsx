import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 63 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Merge Duplicate Google Knowledge Panels — Step-by-Step Fix 🔀",
  // 159 chars · 3 emojis
  description:
    "🔀 Two panels for one entity? ⚠️ Duplicates split your authority. ✅ A step-by-step guide to merging Google Knowledge Panels safely — without losing either.",
  alternates: { canonical: "/learn/merge-duplicate-knowledge-panels" },
};

const faqs: FAQItem[] = [
  {
    q: "Why does Google sometimes create two panels for the same person?",
    a: "Duplicate panels almost always result from Google's Knowledge Graph treating two surfaces as distinct entities when they are actually the same person or organisation. The most common triggers are: name variants used inconsistently across sources (e.g. 'Jonathan Smith' vs 'Jon Smith'), separate Wikidata entries that were never reconciled, distinct identifiers in industry databases (IMDb vs MusicBrainz vs Crunchbase) that point at the same human, or two periods of public life that Google has failed to connect (e.g. before-and-after a career change).",
  },
  {
    q: "Is having two Knowledge Panels actually a problem?",
    a: "Yes. Duplicates split your entity authority across both records, weaken the 'People also search for' coverage on each, dilute the verification badge eligibility, and create user confusion when the same person Googled twice shows two different bios. They also make it materially harder for AI engines like ChatGPT and Perplexity to consistently recite a single canonical bio — they often quote whichever duplicate they grounded against, which is non-deterministic.",
  },
  {
    q: "Can I trigger a duplicate merge myself, or do I need help?",
    a: "Simple duplicates — say, two near-identical Wikidata entries — can sometimes be merged by experienced editors through Wikidata's native merge tooling. But when the duplicates involve Wikipedia, IMDb, Crunchbase, and separate Google KGMIDs, the merge has to be choreographed across multiple sources or the duplicates simply re-form. The Panel Agency runs these merges as a focused engagement because the order of operations matters.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="Merge Duplicate Knowledge Panels"
      pageHref="/learn/merge-duplicate-knowledge-panels"
      eyebrow="Reference · 6 min read"
      heading={<>How to merge duplicate Knowledge Panels.</>}
      lede="When Google splits your identity across two Knowledge Panels, it splits your authority too. Here is how duplicates form, why they matter, and the order in which to merge them so they actually stay merged."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Common merge questions."
          intro="The questions every client asks when they discover their identity is split."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="why"
        number="01"
        eyebrow="Definition"
        heading="What a duplicate panel actually is."
      >
        <p>
          A duplicate Knowledge Panel happens when Google&apos;s graph contains
          two separate entries for what is functionally a single entity — most
          commonly a single person — and renders different panels depending on
          how the query is phrased. Searching &quot;Jane Doe author&quot; might
          surface one panel; searching &quot;Jane Doe founder&quot; might surface a
          completely separate one, with different bio, photo, and related-people
          carousel.
        </p>
        <p>
          From Google&apos;s perspective these are two entities. From your
          perspective they are one career split in half, and every prospect who
          Googles you is being shown an incomplete record.
        </p>
      </GuideSection>

      <GuideSection
        id="cost"
        number="02"
        eyebrow="Why it matters"
        heading="The cost of duplicates is bigger than it looks."
      >
        <p>
          Duplicates cause measurable damage on three fronts. First, your
          entity authority is split, which lowers both panels&apos; confidence
          score and increases the chance one or both disappear during the next
          algorithm cycle. Second, the verification badge — when it eventually
          becomes available — is awarded per-entity, so a duplicate forces you
          to choose which version of yourself to verify and orphans the rest.
        </p>
        <p>
          Third, and increasingly the most expensive, AI answer engines like
          ChatGPT, Perplexity, and Gemini ground their bios against whichever
          duplicate they happen to retrieve. The result: when someone asks
          ChatGPT who you are, they get a different version of your life every
          time. That is fatal for the canonical-identity outcome our clients
          actually paid for.
        </p>
      </GuideSection>

      <GuideSection
        id="diagnose"
        number="03"
        eyebrow="Diagnose"
        heading="Detecting that you have a duplicate."
      >
        <p>
          A few diagnostic signals suggest a duplicate has formed. The
          &quot;People also search for&quot; carousels on two different searches
          of your name pull different peers. Your Wikidata page links out to a
          different KGMID than the one Google is rendering. Two different bios
          appear depending on whether you search your name, your name plus
          your role, or your name plus your company.
        </p>
        <p>
          For a definitive check, the Google Knowledge Graph Search API returns
          the KGMIDs for any given query. If two different MIDs return for
          variations of your name, you have a duplicate.
        </p>
      </GuideSection>

      <GuideSection
        id="merge"
        number="04"
        eyebrow="Merge"
        heading="The merge sequence that actually holds."
      >
        <p>
          Merging duplicates requires choreographing changes across multiple
          sources in the right order. The mistake most do-it-yourself merges
          make is unifying Wikidata first — Google takes weeks to recrawl,
          during which the duplicates regenerate because the rest of the
          surfaces still disagree.
        </p>
        <p>
          The correct order: align name and bio across owned surfaces (site,
          LinkedIn, X, byline pages), update schema with a single canonical
          identifier, reconcile industry databases (IMDb, Crunchbase, etc.) to
          point at the merged identity, then merge Wikidata last. Once
          Wikidata propagates, request review through Google&apos;s panel
          manager interface for the surviving panel.
        </p>
      </GuideSection>

      <GuideSection
        id="prevent"
        number="05"
        eyebrow="Prevent"
        heading="Preventing duplicates from re-forming."
      >
        <p>
          Duplicates that come back are usually a symptom of unresolved name
          inconsistency in either bylines or social profile metadata. After a
          successful merge, do a quarterly audit of any place a journalist,
          podcast host, or conference programmer might publish a bio. The most
          frequent re-trigger is a freelance journalist writing about you with
          a name variant Google has not yet associated with your canonical
          entry; once that piece accumulates citations, the variant becomes a
          new entity and the split begins again.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
