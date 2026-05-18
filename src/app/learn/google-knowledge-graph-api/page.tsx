import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { KnowledgePanelMock } from "@/components/SerpMocks";

// 60 chars · 1 emoji · no brand · keyword-led
export const metadata: Metadata = {
  title: "Google Knowledge Graph API — How to Query Your KGMID 🆔",
  // 158 chars · 3 emojis
  description:
    "🆔 Query the Google Knowledge Graph API: find your KGMID, fetch entity data, build entity-SEO signals. ✅ Endpoints, auth, examples. 📊 Free guide.",
  alternates: { canonical: "/learn/google-knowledge-graph-api" },
  openGraph: {
    title: "Google Knowledge Graph API 🆔 Find Your KGMID",
    description:
      "🆔 Pull structured entity data straight from Google's Knowledge Graph. ✅ How to authenticate, query, and use the response in entity SEO.",
    type: "article",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Do I need to pay for the Google Knowledge Graph API?",
    a: "The API is gated behind Google Cloud — you need a Cloud project and an API key. Pricing is generous: 100,000 free queries per day on the standard tier, which is more than enough for any individual research or audit use case. Going beyond that triggers Cloud pricing, which is still pennies per thousand calls. For most entity-SEO practitioners, the API is effectively free at any sensible volume.",
  },
  {
    q: "Why doesn't the API return my Knowledge Panel for some queries?",
    a: "The Knowledge Graph API and the Knowledge Panel are not the same surface. The API returns entities that exist in Google's Knowledge Graph at any confidence level — including entities Google won't yet render a panel for. If the API returns your entity but no panel appears in Search, you have the foundation right but you're below the confidence threshold for public panel rendering. The fix is signal-stack work, not API work.",
  },
  {
    q: "Can I use the API to claim my Knowledge Panel?",
    a: "No — the API is read-only. It surfaces what Google's Knowledge Graph knows about an entity, but it has no write endpoints. Claiming and managing a panel happens through Google Search itself, signed in as a verified panel manager. The API is the diagnostic; the panel manager interface is the editing surface.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="Google Knowledge Graph API"
      pageHref="/learn/google-knowledge-graph-api"
      eyebrow="Reference · 7 min read"
      heading={<>The Google Knowledge Graph API.</>}
      lede="The single most useful diagnostic tool in entity SEO that almost nobody uses correctly. Returns structured data for any recognised entity in Google's Knowledge Graph — your KGMID, your bio, your relationships, your confidence score. Here is how it works, how to query it, and what to do with the response."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="API questions."
          intro="The three things practitioners ask once they start hitting the endpoint."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What the API surfaces is what powers this</p>
          <p className="text-ink-muted leading-relaxed max-w-3xl mb-8">
            The Knowledge Graph API and the Knowledge Panel render from the same
            underlying entity record. When you query the API, you get the
            structured version of what users see as a panel — just without the
            visual chrome.
          </p>
          <div className="flex justify-center">
            <KnowledgePanelMock />
          </div>
        </div>
      </section>

      <GuideSection
        id="what"
        number="01"
        eyebrow="Overview"
        heading="What the API actually is."
      >
        <p>
          The Google Knowledge Graph Search API is a read-only HTTP endpoint
          that lets you query Google&apos;s entity database directly. Given a
          query (name, company, work, place), it returns the matching
          entities ranked by relevance — each with a stable identifier
          (KGMID), a canonical name, a description, a set of types
          (Person, Organization, Book, etc.), and a confidence score.
        </p>
        <p>
          For entity SEO, it is the closest you can get to peering directly
          into Google&apos;s entity layer. The visible Knowledge Panel is a
          rendering of this data; AI Overviews ground their bios against it;
          &quot;People also search for&quot; carousels are derived from
          relationships inside it. If the API doesn&apos;t know you, neither
          do any of those surfaces.
        </p>
      </GuideSection>

      <GuideSection
        id="endpoint"
        number="02"
        eyebrow="Endpoint"
        heading="The single endpoint you need."
      >
        <p>
          All queries hit one URL:
        </p>
        <pre className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 text-[13px] font-mono text-ink-muted overflow-x-auto">
{`GET https://kgsearch.googleapis.com/v1/entities:search

Query params:
  query    — the search term (a name, brand, work, place)
  key      — your Google Cloud API key
  limit    — max results (default 20, hard cap 500)
  types    — optional filter: Person, Organization, Book, etc.
  indent   — pretty-print response`}
        </pre>
        <p>
          You authenticate with a standard Google Cloud API key. Create a
          new key inside any Cloud project, enable the &quot;Knowledge Graph
          Search API,&quot; and the key is live in seconds. Restrict the key
          to IP or HTTP-referrer for production use.
        </p>
      </GuideSection>

      <GuideSection
        id="example"
        number="03"
        eyebrow="Practical"
        heading="A real-world query, end to end."
      >
        <p>
          The minimal curl command:
        </p>
        <pre className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 text-[13px] font-mono text-ink-muted overflow-x-auto">
{`curl "https://kgsearch.googleapis.com/v1/entities:search?\\
query=Elon+Musk&types=Person&limit=1&key=YOUR_API_KEY"`}
        </pre>
        <p>
          The response is JSON-LD. The two fields entity-SEO practitioners
          care about most are <code>@id</code> (which contains the KGMID) and
          <code>resultScore</code> (Google&apos;s internal confidence
          score — higher means the entity is more strongly recognised).
        </p>
        <pre className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 text-[13px] font-mono text-ink-muted overflow-x-auto">
{`{
  "@context": { ... },
  "itemListElement": [
    {
      "result": {
        "@id": "kg:/m/03bnv",
        "name": "Elon Musk",
        "@type": ["Thing", "Person"],
        "description": "Businessman",
        "detailedDescription": {
          "articleBody": "Elon Reeve Musk is a businessman known...",
          "url": "https://en.wikipedia.org/wiki/Elon_Musk"
        },
        "url": "https://x.com/elonmusk",
        "image": { "contentUrl": "...", "url": "..." }
      },
      "resultScore": 11540.2
    }
  ]
}`}
        </pre>
        <p>
          The <code>@id</code> contains the KGMID — here{" "}
          <code>/m/03bnv</code> (the older Freebase-format ID). The{" "}
          <code>resultScore</code> of 11,540 tells you Elon Musk is
          recognised with very high confidence. For comparison, a typical
          successful first-name-plus-last-name founder query returns
          resultScores between 50 and 500.
        </p>
      </GuideSection>

      <GuideSection
        id="use-cases"
        number="04"
        eyebrow="What to do with it"
        heading="Three practical use cases."
      >
        <p>
          <strong>1. Find your own KGMID.</strong> Query your name. If the
          response includes a hit with the <code>@id</code> field populated,
          you exist in the Knowledge Graph. Copy that KGMID — it&apos;s the
          canonical reference you should link to from <code>sameAs</code>
          arrays in your schema.org markup.
        </p>
        <p>
          <strong>2. Diagnose namesake collisions.</strong> Query your full
          name and inspect the top three results. If a more famous namesake
          is returned with a higher <code>resultScore</code> than you, your
          panel is at risk of being overtaken on shared queries. The fix is
          disambiguation strategy — name-variant adjustment across owned
          surfaces.
        </p>
        <p>
          <strong>3. Track entity strengthening over time.</strong>{" "}
          <code>resultScore</code> is the most actionable single number in
          entity SEO. Run the same query weekly and chart it. A successful
          entity engineering engagement shows resultScore growth over the
          first 60-90 days as Google&apos;s confidence accrues; a panel
          disappearance shows a sudden drop.
        </p>
      </GuideSection>

      <GuideSection
        id="limits"
        number="05"
        eyebrow="Limitations"
        heading="What the API can't do."
      >
        <p>
          The API is read-only. There is no write endpoint, no claim
          endpoint, no edit endpoint. You cannot use it to push facts into
          the Knowledge Graph — that work happens upstream, through schema
          markup on your own site, Wikidata reconciliation, and authoritative
          third-party references that Google&apos;s crawl picks up
          organically.
        </p>
        <p>
          The API also returns a limited subset of what the Knowledge Graph
          contains. Relationship data (<code>worksFor</code>, <code>alumniOf</code>,
          <code>memberOf</code>, &quot;People also search for&quot;) is not
          returned in the public API — it&apos;s only visible through the
          rendered Knowledge Panel itself. For relationship-level analysis,
          you need to combine API queries with parsed panel HTML.
        </p>
        <p>
          Finally, the API surfaces entities at confidence levels below the
          public-panel rendering threshold. So an API hit does not guarantee
          a panel exists — but a panel never exists without a corresponding
          API hit. For the full step-by-step on KGMIDs and how they relate
          to panels, see our{" "}
          <Link className="underline" href="/learn/what-is-a-kgmid">
            KGMID reference
          </Link>
          .
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
