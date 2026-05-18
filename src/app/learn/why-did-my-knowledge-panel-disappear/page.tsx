import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 58 chars · 2 emojis · no brand · CTR-led
export const metadata: Metadata = {
  title: "Why Did My Google Knowledge Panel Disappear? 🚨 Fix It Fast",
  // 158 chars · 3 emojis
  description:
    "🚨 Panel vanished overnight? ⚠️ The 7 reasons Google removes Knowledge Panels — and how to bring yours back. 🛠️ Diagnose, fix, and prevent it.",
  alternates: {
    canonical: "/learn/why-did-my-knowledge-panel-disappear",
  },
};

const faqs: FAQItem[] = [
  {
    q: "How long does it take Google to restore a disappeared panel?",
    a: "Once the underlying signal problem is fixed, panels typically reappear within 14 to 35 days — sometimes faster if the panel was recently visible. The recovery curve depends on what caused the disappearance: a Wikipedia deletion takes longer to undo than a temporary citation drop, because Wikidata reconciliation can lag the live web by weeks. Acting in the first 72 hours of a disappearance materially shortens recovery; waiting weeks compounds the entity-confidence damage.",
  },
  {
    q: "If my panel disappeared, will it come back on its own?",
    a: "Occasionally, yes — particularly when the cause was a temporary signal anomaly or a brief Google algorithm shift. But more often, disappearance is structural: a deleted Wikipedia entry, broken schema, lost authoritative citation, or a competitor entity overtaking yours. In those cases the panel will not return without deliberate work. Treat the disappearance as a diagnostic that something in your entity stack has degraded, not as a passing glitch.",
  },
  {
    q: "Can The Panel Agency recover a panel that's already gone?",
    a: "Yes, and recovery is one of our most common engagements. We start with a forensic audit of the entity surface — which signals decayed, when, and why — then rebuild the disambiguation, schema, and citation layers required for Google to reissue the panel. Recovery is usually faster than a cold build because residual graph signals still exist in Google's index; we just need to push them back over the confidence threshold.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="Why Did My Knowledge Panel Disappear?"
      pageHref="/learn/why-did-my-knowledge-panel-disappear"
      eyebrow="Troubleshooting · 7 min read"
      heading={<>Why did my Knowledge Panel disappear?</>}
      lede="If your Google Knowledge Panel vanished, it almost always traces back to one of seven structural issues in your entity stack. Here is the full diagnostic, ranked from most to least common, with the fix for each."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Common recovery questions."
          intro="The three things every client asks in the first call when their panel has gone."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="signals"
        number="01"
        eyebrow="Diagnostic"
        heading="Disappearance is always a signal failure."
      >
        <p>
          Google does not deliberately hide Knowledge Panels at random. When a
          panel vanishes from the search result, it is because Google&apos;s
          internal confidence in your entity has dropped below the threshold
          required to render one. That threshold is a moving target, and several
          forces can push you under it — sometimes overnight, sometimes
          gradually.
        </p>
        <p>
          The seven causes below cover roughly 95% of the panel-disappearance
          cases we have audited. Most of them are recoverable, and recovery is
          almost always faster than the original build because the residual
          graph entry usually still exists in some form. The work is convincing
          Google to surface it again.
        </p>
      </GuideSection>

      <GuideSection
        id="wikipedia"
        number="02"
        eyebrow="Cause"
        heading="Cause 1: A Wikipedia article was deleted."
      >
        <p>
          The single most common cause of panel disappearance is a Wikipedia
          entry being deleted or merged after a notability or sourcing
          challenge. Wikipedia and Wikidata are deeply interlinked, and a
          deletion at the English Wikipedia level cascades into Wikidata, which
          cascades into Google&apos;s Knowledge Graph confidence.
        </p>
        <p>
          The fix is rarely to re-create the Wikipedia article directly — that
          tends to re-trigger the same deletion. Instead, the goal is to
          rebuild the underlying notability case so a future, properly-sourced
          article can stand. In the meantime, panels can be re-triggered through
          a parallel signal stack — Wikidata, structured profiles, and schema —
          that bypasses Wikipedia as a primary input.
        </p>
      </GuideSection>

      <GuideSection
        id="schema-rot"
        number="03"
        eyebrow="Cause"
        heading="Cause 2: Schema on your own site changed or broke."
      >
        <p>
          If your site went through a redesign, migrated CMS, or had its
          structured-data plugin updated, there is a meaningful chance your
          Person or Organization schema was silently mangled. Knowledge Panels
          frequently disappear within a fortnight of a schema regression on the
          canonical entity site — even if everything else stayed identical.
        </p>
        <p>
          The fix is to audit the live JSON-LD, validate it against
          Google&apos;s Rich Results Test, restore the missing fields
          (particularly <code>sameAs</code>), and request reindexing of the
          affected pages.
        </p>
      </GuideSection>

      <GuideSection
        id="namesake"
        number="04"
        eyebrow="Cause"
        heading="Cause 3: A more notable namesake has overtaken you."
      >
        <p>
          Google can absolutely merge your entity confidence into a namesake&apos;s
          if their citation surface starts dominating yours — particularly if a
          newly-famous person joins the public eye sharing your name. When this
          happens, the panel rendered for queries on your name belongs to them,
          not you, and your own panel quietly disappears.
        </p>
        <p>
          The fix is a controlled disambiguation strategy: shift to a name
          variant (middle initial, second middle name, or distinguishing
          suffix) consistently across all owned surfaces, then rebuild the
          entity confidence against the disambiguated variant.
        </p>
      </GuideSection>

      <GuideSection
        id="citations"
        number="05"
        eyebrow="Cause"
        heading="Cause 4 to 7: Citation decay, redirects, hacking, and algorithm shifts."
      >
        <p>
          The remaining causes are less common but worth flagging. Authoritative
          citations can drift out of Google&apos;s index if outlets prune
          archives or change URL structures. Sloppy site migrations that 301 the
          canonical entity page to an unrelated URL will quietly hollow out the
          schema anchor. Hacked profiles on linked surfaces — particularly
          social platforms used in <code>sameAs</code> — can introduce
          contradictory signals.
        </p>
        <p>
          Finally, broader Google algorithm updates occasionally recalibrate the
          notability threshold across an entire entity class. Most clients who
          experience a panel drop during a known algorithm window can be
          restored once the dust settles and the signal stack is shored up.
        </p>
      </GuideSection>

      <GuideSection
        id="first-72"
        number="06"
        eyebrow="Action"
        heading="What to do in the first 72 hours."
      >
        <p>
          Recovery time correlates almost linearly with how fast you respond.
          The high-leverage first-72-hour checklist:
        </p>
        <p>
          Validate that your on-site schema is intact and resolving. Check
          Wikidata for recent edits, especially deletion or vandalism. Confirm
          no authoritative source has linked to a stale redirect. Run a
          name-variant audit across LinkedIn, X, Crunchbase, and any other
          places you appear, and force-republish any updates so they are
          re-crawled. Then book the panel audit — most disappearance cases
          require coordinated multi-surface work to fully resolve.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
