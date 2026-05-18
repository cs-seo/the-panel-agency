"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export type LeadFormName = "newsletter" | "lead-magnet" | "consult-request";

const VARIANT_FIELDS: Record<LeadFormName, string[]> = {
  newsletter: ["email"],
  "lead-magnet": ["name", "email"],
  "consult-request": ["name", "email", "role", "brief"],
};

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""))
    .join("&");
}

export function LeadCaptureForm({
  name = "newsletter",
  eyebrow,
  title,
  blurb,
  buttonLabel,
  successMessage,
  compact = false,
}: {
  name?: LeadFormName;
  eyebrow?: string;
  title?: string;
  blurb?: string;
  buttonLabel?: string;
  successMessage?: string;
  compact?: boolean;
}) {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allowedFields = VARIANT_FIELDS[name];

  function set(field: string, value: string) {
    setFields((s) => ({ ...s, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setError("Please provide a valid email address.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const body = encode({ "form-name": name, "bot-field": hp, ...fields });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok && res.status !== 200) {
        throw new Error("Submission failed (" + res.status + ")");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "glass rounded-xl px-4 outline-none text-[14px] placeholder:text-ink-dim focus:border-electric-glow/60 " +
    (compact ? "py-3" : "w-full py-3");

  return (
    <div className={compact ? "w-full" : "w-full rounded-2xl glass-strong p-6 sm:p-8 shadow-glow"}>
      {!compact && (eyebrow || title || blurb) ? (
        <div className="mb-5">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">{eyebrow}</p> : null}
          {title ? <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tightest text-ink">{title}</h3> : null}
          {blurb ? <p className="mt-3 text-ink-muted leading-relaxed">{blurb}</p> : null}
        </div>
      ) : null}

      {submitted ? (
        <div className="flex items-center gap-3 text-emerald-300 text-[15px]">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <Check size={14} />
          </span>
          <span>{successMessage ?? "You're in. Check your inbox."}</span>
        </div>
      ) : (
        <form
          name={name}
          method="POST"
          onSubmit={onSubmit}
          className={compact ? "flex gap-2 flex-col sm:flex-row relative" : "space-y-3 relative"}
        >
          <input type="hidden" name="form-name" value={name} />
          <input
            type="text"
            name="bot-field"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[10000px] w-px h-px opacity-0"
            aria-hidden="true"
          />

          {allowedFields.includes("name") ? (
            <input
              type="text"
              name="name"
              value={fields.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className={inputCls}
            />
          ) : null}

          <input
            type="email"
            name="email"
            required
            value={fields.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className={inputCls + " flex-1"}
          />

          {allowedFields.includes("role") ? (
            <select
              name="role"
              value={fields.role ?? ""}
              onChange={(e) => set("role", e.target.value)}
              className={inputCls}
            >
              <option value="">Role...</option>
              <option value="founder">Founder / Executive</option>
              <option value="author">Author / Speaker</option>
              <option value="artist">Artist / Creator</option>
              <option value="brand">Brand / Company</option>
              <option value="other">Other</option>
            </select>
          ) : null}

          {allowedFields.includes("brief") ? (
            <textarea
              name="brief"
              value={fields.brief ?? ""}
              onChange={(e) => set("brief", e.target.value)}
              placeholder="In one sentence, what is the state of your Google SERP?"
              rows={3}
              className={inputCls}
            />
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className={
              "inline-flex items-center justify-center gap-1.5 rounded-full bg-electric text-white text-[14px] font-medium hover:bg-electric-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed " +
              (compact ? "px-5 py-3" : "w-full px-6 py-3.5")
            }
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
            {submitting ? "Sending" : buttonLabel ?? "Subscribe"}
          </button>

          {error ? <p className="text-[12.5px] text-red-400">{error}</p> : null}

          {!compact ? (
            <p className="text-[11.5px] text-ink-dim">
              No spam. Unsubscribe in one click. We never share or sell your email.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
