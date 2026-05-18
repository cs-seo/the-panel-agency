import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import {
  Database,
  Network,
  ShieldCheck,
  Sparkles,
  FileText,
  Search,
  Clock,
  AlertTriangle,
  Check,
} from "lucide-react";

// ─── Metadata ─────────────────────────────────────────────────────────────
// 64 chars · 1 emoji · no brand · keyword-led
// "How Google Knowledge Panels Work" is the primary phrase. The trailing
// secondaries cover the related queries people search alongside it.
export const metadata: Metadata = {
  title: "How Google Knowledge Panels Work — Triggers, Schema & Signals 🔍",
  // 152 chars · 3 emojis · CTR-led
  description:
    "🔍 Inside Google's Knowledge Graph: how panels trigger, where the data comes from, and what schema you need. ✅ Full breakdown. 📊 Read the guide.",
  alternates: { canonical: "/learn/how-knowledge-panels-work" },
  openGraph: {
    title: "How Google Knowledge Panels Work — Triggers, Schema & Signals 🔍",
    description:
      "🔍 Inside Google's Knowledge Graph: triggers, schema, AI overviews. ✅ A full technical breakdown. 📊 Read the agency's reference guide.",
    type: "article",
    images: ["/entity-graph.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Google Knowledge Panels Work 🔍",
    description:
      "🔍 Knowledge Graph triggers, schema, and entity signals — what actually makes Google show a panel. ✅ Full guide. 📊 Read it now.",
    images: ["/entity-graph.webp"],
  },
};

// ─── Article + Breadcrumb JSON-LD ────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";
const PAGE_URL = `${SITE_URL}/learn/how-knowledge-panels-work`;

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Google Knowledge Panels Work — Triggers, Schema & Signals",
  description:
    "A technical reference on how Google Knowledge Panels are triggered: the role of the Knowledge Graph, schema markup, entity signals, and the new AI-overview era.",
  url: PAGE_URL,
  image: `${SITE_URL}/entity-graph.webp`,
  author: { "@type": "Organization", name: "The Panel Agency" },
  publisher: {
    "@type": "Organization",
    name: "The Panel Agency",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
  },
  datePublished: "2026-05-18",
  dateModified: "2026-05-18",
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE_URL}/learn` },
    {
      "@type": "ListItem",
      position: 3,
      name: "How Knowledge Panels Work",
      item: PAGE_URL,
    },
  ],
};

// ─── FAQs (rendered + emitted as FAQPage JSON-LD by <FAQ />) ──────────────
const faqs: FAQItem[] = [
  {
    q: "Do I have to be famous to get a Knowledge Panel?",
    a: "No, but you do have to be notable in Google's sense of the word — meaning Google can find consistent, structured information about you across multiple authoritative sources. A regional founder with a Wikipedia entry, Crunchbase profile, byline in a tier-one outlet, and a well-marked-up personal site can absolutely qualify. The threshold isn't fame; it's verifiability. The Panel Agency engineers the verifiability artificially when it doesn't exist organically.",
  },
  {
    q: "Can I just pay Google to create a Knowledge Panel?",
    a: "No. Knowledge Panels are derived from Google's Knowledge Graph, which is constructed from third-party signals — not from a profile you can buy, fill in, or boost. The only way to influence a panel is to influence the underlying entity signals: structured data, citation graph, name disambiguation, and confidence-score inputs. Once a panel exists, you can claim it as the verified manager, but the panel itself is earned through entity engineering, not purchased.",
  },
  {
    q: "Will a Knowledge Panel help with ChatGPT, Perplexity, and Gemini too?",
    a: "Yes — and this is becoming the dominant reason clients invest. Most AI answer engines either license Google's Knowledge Graph, scrape its outputs, or rely on the same structured-data ecosystem Knowledge Panels are built on. When your entity is verified inside Google's graph, ChatGPT and Perplexity tend to recite the same canonical bio Google does, and Gemini almost always does. A Knowledge Panel build is therefore also an answer-engine optimisation (AEO) build.",
  },
];

// ─── Reusable section helpers ────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">{children}</p>
  );
}

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-3xl sm:text-4xl font-semibold tracking-tightest text-balance scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85 max-w-3xl">
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function HowKnowledgePanelsWorkPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        {/* JSON-LD payloads */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <header className="relative pt-36 sm:pt-44 pb-12 sm:pb-16 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div className="relative mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-dim">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>→</li>
                <li>
                  <span className="text-ink-muted">Learn</span>
                </li>
                <li aria-hidden>→</li>
                <li className="text-ink">How Knowledge Panels Work</li>
              </ol>
            </nav>

            <Eyebrow>Reference guide · 8 min read</Eyebrow>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              How Google Knowledge Panels actually work.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              A technical reference on what a Knowledge Panel is, where the data comes from,
              what triggers a panel to appear, and how the new generation of AI search engines
              changes the stakes. Written by the team that builds them.
            </p>
          </div>
        </header>

        {/* ── On-page TOC ──────────────────────────────────────────── */}
        <section className="relative pb-4">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl glass p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-4">On this page</p>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {[
                  ["#what-is", "What a Knowledge Panel actually is"],
                  ["#sources", "Where the data comes from"],
                  ["#triggers", "What triggers a panel to appear"],
                  ["#schema", "The role of schema and structured data"],
                  ["#ai-era", "The AI-overview era"],
                  ["#why-not", "Why panels don't appear (and disappear)"],
                  ["#timeline", "How long it takes, realistically"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-ink-muted hover:text-ink transition-colors flex items-baseline gap-3"
                    >
                      <span className="text-electric-glow tabular-nums text-[12px]">
                        {String(
                          [
                            "#what-is",
                            "#sources",
                            "#triggers",
                            "#schema",
                            "#ai-era",
                            "#why-not",
                            "#timeline",
                            "#faq",
                          ].indexOf(href) + 1
                        ).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 1. What is a Knowledge Panel ─────────────────────────── */}
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>01 — Definition</Eyebrow>
              <SectionHeading id="what-is">
                What a Knowledge Panel actually is.
              </SectionHeading>
              <div className="mt-7">
                <Prose>
                  <p>
                    A Knowledge Panel is the structured information card Google renders to the
                    right of (or above) the organic search results when someone searches a
                    recognisable entity — a person, company, place, book, film, or institution.
                    It contains a verified summary: photo, role, short bio, dates, education,
                    affiliations, social profiles, and a &quot;People also search for&quot;
                    carousel of related entities.
                  </p>
                  <p>
                    Crucially, a Knowledge Panel is <em>not</em> a profile a user creates. It is
                    a derived output of Google&apos;s <strong>Knowledge Graph</strong> — a
                    massive internal database of entities and their relationships. Google decides
                    you exist as an entity, then renders a panel for that entity. The panel is
                    the visible surface of the underlying graph entry, which is identified
                    internally by a stable ID called a KGMID (also seen as <code>/g/...</code> or
                    <code>/m/...</code> identifiers in Google&apos;s URLs).
                  </p>
                </Prose>
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-2xl glass-strong p-5 sm:p-6">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                  <span>Anatomy of a panel</span>
                  <span className="flex items-center gap-1 text-emerald-300/90">
                    <Check size={12} /> Verified
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  {[
                    ["Name & one-line title", "The headline of your entity."],
                    ["Avatar / photo", "Sourced from authoritative profiles."],
                    ["Short bio", "Drawn from Wikipedia or licensed sources."],
                    ["Key facts", "Born, education, awards, works."],
                    ["Profile links", "Verified social and official surfaces."],
                    [
                      "People also search for",
                      "The graph's view of your professional neighbourhood.",
                    ],
                  ].map(([k, v]) => (
                    <li key={k} className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                      <div>
                        <div className="text-ink">{k}</div>
                        <div className="text-ink-muted text-[13px] leading-snug">{v}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ── 2. Where the data comes from ─────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>02 — Inputs</Eyebrow>
            <SectionHeading id="sources">Where the data comes from.</SectionHeading>
            <div className="mt-7 grid lg:grid-cols-2 gap-12 items-start">
              <Prose>
                <p>
                  Knowledge Graph entries are stitched together from many sources — no single one
                  is mandatory, but every panel is the product of multiple corroborating signals.
                  This is why a panel cannot be created by editing one profile: the graph needs
                  agreement across the ecosystem.
                </p>
                <p>
                  Wikidata is the closest thing the open web has to a public mirror of the
                  Knowledge Graph, and it is one of the most reliable on-ramps. Wikipedia,
                  Crunchbase, IMDb, Goodreads, and music-industry databases like MusicBrainz feed
                  in directly for relevant entity types. For people specifically, the graph
                  draws heavily from authoritative press, official biographies, and structured
                  markup on the entity&apos;s own website.
                </p>
                <p>
                  Underneath all of this sits <strong>schema.org JSON-LD</strong>: the structured
                  metadata Google reads from your own site to confirm what the graph already
                  suspects. A perfectly-tagged{" "}
                  <code>Person</code> schema isn&apos;t a substitute for citations, but it acts
                  as the deciding vote when Google is on the fence about you.
                </p>
              </Prose>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-strong">
                <Image
                  src="/entity-graph.webp"
                  alt="Abstract visualisation of an entity in a knowledge graph — connected blue nodes representing structured data sources."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. What triggers a panel ─────────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>03 — Triggers</Eyebrow>
            <SectionHeading id="triggers">What triggers a panel to appear.</SectionHeading>
            <p className="mt-5 text-ink-muted max-w-3xl">
              Google does not publish the trigger conditions — but a decade of observation across
              hundreds of builds gives a reliable working model. Five signals do most of the
              work:
            </p>

            <ol className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Database size={16} />,
                  n: "01",
                  t: "Entity identification",
                  b: "Google has to first decide that the queried name refers to a single, distinguishable entity — not a disambiguation cluster. Name consistency across the web is the lever here.",
                },
                {
                  icon: <Network size={16} />,
                  n: "02",
                  t: "Authoritative corroboration",
                  b: "At least two or three independent, authoritative sources need to say the same factual things about you. Press mentions, Wikidata, structured profiles, and your own site all count.",
                },
                {
                  icon: <FileText size={16} />,
                  n: "03",
                  t: "Schema completeness",
                  b: "Person / Organisation schema on your own site, with sameAs links pointing to your verified social and reference profiles, gives Google the canonical knot to tie the entity around.",
                },
                {
                  icon: <Sparkles size={16} />,
                  n: "04",
                  t: "Notability threshold",
                  b: "Google's internal scoring needs to clear a notability bar relative to the entity's category. The bar for an author is far lower than for an executive of the same name with a Wikipedia-famous namesake.",
                },
                {
                  icon: <ShieldCheck size={16} />,
                  n: "05",
                  t: "Confidence over time",
                  b: "Even with everything else right, Google waits to confirm signals don't decay. This is why panels rarely appear on day one — confidence is something Google watches accrue.",
                },
                {
                  icon: <Search size={16} />,
                  n: "06",
                  t: "Query volume on your name",
                  b: "Panels are rendered for queries Google deems worth optimising. A trickle of searches on your name accelerates appearance; zero search volume can delay it indefinitely.",
                },
              ].map((it) => (
                <li key={it.n} className="rounded-2xl glass p-5 relative">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink">
                      {it.icon}
                    </div>
                    <div>
                      <div className="text-[11px] tracking-[0.18em] text-ink-dim">
                        SIGNAL {it.n}
                      </div>
                      <h3 className="mt-0.5 text-[16px] font-medium text-ink">{it.t}</h3>
                      <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{it.b}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 4. Schema deep-dive ──────────────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>04 — Technical</Eyebrow>
            <SectionHeading id="schema">
              The role of schema and structured data.
            </SectionHeading>
            <div className="mt-7 grid lg:grid-cols-2 gap-10">
              <Prose>
                <p>
                  Schema markup is the dialect Google&apos;s parsers speak. A correctly-marked-up
                  <code>Person</code> entity on your own site does three things: it disambiguates
                  who you are, it points Google to the other places where you exist (via{" "}
                  <code>sameAs</code>), and it gives Google a canonical record to merge into the
                  graph.
                </p>
                <p>
                  For an individual, the minimum useful schema is a{" "}
                  <code>Person</code> object with <code>name</code>, <code>jobTitle</code>,{" "}
                  <code>worksFor</code>, <code>alumniOf</code>, <code>image</code>, and a clean{" "}
                  <code>sameAs</code> array pointing at LinkedIn, X, Wikidata, official site, and
                  any press authorship pages. For brands, the equivalent is{" "}
                  <code>Organization</code> with logo, founding date, founders, and addresses.
                </p>
                <p>
                  Schema alone will not summon a panel. But it is, almost without exception, the
                  reason a panel finally goes live once the rest of the signal stack is in place
                  — schema is the keystone that turns inputs into Google&apos;s decision.
                </p>
              </Prose>
              <pre className="rounded-2xl glass-strong p-5 text-[12.5px] leading-relaxed overflow-x-auto font-mono text-ink-muted">
{`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Full Name",
  "jobTitle": "Founder & CEO",
  "image": "https://yoursite.com/headshot.jpg",
  "worksFor": {
    "@type": "Organization",
    "name": "Your Company"
  },
  "alumniOf": "Your University",
  "sameAs": [
    "https://www.linkedin.com/in/...",
    "https://x.com/...",
    "https://www.wikidata.org/wiki/Q...",
    "https://crunchbase.com/person/..."
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* ── 5. AI era ────────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Eyebrow>05 — The new layer</Eyebrow>
              <SectionHeading id="ai-era">The AI-overview era.</SectionHeading>
              <div className="mt-7">
                <Prose>
                  <p>
                    Until about 2024, a Knowledge Panel was primarily a visual artifact on
                    Google.com. That changed when generative answer engines — ChatGPT, Perplexity,
                    Gemini, and Google&apos;s own AI Overviews — began rendering bios on the fly.
                    These systems do not interview you; they recite the most confident
                    information about your entity that they can ground.
                  </p>
                  <p>
                    The grounding sources are almost identical to the inputs a Knowledge Panel
                    consumes. So in 2026, building a Knowledge Panel is also a generative-engine
                    optimisation (GEO) project: an audited entity stack means that when someone
                    asks ChatGPT &quot;who is X,&quot; they get the bio you actually want
                    recited.
                  </p>
                </Prose>
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-2xl glass-strong p-6 space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                  Engines that consume the same signals
                </p>
                <ul className="space-y-2.5 text-sm text-ink-muted">
                  {[
                    ["Google AI Overviews", "Direct read of the Knowledge Graph."],
                    ["ChatGPT", "Indirect via licensed and indexed structured data."],
                    ["Perplexity", "Real-time grounding through cited entity surfaces."],
                    ["Gemini", "Native read of Google's graph plus realtime."],
                    ["Apple Intelligence", "Licenses both major graphs."],
                  ].map(([k, v]) => (
                    <li key={k} className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <div>
                        <div className="text-ink">{k}</div>
                        <div className="text-ink-muted text-[13px] leading-snug">{v}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* ── 6. Why panels don't appear ───────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>06 — Troubleshooting</Eyebrow>
            <SectionHeading id="why-not">
              Why panels don&apos;t appear (or quietly disappear).
            </SectionHeading>
            <p className="mt-5 text-ink-muted max-w-3xl">
              When a panel fails to trigger, the cause is almost always one of seven recurring
              issues:
            </p>
            <ul className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                [
                  "Name collision",
                  "A more notable namesake is absorbing the entity. Disambiguation strategy required.",
                ],
                [
                  "Insufficient authority",
                  "Citations are too few or too low-tier to clear the notability threshold.",
                ],
                [
                  "Conflicting facts",
                  "Different sources say different things about role, dates, or affiliations.",
                ],
                [
                  "Stale data",
                  "Old, inconsistent profiles outrank the canonical surface.",
                ],
                [
                  "Missing schema",
                  "No on-site Person/Organization JSON-LD to anchor the entity.",
                ],
                [
                  "Penalised press surface",
                  "Authoritative-but-spammed sources can drag confidence down.",
                ],
                [
                  "Recent Wikipedia deletion",
                  "Deletion is often the proximate cause of a panel that vanished.",
                ],
              ].map(([k, v]) => (
                <li key={k} className="rounded-2xl glass p-5 flex gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gold">
                    <AlertTriangle size={16} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-medium text-ink">{k}</h3>
                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 7. Timeline ──────────────────────────────────────────── */}
        <section className="relative py-16 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow>07 — Timeline</Eyebrow>
            <SectionHeading id="timeline">How long it takes, realistically.</SectionHeading>
            <p className="mt-5 text-ink-muted max-w-3xl">
              Speed depends on starting entity surface, name contestedness, and authority budget.
              The honest median across our builds:
            </p>
            <div className="mt-10 relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-line" aria-hidden />
              <ol className="space-y-6">
                {[
                  [
                    "Days 1–14",
                    "Audit, schema deploy, profile reconciliation",
                    "Entity surface is mapped, JSON-LD goes live, primary profiles updated.",
                  ],
                  [
                    "Days 15–25",
                    "Mini-panel appears",
                    "Name + photo + one-line role + primary profile. The first visible win.",
                  ],
                  [
                    "Days 30–55",
                    "Citation push and Wikidata reconciliation",
                    "Authoritative mentions accrue, Wikidata is brought into line.",
                  ],
                  [
                    "Days 60–75",
                    "Full panel goes live",
                    "Bio, education, profiles, books, 'People also search for' all populate.",
                  ],
                  [
                    "Day 75 onwards",
                    "Claim, lock, defend",
                    "Verification, panel manager claim, monitoring against drift.",
                  ],
                ].map(([when, what, why]) => (
                  <li key={when} className="relative pl-14">
                    <span className="absolute left-1 top-1.5 w-7 h-7 rounded-full grid place-items-center bg-obsidian border border-electric/40 text-electric-glow">
                      <Clock size={14} />
                    </span>
                    <div className="rounded-2xl glass p-5">
                      <div className="text-[11px] tracking-[0.18em] text-ink-dim">{when}</div>
                      <h3 className="mt-1 text-[17px] font-medium text-ink">{what}</h3>
                      <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{why}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── CTA block ────────────────────────────────────────────── */}
        <section className="relative py-20 border-t border-line/60">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tightest text-balance">
              Want this done <span className="text-electric-glow">for you?</span>
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed max-w-2xl mx-auto">
              We build the entity stack, trigger the panel, and defend it long-term. NDA on
              submission, fixed scope after the audit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                Apply for Representation <span aria-hidden>→</span>
              </Link>
              <Link
                href="/#previewer"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-[15px] font-medium text-ink hover:bg-white/[0.06] transition-colors"
              >
                Preview your panel
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Frequently asked questions."
          intro="The three questions almost every prospect asks on the first call."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
