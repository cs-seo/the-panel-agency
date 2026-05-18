import { LogoMark } from "@/components/Logo";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-line/60">
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 30% 50%, rgba(0,82,255,0.15), transparent 70%), radial-gradient(40% 40% at 90% 80%, rgba(201,168,106,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">— The Weekly Panel</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tightest text-balance">
              The newsletter for people who care how Google sees them.
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              A short Friday email: one Knowledge Panel teardown, one entity-SEO tactic,
              one piece of news from the AI-overview era.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ink-dim">
              <li className="flex items-center gap-1.5"><Mail size={12} className="text-gold" /> Weekly, Friday</li>
              <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-gold" /> Never shared</li>
              <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-gold" /> One-click unsub</li>
            </ul>
          </div>
          <div className="w-full lg:w-[420px]">
            <LeadCaptureForm
              name="newsletter"
              eyebrow="Subscribe"
              title="The Weekly Panel"
              blurb="One email a week. Unsubscribe anytime."
              buttonLabel="Subscribe"
              successMessage="You are on the list. Next briefing ships Friday."
            />
          </div>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-ink">
              <LogoMark size={28} />
              <span className="font-semibold tracking-tight text-[15px]">The Panel Agency</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-ink-muted leading-relaxed">
              White-glove Google Knowledge Panel establishment and entity management for founders,
              executives, authors, artists, and public figures.
            </p>
            <p className="mt-6 text-xs text-ink-dim">NDA on submission · Encrypted data rooms</p>
            <p className="mt-3 text-xs text-ink-dim">London · New York · Remote</p>
          </div>
          <FooterCol title="Solutions" items={[
            ["For Founders", "/solutions/knowledge-panel-for-founders"],
            ["For Authors", "/solutions/knowledge-panel-for-authors"],
            ["For Artists", "/solutions/knowledge-panel-for-artists"],
            ["For Brands", "/solutions/knowledge-panel-for-brands"],
            ["Verification Badge", "/solutions/verification-badge"],
          ]} />
          <FooterCol title="Tools" items={[
            ["All tools", "/tools"],
            ["Brand SERP Audit", "/tools/serp-audit"],
            ["Entity Check", "/tools/entity-check"],
            ["Risk Score", "/tools/verification-risk-score"],
            ["Schema Generator", "/tools/schema-generator"],
          ]} />
          <FooterCol title="Glossary" items={[
            ["All entries", "/glossary"],
            ["Knowledge Panel", "/glossary/knowledge-panel"],
            ["Knowledge Graph", "/glossary/knowledge-graph"],
            ["Featured Snippet", "/glossary/featured-snippet"],
            ["People Also Ask", "/glossary/people-also-ask"],
            ["AI Overview", "/glossary/ai-overview"],
            ["Site Links", "/glossary/site-links"],
            ["KGMID", "/glossary/kgmid"],
          ]} />
          <FooterCol title="Learn" items={[
            ["How panels work", "/learn/how-knowledge-panels-work"],
            ["Claim & log in", "/learn/how-to-claim-a-google-knowledge-panel"],
            ["Semantic vs Entity SEO", "/learn/semantic-seo-vs-entity-seo"],
            ["What is a KGMID?", "/learn/what-is-a-kgmid"],
            ["Panel disappeared?", "/learn/why-did-my-knowledge-panel-disappear"],
            ["Merge duplicates", "/learn/merge-duplicate-knowledge-panels"],
            ["Contact", "/contact"],
          ]} />
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-ink-dim">
          <p>© {new Date().getFullYear()} The Panel Agency. All rights reserved.</p>
          <p>thepanelagency.com</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[13px] font-medium text-ink mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map(([label, href]) => (
          <li key={href}>
            <a className="text-sm text-ink-muted hover:text-ink transition-colors" href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
