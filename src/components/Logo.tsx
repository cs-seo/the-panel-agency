/**
 * The Panel Agency logo mark.
 *
 * Visual concept: a miniature Knowledge Panel.
 *  - rounded panel outline
 *  - electric-blue "entity" avatar disk on the left
 *  - two data rows beside it (the structured-data block)
 *  - small gold verification dot in the upper-right corner
 *
 * Renders cleanly from 14px (inline icon) up to 96px+ (footer/hero).
 * Use `variant="mono"` if you need a single-color version for tight surfaces.
 */
export function LogoMark({
  size = 28,
  variant = "default",
  className = "",
}: {
  size?: number;
  variant?: "default" | "mono";
  className?: string;
}) {
  const stroke = "currentColor";
  const entity = variant === "mono" ? "currentColor" : "#2B6BFF";
  const verified = variant === "mono" ? "currentColor" : "#C9A86A";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Panel Agency"
      className={className}
    >
      {/* Panel outline */}
      <rect
        x="2.75"
        y="2.75"
        width="26.5"
        height="26.5"
        rx="7"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        opacity="0.85"
      />
      {/* Entity avatar disk */}
      <circle cx="11" cy="13" r="3.4" fill={entity} />
      {/* Data rows */}
      <rect x="16.6" y="11.2" width="9" height="1.6" rx="0.8" fill={stroke} opacity="0.7" />
      <rect x="16.6" y="14.6" width="6" height="1.6" rx="0.8" fill={stroke} opacity="0.4" />
      {/* Bottom row */}
      <rect x="7" y="21" width="18" height="1.6" rx="0.8" fill={stroke} opacity="0.35" />
      {/* Verification dot */}
      <circle cx="24.5" cy="6.5" r="2" fill={verified} />
    </svg>
  );
}

/**
 * Full lockup: logo mark + wordmark.
 * Wordmark is rendered in current font; pair with `font-semibold tracking-tight`.
 */
export function LogoLockup({
  size = 28,
  className = "",
  wordmarkClassName = "font-semibold tracking-tight text-[15px]",
}: {
  size?: number;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span className={wordmarkClassName}>The Panel Agency</span>
    </span>
  );
}
