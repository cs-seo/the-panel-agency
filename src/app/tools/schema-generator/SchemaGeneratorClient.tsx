"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Plus, X } from "lucide-react";

type EntityType = "Person" | "Organization";

export function SchemaGeneratorClient() {
  const [type, setType] = useState<EntityType>("Person");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [worksFor, setWorksFor] = useState("");
  const [alumniOf, setAlumniOf] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [foundingDate, setFoundingDate] = useState("");
  const [logo, setLogo] = useState("");
  const [sameAs, setSameAs] = useState<string[]>([""]);
  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    const cleanSameAs = sameAs.map((s) => s.trim()).filter(Boolean);
    if (type === "Person") {
      const out: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Person",
      };
      if (name) out.name = name;
      if (jobTitle) out.jobTitle = jobTitle;
      if (worksFor)
        out.worksFor = { "@type": "Organization", name: worksFor };
      if (alumniOf) out.alumniOf = alumniOf;
      if (image) out.image = image;
      if (url) out.url = url;
      if (desc) out.description = desc;
      if (cleanSameAs.length) out.sameAs = cleanSameAs;
      return out;
    } else {
      const out: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Organization",
      };
      if (name) out.name = name;
      if (url) out.url = url;
      if (logo) out.logo = logo;
      if (desc) out.description = desc;
      if (foundingDate) out.foundingDate = foundingDate;
      if (cleanSameAs.length) out.sameAs = cleanSameAs;
      return out;
    }
  }, [type, name, jobTitle, worksFor, alumniOf, image, url, desc, logo, foundingDate, sameAs]);

  const formatted = JSON.stringify(jsonLd, null, 2);
  const scriptTag = '<script type="application/ld+json">\n' + formatted + "\n</script>";

  async function copy() {
    try {
      await navigator.clipboard.writeText(scriptTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* form */}
      <div className="rounded-2xl glass p-6 space-y-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setType("Person")}
            className={
              "rounded-full px-4 py-2 text-[13px] border transition-colors " +
              (type === "Person"
                ? "bg-ink text-obsidian border-ink"
                : "glass text-ink-muted hover:text-ink border-white/[0.06]")
            }
          >
            Person
          </button>
          <button
            type="button"
            onClick={() => setType("Organization")}
            className={
              "rounded-full px-4 py-2 text-[13px] border transition-colors " +
              (type === "Organization"
                ? "bg-ink text-obsidian border-ink"
                : "glass text-ink-muted hover:text-ink border-white/[0.06]")
            }
          >
            Organization
          </button>
        </div>

        <Field label="Full name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === "Person" ? "e.g. Alexandra Chen" : "e.g. Acme Corp"}
            className={inputCls}
          />
        </Field>

        {type === "Person" ? (
          <>
            <Field label="Job title">
              <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Founder & CEO" className={inputCls} />
            </Field>
            <Field label="Works for (organization name)">
              <input value={worksFor} onChange={(e) => setWorksFor(e.target.value)} placeholder="Acme Corp" className={inputCls} />
            </Field>
            <Field label="Education (alumniOf)">
              <input value={alumniOf} onChange={(e) => setAlumniOf(e.target.value)} placeholder="Stanford University" className={inputCls} />
            </Field>
            <Field label="Headshot URL">
              <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://yoursite.com/me.jpg" className={inputCls} />
            </Field>
          </>
        ) : (
          <>
            <Field label="Logo URL">
              <input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://yoursite.com/logo.svg" className={inputCls} />
            </Field>
            <Field label="Founding date (YYYY-MM-DD)">
              <input value={foundingDate} onChange={(e) => setFoundingDate(e.target.value)} placeholder="2018-03-01" className={inputCls} />
            </Field>
          </>
        )}

        <Field label="Canonical URL">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yoursite.com/" className={inputCls} />
        </Field>

        <Field label="Short description / bio">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={type === "Person" ? "One-sentence bio Google can recite." : "One-sentence description of what the company does."}
            rows={3}
            className={inputCls}
          />
        </Field>

        <div>
          <div className="text-xs text-ink-muted mb-1.5">
            sameAs — authoritative profiles (LinkedIn, X, Wikidata, Crunchbase, etc.)
          </div>
          <div className="space-y-2">
            {sameAs.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={v}
                  onChange={(e) => {
                    const next = [...sameAs];
                    next[i] = e.target.value;
                    setSameAs(next);
                  }}
                  placeholder="https://linkedin.com/in/..."
                  className={inputCls + " flex-1"}
                />
                {sameAs.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => setSameAs(sameAs.filter((_, idx) => idx !== i))}
                    className="px-3 rounded-xl glass text-ink-muted hover:text-ink"
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSameAs([...sameAs, ""])}
              className="inline-flex items-center gap-1 text-[13px] text-electric-glow hover:underline mt-1"
            >
              <Plus size={14} /> Add another
            </button>
          </div>
        </div>
      </div>

      {/* output */}
      <div className="rounded-2xl glass-strong p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-ink-dim">
            Output · JSON-LD
          </span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-[13px] glass border border-white/[0.06] hover:border-white/[0.18] rounded-full px-3 py-1.5 text-ink-muted hover:text-ink transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="text-[12.5px] leading-relaxed font-mono text-ink-muted overflow-auto max-h-[640px] whitespace-pre-wrap">{scriptTag}</pre>
        <p className="text-[12px] text-ink-dim">
          Paste this inside the <code>&lt;head&gt;</code> of your page. After
          publishing, validate at{" "}
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google&apos;s Rich Results Test
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full glass rounded-xl px-4 py-3 outline-none text-[14px] placeholder:text-ink-dim focus:border-electric-glow/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-ink-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
