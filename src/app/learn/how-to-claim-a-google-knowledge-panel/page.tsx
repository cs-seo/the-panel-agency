import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 67 chars · 1 emoji · no brand · captures both "claim" and "login" intent
export const metadata: Metadata = {
  title: "How to Claim & Log Into Your Google Knowledge Panel 🔐 Full Guide",
  // 156 chars · 3 emojis · CTR-led
  description:
    "🔐 Claim and log into your Google Knowledge Panel as the verified manager. ✅ Step-by-step eligibility & process. 🛡️ What to do if claim is rejected.",
  alternates: { canonical: "/learn/how-to-claim-a-google-knowledge-panel" },
  openGraph: {
    title: "How to Claim & Log Into Your Google Knowledge Panel 🔐 Full Guide",
    description:
      "🔐 The full process to claim and manage your Google Knowledge Panel. ✅ Eligibility, login, edits, verification badge. 🛡️ Recovery if claim is denied.",
    type: "article",
    images: ["/claim-panel.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Claim Your Google Knowledge Panel 🔐",
    description:
      "🔐 Step-by-step: claim, log in, edit, and defend your Google Knowledge Panel. ✅ Plus what to do if Google rejects your claim. 🛡️",
    images: ["/claim-panel.webp"],
  },
};

const faqs: FAQItem[] = [
  {
    q: "Is there a separate 'Knowledge Panel login' page on Google?",
    a: "No — there is no standalone 'Knowledge Panel login' URL. The way you log in to manage your panel is by signing into a Google account that has been verified as the panel manager, then using Google Search itself to access the panel-management tools. Searches for 'knowledge panel login' commonly land people on Ipsos's consumer-survey product (KnowledgePanel by Ipsos) which is completely unrelated to Google Knowledge Panels. If you are looking to manage a Google Knowledge Panel for yourself or your company, the correct flow is the claim process below — not a login form.",
  },
  {
    q: "What happens if Google rejects my claim?",
    a: "Rejection is usually one of three things: insufficient identity evidence, the panel is for a namesake (not you), or your account hasn't accrued enough verifiable Google activity (very new Google accounts get rejected more often). The fix depends on which: for identity issues, resubmit with cleaner government-issued ID and a public-source bio that matches; for namesake issues, run the disambiguation strategy on owned surfaces first then retry; for thin-account issues, use a Google account with longer activity history. After fixing, you can request a manual review through Google Support and reference the original claim attempt ID.",
  },
  {
    q: "Once claimed, what can I actually change on my panel?",
    a: "Verified managers can suggest factual edits (name, title, dates), upload an authoritative photo, dispute incorrect information, request removal of specific facts, and add or remove featured social profiles. You cannot rewrite your bio wholesale or change the 'People also search for' carousel directly — those come from the underlying Knowledge Graph entity, not the panel manager interface. To change those, you change the upstream signals (Wikidata, schema, citations).",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Learn"
      pageTitle="Claim & Log Into Your Knowledge Panel"
      pageHref="/learn/how-to-claim-a-google-knowledge-panel"
      eyebrow="Guide · 9 min read"
      heading={<>How to claim &amp; log into your Knowledge Panel.</>}
      lede="Most searches for 'Knowledge Panel login' come from people trying to manage a panel they already have — but Google deliberately makes the entry point obscure. Here is the full claim and management flow, why it matters more than ever, and what to do when Google says no."
      image="/claim-panel.webp"
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Claim and login questions."
          intro="The three things every panel owner asks before starting."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="why-no-login"
        number="01"
        eyebrow="Confusion"
        heading="Why there is no 'Knowledge Panel login' page."
      >
        <p>
          If you have ever searched <em>knowledge panel login</em>, you have
          probably landed on something other than what you wanted. The dominant
          search result is KnowledgePanel by Ipsos — a consumer-survey product
          that happens to share the trademark-adjacent name. It has nothing to
          do with Google Knowledge Panels.
        </p>
        <p>
          Google itself does not run a standalone login portal for managing
          Knowledge Panels. The entry point lives inside Google Search itself:
          when a verified manager Googles their own name (or their entity)
          while signed into the verified Google account, an extra panel of
          management controls appears beneath the Knowledge Panel. That is the
          equivalent of &quot;logging in.&quot;
        </p>
        <p>
          This design is deliberate. By keeping the management surface tied to
          authenticated Search, Google prevents impostors from finding the
          back door even if they suspect a panel exists. The trade-off is
          searcher confusion — which is what brought you here.
        </p>
      </GuideSection>

      <GuideSection
        id="eligibility"
        number="02"
        eyebrow="Before you start"
        heading="Eligibility — are you allowed to claim?"
      >
        <p>
          Google will let you claim a Knowledge Panel only if you can prove
          that you (or the legal entity you represent) are the subject of the
          panel. The bar is intentionally high because the consequences of
          mis-granting a claim are severe — an impostor with claim rights can
          rewrite facts, swap photos, and suppress legitimate information.
        </p>
        <p>
          For individual panels, eligibility requires: a Google account with
          a verifiable history (don&apos;t use a brand-new account for this),
          government-issued ID matching the panel name, and at least one
          authoritative third-party reference confirming the same identity
          (usually a press piece, Crunchbase profile, IMDb entry, or
          professional directory listing).
        </p>
        <p>
          For organisation panels, you need administrative access to the
          official domain (so you can prove control via email or DNS) plus
          documentation showing executive authority — a published bio listing
          you as an officer of the company, an SEC filing, an annual report.
        </p>
      </GuideSection>

      <GuideSection
        id="step-by-step"
        number="03"
        eyebrow="The flow"
        heading="The step-by-step claim process."
      >
        <p>
          Once eligible, the claim process is mechanically straightforward —
          it is the back-end review that takes time. The steps:
        </p>
        <p>
          <strong>Step 1.</strong> Sign into the Google account you want to
          use as the verified manager. This account should be the one you
          will use long-term — switching later requires re-verification.
        </p>
        <p>
          <strong>Step 2.</strong> Google your own name or your entity. When
          your Knowledge Panel appears, scroll to the bottom and look for
          <em> Claim this knowledge panel</em>. If you do not see this link,
          the panel is either not eligible for claim yet (too new) or there
          is no panel for your entity yet (in which case the build comes
          first).
        </p>
        <p>
          <strong>Step 3.</strong> Click through and complete the verification
          flow. Google asks for a video selfie or photo ID, and links to a
          verified profile on a connected service — typically YouTube,
          Twitter/X, or LinkedIn — that publicly identifies you as the same
          person.
        </p>
        <p>
          <strong>Step 4.</strong> Wait for the manual review. Google
          typically responds within 5 to 14 business days. Successful claims
          unlock the panel-manager interface; unsuccessful claims explain
          which evidence requirement was unmet.
        </p>
      </GuideSection>

      <GuideSection
        id="manage"
        number="04"
        eyebrow="After approval"
        heading="What you can change after you are verified."
      >
        <p>
          The verified panel-manager interface gives you direct control over
          a narrower set of fields than people expect. You can: suggest
          factual edits (name, role, dates of birth, founding date,
          education), upload an authoritative photo (subject to review),
          dispute incorrect information shown in the panel, request removal
          of specific factual claims, and curate the linked profile list.
        </p>
        <p>
          You cannot, however, rewrite the panel bio wholesale, change the
          People also search for carousel directly, or remove the panel
          entirely once it exists. Those parts of the panel are downstream
          outputs of the Knowledge Graph entity itself — the only way to
          change them is to change the upstream signals (Wikidata,
          structured data on your own site, authoritative third-party
          references).
        </p>
        <p>
          This is why panel management is not a substitute for entity
          engineering. The manager interface gives you fine-grained
          corrections; the entity stack is what shapes the panel&apos;s
          fundamentals.
        </p>
      </GuideSection>

      <GuideSection
        id="rejected"
        number="05"
        eyebrow="If rejected"
        heading="What to do when Google denies your claim."
      >
        <p>
          Claim rejections are common — roughly a third of first-time claims
          we have shepherded through end up in a second-round review. The
          three most frequent rejection reasons:
        </p>
        <p>
          <strong>Insufficient identity evidence.</strong> Resubmit with a
          higher-quality government-issued ID photo, ensure the name on the
          ID exactly matches the panel name (middle names included), and
          provide an additional authoritative third-party reference linking
          the two.
        </p>
        <p>
          <strong>Namesake collision.</strong> Google believes the panel is
          for someone else who shares your name. The fix is to first run a
          name-variant disambiguation across your owned surfaces — adding a
          middle initial, switching to full middle name, or using a
          professional suffix — then build entity signals that anchor that
          variant before retrying.
        </p>
        <p>
          <strong>Thin Google account.</strong> Brand-new accounts with no
          activity history get rejected disproportionately often, presumably
          because they look like impostor accounts. The fix is to either use
          a longer-standing account or build account history (verified
          YouTube, business profile, Google Workspace) before retrying.
        </p>
      </GuideSection>

      <GuideSection
        id="badge"
        number="06"
        eyebrow="The next stage"
        heading="From claim to verification badge."
      >
        <p>
          Claiming the panel is stage one. The Google verification badge —
          the small gray check next to your panel-manager identity — is
          stage two, and it is granted separately. Once you have been a
          verified panel manager for some weeks and the panel is clean and
          stable, you can request badge verification through the same
          interface.
        </p>
        <p>
          Badge verification adds a layer of public credibility that is
          becoming increasingly visible in AI-generated bios from ChatGPT,
          Perplexity, and Google AI Overviews. For founders, attorneys, and
          fund managers competing for attention in a crowded entity
          landscape, the badge is the most credible identity signal Google
          itself offers.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
