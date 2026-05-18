import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Application intake endpoint.
 *
 * Three delivery channels, each independently optional, falling back gracefully:
 *
 *   1. Always: console.log a structured payload to Netlify function logs.
 *   2. If APPLY_WEBHOOK_URL is set: POST JSON to that URL (Slack, Discord,
 *      Zapier, n8n, Make, etc.).
 *   3. If RESEND_API_KEY is set: email the strategist team via Resend.
 *
 * The request still returns 200 even if (2) or (3) fail — function logs are
 * the source of truth, so nothing is ever silently lost.
 */
const BodySchema = z.object({
  role: z.enum(["founder", "author", "artist", "brand"]),
  existing: z.enum(["yes-wiki", "yes-other", "no"]),
  goal: z.enum(["verification", "control", "remove-negative", "fix-mixed"]),
  email: z.string().email().max(254),
  hp: z.string().optional(),
});

const ROLE_LABEL: Record<string, string> = {
  founder: "Founder / Executive",
  author: "Author / Speaker",
  artist: "Artist / Creator",
  brand: "Brand / Company",
};
const EXISTING_LABEL: Record<string, string> = {
  "yes-wiki": "Yes — Wikipedia or Wikidata",
  "yes-other": "Yes — Crunchbase, IMDb, or similar",
  no: "No structured profile yet",
};
const GOAL_LABEL: Record<string, string> = {
  verification: "Earn the verification badge",
  control: "Control how Google represents me",
  "remove-negative": "Suppress negative press",
  "fix-mixed": "Fix mixed-entity / duplicate data",
};

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

  if (parsed.hp && parsed.hp.trim().length > 0) {
    // Honeypot fired. Silently accept.
    return NextResponse.json({ ok: true });
  }

  const payload = {
    received_at: new Date().toISOString(),
    role: parsed.role,
    role_label: ROLE_LABEL[parsed.role],
    existing_profile: parsed.existing,
    existing_label: EXISTING_LABEL[parsed.existing],
    primary_goal: parsed.goal,
    goal_label: GOAL_LABEL[parsed.goal],
    email: parsed.email,
    ip: req.headers.get("x-forwarded-for") ?? "unknown",
    user_agent: req.headers.get("user-agent") ?? "unknown",
    source: "the-panel-agency.netlify.app/#apply",
  };

  console.log("[apply]", JSON.stringify(payload));

  // Fire webhook + email in parallel; neither failure blocks the response.
  const tasks: Promise<unknown>[] = [];

  const webhook = process.env.APPLY_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text:
            "New application from " +
            payload.email +
            " (" +
            payload.role_label +
            ", goal: " +
            payload.goal_label +
            ")",
          ...payload,
        }),
      }).catch((e) => {
        console.error("[apply] webhook forward failed:", e);
      })
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM ?? "notifications@thepanelagency.com";
  const resendTo = process.env.RESEND_TO ?? "hello@thepanelagency.com";
  if (resendKey) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + resendKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [resendTo],
          reply_to: payload.email,
          subject: "[Apply] " + payload.role_label + " — " + payload.email,
          text:
            "New application received at " +
            payload.received_at +
            "\n\n" +
            "Email:      " + payload.email + "\n" +
            "Role:       " + payload.role_label + "\n" +
            "Existing:   " + payload.existing_label + "\n" +
            "Goal:       " + payload.goal_label + "\n" +
            "Source:     " + payload.source + "\n" +
            "IP:         " + payload.ip + "\n" +
            "User Agent: " + payload.user_agent + "\n",
        }),
      }).catch((e) => {
        console.error("[apply] resend failed:", e);
      })
    );
  }

  // Await with hard 4s ceiling so the user doesn't wait on slow webhooks.
  await Promise.race([
    Promise.allSettled(tasks),
    new Promise((r) => setTimeout(r, 4000)),
  ]);

  return NextResponse.json({ ok: true });
}
