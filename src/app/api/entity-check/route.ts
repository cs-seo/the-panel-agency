import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public entity existence check.
 * Hits Wikipedia + Wikidata directly. These are free APIs with reasonable
 * rate limits, so we apply a modest origin check and per-IP throttle but
 * do not need to authenticate.
 */
const BodySchema = z.object({
  name: z.string().min(2).max(120),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const ipBucket: Map<string, number[]> = new Map();

function rateLimited(ip: string) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipBucket.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) return true;
  hits.push(now);
  ipBucket.set(ip, hits);
  return false;
}

type WikipediaSummary = {
  exists: boolean;
  title?: string;
  extract?: string;
  url?: string;
};

type WikidataSummary = {
  exists: boolean;
  id?: string;
  label?: string;
  description?: string;
  url?: string;
};

async function checkWikipedia(name: string): Promise<WikipediaSummary> {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      name.replace(/ /g, "_")
    )}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ThePanelAgency-Tools/1.0 (https://thepanelagency.com)",
        Accept: "application/json",
      },
    });
    if (!res.ok) return { exists: false };
    const json = (await res.json()) as {
      type?: string;
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
    };
    if (json.type === "disambiguation") return { exists: false };
    return {
      exists: true,
      title: json.title,
      extract: json.extract?.slice(0, 400),
      url: json.content_urls?.desktop?.page,
    };
  } catch {
    return { exists: false };
  }
}

async function checkWikidata(name: string): Promise<WikidataSummary> {
  try {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      name
    )}&language=en&format=json&limit=1&origin=*`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ThePanelAgency-Tools/1.0 (https://thepanelagency.com)",
      },
    });
    if (!res.ok) return { exists: false };
    const json = (await res.json()) as {
      search?: Array<{
        id?: string;
        label?: string;
        description?: string;
        concepturi?: string;
      }>;
    };
    const first = json.search?.[0];
    if (!first) return { exists: false };
    return {
      exists: true,
      id: first.id,
      label: first.label,
      description: first.description,
      url: first.concepturi,
    };
  } catch {
    return { exists: false };
  }
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
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in a minute." },
      { status: 429 }
    );
  }

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

  const [wikipedia, wikidata] = await Promise.all([
    checkWikipedia(parsed.name),
    checkWikidata(parsed.name),
  ]);

  let score = 0;
  if (wikipedia.exists) score += 50;
  if (wikidata.exists) score += 50;

  return NextResponse.json({
    query: parsed.name,
    wikipedia,
    wikidata,
    entity_score: score,
    interpretation:
      score === 100
        ? "Strong entity presence. Both Wikipedia and Wikidata recognise you — the foundations of a Knowledge Panel are in place."
        : score === 50
        ? "Partial entity presence. One of the two foundation sources sees you. The next move is closing the gap on the missing surface."
        : "No public entity signal yet. Google's Knowledge Graph almost certainly does not have a record of you. Entity engineering work needed.",
  });
}
