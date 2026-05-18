import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import {
  Search,
  Code2,
  Sparkles,
  Shield,
  ArrowUpRight,
  CircleHelp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Knowledge Panel & Entity SEO Tools 🔍✨ Audit Yours Now",
  description:
    "🔍 Free Knowledge Panel and entity-SEO tools. ✅ Check if Google sees you as a verified entity. 🧰 Generate schema, score risk, audit your SERP. No signup.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Knowledge Panel & Entity SEO Tools 🔍✨",
    description:
      "🔍 Audit your brand SERP, score your entity stack, generate schema, check Wikipedia & Wikidata. ✅ All free. 🧰 No login required.",
    type: "website",
  },
};

const faqs: FAQItem[] = [
  {
    q: "Are these tools actually free, or is this a freemium funnel?",
    a: "They're actually free. The Brand SERP Audit is rate-limited to three audits per IP per 24 hours because it costs us per call, and cached for 12 hours. Everything else is unlimited. We built them because most prospects come to us already half-confused about what their entity-graph status even is. Free diagnostics mean our first conversation starts at scope and price.",
  },
  {
    q: "How accurate are the results?",
    a: "The Entity Check hits Wikipedia and Wikidata directly. The Schema Generator outputs strict schema.org JSON-LD that passes Google's Rich Results Test. The Verification Risk Score is a weighted aggregate of five public-API signals. The Brand SERP Audit pulls live Google SERP data through DataForSEO from a clean US desktop user-agent.",
  },
  {
    q: "Which tool should I run first?",
    a: "Run them in this order: 1) Entity Check (binary yes/no on Wikipedia + Wikidata, 30 seconds). 2) Verification Risk Score (deeper weighted breakdown). 3) Brand SERP Audit (shows what Google actually surfaces for your name). 4) Schema Generator (deploy what's missing).",
  },
];

const tools = [
  {
    href: "/tools/serp-audit",
    icon: <Sparkles size={18} />,
    title: "Brand SERP Audit",
    blurb:
      "Live Google SERP analysis for your name. Knowledge Panel detection, KGMID extraction, organic source classification, and People Also Ask cluster.",
    cta: "Run audit",
  },
  {
    href: "/tools/entity-check",
    icon: <Search size={18} />,
    title: "Entity Existence Checker",
    blurb:
      "Check whether your name has a Wikipedia article and a Wikidata entry — the two public foundations of a Knowledge Panel.",
    cta: "Run the check",
  },
  {
    href: "/tools/verification-risk-score",
    icon: <Shield size={18} />,
    title: "Verification Risk Score",
    blurb:
      "Score your entity stack 0-100 across five signals: Wikipedia, Wikidata, sameAs density, image assets, bio strength.",
    cta: "Score yourself",
  },
  {
    href: "/tools/schema-generator",
    icon: <Code2 size={18} />,
    title: "Person & Org Schema Generator",
    blurb:
      "Build the JSON-LD that tells Google who you are. Person and Organization schema, validated, copy-paste ready.",
    cta: "Generate schema",
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
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Free tools</p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Free Knowledge Panel <span className="text-electric-glow">tools.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              The diagnostic stack we use on our own client audits, open to anyone. No
              signup, no email gate. Audit your live Brand SERP, score your entity
              stack, check Wikipedia and Wikidata, and generate the schema your site
              is probably missing.
            </p>
          </div>
        </header>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {tools.map((t) => (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group rounded-2xl glass p-6 transition-colors border border-white/[0.06] hover:border-white/[0.16]"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink">
                      {t.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Live
                    </span>
                  </div>
                  <h2 className="mt-6 text-2xl font-medium tracking-tight">{t.title}</h2>
                  <p className="mt-2 text-ink-muted leading-relaxed">{t.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[14px] text-electric-glow group-hover:underline">
                    {t.cta}
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— Recommended order</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest max-w-3xl">
              The full diagnostic flow, in order.
            </h2>
            <ol className="mt-10 grid md:grid-cols-4 gap-4 sm:gap-5">
              {[
                ["01", "Entity Check", "Binary yes/no on the two public foundations."],
                ["02", "Risk Score", "Weighted 0-100 breakdown of all five signals."],
                ["03", "Brand SERP Audit", "What Google actually shows strangers searching you."],
                ["04", "Schema Generator", "Deploy the fix."],
              ].map(([n, t, b]) => (
                <li key={n} className="rounded-2xl glass p-5">
                  <div className="text-[11px] tracking-[0.18em] text-ink-dim">STEP</div>
                  <div className="mt-1 font-mono text-3xl font-medium text-electric-glow">{n}</div>
                  <h3 className="mt-3 text-[16px] font-medium">{t}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{b}</p>
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
              Tools tell you the data. They cannot tell you, in your case, this Wikidata
              entry actually hurts you because of a namesake conflict. That is where we
              come in.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                Apply for Representation
                <span aria-hidden>{"→"}</span>
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

        <section className="relative py-12 sm:py-16 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6">
            <LeadCaptureForm
              name="lead-magnet"
              eyebrow="— Free download"
              title="The Knowledge Panel checklist (PDF)"
              blurb="The exact 30-signal pre-flight checklist we run on every new client engagement. Drop your email and we send it instantly."
              buttonLabel="Send me the checklist"
              successMessage="Sent. Check your inbox in the next minute (and your spam if not)."
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
