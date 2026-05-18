# The Panel Agency — Content Strategy

*Last updated: 2026-05-18*

This is the working content strategy for The Panel Agency. It covers the keyword landscape, the page-by-page brief, internal linking, tone-of-voice rules, and the publishing cadence we should hold to once we move beyond launch.

---

## 1. Positioning

We are a **boutique Google Knowledge Panel agency** for founders, executives, investors, attorneys, fund managers, authors, and other public operators. Our differentiator is depth (entity engineering, not generalist SEO) and discretion (NDA-led, no public client logos). The website should at every moment communicate three things: technical credibility, premium discretion, and irrefutable Google-facing expertise.

Closest peer: **lindypanels.com**. We are positioned slightly more premium and slightly more editorial than Lindy — the Geist typography, obsidian palette, and AI-generated entity-graph imagery do that work visually. Copy should reinforce it: precise, calm, declarative. Never hyperbolic.

---

## 2. The keyword landscape we are competing in

We are pursuing three keyword categories. Each category drives a different page archetype.

**A. Money keywords (commercial intent)** — buyers searching to hire an agency. These map to the `/solutions/*` pages. Examples:

- *google knowledge panel agency*
- *knowledge panel setup service*
- *get a google knowledge panel*
- *google knowledge panel for founders / authors / brands / attorneys / financial advisors*

**B. Diagnostic keywords (problem-aware intent)** — buyers researching a problem they are personally experiencing. These map to the `/learn/*` troubleshooting pages and have very high conversion when written with empathy. Examples:

- *why did my google knowledge panel disappear*
- *how to merge duplicate knowledge panels*
- *can i edit my knowledge panel*
- *my knowledge panel shows the wrong photo*

**C. Reference keywords (research intent)** — buyers and journalists who want to understand the mechanic. These map to long-form `/learn/*` reference pages and drive top-of-funnel authority. Examples:

- *how do google knowledge panels work*
- *what is a kgmid*
- *how to add schema for knowledge panel*
- *google knowledge graph explained*
- *knowledge panel vs featured snippet*

In SEMrush parlance: category B is the highest commercial intent at the lowest competition, category A is the highest competition, and category C is the easiest to rank for and the most useful for AI-overview citation.

---

## 3. Site information architecture

```
/                                       Homepage (commercial + hero demo)
├── /solutions/
│   ├── knowledge-panel-for-founders    Money page · primary commercial
│   ├── knowledge-panel-for-authors     Money page
│   ├── knowledge-panel-for-brands      Money page
│   ├── verification-badge              Money page (also a learn topic)
│   ├── [planned] knowledge-panel-for-attorneys
│   ├── [planned] knowledge-panel-for-fund-managers
│   └── [planned] knowledge-panel-for-financial-advisors
├── /learn/
│   ├── how-knowledge-panels-work       Reference · pillar page
│   ├── why-did-my-knowledge-panel-disappear  Diagnostic
│   ├── merge-duplicate-knowledge-panels      Diagnostic
│   ├── [planned] kgmid-explained
│   ├── [planned] knowledge-panel-vs-featured-snippet
│   └── [planned] schema-for-knowledge-panels
├── /about                              [not built yet]
├── /press                              [not built yet]
└── /legal/(privacy|terms|cookies)      [not built yet]
```

The `/solutions/*` pages are the conversion endpoints. The `/learn/*` pages drive search traffic to those solution pages through internal linking.

---

## 4. Page-by-page brief

### Homepage (`/`)

- **Title:** "Google Knowledge Panel Setup & Entity Verification 🔍✨" (56 chars · 2 emojis)
- **Meta:** 152 chars, 3 emojis, CTA-led
- **Sections:** Hero · Knowledge Panel previewer (interactive) · before/after slider · capabilities bento · process · trust badges · FAQ (3 questions) · application form
- **Internal links out:** all /solutions/* pages and the three /learn/* reference pages, via the footer
- **Conversion target:** application form submission
- **Word count:** ~1,100 words (homepage + 3 FAQs)

### `/solutions/knowledge-panel-for-founders` — most important money page

- **Title:** "Google Knowledge Panel for Founders & CEOs 🚀 Entity SEO Setup"
- **Sections:** Why founders need a panel, the founder entity stack, the cluster effect, the defence layer, FAQ
- **Cluster topic:** founders, CEOs, executives, Series-A through C
- **Internal links to:** /learn/how-knowledge-panels-work, /solutions/verification-badge
- **Target queries:** "knowledge panel for founders" + 30+ related variants

### `/solutions/knowledge-panel-for-authors`

- **Title:** "Google Knowledge Panel for Authors & Speakers 📚 Verified Bio"
- **Cluster topic:** authors, speakers, podcast hosts, TED appearances
- **Internal links to:** /learn/how-knowledge-panels-work
- **Target queries:** "knowledge panel for authors", "author knowledge panel", "speaker knowledge panel"

### `/solutions/knowledge-panel-for-brands`

- **Title:** "Google Knowledge Panel for Brands & Companies 🏢 Verified"
- **Cluster topic:** DTC brands, B2B companies, products in the panel
- **Internal links to:** /solutions/knowledge-panel-for-founders, /solutions/verification-badge
- **Target queries:** "knowledge panel for companies", "brand knowledge panel"

### `/solutions/verification-badge`

- **Title:** "Google Knowledge Panel Verification Badge ✅ How to Earn It"
- **Cluster topic:** the gray verification check, manager-of-entity status
- **Internal links to:** all /solutions/* and /learn/* pages
- **Target queries:** "google knowledge panel verification badge", "how to get verified on google search"

### `/learn/how-knowledge-panels-work` — **pillar reference page**

- **Title:** "How Google Knowledge Panels Work — Triggers, Schema & Signals 🔍"
- **Sections:** definition, sources, triggers, schema, AI era, why panels don't appear, timeline, FAQ
- **Word count:** ~1,500 words (already shipped)
- **Internal links from:** every other page should link to this
- **Internal links to:** every /solutions/* page

### `/learn/why-did-my-knowledge-panel-disappear`

- **Title:** "Why Did My Google Knowledge Panel Disappear? 🚨 Fix It Fast"
- **Sections:** 7 causes of disappearance, first-72-hour checklist
- **Internal links to:** /solutions/verification-badge (recovery often needs it), /learn/how-knowledge-panels-work

### `/learn/merge-duplicate-knowledge-panels`

- **Title:** "Merge Duplicate Google Knowledge Panels — Step-by-Step Fix 🔀"
- **Sections:** what duplicates are, why they matter, detection, merge sequence, prevention
- **Internal links to:** /learn/how-knowledge-panels-work, /solutions/verification-badge

---

## 5. Internal linking model

Every page should contain at least one outbound link to the **pillar** (`/learn/how-knowledge-panels-work`) and at least one outbound link to a relevant **solutions** page. The pillar is currently the only page on the site with extensive outbound links, and that&apos;s fine — that&apos;s the role of a pillar.

The footer carries the canonical site map and links to all solutions and learn pages, which means every page already has the full nav surface. But contextual in-body links carry more weight for SEO than navigational ones, so each page&apos;s body copy should include 2-3 inline links to other pages on the site.

---

## 6. Title & meta rules (currently applied)

- **Titles:** max 70 characters, max 2 emojis, NO brand mention in the title, lead with the search query.
- **Meta descriptions:** max 160 characters, exactly 3 emojis, designed to entice click-through. Front-load the value proposition; end with a soft CTA.
- **Canonical URLs:** every page exports its own `alternates.canonical`.
- **Structured data:** every page emits Article + Breadcrumb JSON-LD. Every page with an FAQ emits FAQPage JSON-LD via the shared `<FAQ />` component. The root layout emits Organization JSON-LD sitewide.

---

## 7. Tone-of-voice rules

We are writing for sophisticated readers — founders, attorneys, fund managers — who are sceptical of marketing copy. Hold to these:

- **Declarative, not hyperbolic.** &quot;Panels typically appear in 60-75 days&quot; beats &quot;We get you a panel fast!&quot;
- **Specific, not generic.** &quot;Wikidata reconciliation can lag the live web by weeks&quot; beats &quot;We work hard to get results.&quot;
- **No fake urgency.** No countdown timers, no scarcity claims, no &quot;limited slots remaining.&quot; The audience finds it cheap.
- **No fake stats.** Every number in body copy should be either flagged as illustrative (e.g. &quot;our median build is 70 days&quot;) or independently sourceable. Padding with invented numbers is a fast way to lose credibility with this audience.
- **Reference Google&apos;s ecosystem fluently.** Knowledge Graph, KGMID, Wikidata, schema.org, JSON-LD, AI Overviews, GEO. Use the vocabulary correctly — this audience will notice if we don&apos;t.
- **British or American English consistently.** Decide and hold to it. Currently the site is mixing both lightly; pick one in a follow-up.

---

## 8. Publishing cadence (post-launch)

Once the launch site is live, the content strategy shifts to building topical authority through the `/learn` blog. Target cadence:

- **One pillar-quality reference page per quarter.** ~1,500+ words, deeply linked, designed to rank for a category-C reference keyword and feed the cluster.
- **Two diagnostic articles per month.** ~700-1,000 words, addressing specific problem-aware queries we see in our calls and audits.
- **One commercial page update per month.** The `/solutions/*` pages should be living documents — refresh stats, add new FAQs from sales conversations, swap in new case studies as NDAs allow.

The first 90 days of post-launch content should prioritise:

1. `/learn/kgmid-explained` — the technical reference. Easy to rank for, useful for AI-overview citation.
2. `/learn/schema-for-knowledge-panels` — practical implementation, draws developers and high-intent readers.
3. `/solutions/knowledge-panel-for-attorneys` — high commercial intent, underserved by Lindy.
4. `/solutions/knowledge-panel-for-fund-managers` — same.
5. `/about` — establishes founder credibility, supports manual outreach.

---

## 9. Things still missing for a real launch

- **No `/api/apply` backend.** The application form currently does nothing. Highest-priority bug.
- **No `/sitemap.xml` route.** Add `src/app/sitemap.ts` once all pages stabilise.
- **No `/robots.txt`.** Add `src/app/robots.ts`.
- **No legal pages** (`/legal/privacy`, `/legal/terms`, `/legal/cookies`). Required given the &quot;encrypted, NDA-led&quot; positioning.
- **No `/about` page.** Founder credibility matters for an agency at this price point.
- **No press page or media kit.** Recommended once we have any client willing to be public.
- **OG image is a placeholder (`/og.png` does not exist yet).** Generate via Replicate or Next.js `ImageResponse`.

---

## 10. How we&apos;ll know the strategy is working

- **Knowledge Panel** is the head term we expect to never own — but the **&quot;X panel for Y&quot;** long tail is winnable. Initial KPI: rank top-10 for at least three `/solutions/*` long-tail variants by month four.
- **Diagnostic queries** convert at 5-15x homepage conversion rate in this category. Initial KPI: ≥5% form-submission rate on the two diagnostic pages currently live.
- **AI answer engine citation:** by month six, ChatGPT and Perplexity should be citing our `/learn/*` pages when asked about Knowledge Panels. We track this through monthly cohort prompts.
- **The Panel Agency&apos;s own panel:** the ultimate proof. We should be running our own playbook on ourselves. Building our agency&apos;s panel is itself a marketing exercise — we should write a transparent case study on it once it lands.
