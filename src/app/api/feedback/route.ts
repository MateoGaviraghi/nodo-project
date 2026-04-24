import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SOCIAL_LINKS } from "@/lib/constants";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.RESEND_FROM || "Nodo <hola@nodotech.dev>";

interface FeedbackBody {
  name: string;
  email?: string;
  company?: string;
  opinion: string;
  rating?: number;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: FeedbackBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const opinion = (body.opinion || "").trim();
  const rating =
    typeof body.rating === "number" && body.rating >= 1 && body.rating <= 5
      ? Math.round(body.rating)
      : null;

  if (!name || !opinion) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (email && !isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (name.length > 120 || company.length > 160 || opinion.length > 1500) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") || null;
  const stars = rating ? "⭐".repeat(rating) : "";
  const subject = rating
    ? `💬 ${stars} — Nueva opinión de ${name}`
    : `💬 Nueva opinión de ${name}`;
  const text = [
    `Nueva opinión recibida en nodotech.dev`,
    ``,
    `De: ${name}${email ? ` <${email}>` : " (sin email)"}`,
    company ? `Empresa/rol: ${company}` : null,
    rating ? `Valoración: ${rating}/5 ${stars}` : null,
    ``,
    `Opinión:`,
    opinion,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="560" style="max-width:560px;width:100%;">
      <tr><td align="center" style="padding:0 0 24px 0;">
        <div style="width:60px;height:3px;border-radius:2px;background:linear-gradient(135deg,#8b2fef,#5863f2,#2785fe,#00c1f4);">&nbsp;</div>
      </td></tr>
      <tr><td style="padding:0 8px 20px 8px;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#00c1f4;font-weight:600;padding-bottom:8px;">Opinión recibida</div>
        <h2 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">💬 Nueva opinión de ${escapeHtml(name)}</h2>
      </td></tr>
      <tr><td style="padding:8px;">
        <table role="presentation" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
          <tr><td style="padding:18px;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8888aa;font-weight:600;padding-bottom:4px;">De</div>
            <div style="font-size:14px;color:#ffffff;font-weight:500;">${escapeHtml(name)}</div>
            ${email ? `<div style="font-size:13px;"><a href="mailto:${escapeHtml(email)}" style="color:#00c1f4;">${escapeHtml(email)}</a></div>` : `<div style="font-size:12px;color:#8888aa;font-style:italic;">Sin email</div>`}
            ${company ? `<div style="font-size:13px;color:#b0b0cc;padding-top:4px;">${escapeHtml(company)}</div>` : ""}
            ${rating ? `<div style="font-size:13px;color:#00c1f4;padding-top:6px;font-weight:500;">${stars} ${rating}/5</div>` : ""}
          </td></tr>
          <tr><td style="padding:0 18px;"><div style="height:1px;background:rgba(255,255,255,0.04);">&nbsp;</div></td></tr>
          <tr><td style="padding:18px;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8888aa;font-weight:600;padding-bottom:6px;">Opinión</div>
            <div style="font-size:14px;line-height:1.6;color:#d0d0e8;white-space:pre-wrap;">${escapeHtml(opinion)}</div>
          </td></tr>
        </table>
      </td></tr>
      <tr><td align="center" style="padding:28px 0 0 0;">
        <div style="font-size:11px;color:#6a6a8a;">
          Recibido en nodotech.dev · ${new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

  // Run email + DB insert in parallel. If at least one succeeds we accept the feedback.
  const supabase = getSupabaseAdmin();

  const [mailResult, dbResult] = await Promise.allSettled([
    resend
      ? resend.emails.send({
          from: FROM,
          to: SOCIAL_LINKS.email,
          ...(email ? { replyTo: email } : {}),
          subject,
          html,
          text,
        })
      : Promise.reject(new Error("Resend not configured")),
    supabase
      ? supabase.from("feedbacks").insert({
          name,
          email: email || null,
          company: company || null,
          opinion,
          rating,
          user_agent: userAgent,
        })
      : Promise.reject(new Error("Supabase not configured")),
  ]);

  const mailOk =
    mailResult.status === "fulfilled" &&
    !(mailResult.value as { error?: unknown } | undefined)?.error;
  const dbOk =
    dbResult.status === "fulfilled" &&
    !(dbResult.value as { error?: unknown } | undefined)?.error;

  if (mailResult.status === "rejected") {
    console.error("[feedback] email failed:", mailResult.reason);
  } else if ((mailResult.value as { error?: unknown } | undefined)?.error) {
    console.error("[feedback] Resend error:", (mailResult.value as { error: unknown }).error);
  }
  if (dbResult.status === "rejected") {
    console.error("[feedback] supabase failed:", dbResult.reason);
  } else if ((dbResult.value as { error?: unknown } | undefined)?.error) {
    console.error("[feedback] supabase error:", (dbResult.value as { error: unknown }).error);
  }

  if (!mailOk && !dbOk) {
    return NextResponse.json(
      { error: "Could not process feedback. Please try again or WhatsApp us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, persisted: dbOk, emailed: mailOk });
}
