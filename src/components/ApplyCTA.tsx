"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

type Role = "founder" | "author" | "artist" | "brand";
type Existing = "yes-wiki" | "yes-other" | "no";
type Goal = "verification" | "control" | "remove-negative" | "fix-mixed";

export function ApplyCTA() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [existing, setExisting] = useState<Existing | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function next() {
    setStep((s) => Math.min(4, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }
  function submit() {
    setSubmitted(true);
  }

  return (
    <section id="apply" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-3xl px-6">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,82,255,0.18), transparent 70%)",
          }}
        />
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Apply</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            Begin a confidential intake.
          </h2>
          <p className="mt-5 text-ink-muted">
            Four short questions. NDA dispatched on submission.
          </p>
        </div>

        <div className="mt-10 rounded-3xl glass-strong p-6 sm:p-8 shadow-glow">
          <Progress step={step} total={4} />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Check />
                </div>
                <h3 className="mt-4 text-xl font-medium">Application received.</h3>
                <p className="mt-2 text-ink-muted text-sm max-w-sm mx-auto">
                  A senior strategist will contact <span className="text-ink">{email || "you"}</span>{" "}
                  within one business day. Your NDA is on its way.
                </p>
              </motion.div>
            ) : step === 1 ? (
              <StepWrap key="1" title="What best describes you?">
                <Choices
                  value={role}
                  setValue={(v) => setRole(v as Role)}
                  options={[
                    { id: "founder", label: "Founder / Executive" },
                    { id: "author", label: "Author / Speaker" },
                    { id: "artist", label: "Artist / Creator" },
                    { id: "brand", label: "Brand / Company" },
                  ]}
                />
                <Actions onNext={next} canNext={!!role} />
              </StepWrap>
            ) : step === 2 ? (
              <StepWrap key="2" title="Do you have existing structured profiles?">
                <Choices
                  value={existing}
                  setValue={(v) => setExisting(v as Existing)}
                  options={[
                    { id: "yes-wiki", label: "Yes — Wikipedia or Wikidata" },
                    { id: "yes-other", label: "Yes — Crunchbase, IMDb, or similar" },
                    { id: "no", label: "No structured profile yet" },
                  ]}
                />
                <Actions onPrev={prev} onNext={next} canNext={!!existing} />
              </StepWrap>
            ) : step === 3 ? (
              <StepWrap key="3" title="What's the primary objective?">
                <Choices
                  value={goal}
                  setValue={(v) => setGoal(v as Goal)}
                  options={[
                    { id: "verification", label: "Earn the verification badge" },
                    { id: "control", label: "Control how Google represents me" },
                    { id: "remove-negative", label: "Suppress negative press" },
                    { id: "fix-mixed", label: "Fix mixed-entity / duplicate data" },
                  ]}
                />
                <Actions onPrev={prev} onNext={next} canNext={!!goal} />
              </StepWrap>
            ) : (
              <StepWrap key="4" title="Where should we send your NDA?">
                <div className="space-y-2">
                  <label className="block">
                    <span className="text-xs text-ink-muted">Work email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-1.5 w-full glass rounded-xl px-4 py-3 outline-none text-[15px] placeholder:text-ink-dim focus:border-electric-glow/60"
                    />
                  </label>
                  <p className="text-[12px] text-ink-dim">
                    We never share or sell your information. Submissions are encrypted in transit.
                  </p>
                </div>
                <Actions onPrev={prev} onSubmit={submit} canNext={isEmail(email)} submitLabel="Send NDA" />
              </StepWrap>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i < step ? "bg-electric" : "bg-line"
          } transition-colors`}
        />
      ))}
      <span className="text-xs text-ink-dim ml-1 tabular-nums">
        {step}/{total}
      </span>
    </div>
  );
}

function StepWrap({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <h3 className="text-xl sm:text-2xl font-medium tracking-tight">{title}</h3>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

function Choices({
  options,
  value,
  setValue,
}: {
  options: { id: string; label: string }[];
  value: string | null;
  setValue: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setValue(o.id)}
            className={`text-left rounded-xl px-4 py-3.5 border transition-colors text-[14px] ${
              active
                ? "bg-electric/10 border-electric/50 text-ink"
                : "glass border-white/[0.06] text-ink-muted hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Actions({
  onPrev,
  onNext,
  onSubmit,
  canNext,
  submitLabel,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canNext: boolean;
  submitLabel?: string;
}) {
  return (
    <div className="mt-7 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        className={`text-[13px] text-ink-muted hover:text-ink transition-colors ${
          onPrev ? "" : "invisible"
        }`}
      >
        ← Back
      </button>
      <button
        type="button"
        disabled={!canNext}
        onClick={onSubmit ?? onNext}
        className="inline-flex items-center gap-1.5 rounded-full bg-electric px-5 py-2.5 text-[14px] font-medium text-white hover:bg-electric-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitLabel ?? "Continue"} <span aria-hidden>→</span>
      </button>
    </div>
  );
}
