# SEO Audit Report — May 2026 (DataForSEO-driven)

*Source: DataForSEO `on_page/instant_pages` for five key URLs, plus `dataforseo_labs/google/keyword_ideas/live` across five seed terms.*

---

## Part 1 — On-page audit (5 URLs)

| URL | onpage_score | title len | meta len | h1 | h2 | words |
|---|---:|---:|---:|---:|---:|---:|
| `/` | **100** | 53 | 144 | 1 | 8 | 970 |
| `/tools/serp-audit` | **100** | 61 | 148 | 1 | 3 | 636 |
| `/glossary` | **100** | 60 | 164 | 1 | 9 | 673 |
| `/learn/how-knowledge-panels-work` | **100** | 63 | 143 | 1 | 10 | 1,638 |
| `/solutions/knowledge-panel-for-founders` | **100** | 61 | 147 | 1 | 7 | 959 |

**Every page scores 100/100.** Meta titles fall in the 53–63 char band, descriptions 143–164 char — comfortably within Google's display thresholds. Heading hierarchies are clean (one H1 each, well-distributed H2s).

### Issues flagged by DataForSEO (and what we'll do about them)

Three flags repeat on every page:

1. **`is_https`** — false positive. The site IS served over HTTPS at `the-panel-agency.netlify.app`. DataForSEO's check appears to require a canonical custom domain. Will resolve when we attach `thepanelagency.com`. *No action.*
2. **`has_render_blocking_resources`** — typical Next.js + Geist font preload pattern. Mitigated by the Critical CSS bundle Next emits. The only fix is removing the custom font, which would cost more in brand than it saves in CLS/LCP. *No action.*
3. **`low_content_rate`** — text-to-HTML ratio is below DataForSEO's threshold. This is an artefact of Tailwind's verbose class names + our inline JSON-LD scripts. The page bytes that AREN'T visible text are doing structural / SEO work (schema, JSON-LD). *No action.*

### Genuine issues to fix

| Issue | Page | Severity | Fix |
|---|---|---|---|
| `no_image_title` flagged 3× | `/learn/how-knowledge-panels-work` | Low | Add `title` attribute to the `<Image>` for `entity-graph.webp`. Mild SEO uplift, accessibility benefit. |
| Description `desc_len=164` exceeds 160 | `/glossary` | Cosmetic | Trim by 4 chars. Google will truncate, not penalise. |
| The H1 text extraction on `/solutions/knowledge-panel-for-founders` includes the SerpMock content above it. | `/solutions/*` | Low | The `<h1>` element itself is correct; DataForSEO's parser is concatenating visible text in the section. The fix is structural: move the SerpMock section to render AFTER the GuideLayout's h1. |

---

## Part 2 — Content-gap analysis (DataForSEO keyword_ideas)

Ran keyword_ideas across five seed terms: `google knowledge panel`, `claim knowledge panel`, `wikidata entity`, `schema markup`, `entity seo`. After de-duping and filtering to entity-SEO-relevant terms with monthly volume:

### What we're already targeting (no new page needed)

| Keyword | Volume | Covered by |
|---|---:|---|
| wikidata | 12,100 | `/glossary/kgmid`, `/learn/what-is-a-kgmid` (mentioned, not optimised) |
| google knowledge graph | 1,600 | `/glossary/knowledge-graph` |
| semantic seo | 880 | `/learn/semantic-seo-vs-entity-seo` |
| entity seo | 320 | Multiple pages, anchor coverage strong |
| knowledge panel claim | 90 | `/learn/how-to-claim-a-google-knowledge-panel` |
| knowledge panel login | 2,400 | `/learn/how-to-claim-a-google-knowledge-panel` (intent-mapped) |

### Recommended new pages (uncovered, entity-SEO-relevant, with volume)

After tight filtering for terms NOT yet covered:

| Keyword | Approx vol | Recommended page |
|---|---:|---|
| google knowledge graph api | 110 | **`/learn/google-knowledge-graph-api`** — technical reference: endpoints, auth, sample requests, what to do with the response |
| wikidata vs wikipedia | 70 | **`/learn/wikidata-vs-wikipedia-for-entity-seo`** — practitioner comparison from an entity-SEO angle |
| wikidata sparql | 90 | Body-copy expansion inside `/learn/google-knowledge-graph-api` |
| wikidata query | 70 | Same as above |
| wikidata id | 30 | Body-copy inside `/learn/what-is-a-kgmid` |
| google schema markup | 170 | **`/learn/schema-markup-for-knowledge-panels`** — practical Person/Org schema patterns |

### Strategic note

The brutal truth: most of our high-intent entity-SEO keyword space is already mapped. The remaining uncovered volume sits in either (a) technical reference territory (Knowledge Graph API, SPARQL) which converts poorly but builds authority, or (b) generic SEO terms (semrush, seo tools) that aren't our category.

The recommendation: build the technical reference pages anyway. They strengthen the topical-authority signal Google uses to decide whether to surface our commercial pages.

---

## What we'll ship in this pass

**Top priorities (this pass):**

1. **New page: `/learn/google-knowledge-graph-api`** — captures 110/mo direct intent plus body-copy coverage for sparql/query/wikidata API variants. Highest-impact uncovered slot.
2. **Add `title` attributes to `<Image>`** in the learn pillar page (fix the only "no_image_title" flag).
3. **Trim glossary meta description to ≤160 chars.**

**Deferred (next pass):**

- `/learn/wikidata-vs-wikipedia-for-entity-seo` (70/mo)
- `/learn/schema-markup-for-knowledge-panels` (170/mo)
- Move SerpMock injection BELOW the h1 in all `/solutions/*` and `/learn/*` pages (cosmetic parser issue)

---

## Methodology

- On-page: DataForSEO `/v3/on_page/instant_pages` with `enable_javascript:false, return_despite_timeout:true`. Each call hits the live URL, parses HTML, runs checks, returns structured findings.
- Content gap: 5 parallel `keyword_ideas` calls (50 results each, US English), de-duped, tight-relevance filtered, compared against existing site coverage.
- Raw data preserved in `/tmp/seo/` for the duration of the audit session.
