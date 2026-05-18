"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 overflow-hidden">
      {/* AI-generated background — entity-graph constellation, masked to the lower half */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 40%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 40%, black 92%, transparent 100%)",
        }}
      >
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </div>
      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-60" />
      {/* Electric glow */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,82,255,0.35), rgba(0,82,255,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-ink-muted">
            <Sparkles size={14} className="text-electric-glow" />
            <span>Trusted by founders, public figures, and Fortune 500 executives</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-7 mx-auto max-w-4xl text-center font-semibold tracking-tightest text-balance text-[44px] leading-[1.02] sm:text-6xl md:text-7xl"
        >
          Own the way Google sees you.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 mx-auto max-w-2xl text-center text-[17px] sm:text-lg text-ink-muted leading-relaxed text-balance"
        >
          We establish, verify, and defend Google Knowledge Panels for high-profile
          individuals and brands. Discreet entity engineering, governed by NDA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="#previewer"
            className="group relative inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-medium text-white hover:bg-electric-glow transition-colors shadow-[0_10px_40px_-10px_rgba(0,82,255,0.7)]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-electric via-electric-glow to-electric opacity-0 group-hover:opacity-100 transition-opacity cta-shimmer" />
            <span className="relative">Verify Your Entity</span>
            <span className="relative" aria-hidden>→</span>
          </a>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-[15px] font-medium text-ink hover:bg-white/[0.06] transition-colors"
          >
            Apply for Representation
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-ink-dim"
        >
          <li className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" /> NDA on submission
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" /> Encrypted data rooms
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gold" /> White-glove verification
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
