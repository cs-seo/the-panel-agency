import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQ, type FAQItem } from "@/components/FAQ";
import {
  Mail,
  Lock,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

// ─── Metadata ─────────────────────────────────────────────────────────────
// 58 chars · 2 emojis · no brand · keyword-led
export const metadata: Metadata = {
  title: "Contact a Google Knowledge Panel Agency 📧 NDA on Intake 🔐",
  // 158 chars · 3 emojis · CTR-led
  description:
    "📧 Contact a discreet Google Knowledge Panel agency. ✅ Mutual NDA on intake. 🔐 Senior strategist response in one business day. Apply for a SERP audit.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact a Google Knowledge Panel Agency 📧 NDA on Intake 🔐",
    description:
      "📧 Discreet entity engineering for founders, executives & public figures. ✅ NDA on intake. 🔐 One-business-day response.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact a Google Knowledge Panel Agency 📧",
    description:
      "📧 Discreet entity engineering, governed by NDA. ✅ Senior strategist response in one business day. 🔐 Apply for a SERP audit.",
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";
const PAGE_URL = `${SITE_URL}/contact`;

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: PAGE_URL,
  name: "Contact The Panel Agency",
  description:
    "Contact a Google Knowledge Panel agency. NDA-led intake for founders, executives, attorneys, fund managers, and public figures.",
  mainEntity: {
    "@type": "Organization",
    name: "The Panel Agency",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@thepanelagency.com",
        availableLanguage: ["en"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "press",
        email: "press@thepanelagency.com",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "legal",
        email: "legal@thepanelagency.com",
        availableLanguage: ["en"],
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
  ],
};

// ─── FAQs ────────────────────────────────────────────────────────────────
const faqs: FAQItem[] = [
  {
    q: "How quickly will you reply?",
    a: "Within one business day, by a senior strategist — never an automated drip or a junior account-management layer. Most inquiries received before noon UK time are returned the same working day. We deliberately keep the funnel narrow because our process is hands-on; if we can't engage personally, the engagement isn't a fit. If your inquiry is time-critical and you have a panel currently disappearing or being misrepresented, mention it in the subject line and we will prioritise it.",
  },
  {
    q: "Do I need to be a current client to contact you?",
    a: "No — most people who contact us are prospective clients evaluating whether a Knowledge Panel build is right for them. The first conversation is a complimentary 30-minute strategy call where we audit your live SERP, identify the specific entity-graph gaps preventing a panel from triggering (or causing it to misbehave), and give you an honest assessment of scope, timeline, and approximate investment. If we are the right fit, we'll outline next steps. If we aren't, we will tell you that too.",
  },
  {
    q: "Is everything I share covered by NDA from the first call?",
    a: "Yes. We send a mutual non-disclosure agreement before any discovery call, which covers everything you share with us about your identity, business, prior reputation work, and goals. The NDA is mutual — we are also bound to keep our methodology confidential because clients often work with us specifically to keep the underlying entity work invisible. If you would like the NDA in advance of contacting us, request it from legal@thepanelagency.com and we will dispatch it the same day.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="relative pt-36 sm:pt-44 pb-12 sm:pb-16 overflow-hidden">
          <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-50" />
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full opacity-25 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,82,255,0.35), rgba(0,82,255,0) 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-dim">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>→</li>
                <li className="text-ink">Contact</li>
              </ol>
            </nav>

            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              — Contact
            </p>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tightest text-balance leading-[1.04] max-w-4xl">
              Talk to a Knowledge Panel strategist.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
              A short, confidential conversation about your search result and what it
              would take to build, recover, or defend a verified Knowledge Panel.
              Senior strategist response within one business day. NDA on intake.
            </p>
          </div>
        </header>

        {/* ── Channels grid ───────────────────────────────────────── */}
        <section className="relative py-14 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              01 — How to reach us
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
              Three doors. Same response time.
            </h2>

            <div className="mt-10 grid md:grid-cols-3 gap-4 sm:gap-5">
              <ContactCard
                icon={<Mail size={16} />}
                label="New engagements"
                heading="hello@"
                domain="thepanelagency.com"
                href="mailto:hello@thepanelagency.com"
                blurb="For founders, executives, attorneys, fund managers, authors, and brand teams evaluating a Knowledge Panel build."
                cta="Send a confidential email"
              />
              <ContactCard
                icon={<ShieldCheck size={16} />}
                label="Press & analysts"
                heading="press@"
                domain="thepanelagency.com"
                href="mailto:press@thepanelagency.com"
                blurb="Editorial questions, interviews, expert commentary on entity SEO, Knowledge Graph mechanics, and AI overviews."
                cta="Reach press"
              />
              <ContactCard
                icon={<Lock size={16} />}
                label="Legal & NDAs"
                heading="legal@"
                domain="thepanelagency.com"
                href="mailto:legal@thepanelagency.com"
                blurb="Request our mutual NDA in advance, or escalate a legal matter relating to an existing engagement. Same-day turnaround."
                cta="Open a legal channel"
              />
            </div>
          </div>
        </section>

        {/* ── Application form CTA ─────────────────────────────── */}
        <section className="relative py-14 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
                02 — Or apply directly
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
                Prefer to skip the email?
              </h2>
              <p className="mt-5 text-ink-muted leading-relaxed max-w-md">
                The four-question intake takes about 90 seconds and gives us
                enough context to dispatch an NDA, schedule a discovery call,
                and quote a realistic scope. It is our preferred path for
                qualified prospects.
              </p>
              <Link
                href="/#apply"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                Start a confidential intake
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>

            <aside className="lg:col-span-7">
              <div className="rounded-3xl glass-strong p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                  What happens after you reach out
                </p>
                <ol className="mt-5 space-y-4 text-sm text-ink-muted">
                  {[
                    [
                      "Within 24 hours",
                      "A senior strategist replies personally with our NDA and a calendar link.",
                    ],
                    [
                      "Day 2–4",
                      "We audit your live SERP and entity surface before the call so the conversation starts informed.",
                    ],
                    [
                      "30-minute call",
                      "We share the audit, answer your questions, and outline what a build would actually involve.",
                    ],
                    [
                      "Within 5 business days",
                      "Fixed-scope quote and engagement letter. Half on intake, half on full-panel completion.",
                    ],
                  ].map(([when, what]) => (
                    <li key={when} className="flex gap-4">
                      <span className="shrink-0 mt-0.5 text-[11px] tracking-[0.18em] text-electric-glow w-[88px]">
                        {when}
                      </span>
                      <span className="text-ink-muted leading-relaxed">{what}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </section>

        {/* ── Locations + response details ─────────────────────── */}
        <section className="relative py-14 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              03 — Where we work
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
              London. New York. Wherever the brief lands.
            </h2>
            <p className="mt-5 text-ink-muted max-w-2xl leading-relaxed">
              We operate as a remote-first team distributed across UK and US
              time zones, which means a senior strategist is available during
              the working day on both sides of the Atlantic. Most engagements
              run entirely over encrypted email and video, with on-site
              workshops available where the scope justifies it.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                {
                  city: "London",
                  region: "United Kingdom",
                  note: "Headquarters · Strategy + entity engineering",
                },
                {
                  city: "New York",
                  region: "United States",
                  note: "North America · Account & press relations",
                },
                {
                  city: "Remote",
                  region: "Worldwide",
                  note: "Distributed senior strategists",
                },
                {
                  city: "On-site",
                  region: "On request",
                  note: "For multi-entity, multi-stakeholder engagements",
                },
              ].map((loc) => (
                <div key={loc.city} className="rounded-2xl glass p-5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gold">
                    <MapPin size={16} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-medium text-ink">
                    {loc.city}
                  </h3>
                  <p className="text-[12px] text-ink-dim">{loc.region}</p>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    {loc.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl glass p-6 sm:p-7 flex items-start gap-4 max-w-3xl">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-electric-glow">
                <Clock size={18} />
              </span>
              <div className="text-sm text-ink-muted leading-relaxed">
                <p className="text-ink font-medium">Response time, in plain English.</p>
                <p className="mt-1.5">
                  We aim to respond to every qualified inquiry within one
                  business day, in writing, by a senior strategist. If your
                  matter is urgent — a disappeared panel, a misrepresentation
                  in an AI answer, a verification deadline tied to a launch —
                  put &quot;urgent&quot; in the subject line and we will
                  prioritise it the same working day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Confidentiality recap ────────────────────────────── */}
        <section className="relative py-14 sm:py-20 border-t border-line/60">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">
              04 — Confidentiality
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest">
              How we handle what you share.
            </h2>
            <div className="mt-7 grid lg:grid-cols-2 gap-10 max-w-5xl">
              <div className="space-y-5 text-[17px] leading-[1.7] text-ink/85">
                <p>
                  Inbound email is reviewed only by senior strategy staff and is
                  never forwarded outside the agency without your written
                  consent. We do not retain message contents in any
                  customer-relationship system. Identifying details (your name,
                  your company, your current SERP audit) are stored in
                  encrypted, access-logged data rooms with revocation enabled.
                </p>
                <p>
                  We do not publish client logos, sell anonymised aggregate
                  data, or share methodology details in conferences, podcasts,
                  or trade press without specific approval. References, when
                  requested, are provided privately during qualification — not
                  posted publicly.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  ["Mutual NDA", "Dispatched before any discovery call."],
                  [
                    "Encrypted intake",
                    "All forms submit over TLS 1.3 with HSTS preload.",
                  ],
                  [
                    "Access-logged data rooms",
                    "Files exchanged with auditable, revocable access.",
                  ],
                  [
                    "No client logo wall",
                    "We never publish who we work with.",
                  ],
                  [
                    "References, privately",
                    "Provided one-to-one during qualification.",
                  ],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3 rounded-xl glass p-4">
                    <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gold">
                      <ShieldCheck size={14} />
                    </span>
                    <div>
                      <div className="text-ink text-sm font-medium">{k}</div>
                      <div className="text-ink-muted text-[13px] leading-snug">
                        {v}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <FAQ
          id="faq"
          eyebrow="FAQ"
          title="Before you reach out."
          intro="The three things every first-time contact wants to confirm."
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}

// ─── ContactCard helper ──────────────────────────────────────────────────
function ContactCard({
  icon,
  label,
  heading,
  domain,
  href,
  blurb,
  cta,
}: {
  icon: React.ReactNode;
  label: string;
  heading: string;
  domain: string;
  href: string;
  blurb: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl glass p-6 group hover:border-white/[0.12] transition-colors flex flex-col h-full"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink">
          {icon}
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-dim group-hover:text-electric-glow transition-colors"
        />
      </div>
      <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-ink-dim">
        {label}
      </p>
      <h3 className="mt-1 text-[20px] font-medium text-ink tracking-tight">
        {heading}
        <span className="text-ink-muted">{domain}</span>
      </h3>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">
        {blurb}
      </p>
      <span className="mt-5 text-[13px] text-electric-glow group-hover:underline">
        {cta} →
      </span>
    </a>
  );
}
