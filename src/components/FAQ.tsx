/**
 * FAQ section with FAQPage JSON-LD baked in.
 *
 * Server component — no client JS. Uses native <details>/<summary> for
 * accessibility and zero-JS expansion. The structured data is emitted
 * alongside so Google can surface rich FAQ snippets in SERPs.
 *
 * Usage:
 *   <FAQ
 *     eyebrow="FAQ"
 *     title="Common questions"
 *     items={[
 *       { q: "How long does setup take?", a: "Mini-panels ..." },
 *       ...
 *     ]}
 *   />
 */
export type FAQItem = { q: string; a: string };

export function FAQ({
  eyebrow = "FAQ",
  title = "The questions everyone asks",
  intro,
  items,
  id = "faq",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: FAQItem[];
  id?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <section id={id} className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">{eyebrow}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 text-ink-muted leading-relaxed max-w-md">{intro}</p>
          ) : null}
        </div>

        <div className="lg:col-span-8 divide-y divide-line/70 rounded-3xl glass">
          {items.map((it, i) => (
            <details key={i} className="group p-6 first:rounded-t-3xl last:rounded-b-3xl">
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                <span className="text-[17px] sm:text-lg font-medium tracking-tight text-ink pr-2">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 grid place-items-center w-7 h-7 rounded-full border border-line text-ink-muted text-lg leading-none transition-transform duration-300 group-open:rotate-45 group-open:text-electric-glow group-open:border-electric/40"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 text-ink-muted leading-relaxed text-[15px] max-w-3xl">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
