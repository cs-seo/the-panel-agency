import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrganicSerp } from "@/lib/dataforseo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public Brand SERP Audit endpoint.
 *
 * Each call to DataForSEO costs real money (~$0.0003 per organic SERP).
 * To prevent runaway costs we apply tight per-IP rate limiting AND an
 * aggressive in-memory cache so identical queries within a 12-hour window
 * return the previously-cached payload for free.
 *
 * Hard cap: 3 audits per IP per 24 hours.
 */
const BodySchema = z.object({
  name: z.string().min(2).max(120),
});

const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipBucket: Map<string, number[]> = new Map();

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const cache: Map<string, { at: number; payload: unknown }> = new Map();

function rateLimited(ip: string) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipBucket.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    return {
      limited: true as const,
      retryAfter: Math.ceil((hits[0] + RATE_LIMIT_WINDOW_MS - now) / 1000),
    };
  }
  hits.push(now);
  ipBucket.set(ip, hits);
  return { limited: false as const };
}

function cacheGet(key: string) {
  const c = cache.get(key);
  if (!c) return null;
  if (Date.now() - c.at > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return c.payload;
}
function cacheSet(key: string, payload: unknown) {
  cache.set(key, { at: Date.now(), payload });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com",
    "https://the-panel-agency.netlify.app",
    "http://localhost:3000",
  ];
  if (origin && !allowed.some((u) => origin.startsWith(u))) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  const ipHeader =
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for") ||
    "anon";
  const ip = ipHeader.split(",")[0].trim();

  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      {
        error: "Invalid request body",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 400 }
    );
  }

  const key = parsed.name.toLowerCase().trim();
  const cached = cacheGet(key);
  if (cached) {
    return NextResponse.json({ cached: true, ...(cached as object) });
  }

  // Apply rate limit AFTER cache check — repeated identical queries don't burn budget
  const rl = rateLimited(ip);
  if (rl.limited) {
    return NextResponse.json(
      {
        error:
          "You've used your free audits for the day. Apply for a full strategist-led audit, or come back tomorrow.",
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const audit = await getOrganicSerp(parsed.name);

    // Domain ownership heuristics — flag results the user likely controls
    const annotatedOrganic = audit.organic.map((o) => {
      const domain = (o.domain ?? "").toLowerCase();
      let kind: "owned" | "social" | "press" | "other" = "other";
      if (
        domain.includes("linkedin.com") ||
        domain.includes("x.com") ||
        domain.includes("twitter.com") ||
        domain.includes("instagram.com") ||
        domain.includes("facebook.com") ||
        domain.includes("youtube.com") ||
        domain.includes("tiktok.com")
      )
        kind = "social";
      else if (
        domain.includes("wikipedia.org") ||
        domain.includes("crunchbase.com") ||
        domain.includes("forbes.com") ||
        domain.includes("bloomberg.com") ||
        domain.includes("nytimes.com") ||
        domain.includes("ft.com") ||
        domain.includes("techcrunch.com") ||
        domain.includes("wired.com")
      )
        kind = "press";
      return { ...o, kind };
    });

    const summary = {
      has_knowledge_panel: audit.knowledge_panel.exists,
      kgmid: audit.knowledge_panel.kgmid ?? null,
      organic_count: audit.organic.length,
      social_count: annotatedOrganic.filter((o) => o.kind === "social").length,
      press_count: annotatedOrganic.filter((o) => o.kind === "press").length,
      paa_count: audit.people_also_ask.length,
    };

    const payload = {
      query: parsed.name,
      summary,
      knowledge_panel: audit.knowledge_panel,
      organic: annotatedOrganic,
      people_also_ask: audit.people_also_ask,
    };

    cacheSet(key, payload);
    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("401") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
