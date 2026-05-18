"use client";

import { motion } from "motion/react";
import { Database, ShieldCheck, Network, Sparkles, FileText, Wand2 } from "lucide-react";

export function BentoFeatures() {
  return (
    <section id="solutions" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Capabilities</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            A complete entity engineering stack.
          </h2>
          <p className="mt-5 text-ink-muted max-w-xl">
            Every panel we deliver is the result of a coordinated push across Wikidata,
            authoritative press, schema markup, and verified citations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[180px]">
          <BentoCard
            icon={<Sparkles size={18} />}
            title="Entity Establishment"
            blurb="From zero to verified — we engineer the entity, sources, and citations Google requires to render a panel."
            className="md:col-span-2 md:row-span-2"
            featured
          />
          <BentoCard
            icon={<Database size={18} />}
            title="Wikidata + KG Sync"
            blurb="Structured entries that survive editorial review."
          />
          <BentoCard
            icon={<Network size={18} />}
            title="Authority Graph"
            blurb="Tier-1 press, indexed citations, and reconciled aliases."
          />
          <BentoCard
            icon={<FileText size={18} />}
            title="Schema & JSON-LD"
            blurb="Person, Organization, Article markup — audited and validated."
            className="md:col-span-2"
          />
          <BentoCard
            icon={<ShieldCheck size={18} />}
            title="Verification Badge"
            blurb="Pathway to the gray verification check."
          />
          <BentoCard
            icon={<Wand2 size={18} />}
            title="Reputation Defense"
            blurb="Continuous monitoring, suppression, and recovery from panel disappearance or duplication."
            className="md:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  icon,
  title,
  blurb,
  className = "",
  featured = false,
}: {
  icon: React.ReactNode;
  title: string;
  blurb: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative rounded-[var(--radius-card)] glass p-6 overflow-hidden group hover:border-white/[0.12] transition-colors ${className}`}
    >
      {featured && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 0%, rgba(0,82,255,0.25), transparent 55%)",
          }}
        />
      )}
      <div className="relative flex flex-col h-full">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink">
          {icon}
        </div>
        <h3 className="mt-auto text-[17px] sm:text-lg font-medium tracking-tight">{title}</h3>
        <p className="mt-1.5 text-sm text-ink-muted leading-relaxed max-w-md">{blurb}</p>
      </div>
    </motion.div>
  );
}
