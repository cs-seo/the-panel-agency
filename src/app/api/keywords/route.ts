import { NextResponse } from "next/server";
import { z } from "zod";
import { getSearchVolume, getRelatedKeywords } from "@/lib/dataforseo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  mode: z.enum(["search_volume", "related"]).default("search_volume"),
  keywords: z.array(z.string().min(1).max(200)).max(100).optional(),
  seed: z.string().min(1).max(200).optional(),
  locationName: z.string().optional(),
  languageName: z.string().optional(),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const ipBucket: Map<string, number[]> = new Map();

function rateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipBucket.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    const oldest = hits[0];
    return {
      limited: true,
      retryAfter: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000),
    };
  }
  hits.push(now);
  ipBucket.set(ip, hits);
  return { limited: false, retryAfter: 0 };
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
  const rl = rateLimited(ip);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
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

  try {
    if (parsed.mode === "related") {
      if (!parsed.seed) {
        return NextResponse.json(
          { error: "seed is required for related mode" },
          { status: 400 }
        );
      }
      const data = await getRelatedKeywords(parsed.seed, {
        locationName: parsed.locationName,
        languageName: parsed.languageName,
      });
      return NextResponse.json({ data });
    }

    if (!parsed.keywords || parsed.keywords.length === 0) {
      return NextResponse.json(
        { error: "keywords[] required for search_volume mode" },
        { status: 400 }
      );
    }
    const data = await getSearchVolume(parsed.keywords, {
      locationName: parsed.locationName,
      languageName: parsed.languageName,
    });
    return NextResponse.json({ data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("401") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
