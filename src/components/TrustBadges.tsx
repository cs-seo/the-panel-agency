import { Lock, FileCheck2, KeyRound, Eye } from "lucide-react";

const items = [
  {
    icon: <Lock size={16} />,
    title: "NDA on submission",
    body: "Every intake is governed by a mutual non-disclosure agreement before discovery begins.",
  },
  {
    icon: <KeyRound size={16} />,
    title: "Encrypted data rooms",
    body: "Documents and assets are exchanged inside encrypted, access-logged rooms with revocation.",
  },
  {
    icon: <FileCheck2 size={16} />,
    title: "White-glove verification",
    body: "Senior strategists handle reconciliation. No outsourced labor, no offshore handoffs.",
  },
  {
    icon: <Eye size={16} />,
    title: "Discretion by default",
    body: "We do not publish client logos. References are provided privately during qualification.",
  },
];

export function TrustBadges() {
  return (
    <section id="trust" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Confidentiality</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            Built for principals who can&apos;t be careless.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl glass p-6">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gold">
                {it.icon}
              </div>
              <h3 className="mt-4 text-[15px] font-medium">{it.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
