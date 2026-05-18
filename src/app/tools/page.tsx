import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import {
  Search,
  Code2,
  Sparkles,
  ArrowUpRight,
  CircleHelp,
  Lock,
} from "lucide-react";

// 64 chars · 2 emojis · no brand · keyword-led
export const metadata: Metadata = {
  title: "Free Knowledge Panel & Entity SEO Tools 🔍✨ Audit Yours Now",
  // 154 chars · 3 emojis
  description:
    "🔍 Free Knowledge Panel and entity-SEO tools. ✅ Check if Google sees you as a verified entity. 🧰 Generate schema, audit your SERP, no signup.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Knowledge Panel & Entity SEO Tools 🔍✨",
    description:
      "🔍 Audit your entity in Wikipedia, Wikidata & Google's Knowledge Graph. ✅ Generate Person & Organization schema. 🧰 No login required.",
    type: "website",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Are these tools actually free, or is this a freemium funnel?",
    a: "They are actually free — no email gate, no signup. We built them because most prospects come to us already half-confused about what their entity-graph status even is. Giving you the diagnostic tools for free means our first conversation can start at scope and price, not whether Google has heard of you. We charge for the heavy lifting — the entity engineering, the panel build, the disambiguation and defence work — not for the diagnostic.",
  },
  {
    q: "How accurate are the results? Can I rely on them for a decision?",
    a: "The entity checker hits Wikipedia and Wikidata directly, so those results are as authoritative as the source data itself. The schema generator outputs strict schema.org JSON-LD that passes Google's Rich Results Test. The Brand SERP Audit (coming soon) pulls live Google results via DataForSEO. None of these can tell you with certainty whether you'd qualify for a Knowledge Panel — that needs a human audit. But they do tell you what Google can already see, which is the most useful starting point.",
  },
  {
    q: "Why don't you have a Knowledge Panel checker like Kalicube?",
    a: "The Brand SERP Audit tool in the coming-soon slot does exactly that — it pulls your live Google results and flags whether a Knowledge Panel is rendering for your name. It uses DataForSEO under the hood (paid per call on our end) so we rate-limit it carefully. Once it ships, it will tell you in seconds whether a panel exists, what the KGMID is, and how clean the rest of your SERP looks. Sign up below to be notified when it goes live.",
  },
];

const tools = [
  {
    href: "/tools/entity-check",
    icon: <Search size={18} />,
    title: "Entity Existence Checker",
    blurb:
      "Check whether your name has a Wikipedia article, a Wikidata entry, or appears in Google's Knowledge Graph. Free, instant, no signup.",
    cta: "Run the check",
    state: "live" as const,
  },
  {
    href: "/tools/schema-generator",
    icon: <Code2 size={18} />,
    title: "Person & Org Schema Generator",
    blurb:
      "Build the JSON-LD that tells Google who you are. Person and Organization schema, validated, copy-paste ready.",
    cta: "Generate schema",
    state: "live" as const,
  },
  {
    href: "/tools",
    icon: <Sparkles size={18} />,
    title: "Brand SERP Audit",
    blurb:
      "Live Google SERP analysis for your name. Knowledge Panel detection, KGMID lookup, content-ownership scoring. (Coming soon.)",
    cta: "Notify me",
    state: "coming-soon" as const,
  },
  {
    href: "/tools",
    icon: <Lock size={18} />,
    title: "Verification Risk Score",
    blurb:
      "Confidential 30-signal audit of your entity stack scored for panel-disappearance risk. (Coming soon.)",
    cta: "Notify me",
    state: "coming-soon" as const,
  },
];

export default function ToolsIndex() {
  return (
    <>
      <Nav />
      <main className="relative">
        <header className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              — Free tools
            </p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Free Knowledge Panel <span className="text-electric-glow">tools.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              The diagnostic stack we use on our own client audits — open to anyone. No
              signup, no email gate. Check your entity status across Wikipedia,
              Wikidata, and Google&apos;s Knowledge Graph, generate the schema your
              site is probably missing, and (soon) run a live brand-SERP audit.
            </p>
          </div>
        </header>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {tools.map((t) => {
                const isLive = t.state === "live";
                return (
                  <Link
                    key={t.title}
                    href={t.href}
                    className={
                      "group rounded-2xl glass p-6 transition-colors border " +
                      (isLive
                        ? "border-white/[0.06] hover:border-white/[0.16]"
                        : "border-white/[0.04] opacity-70 hover:opacity-100")
                    }
                  >
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink">
                        {t.icon}
                      </span>
                      <span
                        className={
                          "text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full " +
                          (isLive
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-gold/15 text-gold border border-gold/30")
                        }
                      >
                        {isLive ? "Live" : "Coming soon"}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-medium tracking-tight">
                      {t.title}
                    </h2>
                    <p className="mt-2 text-ink-muted leading-relaxed">{t.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] text-electric-glow group-hover:underline">
                      {t.cta}
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
                — Why we publish these
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
                The first audit is the one nobody pays for.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
              <p>
                We publish these tools for the same reason a credible mechanic
                offers free diagnostics: it gets the right people in the door
                and weeds out the wrong ones. If you run our entity check and
                already have a clean Wikidata entry, a Wikipedia article, and a
                live Knowledge Panel, you probably do not need us — and we will
                tell you that.
              </p>
              <p>
                If you run the check and Google has no record of you at all,
                that is the diagnostic that turns a guess into a plan. The
                tools tell you what Google sees. We tell you what to do about
                it.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              — How to use them in order
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest max-w-3xl">
              The recommended diagnostic order.
            </h2>
            <ol className="mt-10 grid md:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  n: "01",
                  t: "Run the Entity Check first",
                  b: "Find out whether you exist in Wikipedia, Wikidata, or the Knowledge Graph. This is the single most diagnostic 30 seconds in entity SEO.",
                },
                {
                  n: "02",
                  t: "Generate your schema",
                  b: "If the entity check came back thin, the next step is publishing a clean Person or Organization schema on your own site. Use the generator, paste the output into your <head>.",
                },
                {
                  n: "03",
                  t: "Audit your SERP",
                  b: "Once your owned signals are deployed, the Brand SERP Audit (coming soon) tells you what Google actually surfaces for your name — and what your closest namesakes look like.",
                },
              ].map((s) => (
                <li key={s.n} className="rounded-2xl glass p-6">
                  <div className="text-[11px] tracking-[0.18em] text-ink-dim">STEP</div>
                  <div className="mt-1 font-mono text-3xl font-medium text-electric-glow">
                    {s.n}
                  </div>
                  <h3 className="mt-4 text-[17px] font-medium">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <CircleHelp size={28} className="mx-auto text-gold mb-4" aria-hidden />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tightest">
              Need a human read on the results?
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Tools tell you the data. They cannot tell you, &quot;in your case,
              this Wikidata entry actually hurts you because of a namesake
              conflict.&quot; That is where we come in.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                Apply for Representation
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-[15px] font-medium text-ink hover:bg-white/[0.06] transition-colors"
              >
                Talk to a strategist
              </Link>
            </div>
          </div>
        </section>

        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Tool questions."
          intro="The three things people ask before they hit the button."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
