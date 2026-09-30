import { NextResponse, type NextRequest } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Very small in-memory rate limit: 5 requests per IP per 10 minutes. */
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

/**
 * Contact form backend — proxies to Formspree (https://formspree.io).
 *
 * The form ID lives in `FORMSPREE_FORM_ID` (server-only env var) so it is
 * never shipped to the browser. Formspree delivers submissions to the inbox
 * configured in its dashboard; `_replyto` makes "Reply" answer the visitor.
 */
export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = typeof body.company === "string" ? body.company : "";

  // Honeypot filled → silently accept to not tip off bots.
  if (company) return NextResponse.json({ ok: true });

  // Validation (mirror of the client rules)
  if (!name || !email || !EMAIL_RE.test(email) || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const formId = process.env.FORMSPREE_FORM_ID;

  // No configuration → explicit, honest failure the UI can show.
  if (!formId) {
    console.error("Contact form not configured: set FORMSPREE_FORM_ID.");
    return NextResponse.json(
      { error: "The form isn't configured yet. Please email directly instead." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _replyto: email,
        _subject: `Portfolio inquiry — ${name}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.json().catch(() => null);
      // A wrong/unverified form ID surfaces as 404 or 400 from Formspree.
      if (res.status === 404 || res.status === 400) {
        console.error("Formspree rejected the form ID:", res.status, detail);
        return NextResponse.json(
          { error: "The form endpoint rejected this submission — check FORMSPREE_FORM_ID." },
          { status: 502 },
        );
      }
      console.error("Formspree submission failed:", res.status, detail);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Formspree request failed:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }
}
