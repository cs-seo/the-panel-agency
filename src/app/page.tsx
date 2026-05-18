import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { KnowledgePanelPreviewer } from "@/components/KnowledgePanelPreviewer";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BentoFeatures } from "@/components/BentoFeatures";
import { Process } from "@/components/Process";
import { TrustBadges } from "@/components/TrustBadges";
import { ApplyCTA } from "@/components/ApplyCTA";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const homepageFaqs: FAQItem[] = [
  {
    q: "How long does it take to get a verified Google Knowledge Panel?",
    a: "A mini-panel — your name, photo, one-line role, and primary social profile — typically surfaces within 15 to 20 days of engagement. The full Knowledge Panel, with bio, education, profiles, books, and the 'People also search for' carousel, usually appears between days 60 and 75. Contested or common-name builds can take 90 to 120 days because the entity needs additional disambiguation work to overtake namesakes already in Google's Knowledge Graph.",
  },
  {
    q: "How is this different from a traditional SEO or PR agency?",
    a: "Traditional SEO agencies move rankings for pages; PR firms place stories. Neither, on its own, makes Google understand who you are as an entity. Our work happens at the Knowledge Graph layer — schema markup, structured data, citation alignment, KGMID linkage, and the confidence-score signals that trigger and stabilise a Knowledge Panel. PR and SEO are inputs to this; entity engineering is the actual lever that determines whether a panel appears.",
  },
  {
    q: "What does this cost, and what's included?",
    a: "The Knowledge Panel build is a one-time, fixed-scope engagement, priced after we audit your current SERP and entity surface. Pricing varies with name contestedness, the number of entities involved (e.g. founder plus company), and whether you want supporting work like a personal site, schema implementation, or ongoing SERP monitoring. Payment is split 50/50 — half on intake, half on full-panel completion. Optional monthly add-ons include identity defence, panel monitoring, and an AI overview retainer.",
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <KnowledgePanelPreviewer />
        <BeforeAfterSlider />
        <BentoFeatures />
        <Process />
        <TrustBadges />
        <FAQ
          eyebrow="FAQ"
          title="The questions everyone asks."
          intro="Quick answers before you book the audit. Longer technical walk-throughs live in the Resources section of the footer."
          items={homepageFaqs}
        />
        <ApplyCTA />
      </main>
      <Footer />
    </>
  );
}
