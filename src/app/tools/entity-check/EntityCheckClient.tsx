"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Check, X, ArrowUpRight, Loader2 } from "lucide-react";

type Result = {
  query: string;
  wikipedia: { exists: boolean; title?: string; extract?: string; url?: string };
  wikidata: {
    exists: boolean;
    id?: string;
    label?: string;
    description?: string;
    url?: string;
  };
  entity_score: number;
  interpretation: string;
};

export function EntityCheckClient() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/entity-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Check failed (" + res.status + ")");
      }
      setResult((await res.json()) as Result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={check}
        className="rounded-2xl glass-strong p-2 flex items-center gap-2 shadow-glow"
      >
        <Search size={18} className="ml-3 text-ink-dim" aria-hidden />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your full name or company name"
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
          {loading ? "Checking" : "Check"}
        </button>
      </form>

      {error ? (
        <p className="text-[14px] text-red-400">
          {error}. Try again in a minute, or email{" "}
          <a href="mailto:hello@thepanelagency.com" className="underline">
            hello@thepanelagency.com
          </a>
          .
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
            className="space-y-4"
          >
            <div className="rounded-2xl glass-strong p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                    Entity score for
                  </p>
                  <p className="mt-1 text-xl text-ink font-medium">{result.query}</p>
                </div>
                <ScorePill score={result.entity_score} />
              </div>
              <p className="mt-4 text-ink-muted leading-relaxed">
                {result.interpretation}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <SourceCard
                title="Wikipedia"
                logo="W"
                exists={result.wikipedia.exists}
                label={result.wikipedia.title}
                description={result.wikipedia.extract}
                url={result.wikipedia.url}
                emptyHint="No article (or disambiguation page). Wikipedia notability standards are deliberately strict — most personal panels we build don't start with a Wikipedia article."
              />
              <SourceCard
                title="Wikidata"
                logo="Q"
                exists={result.wikidata.exists}
                label={result.wikidata.label}
                description={result.wikidata.description}
                url={result.wikidata.url}
                meta={result.wikidata.id ? "QID " + result.wikidata.id : undefined}
                emptyHint="No Wikidata entry under this name. This is the most fixable gap — anyone can create a Wikidata entry, and it's the foundation most Knowledge Panels trigger from."
              />
            </div>

            <div className="text-center pt-2">
              <a
                href="/#apply"
                className="inline-flex items-center gap-1.5 text-[14px] text-electric-glow hover:underline"
              >
                Want this fixed by a human?
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ScorePill({ score }: { score: number }) {
  const tone =
    score >= 100
      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
      : score >= 50
      ? "bg-gold/15 border-gold/40 text-gold"
      : "bg-red-500/10 border-red-500/30 text-red-300";
  return (
    <div className={"px-4 py-2 rounded-full border text-sm font-medium tabular-nums " + tone}>
      {score} / 100
    </div>
  );
}

function SourceCard({
  title,
  logo,
  exists,
  label,
  description,
  url,
  meta,
  emptyHint,
}: {
  title: string;
  logo: string;
  exists: boolean;
  label?: string;
  description?: string;
  url?: string;
  meta?: string;
  emptyHint: string;
}) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] text-ink font-mono">
            {logo}
          </span>
          <span className="text-[14px] font-medium text-ink">{title}</span>
        </div>
        <span
          className={
            "inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] px-2 py-1 rounded-full border " +
            (exists
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              : "bg-white/[0.04] text-ink-muted border-white/[0.08]")
          }
        >
          {exists ? <Check size={12} /> : <X size={12} />}
          {exists ? "Found" : "Not found"}
        </span>
      </div>

      {exists ? (
        <div className="mt-4 space-y-1.5">
          {meta ? <div className="text-[11px] text-ink-dim">{meta}</div> : null}
          {label ? <div className="text-[15px] text-ink">{label}</div> : null}
          {description ? (
            <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
          ) : null}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] text-electric-glow hover:underline mt-2"
            >
              View on {title}
              <ArrowUpRight size={12} aria-hidden />
            </a>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">{emptyHint}</p>
      )}
    </div>
  );
}
