import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verification Risk Score — free, no DataForSEO cost.
 *
 * Aggregates Wikipedia + Wikidata signals into a 0-100 entity-stability
 * score with a breakdown of which signals contribute.
 *
 * Loosely modelled on the Kalicube risk-score pattern, but using only
 * publicly accessible inputs so we can offer it free.
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

type WikipediaProbe = {
  exists: boolean;
  isDisambig: boolean;
  hasImage: boolean;
  extractLen: number;
};
type WikidataProbe = {
  exists: boolean;
  qid?: string;
  description?: string;
  sameAsCount: number;
  hasImage: boolean;
};

async function probeWikipedia(name: string): Promise<WikipediaProbe> {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      name.replace(/ /g, "_")
    )}`;
    const r = await fetch(url, {
      headers: {
        "User-Agent": "ThePanelAgency-RiskScore/1.0",
        Accept: "application/json",
      },
    });
    if (!r.ok) return { exists: false, isDisambig: false, hasImage: false, extractLen: 0 };
    const j = (await r.json()) as {
      type?: string;
      extract?: string;
      thumbnail?: unknown;
    };
    return {
      exists: j.type === "standard",
      isDisambig: j.type === "disambiguation",
      hasImage: Boolean(j.thumbnail),
      extractLen: (j.extract || "").length,
    };
  } catch {
    return { exists: false, isDisambig: false, hasImage: false, extractLen: 0 };
  }
}

async function probeWikidata(name: string): Promise<WikidataProbe> {
  try {
    const sr = await fetch(
      "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
        encodeURIComponent(name) +
        "&language=en&format=json&limit=1&origin=*",
      { headers: { "User-Agent": "ThePanelAgency-RiskScore/1.0" } }
    );
    if (!sr.ok) {
      return { exists: false, sameAsCount: 0, hasImage: false };
    }
    const sj = (await sr.json()) as {
      search?: Array<{ id?: string; label?: string; description?: string }>;
    };
    const first = sj.search?.[0];
    if (!first?.id) {
      return { exists: false, sameAsCount: 0, hasImage: false };
    }
    // Fetch full entity for sameAs / image counts
    const er = await fetch(
      "https://www.wikidata.org/wiki/Special:EntityData/" +
        encodeURIComponent(first.id) +
        ".json"
    );
    let sameAsCount = 0;
    let hasImage = false;
    if (er.ok) {
      const ej = (await er.json()) as {
        entities?: Record<
          string,
          {
            sitelinks?: Record<string, unknown>;
            claims?: { P18?: unknown[] };
          }
        >;
      };
      const ent = ej.entities?.[first.id];
      sameAsCount = Object.keys(ent?.sitelinks ?? {}).length;
      hasImage = Boolean(ent?.claims?.P18?.length);
    }
    return {
      exists: true,
      qid: first.id,
      description: first.description,
      sameAsCount,
      hasImage,
    };
  } catch {
    return { exists: false, sameAsCount: 0, hasImage: false };
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

  const [wp, wd] = await Promise.all([
    probeWikipedia(parsed.name),
    probeWikidata(parsed.name),
  ]);

  // Scoring — out of 100, broken into 5 categories
  const breakdown: { label: string; weight: number; earned: number; note: string }[] = [
    {
      label: "Wikipedia article",
      weight: 25,
      earned: wp.exists ? 25 : 0,
      note: wp.exists
        ? "Wikipedia recognises you. The dominant authoritative source for Knowledge Graph entities."
        : wp.isDisambig
        ? "Wikipedia treats your name as a disambiguation. Risk of mis-attribution."
        : "No Wikipedia article. Notability-graph foundation is missing.",
    },
    {
      label: "Wikidata entity",
      weight: 25,
      earned: wd.exists ? 25 : 0,
      note: wd.exists
        ? "Wikidata entity " + (wd.qid ?? "") + " — open knowledge-base foundation in place."
        : "No Wikidata entry. Easiest single fix in entity SEO; anyone can create one.",
    },
    {
      label: "Wikidata sameAs density",
      weight: 20,
      earned: Math.min(20, wd.sameAsCount * 1.5),
      note:
        wd.sameAsCount >= 8
          ? "Strong cross-language presence (" + wd.sameAsCount + " sitelinks). Hard for Google to ignore."
          : wd.sameAsCount > 0
          ? "Partial cross-language coverage (" + wd.sameAsCount + " sitelinks). Could be deeper."
          : "No sameAs / sitelinks on Wikidata. Build the cross-surface network.",
    },
    {
      label: "Image asset",
      weight: 15,
      earned: wp.hasImage ? 10 : 0 + (wd.hasImage ? 5 : 0),
      note:
        wp.hasImage && wd.hasImage
          ? "Authoritative photo on both Wikipedia and Wikidata. The panel will render with your face."
          : wp.hasImage || wd.hasImage
          ? "Photo on one of the two surfaces. Sync to the other."
          : "No authoritative photo. The panel that triggers may render without a photo, weakening trust.",
    },
    {
      label: "Bio strength",
      weight: 15,
      earned:
        Math.min(8, Math.floor(wp.extractLen / 60)) +
        (wd.description ? 7 : 0),
      note:
        wp.extractLen > 400 && wd.description
          ? "Rich bio across both surfaces. Likely to be cited verbatim by AI engines."
          : wp.extractLen > 0 || wd.description
          ? "Bio present but thin. Risk of AI engines paraphrasing inaccurately."
          : "No structured bio. AI engines will hallucinate one if asked.",
    },
  ];

  const score = Math.min(
    100,
    Math.round(breakdown.reduce((s, b) => s + b.earned, 0))
  );

  let band: "low" | "moderate" | "high" | "critical";
  if (score >= 80) band = "low";
  else if (score >= 50) band = "moderate";
  else if (score >= 25) band = "high";
  else band = "critical";

  const verdict = {
    low: "Low risk. Your entity stack is mostly in place. Maintenance work, not engineering.",
    moderate:
      "Moderate risk. Some foundational signals exist but the stack is uneven. Targeted fixes will help.",
    high: "High risk. Critical entity signals are missing. A panel either hasn't triggered yet or is unstable if it has.",
    critical:
      "Critical risk. No public entity foundation exists. Full entity engineering recommended before any panel work can succeed.",
  }[band];

  return NextResponse.json({
    query: parsed.name,
    score,
    band,
    verdict,
    breakdown,
    raw: { wikipedia: wp, wikidata: wd },
  });
}
