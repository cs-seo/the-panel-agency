import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

import { KnowledgePanelMock } from "@/components/SerpMocks";
// 60 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Google Knowledge Panel for Brands & Companies 🏢 Verified",
  // 152 chars · 3 emojis
  description:
    "🏢 Verified Google Knowledge Panels for brands and companies. ✅ Logo, products, leadership, press unified in one entity. 🔍 See how we engineer yours.",
  alternates: {
    canonical: "/solutions/knowledge-panel-for-brands",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Our company already shows a Knowledge Panel — do we need help?",
    a: "Often, yes. Companies with auto-generated panels frequently have the wrong logo, an outdated description, a missing founder, or a wildly inaccurate founding date — none of which they can fix without going through the claim and management process correctly. We audit the existing panel, identify everything Google has wrong, and either fix it through the panel manager interface or rebuild the underlying signals where the panel manager cannot reach.",
  },
  {
    q: "Can a brand panel show our products inside it?",
    a: "Yes, for product-led brands this is one of the most valuable features. Properly-marked-up Product schema on your site, combined with structured shopping feeds and review aggregation, can surface a horizontal product carousel directly inside the brand panel. This is particularly valuable for DTC brands, where the panel becomes effectively a Google-hosted product catalogue.",
  },
  {
    q: "How does a brand panel interact with our founders' personal panels?",
    a: "They reinforce each other when properly linked. A founder's panel showing your brand under 'works for' and the brand's panel listing them under 'founder' creates a bidirectional entity link that Google increasingly relies on. Brands with verified founder relationships in the graph rank more stably and gain access to 'People also search for' carousels populated by peer companies in the same sector.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Solutions"
      pageTitle="Knowledge Panel for Brands"
      pageHref="/solutions/knowledge-panel-for-brands"
      eyebrow="Solution · For brands & companies"
      heading={
        <>
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What a brand panel looks like</p>
          <div className="flex justify-center">
            <KnowledgePanelMock
              name="Verse"
              subtitle="Software company"
              bio="Verse is a London-based B2B software company that builds entity-graph infrastructure for the financial services industry. Founded in 2019, the company has raised over $80 million in venture capital."
              born="Founded: March 1, 2019 · London, UK"
              education="Headquarters: London, UK"
              awards="The Times Tech 100 (2025)"
              books={[]}
              peers={[{ name: "Stripe" }, { name: "Plaid" }, { name: "Brex" }, { name: "Mercury" }]}
            />
          </div>
        </div>
      </section>

          Google Knowledge Panels for <span className="text-electric-glow">brands.</span>
        </>
      }
      lede="A brand Knowledge Panel turns your company into a verifiable entity in Google's graph — logo, leadership, products, press, and provenance, all surfaced in a single recognisable card. For companies competing for trust in the first three seconds of a search, this is the most valuable real estate on the result page."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Brand questions."
          intro="The three things brand marketing leads ask before commissioning."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="why"
        number="01"
        eyebrow="The case"
        heading="Why a brand panel is non-optional in 2026."
      >
        <p>
          Every meaningful brand interaction — a prospect evaluating you, a
          journalist deciding whether to cover you, a candidate considering a
          role — starts with a search. The Knowledge Panel is the most
          credible piece of that search result page, because it carries
          Google&apos;s implicit verification. A brand without a panel reads as
          either too small or too unsettled to register as an entity.
        </p>
        <p>
          For DTC and B2B brands alike, the panel also functions as a
          structured-data anchor for the rest of the surrounding ecosystem.
          AI answer engines disproportionately ground brand-related answers
          against the structured data behind Knowledge Panels — meaning the
          version of your brand ChatGPT recites is directly downstream of the
          panel you have engineered.
        </p>
      </GuideSection>

      <GuideSection
        id="stack"
        number="02"
        eyebrow="The build"
        heading="The brand entity stack."
      >
        <p>
          A brand Knowledge Panel build draws on different sources than a
          personal one. The core inputs are: Wikidata entry with founding
          date, founders, sector, and product properties; clean Crunchbase
          and PitchBook records for venture-backed brands; LinkedIn company
          page metadata; press registrations on tier-one outlets covering
          launches and funding; and structured <code>Organization</code> schema
          on your own marketing site listing logo, founders, and key dates.
        </p>
        <p>
          For consumer brands, additional inputs include shopping feeds,
          review aggregator integrations (Trustpilot, Yelp), and properly
          tagged <code>Product</code> schema on individual product pages.
        </p>
      </GuideSection>

      <GuideSection
        id="products"
        number="03"
        eyebrow="Products"
        heading="The product carousel inside the panel."
      >
        <p>
          The most under-used feature of a brand panel is the product
          carousel that can appear within it. When properly engineered, a
          brand panel for a consumer company surfaces its products horizontally
          inside the panel, with images, names, and click-throughs to either
          your own pages or Google Shopping. This is dramatically higher
          intent-traffic than rank-based product page SEO, because the
          searcher has already arrived via the brand.
        </p>
        <p>
          Engineering this carousel requires coordinated work across product
          schema, shopping feeds, review aggregation, and brand-level entity
          consistency. It is one of the higher-effort optimisations in our
          stack but produces measurable e-commerce uplift in the right
          categories.
        </p>
      </GuideSection>

      <GuideSection
        id="people-also"
        number="04"
        eyebrow="Adjacency"
        heading="Appearing next to your competitors."
      >
        <p>
          The &quot;People also search for&quot; section of a brand panel surfaces
          your closest entity-graph neighbours — usually competitor brands.
          For an emerging company, getting into the carousels of established
          competitors is one of the highest-leverage outcomes a panel build
          can produce, because it positions you as a peer rather than an
          outsider in the consideration set.
        </p>
        <p>
          We treat the &quot;People also search for&quot; carousel as a
          deliverable in its own right: the panel itself is necessary, but the
          adjacency is what makes it commercially valuable.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
