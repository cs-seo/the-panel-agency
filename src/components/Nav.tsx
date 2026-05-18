"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/Logo";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/learn/how-knowledge-panels-work", label: "Learn" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
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
          className="flex items-center gap-2 group"
          aria-label="The Panel Agency — home"
        >
          <LogoMark size={28} className="text-ink" />
          <span className="font-semibold tracking-tight text-ink text-[15px]">
            The Panel Agency
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#apply"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-obsidian text-[13px] font-medium px-4 py-2 hover:bg-white transition-colors"
          >
            Apply for Representation
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
