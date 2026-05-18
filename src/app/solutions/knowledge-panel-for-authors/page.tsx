import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

import { KnowledgePanelMock } from "@/components/SerpMocks";
// 60 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Google Knowledge Panel for Authors & Speakers 📚 Verified Bio",
  // 154 chars · 3 emojis
  description:
    "📚 Get a verified Google Knowledge Panel as an author or speaker. ✅ Books, bio, talks, profiles unified. ✍️ Apply for confidential entity setup.",
  alternates: {
    canonical: "/solutions/knowledge-panel-for-authors",
  },
};

const faqs: FAQItem[] = [
  {
    q: "I'm self-published — can I still get a Knowledge Panel?",
    a: "Yes. Self-publishing alone is not a barrier; what matters is whether your books accumulate enough indexed signal to register as an authored body of work. Goodreads, Amazon's author pages, library catalogs (OpenLibrary), and review coverage all feed in. If your books are reviewed in any meaningfully indexed outlet, you have a workable entity surface. The threshold is lower than people expect — many of our author panels are for self-published writers with a single well-received title.",
  },
  {
    q: "Will my Knowledge Panel show my books in the panel itself?",
    a: "Yes, that's one of the most valuable features of an author panel. A well-built author entity surfaces a horizontal carousel of your books directly in the Knowledge Panel — covers, titles, and click-through to each book's own panel. For authors actively selling, this real estate is materially more valuable than additional homepage SEO. We engineer the panel specifically to ensure book listings populate.",
  },
  {
    q: "I have a podcast / TED talk / Substack. Do those count toward the panel?",
    a: "All three count, but in different ways. A podcast that's properly indexed (Apple Podcasts, Spotify, with consistent show metadata and host attribution) registers as a creator surface. A TED talk is one of the highest-confidence signals available — Google treats TED as authoritative. A Substack with consistent author byline metadata feeds into the entity, though it counts less than a TED appearance. All three reinforce the bio Google ends up reciting.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Solutions"
      pageTitle="Knowledge Panel for Authors"
      pageHref="/solutions/knowledge-panel-for-authors"
      eyebrow="Solution · For authors & speakers"
      heading={
        <>
      <section className="relative py-12 sm:py-16 border-t border-line/60">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-6">— What an author panel looks like</p>
          <div className="flex justify-center">
            <KnowledgePanelMock
              name="Maya Okafor"
              subtitle="Author and journalist"
              bio="Maya Okafor is a British-Nigerian author and journalist. Her work has appeared in The Guardian, The Atlantic, and The New York Times. She is the author of three books on technology, identity, and labour."
              born="Born: Feb 3, 1981 · Manchester, UK"
              education="Oxford University"
              awards="Orwell Prize shortlist (2024)"
              books={["The Quiet Engine", "After the Algorithm", "Networked"]}
              peers={[{ name: "Yuval Harari" }, { name: "Naomi Klein" }, { name: "Caroline Criado Perez" }, { name: "Jia Tolentino" }]}
            />
          </div>
        </div>
      </section>

          Google Knowledge Panels for <span className="text-electric-glow">authors.</span>
        </>
      }
      lede="A verified Knowledge Panel turns a writer's reputation into a unified, queryable entity — books, talks, profiles, and reviews all surfaced in one card. For authors and speakers, it is the difference between being a search result and being recognised."
      faq={
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Author questions."
          intro="The three things authors ask before commissioning a build."
          items={faqs}
        />
      }
    >
      <GuideSection
        id="why"
        number="01"
        eyebrow="The case"
        heading="Why an author panel is the most cost-effective build available."
      >
        <p>
          Authors sit in a sweet spot for Knowledge Panels. The supporting
          ecosystem — Goodreads, Amazon author pages, OpenLibrary, library
          catalogs, book-review outlets — is unusually well-indexed and
          treated as authoritative by Google. As a result, the path from
          &quot;published author with reviews&quot; to &quot;verified Knowledge
          Panel&quot; is shorter than for almost any other entity class.
        </p>
        <p>
          The downstream effect is significant. A panel makes you the obvious
          shortlist candidate for keynote bookings, podcast appearances, panel
          invitations, and press requests. Event programmers comparing three
          speakers will usually pick the one whose Knowledge Panel surfaces
          first — the panel functions as a credential they can verify in
          seconds without needing to call references.
        </p>
      </GuideSection>

      <GuideSection
        id="books"
        number="02"
        eyebrow="The build"
        heading="Getting your books into the panel."
      >
        <p>
          The horizontal &quot;Books&quot; carousel inside an author&apos;s
          Knowledge Panel is the most commercially valuable real estate the
          panel offers. It surfaces covers, titles, and a click-through into
          each book&apos;s own panel — where a Buy button now routinely
          appears for Kindle and Audible titles.
        </p>
        <p>
          To get the books carousel to populate, each title needs its own
          recognisable entity surface. That means clean Goodreads metadata,
          author-correct Amazon entries, ISBN-linked OpenLibrary records, and
          where possible, individual schema markup on the author site listing
          each book as a <code>Book</code> with <code>author</code> linking
          back to your <code>Person</code> entity.
        </p>
      </GuideSection>

      <GuideSection
        id="speakers"
        number="03"
        eyebrow="Speakers"
        heading="Speakers, talks, and the conference circuit."
      >
        <p>
          Authors who are also speakers have an additional dimension to build
          out. Conference appearance metadata — when properly captured by the
          conference&apos;s own site, plus YouTube uploads of the talk, plus
          press coverage of the appearance — feeds into the entity as proof
          of subject-matter authority.
        </p>
        <p>
          A TED talk, where available, is one of the highest-leverage single
          inputs you can have. Google treats the TED corpus as authoritative
          and uses it heavily for grounding bios in both Knowledge Panels and
          AI answer engines. If you have one, ensuring the canonical metadata
          on the TED page matches your owned entity surface elsewhere is a
          high-priority audit task.
        </p>
      </GuideSection>

      <GuideSection
        id="press"
        number="04"
        eyebrow="Press"
        heading="The reviewer-press feedback loop."
      >
        <p>
          For authors, press coverage works as a virtuous cycle. A review in
          one tier-one outlet makes you more recognisable to other reviewers,
          which makes new reviews more likely, which strengthens entity
          confidence further. The Panel Agency does not do PR — but the
          entity layer we build makes you materially easier to discover for
          journalists already searching your name, which is often what tips a
          new piece from &quot;maybe&quot; to &quot;commission.&quot;
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
