import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { SerpAuditClient } from "./SerpAuditClient";

// 64 chars · 1 emoji · no brand
export const metadata: Metadata = {
  title: "Free Brand SERP Audit — See What Google Shows for Your Name 🔍",
  // 156 chars · 3 emojis
  description:
    "🔍 Free Brand SERP audit. ✅ See if a Google Knowledge Panel renders for your name. 🆔 Get the KGMID, organic results, and 'People also ask' instantly.",
  alternates: { canonical: "/tools/serp-audit" },
  openGraph: {
    title: "Free Brand SERP Audit 🔍 What Google Shows for Your Name",
    description:
      "🔍 Live Google SERP analysis for any name. ✅ Knowledge Panel detection + KGMID. 🆔 Organic ownership scoring. Free.",
    type: "website",
    images: ["/serp-audit.webp"],
  },
};

const faqs: FAQItem[] = [
  {
    q: "Is this really free? How can you afford to run live Google searches?",
    a: "It is free, but rate-limited to three audits per IP per 24 hours, and cached so identical queries within twelve hours don't trigger a fresh paid call on our end. Each live Google SERP we pull through DataForSEO costs us a fraction of a cent — so the audit budget per visitor is small. If you need to run dozens of audits (agency use, name-disambiguation testing, etc.) talk to us about a strategist-led audit package.",
  },
  {
    q: "How is this different from just Googling my own name?",
    a: "Google personalises results based on your location, your search history, your account, and a dozen other signals. When you Google yourself, you see a version of the SERP tilted by things Google knows about you. This tool pulls a clean, location-neutral SERP from a desktop user-agent in the United States — which is closer to what a stranger Googling your name actually sees. The difference is often dramatic for people in tech or media.",
  },
  {
    q: "Why did the tool say I don't have a Knowledge Panel when I can see one when I search?",
    a: "Most often this means your panel is rendering for personalised queries (when YOU search) but not unauthenticated ones (when strangers search). This is common for new panels still gaining confidence in Google's Knowledge Graph. Other causes: your panel renders only for very specific name-plus-role queries (e.g. 'Jane Doe founder' but not 'Jane Doe'), or your panel was recently retired and you're seeing a cached version. We diagnose these cases in detail during a strategist audit.",
  },
];

export default function SerpAuditPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <header className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-dim">
              <a href="/" className="hover:text-ink transition-colors">Home</a>
              <span aria-hidden> → </span>
              <a href="/tools" className="hover:text-ink transition-colors">Tools</a>
              <span aria-hidden> → </span>
              <span className="text-ink">Brand SERP Audit</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Free tool</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              What does Google <span className="text-electric-glow">actually show</span> for your name?
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              The live, unauthenticated Brand SERP audit. Type any name. We pull a
              fresh Google search through DataForSEO, detect whether a Knowledge
              Panel renders, extract the KGMID if it exists, score the surrounding
              organic results by source type, and surface the &quot;People also
              ask&quot; cluster.
            </p>
            <p className="mt-3 text-[13px] text-ink-dim">
              Rate-limited to 3 audits per day per visitor. Cached for 12 hours.
            </p>
          </div>
        </header>

        <section className="relative py-8 sm:py-12 border-t border-line/60">
          <div className="mx-auto max-w-5xl px-6">
            <SerpAuditClient />
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— How to use the results</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
                What the audit tells you in three signals.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
              <p>
                <strong>Knowledge Panel detection.</strong> The most decisive line
                of the audit. If a panel is rendering, the audit returns it with
                the KGMID (Google&apos;s internal entity ID). No panel means Google
                hasn&apos;t recognised your name as a verifiable entity at all —
                which is the start of every entity-engineering engagement we run.
              </p>
              <p>
                <strong>Organic source mix.</strong> We tag each of the top ten
                results as &quot;owned&quot; (your own site), &quot;social&quot;
                (LinkedIn, X, Instagram, etc.), &quot;press&quot; (Forbes,
                Bloomberg, Crunchbase, Wikipedia, etc.), or &quot;other.&quot; A
                healthy Brand SERP is mostly owned + press. A SERP dominated by
                random &quot;other&quot; results is a sign of an under-defended
                identity.
              </p>
              <p>
                <strong>People also ask.</strong> Reveals the questions Google
                believes searchers want answered next about you. The most useful
                signal here is what&apos;s <em>missing</em> — if the PAA cluster
                doesn&apos;t reflect your actual work, your entity surface is too
                thin to shape it.
              </p>
            </div>
          </div>
        </section>

        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Brand SERP audit questions."
          intro="The three things people ask after seeing their first audit run."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
