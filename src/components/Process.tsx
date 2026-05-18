const steps = [
  {
    n: "01",
    title: "Qualify",
    body: "Confidential application and discovery call. We assess fit, entity surface, and goals before quoting.",
  },
  {
    n: "02",
    title: "Engineer",
    body: "Authority assets, Wikidata reconciliation, schema markup, and tier-1 placements coordinated in parallel.",
  },
  {
    n: "03",
    title: "Verify",
    body: "Knowledge Panel materialization, ownership claim, and verification badge pathway.",
  },
  {
    n: "04",
    title: "Defend",
    body: "Ongoing monitoring, suppression of negative drift, and rapid response on panel disappearance.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-dim">Engagement</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tightest text-balance">
            Four phases. One outcome.
          </h2>
        </div>
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl glass p-6 relative overflow-hidden">
              <div className="text-[11px] tracking-[0.18em] text-ink-dim">PHASE</div>
              <div className="mt-1 font-mono text-3xl font-medium text-electric-glow">{s.n}</div>
              <h3 className="mt-4 text-[16px] font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
