import { LogoMark } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line/60 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-ink">
            <LogoMark size={28} />
            <span className="font-semibold tracking-tight text-[15px]">The Panel Agency</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-muted leading-relaxed">
            White-glove Google Knowledge Panel establishment and entity management for founders,
            executives, authors, artists, and public figures.
          </p>
          <p className="mt-6 text-xs text-ink-dim">
            NDA guaranteed upon submission · Encrypted secure data rooms
          </p>
        </div>

        <FooterCol
          title="Solutions"
          items={[
            ["For Founders", "/solutions/knowledge-panel-for-founders"],
            ["For Authors", "/solutions/knowledge-panel-for-authors"],
            ["For Artists", "/solutions/knowledge-panel-for-artists"],
            ["For Brands", "/solutions/knowledge-panel-for-brands"],
            ["Verification Badge", "/solutions/verification-badge"],
          ]}
        />
        <FooterCol
          title="Free Tools"
          items={[
            ["All tools", "/tools"],
            ["Brand SERP Audit", "/tools/serp-audit"],
            ["Entity Check", "/tools/entity-check"],
            ["Risk Score", "/tools/verification-risk-score"],
            ["Schema Generator", "/tools/schema-generator"],
          ]}
        />
        <FooterCol
          title="Learn"
          items={[
            ["How panels work", "/learn/how-knowledge-panels-work"],
            ["Claim & log in", "/learn/how-to-claim-a-google-knowledge-panel"],
            ["Semantic vs Entity SEO", "/learn/semantic-seo-vs-entity-seo"],
            ["What is a KGMID?", "/learn/what-is-a-kgmid"],
            ["Panel disappeared?", "/learn/why-did-my-knowledge-panel-disappear"],
            ["Merge duplicates", "/learn/merge-duplicate-knowledge-panels"],
            ["Contact", "/contact"],
          ]}
        />
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
            <a className="text-sm text-ink-muted hover:text-ink transition-colors" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
