import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/GuideLayout";
import { FAQ, type FAQItem } from "@/components/FAQ";

// 64 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Google Knowledge Panel for Artists & Musicians 🎨 Setup Guide",
  // 154 chars · 3 emojis
  description:
    "🎨 Get a verified Google Knowledge Panel as a musician or visual artist. ✅ Discography, tracks, shows unified in your entity. 🎵 Apply for setup.",
  alternates: { canonical: "/solutions/knowledge-panel-for-artists" },
  openGraph: {
    title: "Google Knowledge Panel for Artists & Musicians 🎨 Setup Guide",
    description:
      "🎨 Verified Knowledge Panels for musicians, producers, and visual artists. ✅ Discography & shows surfaced. 🎵 Apply for confidential setup.",
    type: "article",
    images: ["/artists-graph.webp"],
  },
};

const faqs: FAQItem[] = [
  {
    q: "I'm an independent / unsigned artist. Can I still get a Knowledge Panel?",
    a: "Yes. The qualifying ingredients for an artist panel are well-distributed entity surfaces — not a label or management deal. If your music is on Spotify, Apple Music, YouTube Music, and Bandcamp, and you have at least one indexed press mention or interview, the underlying entity already exists in raw form. Our job is to engineer it into the shape Google's Knowledge Graph recognises. Many of our artist panels are for independent artists with one or two albums and a tight regional press footprint.",
  },
  {
    q: "Will my songs and albums appear inside the panel?",
    a: "Yes — the music carousel inside an artist Knowledge Panel is one of the most valuable surfaces on Google Search for recording artists. It shows individual tracks with play buttons (when streaming partnerships are connected), full albums with covers, and 'Top tracks' ranked by Google's view of popularity. Getting this carousel to populate requires aligning your MusicBrainz, Spotify for Artists, and Apple Music for Artists metadata around a single canonical artist identity.",
  },
  {
    q: "What about visual artists, designers, and creators outside music?",
    a: "The same framework applies, with different reference databases. For visual artists, the key surfaces are gallery directories, Artsy, Artnet, and museum collection databases. For designers, it's the agency network plus award listings. For YouTubers and online creators, it's the platform metadata, Wikipedia (where notability allows), and tier-one press features. We tailor the entity stack to whichever creator category you fall into.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      category="Solutions"
      pageTitle="Knowledge Panel for Artists"
      pageHref="/solutions/knowledge-panel-for-artists"
      eyebrow="Solution · For artists & creators"
      heading={<>Google Knowledge Panels for <span className="text-electric-glow">artists.</span></>}
      lede="Musicians, producers, painters, designers, and creators all live or die on the search result page. A verified Knowledge Panel turns your scattered catalogue, press coverage, and platform profiles into one canonical artist entity — surfaced inside Google, recited correctly by AI engines."
      image="/artists-graph.webp"
      faq={
        <FAQ id="faq" eyebrow="FAQ" title="Artist questions." intro="The three things creators ask in the first call." items={faqs} />
      }
    >
      <GuideSection
        id="why-artists"
        number="01"
        eyebrow="The case"
        heading="Why artist panels are uniquely high-leverage."
      >
        <p>
          Artists are an unusually rewarding entity class to engineer for.
          The supporting ecosystem — MusicBrainz, Discogs, Spotify, Apple
          Music, Genius, Bandsintown, Wikidata, gallery directories — is
          unusually well-indexed and is treated by Google as authoritative
          for creator entities. The path from &quot;working artist&quot; to
          &quot;verified Knowledge Panel&quot; is shorter than for almost
          any other category.
        </p>
        <p>
          Downstream, an artist panel does work no other promo channel
          replicates. Festival programmers researching potential bookings,
          journalists looking for a story angle, sync agents matching artists
          to TV briefs, and gallerists evaluating new representation — all
          start with a Google search. The panel converts &quot;who is
          this?&quot; into &quot;okay, this is a recognised entity&quot; in
          three seconds.
        </p>
      </GuideSection>

      <GuideSection
        id="music-stack"
        number="02"
        eyebrow="Musicians"
        heading="The music-artist entity stack."
      >
        <p>
          A music-artist Knowledge Panel build leans on a different
          configuration of sources than a founder panel. The anchor inputs:
          a MusicBrainz artist entry with disambiguated name, label, and
          discography; Spotify for Artists with verified ownership; Apple
          Music for Artists confirmation; Discogs entries for physical
          releases; Bandcamp with a curated profile; and a personal artist
          site marked up with <code>MusicGroup</code> or{" "}
          <code>Person</code> schema linked to the recordings.
        </p>
        <p>
          On top of that we coordinate Wikidata reconciliation — connecting
          your MusicBrainz ID, ISNI, and any award identifiers into a single
          canonical record. Where notability permits, a Wikipedia article
          can sit at the top of the stack as the highest-trust corroboration
          input.
        </p>
      </GuideSection>

      <GuideSection
        id="songs"
        number="03"
        eyebrow="The carousel"
        heading="Getting songs and albums to surface in the panel."
      >
        <p>
          The music carousel inside an artist&apos;s Knowledge Panel is the
          most commercially valuable real estate on Google Search for a
          recording artist. It surfaces top tracks with play buttons,
          albums with cover art, and direct links to streaming services —
          which means a single optimised panel can do more for streaming
          conversion than a month of social posting.
        </p>
        <p>
          Getting the carousel to populate correctly requires that each
          track and each album be unambiguously connected to your canonical
          artist entity across MusicBrainz, Spotify, Apple Music, and
          increasingly Genius. Disambiguation from same-name artists is the
          single highest-impact lever — we have repeatedly seen the
          carousel populate within weeks of a clean disambiguation pass on
          an artist whose discography was previously fragmented across two
          competing entries.
        </p>
      </GuideSection>

      <GuideSection
        id="visual-and-other"
        number="04"
        eyebrow="Beyond music"
        heading="Visual artists, designers, and online creators."
      >
        <p>
          Music has the most mature entity ecosystem, but the same
          methodology adapts well to other creator categories. For visual
          artists, the high-leverage inputs are Artsy and Artnet profiles,
          gallery roster listings, museum collection databases, and any
          auction-house records (which double as authoritative provenance
          signals).
        </p>
        <p>
          For designers and architects, the network is industry-awards data
          (Cannes, D&amp;AD, AIA, etc.) plus agency rosters and tier-one
          design press. For YouTubers and platform-native creators, the key
          inputs are platform-confirmed channel ownership, Wikipedia where
          notability allows, and tier-one press features — plus, increasingly,
          structured byline metadata on guest essays and op-eds.
        </p>
      </GuideSection>

      <GuideSection
        id="ai-overviews"
        number="05"
        eyebrow="AI era"
        heading="How AI engines change the artist-panel calculus."
      >
        <p>
          For creators, the AI-overview era has changed the stakes more than
          it has for almost any other entity class. When a casting director
          or festival programmer asks ChatGPT or Perplexity for &quot;the
          best emerging jazz pianists working in New York,&quot; the engines
          recite a list grounded in Knowledge Graph entities. Without a
          panel, you are not in the consideration set the AI builds.
        </p>
        <p>
          Conversely, when a journalist asks Perplexity to summarise your
          career, what they recite is downstream of whatever your Knowledge
          Graph entity says. A verified, well-engineered panel means the
          bio they cite is the one you would have written. An unengineered
          entity surface means the bio is a hallucinated patchwork of
          whatever the engines could ground.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
