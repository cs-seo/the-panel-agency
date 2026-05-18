import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 67 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Google Knowledge Panel for Founders & CEOs 🚀 Entity SEO Setup",
  // 154 chars · 3 emojis
  description:
    "🚀 Verified Google Knowledge Panels for founders, CEOs & tech executives. ✅ Schema, citations, claim, and defence. 📈 Apply for a confidential setup.",
  alternates: {
    canonical: "/solutions/knowledge-panel-for-founders",
  },
};

const faqs: FAQItem[] = [
  {
    q: "I'm a Series-A founder with a small footprint. Is that enough?",
    a: "Usually, yes. Series-A founders typically have the ingredients we need: a fundable company (which generates structured data in Crunchbase, PitchBook, and similar), at least some press coverage from the round announcement, and a controllable personal site. We translate those ingredients into a Knowledge Graph entity. The threshold isn't fame or revenue — it's whether enough authoritative third-party signals exist to corroborate who you are.",
  },
  {
    q: "Does my Knowledge Panel link to my company's panel?",
    a: "Yes. We engineer both panels in parallel where possible, and connect them through the Knowledge Graph using `founder`/`worksFor` relationships in schema, Wikidata properties, and corroborated mentions across press. Once linked, a founder's panel and the company's panel reinforce each other — Google increasingly understands them as a connected pair, which surfaces both in 'People also search for' results.",
  },
  {
    q: "What if my co-founders also want panels? Do they help or hurt?",
    a: "They help — strongly. Co-founders who appear in each other's 'People also search for' carousels signal a recognised network to Google, raising confidence across the founding team. We frequently engage with multiple co-founders simultaneously because the resulting entity cluster is dramatically more stable than any individual panel alone. Bulk engagement also typically results in cleaner cross-references and more cost-effective scoping.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Solutions"
      pageTitle="Knowledge Panel for Founders"
      pageHref="/solutions/knowledge-panel-for-founders"
      eyebrow="Solution · For founders & CEOs"
      heading={
        <>
          Google Knowledge Panels for <span className="text-electric-glow">founders.</span>
        </>
      }
      lede="Investors, journalists, hires, and prospective customers Google your name before they engage. A verified Knowledge Panel ensures what they find is what you would have written — not whatever the internet stitched together in your absence."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Founder questions."
          intro="The three things founders ask in the first call."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="why"
        number="01"
        eyebrow="The case"
        heading="Why founders need their own panel, not just the company's."
      >
        <p>
          Your company has a Knowledge Panel — or will, once it raises a round
          and the press cycle does its work. But your personal entity matters
          independently, because the people deciding whether to back, hire, or
          buy from your company are Googling you, not just your brand. They
          want to verify the person they are about to entrust capital,
          headcount, or budget to. A panel does that verification work in the
          first three seconds of the result page.
        </p>
        <p>
          More practically: when an early-stage founder is fundraising, every
          warm intro is preceded by a quiet Google search. The presence of a
          Knowledge Panel — confirmed photo, role, education, prior companies,
          books, related notable peers — converts &quot;who is this?&quot; into
          &quot;okay, this person is legit&quot; before the meeting even starts.
        </p>
      </GuideSection>

      <GuideSection
        id="stack"
        number="02"
        eyebrow="The build"
        heading="The founder entity stack."
      >
        <p>
          A founder-grade Knowledge Panel build has a recognisable shape. On
          your own site, a well-marked-up <code>Person</code> schema with
          jobTitle, worksFor, alumniOf, image, and a comprehensive sameAs
          array. Across the web, a coordinated push to align your bio on
          LinkedIn, X, Crunchbase, and any tier-one press surface that has
          covered you.
        </p>
        <p>
          On Wikidata, a structured entity record connecting you to your
          company, your education, your role, and any boards or advisory
          positions worth surfacing. And throughout, a relentless focus on
          name consistency: the exact same name, in the same case, across every
          owned surface and every byline you can influence.
        </p>
      </GuideSection>

      <GuideSection
        id="cluster"
        number="03"
        eyebrow="Cluster effect"
        heading="The founder cluster: you, your company, your peers."
      >
        <p>
          The most stable founder panels we build are part of a cluster — the
          founder, the company, co-founders, and a small set of recognised peer
          entities all linked through the Knowledge Graph. Once Google sees the
          cluster, panel confidence reinforces across all members. New press
          about any one of them lifts everyone&apos;s entity authority.
        </p>
        <p>
          This is why the most efficient way to commission a panel for one
          founder is often to commission for two or three at once — the cluster
          forms organically and the &quot;People also search for&quot; carousel
          ends up reflecting the actual professional network rather than
          random namesakes.
        </p>
      </GuideSection>

      <GuideSection
        id="defence"
        number="04"
        eyebrow="Defence"
        heading="The founder-specific defence layer."
      >
        <p>
          Founders are uniquely exposed to entity drift. Acquisitions, exits,
          new roles, second companies, board departures — every transition
          generates an opportunity for Google to either correctly update the
          panel or accidentally fork your identity. The defence layer for a
          founder panel includes scheduled quarterly reviews of bio
          consistency across surfaces, monitoring for newly-published bylines
          with name variants, and active claim management through Google&apos;s
          panel manager interface.
        </p>
        <p>
          We build a 12-month defence into every founder engagement because
          the cost of letting the entity decay is much higher than the cost of
          maintaining it.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
