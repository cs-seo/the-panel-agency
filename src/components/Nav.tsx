"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/Logo";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Search,
  Shield,
  Code2,
  Briefcase,
  Award,
  Palette,
  Building2,
  User,
  BookOpen,
  Network,
  Layers,
  Tag,
  HelpCircle,
  Newspaper,
  RefreshCw,
} from "lucide-react";

type MenuItem = { href: string; label: string; blurb?: string; icon?: React.ReactNode };
type MenuGroup = {
  label: string;
  items: MenuItem[];
  featured?: { href: string; eyebrow: string; title: string; body: string };
};

const MENU: { id: string; label: string; group: MenuGroup }[] = [
  {
    id: "tools",
    label: "Tools",
    group: {
      label: "Free diagnostics",
      featured: {
        href: "/tools/serp-audit",
        eyebrow: "Most popular",
        title: "Brand SERP Audit",
        body: "Live Google SERP analysis. KP detection, KGMID, organic source mix.",
      },
      items: [
        { href: "/tools/serp-audit", label: "Brand SERP Audit", blurb: "Live Google SERP analysis", icon: <Sparkles size={16} /> },
        { href: "/tools/entity-check", label: "Entity Check", blurb: "Wikipedia + Wikidata lookup", icon: <Search size={16} /> },
        { href: "/tools/verification-risk-score", label: "Risk Score", blurb: "5-signal entity stack scoring", icon: <Shield size={16} /> },
        { href: "/tools/schema-generator", label: "Schema Generator", blurb: "JSON-LD for Person and Org", icon: <Code2 size={16} /> },
      ],
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    group: {
      label: "By audience",
      featured: {
        href: "/solutions/knowledge-panel-for-founders",
        eyebrow: "Most engaged",
        title: "Founders and CEOs",
        body: "The founder cluster build: panel plus company plus co-founders linked in one engagement.",
      },
      items: [
        { href: "/solutions/knowledge-panel-for-founders", label: "For Founders", blurb: "Series-A to public", icon: <Briefcase size={16} /> },
        { href: "/solutions/knowledge-panel-for-authors", label: "For Authors", blurb: "Books carousel and speaker bureau", icon: <BookOpen size={16} /> },
        { href: "/solutions/knowledge-panel-for-artists", label: "For Artists", blurb: "Musicians, designers, creators", icon: <Palette size={16} /> },
        { href: "/solutions/knowledge-panel-for-brands", label: "For Brands", blurb: "Companies and DTC", icon: <Building2 size={16} /> },
        { href: "/solutions/verification-badge", label: "Verification Badge", blurb: "Earn the gray check", icon: <Award size={16} /> },
      ],
    },
  },
  {
    id: "learn",
    label: "Learn",
    group: {
      label: "Reference guides",
      featured: {
        href: "/learn/how-knowledge-panels-work",
        eyebrow: "Pillar",
        title: "How Knowledge Panels Work",
        body: "The full technical reference: sources, triggers, schema, AI overviews, timeline.",
      },
      items: [
        { href: "/learn/how-knowledge-panels-work", label: "How panels work", blurb: "Pillar reference", icon: <Network size={16} /> },
        { href: "/learn/how-to-claim-a-google-knowledge-panel", label: "Claim and log in", blurb: "Full claim flow", icon: <User size={16} /> },
        { href: "/learn/semantic-seo-vs-entity-seo", label: "Semantic vs Entity SEO", blurb: "The real difference", icon: <Layers size={16} /> },
        { href: "/learn/what-is-a-kgmid", label: "What is a KGMID?", blurb: "Google entity ID", icon: <Tag size={16} /> },
        { href: "/learn/why-did-my-knowledge-panel-disappear", label: "Panel disappeared?", blurb: "Recovery diagnostic", icon: <HelpCircle size={16} /> },
        { href: "/learn/merge-duplicate-knowledge-panels", label: "Merge duplicates", blurb: "Identity reconciliation", icon: <RefreshCw size={16} /> },
      ],
    },
  },
  {
    id: "glossary",
    label: "Glossary",
    group: {
      label: "SERP feature definitions",
      featured: {
        href: "/glossary/knowledge-panel",
        eyebrow: "Start here",
        title: "Knowledge Panel",
        body: "The most valuable single surface on the modern Google SERP, with a live visual mock.",
      },
      items: [
        { href: "/glossary/knowledge-panel", label: "Knowledge Panel", blurb: "The entity card", icon: <Network size={16} /> },
        { href: "/glossary/knowledge-graph", label: "Knowledge Graph", blurb: "The database beneath", icon: <Layers size={16} /> },
        { href: "/glossary/featured-snippet", label: "Featured Snippet", blurb: "The answer box", icon: <Newspaper size={16} /> },
        { href: "/glossary/people-also-ask", label: "People Also Ask", blurb: "The Q&A cluster", icon: <HelpCircle size={16} /> },
        { href: "/glossary/ai-overview", label: "AI Overview", blurb: "Google AI box", icon: <Sparkles size={16} /> },
        { href: "/glossary/site-links", label: "Site Links", blurb: "The nav grid", icon: <Tag size={16} /> },
        { href: "/glossary/kgmid", label: "KGMID", blurb: "The internal ID", icon: <Code2 size={16} /> },
      ],
    },
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between transition-all duration-300",
          scrolled
            ? "rounded-2xl glass-strong mx-3 sm:mx-6 px-4 sm:px-6 py-2.5"
            : ""
        )}
      >
        <Link
          href="/"
          onClick={() => setOpenId(null)}
          className="flex items-center gap-2 group shrink-0"
          aria-label="The Panel Agency home"
        >
          <LogoMark size={28} className="text-ink" />
          <span className="font-semibold tracking-tight text-ink text-[15px] hidden sm:inline">
            The Panel Agency
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {MENU.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setOpenId(openId === m.id ? null : m.id)}
              onMouseEnter={() => setOpenId(m.id)}
              aria-expanded={openId === m.id}
              aria-haspopup="true"
              className={cn(
                "inline-flex items-center gap-1 text-[13px] px-3 py-2 rounded-lg transition-colors",
                openId === m.id
                  ? "text-ink bg-white/[0.05]"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {m.label}
              <ChevronDown
                size={12}
                className={cn(
                  "transition-transform",
                  openId === m.id ? "rotate-180" : ""
                )}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-[13px] text-ink-muted hover:text-ink transition-colors px-3 py-2"
          >
            Contact
          </Link>
          <Link
            href="/#apply"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-obsidian text-[13px] font-medium px-4 py-2 hover:bg-white transition-colors"
          >
            Apply
            <span aria-hidden>{"→"}</span>
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg glass text-ink ml-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {openId ? (
        <div
          className="hidden md:block absolute left-0 right-0 top-full pt-3 px-4"
          onMouseLeave={() => setOpenId(null)}
        >
          <div className="mx-auto max-w-7xl">
            <MegaPanel
              data={MENU.find((m) => m.id === openId)!.group}
              onClose={() => setOpenId(null)}
            />
          </div>
        </div>
      ) : null}

      {mobileOpen ? <MobileDrawer onClose={() => setMobileOpen(false)} /> : null}
    </header>
  );
}

function MegaPanel({ data, onClose }: { data: MenuGroup; onClose: () => void }) {
  return (
    <div className="rounded-2xl glass-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] border border-white/[0.08] overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_320px]">
        <div className="p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-dim mb-5">
            {data.label}
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
            {data.items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  {it.icon ? (
                    <span className="shrink-0 mt-0.5 grid place-items-center w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-ink-muted group-hover:text-ink transition-colors">
                      {it.icon}
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink leading-tight">
                      {it.label}
                    </p>
                    {it.blurb ? (
                      <p className="text-[12px] text-ink-muted leading-snug mt-0.5">
                        {it.blurb}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {data.featured ? (
          <Link
            href={data.featured.href}
            onClick={onClose}
            className="block p-6 sm:p-8 bg-gradient-to-br from-electric/15 via-electric/5 to-transparent border-l border-white/[0.08] hover:from-electric/25 transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-electric-glow">
              {data.featured.eyebrow}
            </p>
            <p className="mt-3 text-[20px] font-medium text-ink leading-tight">
              {data.featured.title}
            </p>
            <p className="mt-2 text-[13px] text-ink-muted leading-relaxed">
              {data.featured.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-electric-glow">
              Open <span aria-hidden>{"→"}</span>
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>("tools");
  return (
    <div className="md:hidden fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-md flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-line">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <LogoMark size={28} className="text-ink" />
          <span className="font-semibold tracking-tight text-ink text-[15px]">
            The Panel Agency
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg glass text-ink"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {MENU.map((m) => {
          const open = openGroup === m.id;
          return (
            <div key={m.id} className="border-b border-line/60">
              <button
                type="button"
                onClick={() => setOpenGroup(open ? null : m.id)}
                className="w-full flex items-center justify-between py-4 text-ink"
                aria-expanded={open}
              >
                <span className="text-[15px] font-medium">{m.label}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform text-ink-muted",
                    open ? "rotate-180" : ""
                  )}
                />
              </button>
              {open ? (
                <ul className="pb-4 space-y-1">
                  {m.group.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04]"
                      >
                        {it.icon ? (
                          <span className="shrink-0 grid place-items-center w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] text-ink-muted">
                            {it.icon}
                          </span>
                        ) : null}
                        <span className="text-[14px] text-ink-muted">{it.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
        <div className="pt-6 space-y-2">
          <Link
            href="/#apply"
            onClick={onClose}
            className="block text-center rounded-full bg-ink text-obsidian text-[14px] font-medium px-5 py-3"
          >
            Apply for Representation
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block text-center rounded-full glass text-ink text-[14px] px-5 py-3"
          >
            Talk to a strategist
          </Link>
        </div>
      </div>
    </div>
  );
}
