"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Globe, Check, AlertTriangle } from "lucide-react";

const ROLES = [
  { id: "founder", label: "Founder", subtitle: "Founder & CEO" },
  { id: "author", label: "Author", subtitle: "Author" },
  { id: "investor", label: "Investor", subtitle: "Investor & Partner" },
  { id: "artist", label: "Artist", subtitle: "Musician & Producer" },
] as const;

type Role = (typeof ROLES)[number]["id"];

export function KnowledgePanelPreviewer() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("founder");
  const submitted = name.trim().length > 1;

  const subtitle = useMemo(() => ROLES.find((r) => r.id === role)!.subtitle, [role]);
  const initials = useMemo(() => getInitials(name || "Your Name"), [name]);

  return (
    <section id="previewer" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy + form */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Step 01 — Diagnose</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
              See the panel you should have.
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed max-w-lg">
              Type your name. We&apos;ll render the verified Knowledge Panel that should appear
              when someone searches you — alongside what Google currently shows.
            </p>

            <div className="mt-8 space-y-4 max-w-md">
              <label className="block">
                <span className="text-xs text-ink-muted">Full name</span>
                <div className="mt-1.5 flex items-center gap-2 glass rounded-xl px-4 py-3 focus-within:border-electric-glow/60 transition-colors">
                  <Search size={16} className="text-ink-dim" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexandra Chen"
                    className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-ink-dim"
                    autoComplete="off"
                  />
                </div>
              </label>

              <fieldset>
                <legend className="text-xs text-ink-muted mb-1.5">You are a…</legend>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`text-[13px] rounded-full px-3.5 py-1.5 border transition-colors ${
                        role === r.id
                          ? "bg-ink text-obsidian border-ink"
                          : "glass text-ink-muted hover:text-ink border-transparent"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <a
                href="#apply"
                className="inline-flex items-center gap-2 mt-2 rounded-full bg-electric px-5 py-3 text-[14px] font-medium text-white hover:bg-electric-glow transition-colors"
              >
                Claim Your Digital Footprint <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Right: SERP mock */}
          <div className="relative">
            <BrowserChrome>
              <div className="px-5 pt-5 pb-3 flex items-center gap-3 border-b border-line/60">
                <div className="flex-1 flex items-center gap-2 rounded-full bg-charcoal-2/80 border border-line px-4 py-2">
                  <Search size={14} className="text-ink-dim" />
                  <span className="text-[13px] text-ink-muted truncate">
                    {name.trim() || "your name"}
                  </span>
                </div>
                <span className="text-[11px] text-ink-dim hidden sm:inline">google.com</span>
              </div>

              <div className="grid sm:grid-cols-[1fr_280px] gap-5 p-5">
                {/* Organic results column */}
                <div className="space-y-4">
                  {!submitted ? (
                    <PlaceholderResults />
                  ) : (
                    <>
                      <ResultItem
                        host="linkedin.com"
                        title={`${name} | LinkedIn`}
                        snippet={`View ${name}'s professional profile on LinkedIn…`}
                      />
                      <ResultItem
                        host="twitter.com"
                        title={`${name} (@${slugify(name)}) / X`}
                        snippet="The latest posts from…"
                      />
                      <ResultItem
                        host="medium.com"
                        title={`Stories by ${name} on Medium`}
                        snippet="Read writing from…"
                      />
                    </>
                  )}
                </div>

                {/* Knowledge Panel column */}
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.aside
                      key="panel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="rounded-xl glass-strong p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[15px] font-semibold leading-tight text-ink">
                            {name}
                          </h3>
                          <p className="text-[12px] text-ink-muted mt-0.5">{subtitle}</p>
                        </div>
                        <Avatar initials={initials} />
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300/90">
                        <Check size={12} /> Verified entity
                      </div>

                      <p className="mt-3 text-[12px] text-ink-muted leading-relaxed">
                        {bioFor(role, name)}
                      </p>

                      <ul className="mt-4 space-y-1.5 text-[12px]">
                        <Row k="Born" v="—" />
                        <Row k="Education" v="—" />
                        <Row k="Known for" v={subtitle} />
                      </ul>

                      <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-2 text-[11px] text-ink-dim">
                        <Globe size={11} /> wikidata · official site · press
                      </div>
                    </motion.aside>
                  ) : (
                    <motion.aside
                      key="missing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-dashed border-line p-4 grid place-items-center text-center"
                    >
                      <AlertTriangle size={20} className="text-gold" />
                      <p className="mt-2 text-[12px] text-ink-muted leading-relaxed">
                        No Knowledge Panel detected.
                        <br />
                        Enter your name to preview yours.
                      </p>
                    </motion.aside>
                  )}
                </AnimatePresence>
              </div>
            </BrowserChrome>

            {/* Floating verification chip */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-4 -right-2 sm:-right-6 glass-strong rounded-full px-3 py-1.5 text-[11px] text-ink flex items-center gap-1.5 shadow-glow"
                >
                  <Check size={12} className="text-emerald-300" /> Verified by The Panel Agency
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass-strong overflow-hidden shadow-glow">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line/60 bg-obsidian-2/60">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      {children}
    </div>
  );
}

function ResultItem({ host, title, snippet }: { host: string; title: string; snippet: string }) {
  return (
    <div>
      <div className="text-[11px] text-ink-dim">{host}</div>
      <div className="text-[14px] text-electric-glow truncate">{title}</div>
      <div className="text-[12px] text-ink-muted leading-snug line-clamp-2">{snippet}</div>
    </div>
  );
}

function PlaceholderResults() {
  return (
    <div className="space-y-4">
      {[60, 80, 55].map((w, i) => (
        <div key={i} className="space-y-1.5">
          <div className="h-2 w-20 bg-line rounded" />
          <div className="h-3 rounded bg-line/70" style={{ width: `${w}%` }} />
          <div className="h-2 rounded bg-line/40" style={{ width: `${w - 10}%` }} />
        </div>
      ))}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between gap-3">
      <span className="text-ink-dim">{k}</span>
      <span className="text-ink-muted text-right">{v}</span>
    </li>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid place-items-center w-12 h-12 rounded-lg bg-gradient-to-br from-charcoal-2 to-charcoal border border-line text-[13px] font-medium text-ink">
      {initials}
    </div>
  );
}

function getInitials(s: string) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "").slice(0, 18) || "you";
}

function bioFor(role: Role, name: string) {
  switch (role) {
    case "founder":
      return `${name} is the founder of a venture-backed company known for category-defining product work.`;
    case "author":
      return `${name} is the author of multiple acclaimed works of non-fiction and a frequent keynote speaker.`;
    case "investor":
      return `${name} is a partner at a venture firm focused on early-stage technology investments.`;
    case "artist":
      return `${name} is a musician and producer whose work spans multiple genres and labels.`;
  }
}
