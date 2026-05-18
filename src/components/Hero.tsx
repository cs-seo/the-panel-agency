"use client";

import { motion } from "motion/react";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { KnowledgePanelMock } from "@/components/SerpMocks";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <AuroraBackground />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Left: copy column */}
          <div className="lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-ink-muted">
                <Sparkles size={14} className="text-electric-glow" />
                <span>Trusted by founders, executives & public figures</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-7 font-semibold tracking-tightest text-balance text-5xl sm:text-6xl md:text-7xl leading-[1.02]"
            >
              Own the way Google{" "}
              <span className="gradient-text">sees you.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-6 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed text-balance"
            >
              We establish, verify, and defend Google Knowledge Panels for
              high-profile individuals and brands. Discreet entity engineering,
              governed by NDA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/tools/serp-audit"
                className="arrow-nudge group relative inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-electric via-electric-glow to-electric opacity-0 group-hover:opacity-100 transition-opacity cta-shimmer" />
                <span className="relative">Run a free SERP audit</span>
                <ArrowRight size={16} className="arrow relative" aria-hidden />
              </a>
              <a
                href="/#apply"
                className="arrow-nudge inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-[15px] font-medium text-ink hover:bg-white/[0.06] transition-colors"
              >
                Apply for Representation
                <ArrowRight size={16} className="arrow" aria-hidden />
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-ink-dim"
            >
              <li className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> NDA on submission</li>
              <li className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> Encrypted data rooms</li>
              <li className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> White-glove verification</li>
            </motion.ul>
          </div>

          {/* Right: floating mocks. Hidden on small viewports — the visual is decorative. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative hidden lg:block w-[360px]"
            aria-hidden
          >
            {/* Floating Knowledge Panel mock — the centrepiece */}
            <div className="relative float-y-slow">
              <KnowledgePanelMock />
            </div>

            {/* Smaller AI Overview chip floating bottom-left, peeking out */}
            <div className="absolute -bottom-8 -left-32 w-[280px] hidden xl:block float-y opacity-90 scale-90 origin-bottom-right">
              <div className="rounded-xl glass-strong p-3 border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: "conic-gradient(from 200deg, #4285f4, #34a853 90deg, #fbbc05 180deg, #ea4335 270deg, #4285f4 360deg)" }}
                  />
                  <span className="text-[11px] text-ink-muted">AI Overview</span>
                </div>
                <p className="text-[12px] text-ink leading-snug">
                  &ldquo;A Google Knowledge Panel is the information card shown for verified entities&hellip;&rdquo;
                </p>
              </div>
            </div>

            {/* Verified pill */}
            <div className="absolute -top-3 -right-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] px-2.5 py-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 pulse-soft" />
              Verified
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
