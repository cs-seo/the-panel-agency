"use client";

import { useCallback, useRef, useState } from "react";
import { Check, X, Search } from "lucide-react";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, ratio)));
  }, []);

  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Step 02 — Compare</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            Chaos on the left. Control on the right.
          </h2>
          <p className="mt-5 text-ink-muted">
            Drag to compare an unmanaged SERP against an engineered, verified panel.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-12 select-none rounded-3xl overflow-hidden glass-strong shadow-glow"
          onPointerDown={(e) => {
            draggingRef.current = true;
            (e.target as Element).setPointerCapture?.(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => draggingRef.current && updateFromClientX(e.clientX)}
          onPointerUp={() => (draggingRef.current = false)}
          onPointerCancel={() => (draggingRef.current = false)}
          role="slider"
          aria-label="Before / after SERP comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
          }}
        >
          {/* AFTER (full background) */}
          <SerpAfter />

          {/* BEFORE (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <SerpBefore />
          </div>

          {/* Divider handle */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-px bg-gradient-to-b from-electric-glow/70 via-electric/70 to-electric-glow/70" />
            <button
              type="button"
              aria-label="Drag to compare"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full glass-strong border border-electric/40 text-ink shadow-[0_0_30px_-6px_rgba(0,82,255,0.7)] cursor-ew-resize"
            >
              <span aria-hidden className="text-xs">◀▶</span>
            </button>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] text-ink-muted">
            <X size={12} className="text-red-400" /> Before
          </div>
          <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] text-ink-muted">
            <Check size={12} className="text-emerald-300" /> After
          </div>
        </div>
      </div>
    </section>
  );
}

function SerpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-obsidian-2/80 h-[460px] sm:h-[520px]">
      <div className="px-5 py-3 border-b border-line/60 flex items-center gap-2">
        <Search size={14} className="text-ink-dim" />
        <div className="flex-1 max-w-md rounded-full bg-charcoal-2/80 border border-line px-3 py-1.5 text-[12px] text-ink-muted">
          you
        </div>
      </div>
      <div className="p-5 sm:p-6 grid sm:grid-cols-[1fr_280px] gap-5 h-[calc(100%-3rem)]">
        {children}
      </div>
    </div>
  );
}

function SerpBefore() {
  return (
    <SerpShell>
      <div className="space-y-4">
        <ChaoticResult host="reddit.com/r/random" title="who is this person again?" />
        <ChaoticResult host="random-blog.net" title="Possible mention in 2017 post" />
        <ChaoticResult host="people-search.io" title="Background check · paid result" />
        <ChaoticResult host="oldsocial.com" title="Account · last active 2014" />
        <ChaoticResult host="archive.org" title="Cached fragment · partial match" />
      </div>
      <div className="rounded-xl border border-dashed border-red-400/30 p-4 text-center grid place-items-center">
        <X size={20} className="text-red-400" />
        <p className="mt-2 text-[12px] text-ink-muted leading-relaxed">
          No Knowledge Panel.
          <br />
          Mixed-entity data.
        </p>
      </div>
    </SerpShell>
  );
}

function SerpAfter() {
  return (
    <SerpShell>
      <div className="space-y-4">
        <CleanResult host="yourdomain.com" title="Official site — verified" />
        <CleanResult host="wikipedia.org" title="Encyclopedia entry" />
        <CleanResult host="forbes.com" title="Feature interview · 2024" />
        <CleanResult host="crunchbase.com" title="Verified profile" />
        <CleanResult host="linkedin.com" title="Professional profile" />
      </div>
      <aside className="rounded-xl glass-strong p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[14px] font-semibold leading-tight">You.</div>
            <div className="text-[11px] text-ink-muted mt-0.5">Founder & CEO</div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-electric/30 to-electric/10 border border-electric/30" />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300/90">
          <Check size={11} /> Verified entity
        </div>
        <ul className="mt-3 space-y-1 text-[11px]">
          <li className="flex justify-between"><span className="text-ink-dim">Education</span><span className="text-ink-muted">Stanford</span></li>
          <li className="flex justify-between"><span className="text-ink-dim">Known for</span><span className="text-ink-muted">Series B exit</span></li>
          <li className="flex justify-between"><span className="text-ink-dim">Awards</span><span className="text-ink-muted">Forbes 30u30</span></li>
        </ul>
      </aside>
    </SerpShell>
  );
}

function ChaoticResult({ host, title }: { host: string; title: string }) {
  return (
    <div className="opacity-75">
      <div className="text-[11px] text-ink-dim">{host}</div>
      <div className="text-[14px] text-red-300/80 truncate">{title}</div>
      <div className="h-2 mt-1 rounded bg-line/50" style={{ width: "70%" }} />
      <div className="h-2 mt-1 rounded bg-line/30" style={{ width: "50%" }} />
    </div>
  );
}

function CleanResult({ host, title }: { host: string; title: string }) {
  return (
    <div>
      <div className="text-[11px] text-ink-dim">{host}</div>
      <div className="text-[14px] text-electric-glow truncate">{title}</div>
      <div className="h-2 mt-1 rounded bg-line/70" style={{ width: "78%" }} />
      <div className="h-2 mt-1 rounded bg-line/50" style={{ width: "58%" }} />
    </div>
  );
}
