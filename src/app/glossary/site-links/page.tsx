import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { SiteLinksMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "Site Links — How Google Decides Which Pages to Surface 🔗",
  description:
    "🔗 Google Site Links explained — the secondary links grid under brand-name results. ✅ How Google picks them, how to influence them. 📖 With visual mock.",
  alternates: { canonical: "/glossary/site-links" },
};

const faqs: FAQItem[] = [
  {
    q: "Can I tell Google which Site Links to show?",
    a: "Indirectly, yes. You cannot manually select Site Links anymore (Google retired the demotion tool in Search Console years ago), but you can strongly influence them through internal linking, hierarchical sitemap priority, and matching breadcrumb schema. The pages Google picks are almost always the ones you treat as your most prominent internally — the ones you link to from your nav, your footer, and your highest-traffic pages.",
  },
  {
    q: "Why don't I have Site Links yet?",
    a: "The most common reasons: your domain is too new (Site Links generally start appearing 6-12 months after launch), the brand-name query doesn't have enough searches to justify them, your site structure is too flat for Google to identify clear navigational priorities, or your titles and snippets don't differentiate between page types. Fix the underlying signals (clean hierarchy, distinct titles, more internal linking) and Site Links typically emerge within a few weeks.",
  },
  {
    q: "Do Site Links boost click-through rate?",
    a: "Significantly. Brand SERPs with Site Links typically convert 20-40% better than brand SERPs without, because they let users land on the specific sub-page they wanted in one click rather than going to the homepage first. They also visually dominate more of the SERP, pushing competing results further down the page. They're worth fighting for, especially for any brand whose audience runs name-based queries.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="Site Links"
      pageHref="/glossary/site-links"
      eyebrow="Glossary · 3 min read"
      heading={<>Site Links.</>}
      lede="The grid of secondary links Google renders under a top organic result, typically for brand-name queries. The least flashy but most reliable proof that Google has internalised your site's information architecture."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Site Links questions."
          intro="The three things every SEO learns the hard way about Site Links."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What it looks like</p>
          <SiteLinksMock />
        </div>
      </section>

      <GuideSection
        id="how"
        number="01"
        eyebrow="Mechanics"
        heading="How Google chooses what to put in the grid."
      >
        <p>
          Google&apos;s Site Links algorithm is opaque, but the working model
          across thousands of observed cases is consistent. The system looks
          for: pages that are reachable in one click from your homepage, pages
          with distinct and descriptive titles, pages that receive substantial
          internal linking from elsewhere on your site, and pages that match
          the navigational intent of the brand-name query.
        </p>
        <p>
          The output is usually four to six links arranged in a two-column
          grid. For very prominent brands, Google may render a full
          twelve-link mega-grid, sometimes with an embedded search box.
        </p>
      </GuideSection>

      <GuideSection
        id="influence"
        number="02"
        eyebrow="Influence"
        heading="How to shape which links appear."
      >
        <p>
          You cannot directly assign Site Links anymore. But three levers
          consistently move them: First, your information architecture — the
          pages you treat as primary in your nav and footer are the pages
          Google considers as Site Link candidates. Second, internal anchor
          consistency — link to those pages from elsewhere on your site using
          consistent anchor text so Google understands what they are. Third,
          breadcrumb schema — implementing <code>BreadcrumbList</code> JSON-LD
          markup tells Google explicitly which pages are top-of-hierarchy.
        </p>
        <p>
          For an entity-SEO agency like ours, Site Links are a downstream
          benefit of the same work that triggers Knowledge Panels. Both reward
          a clean entity stack on the owned surface.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
