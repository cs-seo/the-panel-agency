"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2, ArrowUpRight, Shield } from "lucide-react";

type Result = {
  query: string;
  score: number;
  band: "low" | "moderate" | "high" | "critical";
  verdict: string;
  breakdown: { label: string; weight: number; earned: number; note: string }[];
};

export function RiskScoreClient() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function score(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/verification-risk-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Scoring failed");
      }
      setResult((await res.json()) as Result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scoring failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={score}
        className="rounded-2xl glass-strong p-2 flex items-center gap-2 shadow-glow"
      >
        <Search size={18} className="ml-3 text-ink-dim" aria-hidden />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your full name (or someone you're researching)"
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
          {loading ? "Scoring" : "Score risk"}
        </button>
      </form>

      {error ? (
        <p className="text-[14px] text-red-400">{error}</p>
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
            <div className="rounded-2xl glass-strong p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Shield size={28} className="text-electric-glow" aria-hidden />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                      Verification risk for
                    </p>
                    <p className="mt-1 text-xl text-ink font-medium">{result.query}</p>
                  </div>
                </div>
                <BandPill band={result.band} score={result.score} />
              </div>
              <p className="mt-5 text-ink-muted leading-relaxed">{result.verdict}</p>
            </div>

            <div className="rounded-2xl glass p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim mb-4">
                Signal breakdown
              </p>
              <ul className="space-y-4">
                {result.breakdown.map((b) => {
                  const pct = Math.min(100, (b.earned / b.weight) * 100);
                  return (
                    <li key={b.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[14px] text-ink">{b.label}</span>
                        <span className="text-[12px] tabular-nums text-ink-dim">
                          {Math.round(b.earned)} / {b.weight}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-line overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric to-electric-glow"
                          style={{ width: pct + "%" }}
                        />
                      </div>
                      <p className="mt-2 text-[13px] text-ink-muted leading-relaxed">
                        {b.note}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="text-center pt-2">
              <a
                href="/#apply"
                className="inline-flex items-center gap-1.5 text-[14px] text-electric-glow hover:underline"
              >
                Get a strategist to fix the gaps
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function BandPill({ band, score }: { band: Result["band"]; score: number }) {
  const tone = {
    low: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    moderate: "bg-electric/15 border-electric/40 text-electric-glow",
    high: "bg-gold/15 border-gold/40 text-gold",
    critical: "bg-red-500/10 border-red-500/30 text-red-300",
  }[band];
  return (
    <div
      className={
        "px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 tabular-nums " +
        tone
      }
    >
      {score} / 100
      <span className="uppercase text-[10px] tracking-[0.18em] ml-1">
        {band} risk
      </span>
    </div>
  );
}
