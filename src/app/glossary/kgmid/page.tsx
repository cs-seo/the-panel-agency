import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { KnowledgePanelMock } from "@/components/SerpMocks";

export const metadata: Metadata = {
  title: "KGMID — Google Knowledge Graph ID Definition 🆔 Find Yours",
  description:
    "🆔 KGMID explained — Google's internal Knowledge Graph identifier. ✅ Where to find it, how it differs from a Wikidata QID. 📖 With visual example.",
  alternates: { canonical: "/glossary/kgmid" },
};

const faqs: FAQItem[] = [
  {
    q: "Why do some KGMIDs start with /m/ and others with /g/?",
    a: "The /m/ prefix is the Freebase-era format Google inherited when it acquired Freebase in 2010. Existing Freebase entities kept their MIDs and were promoted into the Knowledge Graph. The /g/ prefix is the newer Google-issued format used for entities that didn't previously exist in Freebase. Both are valid and stable identifiers — the prefix mostly just tells you whether the entity has been in the graph since before 2010 or arrived later.",
  },
  {
    q: "Can my KGMID change?",
    a: "Rarely, but yes. The two main events that change a KGMID are entity merges (Google realises two records are actually the same person and collapses them, with one KGMID surviving) and entity retirements (the record is removed because Google's confidence dropped — your Knowledge Panel disappears at the same time). In both cases, a re-built entity often receives a new KGMID later. Stable long-running panels keep the same KGMID for years.",
  },
  {
    q: "Should I link to my KGMID URL anywhere?",
    a: "Yes, in two places. First, include the Google search URL for your KGMID in your schema.org sameAs array — this is the most direct way to tell Google's parser 'I am the entity behind this KGMID.' Second, if you maintain a personal site with a structured About page, the same URL is a useful canonical reference for cross-platform identity. We include both as standard in the entity stack we deploy for clients.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Glossary"
      categoryHref="/glossary"
      pageTitle="KGMID"
      pageHref="/glossary/kgmid"
      eyebrow="Glossary · 3 min read"
      heading={<>KGMID.</>}
      lede="Knowledge Graph Machine ID. The stable internal identifier Google assigns to every recognised entity. The most canonical reference point in entity SEO — and the thing every Knowledge Panel is, at its root, rendering from."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="KGMID questions."
          intro="The three things people ask once they spot a KGMID in their URL bar."
          items={faqs}
        />
      }
    >
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">
            — Every Knowledge Panel has one
          </p>
          <p className="text-ink-muted max-w-3xl mb-8">
            The KGMID is not visible on the panel itself. It lives in the URL
            parameter when you click into the panel, in the form{" "}
            <code className="bg-white/[0.06] px-1.5 py-0.5 rounded">
              ?kgmid=/g/...
            </code>{" "}
            or <code className="bg-white/[0.06] px-1.5 py-0.5 rounded">
              ?kgmid=/m/...
            </code>
            .
          </p>
          <div className="flex justify-center">
            <KnowledgePanelMock />
          </div>
        </div>
      </section>

      <GuideSection
        id="format"
        number="01"
        eyebrow="Format"
        heading="What a KGMID looks like."
      >
        <p>
          A KGMID is a short alphanumeric string preceded by either{" "}
          <code>/g/</code> (the modern, Google-issued format) or{" "}
          <code>/m/</code> (the Freebase-era format inherited when Google
          bought Freebase in 2010). Examples:{" "}
          <code>/m/02mjmr</code> (Barack Obama),{" "}
          <code>/g/11g4rj8mkt</code> (a more recent entity), and{" "}
          <code>/m/04ly1</code> (Wikipedia&apos;s entry for the moon).
        </p>
        <p>
          You can spot one by Googling any well-known person, clicking through
          to expand their Knowledge Panel, and reading the URL — the{" "}
          <code>kgmid=</code> parameter contains the identifier.
        </p>
      </GuideSection>

      <GuideSection
        id="vs-qid"
        number="02"
        eyebrow="vs Wikidata"
        heading="The KGMID/QID distinction, properly."
      >
        <p>
          The most common entity-SEO confusion: the KGMID and the Wikidata QID
          (e.g. <code>Q42</code> for Douglas Adams) point at the same
          real-world entity, but they are not the same identifier. Wikidata
          QIDs live in the public, user-editable Wikidata database. KGMIDs
          live in Google&apos;s internal, non-editable Knowledge Graph.
        </p>
        <p>
          The practical relationship: build a clean Wikidata QID, link it to
          your other structured-data surfaces, and Google&apos;s Graph
          eventually issues a KGMID that corresponds to the same entity. The
          QID is the lever; the KGMID is the result. For the full
          step-by-step on practical KGMID work, see our deeper{" "}
          <Link className="underline" href="/learn/what-is-a-kgmid">
            KGMID reference
          </Link>
          .
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
