import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Application intake endpoint.
 *
 * Accepts the four-question intake from <ApplyCTA />. Validates with Zod,
 * forwards to a configurable webhook (Slack, Discord, Zapier, etc.) if
 * APPLY_WEBHOOK_URL is set in the environment, and always logs the
 * structured payload to Netlify function logs as a fallback so nothing
 * is ever silently lost.
 *
 * To wire up actual email delivery, set APPLY_WEBHOOK_URL to a Resend
 * forward, a Zapier webhook, or a Slack incoming-webhook URL. The payload
 * shape is documented in the inline comments below.
 */
const BodySchema = z.object({
  role: z.enum(["founder", "author", "artist", "brand"]),
  existing: z.enum(["yes-wiki", "yes-other", "no"]),
  goal: z.enum(["verification", "control", "remove-negative", "fix-mixed"]),
  email: z.string().email().max(254),
  // Honeypot — bots tend to fill every input; humans never see this.
  // If present and non-empty, treat the submission as spam and silently 200.
  hp: z.string().optional(),
});

export async function POST(req: Request) {
  // Basic origin check — only accept submissions from our own deployed
  // origin or localhost during development. Defends against trivial CSRF.
  const origin = req.headers.get("origin") ?? "";
  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com",
    "https://the-panel-agency.netlify.app",
    "http://localhost:3000",
  ];
  const isAllowedOrigin =
    origin === "" || allowed.some((u) => origin.startsWith(u));
  if (!isAllowedOrigin) {
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

  // Honeypot: silently accept, never forward.
  if (parsed.hp && parsed.hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    received_at: new Date().toISOString(),
    role: parsed.role,
    existing_profile: parsed.existing,
    primary_goal: parsed.goal,
    email: parsed.email,
    ip: req.headers.get("x-forwarded-for") ?? "unknown",
    user_agent: req.headers.get("user-agent") ?? "unknown",
    source: "the-panel-agency.netlify.app/#apply",
  };

  // Always log to Netlify function logs — searchable in the dashboard.
  console.log("[apply]", JSON.stringify(payload));

  // Optionally forward to a webhook URL set via env. Slack, Discord,
  // Zapier, n8n, Make, or any custom endpoint all work — we just POST JSON.
  const webhook = process.env.APPLY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New application from ${payload.email} (${payload.role}, goal: ${payload.primary_goal})`,
          ...payload,
        }),
      });
    } catch (e) {
      // Log but don't fail the user — the function log is the source of truth.
      console.error("[apply] webhook forward failed:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
