import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 62 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "What Is a KGMID? Google Knowledge Graph IDs Explained 🆔",
  // 158 chars · 3 emojis
  description:
    "🆔 What KGMID means, where to find yours, and why this Knowledge Graph ID is the most important identifier in entity SEO. ✅ Full guide. 🔍 Examples included.",
  alternates: { canonical: "/learn/what-is-a-kgmid" },
  openGraph: {
    title: "What Is a KGMID? Google Knowledge Graph IDs Explained 🆔",
    description:
      "🆔 The plain-English guide to KGMIDs — Google's internal entity IDs. ✅ Where to find yours and what to do with it. 🔍 Practical examples.",
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    q: "What's the difference between a KGMID and a Wikidata QID?",
    a: "A Wikidata QID (like Q12345) is the public identifier used in Wikidata's open knowledge base. A KGMID (like /g/123ab_xyz or /m/0abcd) is Google's internal identifier within the Knowledge Graph. They often reference the same real-world entity, but they are administered by different systems. Wikidata QIDs are user-editable; KGMIDs are not. In practice, our work usually starts with the Wikidata QID — building it correctly is the most reliable way to influence the KGMID Google eventually assigns to the same entity.",
  },
  {
    q: "Can I create my own KGMID?",
    a: "No. KGMIDs are issued internally by Google when its Knowledge Graph decides an entity meets the recognition threshold. You can do everything in your power to push Google over that threshold — structured data, citation graph, Wikidata reconciliation, schema markup — but the issuance itself is Google's call. This is why we describe the Knowledge Panel process as 'triggering' a panel rather than 'creating' one. The KGMID is the technical artifact of that triggering.",
  },
  {
    q: "Once I have a KGMID, can it change or disappear?",
    a: "Yes, both can happen. KGMIDs can be merged when Google later realises two IDs refer to the same entity (this is actually a win — it means duplicates collapse). They can also be quietly retired if Google's confidence in the entity drops below threshold over time, which is the underlying cause of most 'my Knowledge Panel disappeared' cases. Once a KGMID is retired, the same entity can later be re-assigned a new KGMID after entity rebuilding work — which is why disappearance recovery is usually possible.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="What Is a KGMID?"
      pageHref="/learn/what-is-a-kgmid"
      eyebrow="Reference · 5 min read"
      heading={<>What is a KGMID?</>}
      lede="KGMID stands for Knowledge Graph Machine ID — Google's internal identifier for any entity in the Knowledge Graph. Here is what they are, where to find yours, and why this obscure-looking ID is the single most important reference point in entity SEO."
      faq={
        <FAQ id="faq" eyebrow="FAQ" title="KGMID questions." intro="The three things people ask once they discover the ID inside their Knowledge Panel URL." items={faqs} />
      }
    >
      <GuideSection
        id="what"
        number="01"
        eyebrow="Definition"
        heading="What KGMID stands for and where it lives."
      >
        <p>
          KGMID — short for Knowledge Graph Machine ID — is the internal
          identifier Google assigns to every entity it recognises in its
          Knowledge Graph. Whenever a Google Knowledge Panel renders for a
          person, company, place, or work, the panel is a visible
          rendering of an underlying entity record, and that record has a
          KGMID.
        </p>
        <p>
          You can usually spot a KGMID inside the URL of a search result
          that surfaces a Knowledge Panel. The URL fragment typically
          includes <code>kgmid=/g/...</code> or <code>kgmid=/m/...</code>
          followed by an alphanumeric string. The <code>/m/</code> prefix
          is the older Freebase-era ID format (Google acquired Freebase in
          2010 and inherited its identifier convention); <code>/g/</code>
          is the newer Google-issued format used for entities that did not
          previously exist in Freebase.
        </p>
      </GuideSection>

      <GuideSection
        id="kgmid-vs-qid"
        number="02"
        eyebrow="The cousins"
        heading="KGMID vs Wikidata QID — what's the difference?"
      >
        <p>
          The two identifiers are often confused. The Wikidata QID
          (e.g. <code>Q42</code> for Douglas Adams) is the public,
          user-editable identifier inside the Wikidata open knowledge base.
          The KGMID is Google&apos;s internal identifier inside the
          proprietary Knowledge Graph. They frequently point at the same
          real-world entity but they are administered by separate systems
          with separate rules.
        </p>
        <p>
          For entity-SEO work, the practical sequence is: the Wikidata QID
          is the lever you can influence (Wikidata is editable, public, and
          well-documented). The KGMID is the result you are aiming for.
          Build a clean Wikidata entry, link it to the rest of your
          structured-data ecosystem, and Google&apos;s Knowledge Graph
          eventually issues a KGMID that corresponds to the same entity.
        </p>
      </GuideSection>

      <GuideSection
        id="find-yours"
        number="03"
        eyebrow="Practical"
        heading="How to find your own KGMID."
      >
        <p>
          The most reliable way to find your KGMID is to search your own
          name (or your entity) on Google, then inspect the URL of the
          search-result page that surfaces your Knowledge Panel. The
          <code>kgmid=</code> parameter inside the URL contains the
          identifier. Copy everything after the <code>=</code> sign,
          including the leading <code>/g/</code> or <code>/m/</code>
          prefix.
        </p>
        <p>
          For a more programmatic approach, the Google Knowledge Graph
          Search API returns the KGMID directly for any queried entity.
          The API endpoint is{" "}
          <code>https://kgsearch.googleapis.com/v1/entities:search</code>
          and the returned <code>@id</code> field contains the KGMID. This
          is useful when you want to confirm that two different name
          variants of yourself resolve to the same KGMID (good sign) or to
          different KGMIDs (you have a duplicate, see our merge guide).
        </p>
      </GuideSection>

      <GuideSection
        id="why-matters"
        number="04"
        eyebrow="Why it matters"
        heading="What you actually do with a KGMID."
      >
        <p>
          KGMIDs are the most reliable canonical reference for an entity in
          structured-data work. When you add <code>sameAs</code> properties
          to your schema markup, including the Google Knowledge Graph URL
          for your KGMID (e.g.{" "}
          <code>https://www.google.com/search?kgmid=/g/...</code>) gives
          Google an unambiguous backward-link from your owned surfaces to
          the canonical entity it has already recognised.
        </p>
        <p>
          KGMIDs also let you diagnose duplicate-entity problems
          definitively. If &quot;Jane Doe author&quot; and &quot;Jane Doe
          founder&quot; return two different KGMIDs, you have a split
          identity in the graph — exactly the problem our duplicate-panel
          merge process exists to fix.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
