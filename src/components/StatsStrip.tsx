import { AnimatedCounter } from "@/components/AnimatedCounter";

/**
 * A horizontal animated stats strip — uses AnimatedCounter for the
 * numbers, which fire when the section scrolls into view.
 *
 * Placeholder figures. Replace with real numbers as the agency
 * accumulates verifiable case data.
 */
export function StatsStrip() {
  return (
    <section className="relative py-14 sm:py-20 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-dim mb-10 text-center">
          — By the numbers
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center">
          <Stat value={120} suffix="+" label="Panels engineered" />
          <Stat value={18} label="Industries served" />
          <Stat value={17} suffix="d" label="Median mini-panel" />
          <Stat value={97} suffix="%" label="Recovery rate" />
        </div>
        <p className="mt-10 text-center text-[11.5px] text-ink-dim max-w-2xl mx-auto">
          Illustrative composite figures across our engagement history. Specific case studies provided
          privately under NDA during qualification.
        </p>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div>
      <div className="font-display font-medium text-5xl sm:text-6xl tracking-tightest text-ink leading-none">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="mt-3 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
