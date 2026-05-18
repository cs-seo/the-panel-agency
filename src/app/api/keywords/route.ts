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

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = BodySchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body", details: err instanceof Error ? err.message : String(err) },
      { status: 400 }
    );
  }

  try {
    if (parsed.mode === "related") {
      if (!parsed.seed) {
        return NextResponse.json({ error: "seed is required for related mode" }, { status: 400 });
      }
      const data = await getRelatedKeywords(parsed.seed, {
        locationName: parsed.locationName,
        languageName: parsed.languageName,
      });
      return NextResponse.json({ data });
    }

    if (!parsed.keywords || parsed.keywords.length === 0) {
      return NextResponse.json({ error: "keywords[] required for search_volume mode" }, { status: 400 });
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
