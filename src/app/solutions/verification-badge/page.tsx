import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

import { KnowledgePanelMock } from "@/components/SerpMocks";
// 56 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Google Knowledge Panel Verification Badge ✅ How to Earn It",
  // 154 chars · 3 emojis
  description:
    "✅ Earn the gray verification check on your Google Knowledge Panel. 🔐 Eligibility, claim, and entity confidence explained. 📈 Apply for setup help.",
  alternates: { canonical: "/solutions/verification-badge" },
};

const faqs: FAQItem[] = [
  {
    q: "Is the verification badge the blue checkmark from X/Twitter?",
    a: "No. The Google verification badge on a Knowledge Panel is a subtle gray checkmark next to the panel-manager identity, indicating you have been verified by Google as the official representative of the entity. It is much less ostentatious than social-media verification badges, but it carries materially more weight in the SEO and reputation context because it is granted by Google itself, not a third-party platform.",
  },
  {
    q: "Can I get verified without having a Knowledge Panel?",
    a: "No. The verification badge is granted to the manager of an existing Knowledge Panel, so you cannot pursue verification until the panel exists. This is part of why the panel build comes first and the badge pursuit comes second — verification is the third stage of the engagement, after build and claim. Trying to chase verification with no underlying panel is one of the most common wasted-effort mistakes.",
  },
  {
    q: "How long does badge verification take once the panel is live?",
    a: "Once the panel is live and the claim process has been completed, badge verification typically takes 4 to 8 weeks. Google requires evidence of identity for personal panels and proof of authority to represent the entity for organisation panels. The Panel Agency manages the documentation submission, but the actual review timeline is in Google's hands.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Solutions"
      pageTitle="Verification Badge"
      pageHref="/solutions/verification-badge"
      eyebrow="Solution · The badge"
      heading={
        <>
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— A verified panel (note the check)</p>
          <div className="flex justify-center">
            <KnowledgePanelMock
              name="Your Name"
              subtitle="Founder, Author, Investor"
              bio="The small gray check next to your name is Google's verification badge. It tells every searcher — and every AI engine grounding against your entity — that this panel is officially managed by you."
              verified={true}
              peers={[{ name: "Peer A" }, { name: "Peer B" }, { name: "Peer C" }, { name: "Peer D" }]}
            />
          </div>
        </div>
      </section>

          Earn the verification <span className="text-electric-glow">badge.</span>
        </>
      }
      lede="The gray verification checkmark on a Google Knowledge Panel is the most credible identity signal on the search result page. Here is what it is, why it matters in 2026, and how to qualify."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Verification questions."
          intro="The three things every client asks about the badge."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="what"
        number="01"
        eyebrow="What"
        heading="What the verification badge actually is."
      >
        <p>
          The Google verification badge is a small gray check that appears
          inside a Knowledge Panel once Google has verified you (or your
          authorised representative) as the official manager of the entity
          the panel represents. It is the only place on the search result
          page where Google itself is asserting your identity. Other badges
          — X&apos;s blue check, LinkedIn&apos;s verification mark, Meta&apos;s — are
          third-party assertions. The Google badge is first-party.
        </p>
        <p>
          Practically, the badge unlocks panel-manager capabilities: you can
          suggest factual edits, upload an authoritative photo, dispute
          incorrect information, and request expedited review on changes.
          Until you have the badge, your influence on the panel is indirect
          and largely depends on upstream signal engineering.
        </p>
      </GuideSection>

      <GuideSection
        id="why-matters"
        number="02"
        eyebrow="Why"
        heading="Why the badge has gotten more valuable since 2024."
      >
        <p>
          For most of the last decade, the verification badge was an
          internal-quality-of-life perk: useful for managing your panel, not
          particularly visible to the public. That changed in 2024 and 2025,
          when AI answer engines began surfacing it as a credibility signal
          when reciting bios. ChatGPT and Perplexity in particular now
          mention verification status in some entity answers, which means
          the badge has crossed over from a back-office credential to a
          public trust marker.
        </p>
        <p>
          For founders, attorneys, fund managers, and authors competing for
          attention in a crowded entity landscape, the badge is the cleanest
          differentiator available. It is also the hardest to fake — which
          is precisely why it carries weight.
        </p>
      </GuideSection>

      <GuideSection
        id="eligibility"
        number="03"
        eyebrow="Eligibility"
        heading="What Google looks for."
      >
        <p>
          Google&apos;s public eligibility criteria are deliberately vague,
          but the working pattern across the panels we have shepherded
          through verification is clear. For people, Google wants
          government-issued ID matching the panel name, a clear chain of
          authoritative third-party identity confirmation, and confirmation
          via a verified Google account that has demonstrated some account
          history. For organisations, Google wants either a verified
          authoritative website with matching contact details, an executive
          email matching the company domain, or both.
        </p>
        <p>
          The badge is also more readily granted when the panel itself is
          well-formed: complete bio, clean profile links, no conflicting
          information across surfaces, and active engagement with the panel
          manager interface. A panel that looks unmanaged is a panel that
          gets verified slowly.
        </p>
      </GuideSection>

      <GuideSection
        id="process"
        number="04"
        eyebrow="Process"
        heading="The badge as the third stage of our engagement."
      >
        <p>
          We treat verification as the final stage of a full panel
          engagement, after the build (stages 1 and 2) and the claim (stage
          3). The reason is sequencing: Google&apos;s verification team is
          materially more likely to approve a manager whose panel already
          shows clean, well-attributed structured information, because the
          verification itself adds risk if the underlying entity is
          unstable.
        </p>
        <p>
          The Panel Agency manages the documentation flow, drafts the
          identity confirmation submission, and handles the back-and-forth
          with Google&apos;s manager review. The actual decision rests with
          Google, but the framing of the application meaningfully affects
          how quickly it clears.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
