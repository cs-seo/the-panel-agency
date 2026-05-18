/**
 * AuroraBackground — animated gradient mesh used behind the Hero and other
 * marquee surfaces. Pure CSS keyframes. No JS, no re-renders, GPU-only.
 */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={"absolute inset-0 overflow-hidden pointer-events-none " + className}>
      {/* Base black */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Animated colour blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 grid-bg radial-fade opacity-50" />

      {/* Top-down soft fade so the body content reads cleanly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(11,11,15,0.0) 30%, rgba(11,11,15,0.7) 80%, var(--color-obsidian) 100%)",
        }}
      />
    </div>
  );
}
