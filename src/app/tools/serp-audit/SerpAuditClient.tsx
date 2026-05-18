"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Check, X, ArrowUpRight, Loader2, Globe } from "lucide-react";

type OrganicItem = {
  position: number | null;
  title: string | null;
  url: string | null;
  domain: string | null;
  snippet: string | null;
  kind: "owned" | "social" | "press" | "other";
};

type Result = {
  query: string;
  cached?: boolean;
  summary: {
    has_knowledge_panel: boolean;
    kgmid: string | null;
    organic_count: number;
    social_count: number;
    press_count: number;
    paa_count: number;
  };
  knowledge_panel: {
    exists: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    kgmid?: string;
    url?: string;
  };
  organic: OrganicItem[];
  people_also_ask: string[];
};

export function SerpAuditClient() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function audit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/serp-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Audit failed (" + res.status + ")");
      }
      setResult((await res.json()) as Result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Audit failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={audit}
        className="rounded-2xl glass-strong p-2 flex items-center gap-2 shadow-glow"
      >
        <Search size={18} className="ml-3 text-ink-dim" aria-hidden />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type a name — yours, a peer, a competitor"
          className="flex-1 bg-transparent outline-none text-[17px] py-3 placeholder:text-ink-dim"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || name.trim().length < 2}
          className="inline-flex items-center gap-1.5 rounded-full bg-electric px-5 py-3 text-[14px] font-medium text-white hover:bg-electric-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          {loading ? "Auditing" : "Run audit"}
        </button>
      </form>

      {error ? (
        <p className="text-[14px] text-red-400">
          {error}
        </p>
      ) : null}

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={result.query}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-5"
          >
            {/* Summary card */}
            <div className="rounded-2xl glass-strong p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                    SERP audit for
                  </p>
                  <p className="mt-1 text-xl text-ink font-medium">{result.query}</p>
                  {result.cached ? (
                    <p className="text-[11px] text-ink-dim mt-1">
                      cached result (saves your daily budget)
                    </p>
                  ) : null}
                </div>
                <KPVerdict has={result.summary.has_knowledge_panel} />
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <StatCard label="Organic" value={result.summary.organic_count} />
                <StatCard label="Owned/Social" value={result.summary.social_count} />
                <StatCard label="Press" value={result.summary.press_count} />
                <StatCard label="PAA cluster" value={result.summary.paa_count} />
              </div>
            </div>

            {/* Knowledge Panel detail */}
            {result.knowledge_panel.exists ? (
              <div className="rounded-2xl glass p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                      Knowledge Panel detected
                    </p>
                    <h3 className="mt-1 text-xl font-medium text-ink">
                      {result.knowledge_panel.title}
                    </h3>
                    {result.knowledge_panel.subtitle ? (
                      <p className="text-sm text-ink-muted">
                        {result.knowledge_panel.subtitle}
                      </p>
                    ) : null}
                  </div>
                  <span className="text-[11px] text-gold border border-gold/30 bg-gold/10 rounded-full px-2 py-1">
                    {result.knowledge_panel.kgmid ?? "KGMID hidden"}
                  </span>
                </div>
                {result.knowledge_panel.description ? (
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {result.knowledge_panel.description}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Organic list */}
            <div className="rounded-2xl glass p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim mb-4">
                Top organic results
              </p>
              <ol className="space-y-4">
                {result.organic.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 mt-1 font-mono text-[11px] text-ink-dim w-5 text-right">
                      {o.position ?? i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Globe size={12} className="text-ink-dim shrink-0" />
                        <span className="text-[11px] text-ink-dim truncate">
                          {o.domain}
                        </span>
                        <KindPill kind={o.kind} />
                      </div>
                      <a
                        href={o.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-electric-glow hover:underline truncate block"
                      >
                        {o.title}
                      </a>
                      {o.snippet ? (
                        <p className="text-[12.5px] text-ink-muted leading-snug mt-1 line-clamp-2">
                          {o.snippet}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
                {result.organic.length === 0 ? (
                  <li className="text-sm text-ink-muted">No organic results returned.</li>
                ) : null}
              </ol>
            </div>

            {/* PAA */}
            {result.people_also_ask.length ? (
              <div className="rounded-2xl glass p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim mb-4">
                  People also ask
                </p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  {result.people_also_ask.map((q, i) => (
                    <li key={i}>· {q}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="text-center pt-2">
              <a
                href="/#apply"
                className="inline-flex items-center gap-1.5 text-[14px] text-electric-glow hover:underline"
              >
                Want a deeper strategist-led audit?
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function KPVerdict({ has }: { has: boolean }) {
  return (
    <div
      className={
        "px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 " +
        (has
          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
          : "bg-red-500/10 border-red-500/30 text-red-300")
      }
    >
      {has ? <Check size={14} /> : <X size={14} />}
      {has ? "Panel detected" : "No panel"}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-3">
      <div className="text-2xl font-semibold text-ink tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-1">
        {label}
      </div>
    </div>
  );
}

function KindPill({ kind }: { kind: OrganicItem["kind"] }) {
  const tone = {
    owned: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    social: "bg-electric/15 text-electric-glow border-electric/30",
    press: "bg-gold/15 text-gold border-gold/30",
    other: "bg-white/[0.04] text-ink-muted border-white/[0.08]",
  }[kind];
  return (
    <span
      className={
        "text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-full border " +
        tone
      }
    >
      {kind}
    </span>
  );
}
