import { Resend } from "resend";
import { SOCIAL_LINKS } from "@/lib/constants";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM || "Nodo <hola@nodotech.dev>";
const SITE_URL = "https://nodotech.dev";
const LOGO_URL = `${SITE_URL}/logos/logo-n.png`;

const BRAND = {
  black: "#0a0a0a",
  cardInner: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(255,255,255,0.06)",
  white: "#ffffff",
  gray100: "#d0d0e8",
  gray300: "#b0b0cc",
  gray400: "#8888aa",
  gray500: "#6a6a8a",
  gray700: "#2a2a4a",
  blue: "#2785fe",
  cyan: "#00c1f4",
  purple: "#8b2fef",
  indigo: "#5863f2",
  gradientFull: "linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)",
};

export interface BookingEmailData {
  name: string;
  email: string;
  dateLabel: string;
  timeLabel: string;
  timezoneLabel: string;
  meetLink: string | null;
  htmlLink?: string | null;
  icsUrl: string;
  waShareUrl: string;
  topic: string;
  language: "es" | "en";
}

function copy(lang: "es" | "en") {
  if (lang === "en") {
    return {
      subject: (n: string) => `See you soon, ${n}! · Nodo video call confirmed`,
      preheader: (d: string, t: string) => `Your call with Nodo is booked for ${d} · ${t}`,
      eyebrow: "Booking confirmed",
      headline: (n: string) => `See you soon, ${n}!`,
      intro:
        "Your video call with Nodo is confirmed. We're glad we'll make time to talk about your idea — here are all the details.",
      whenLabel: "DATE & TIME",
      meetLabel: "GOOGLE MEET",
      joinCta: "Join the Meet",
      addToCal: "Add to calendar",
      whatsapp: "WhatsApp us",
      topicLabel: "What we'll cover",
      tipsLabel: "To make the most of this call",
      tips: [
        "Have any examples or references handy if you have them",
        "You don't need to prepare anything — we want to listen",
        "If the time doesn't work, let us know at least 24h in advance",
      ],
      questions: "Any questions before the call? Reach us on WhatsApp anytime.",
      signOff: "See you soon,",
      signature: "Mateo + Justo · Nodo",
      footerTagline: "Turning ideas into software.",
      footerCopy: "You're getting this because you booked a call at nodotech.dev.",
      rights: "All rights reserved.",
    };
  }
  return {
    subject: (n: string) => `¡Nos vemos, ${n}! · Videollamada con Nodo confirmada`,
    preheader: (d: string, t: string) => `Tu llamada con Nodo quedó agendada para el ${d} · ${t}`,
    eyebrow: "Reserva confirmada",
    headline: (n: string) => `¡Nos vemos pronto, ${n}!`,
    intro:
      "Tu videollamada con Nodo quedó confirmada. Qué bueno que nos hagamos un rato para charlar tu idea — acá tenés todos los detalles.",
    whenLabel: "FECHA Y HORA",
    meetLabel: "GOOGLE MEET",
    joinCta: "Unirme al Meet",
    addToCal: "Agregar al calendario",
    whatsapp: "Escribinos por WhatsApp",
    topicLabel: "Qué vamos a ver",
    tipsLabel: "Para aprovechar mejor la llamada",
    tips: [
      "Tené a mano ejemplos o referencias si los tenés",
      "No necesitás preparar nada — queremos escucharte",
      "Si se te complica el horario, avisanos con 24hs de anticipación",
    ],
    questions: "¿Alguna duda antes de la llamada? Escribinos por WhatsApp cuando quieras.",
    signOff: "Nos vemos,",
    signature: "Mateo + Justo · Nodo",
    footerTagline: "Transformamos ideas en software.",
    footerCopy: "Recibís este correo porque agendaste una llamada en nodotech.dev.",
    rights: "Todos los derechos reservados.",
  };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(data: BookingEmailData, icsAbsoluteUrl: string): { html: string; subject: string; text: string } {
  const t = copy(data.language);
  const firstName = data.name.split(" ")[0] || data.name;
  const subject = t.subject(firstName);
  const year = new Date().getFullYear();
  const meetHost = data.meetLink?.replace(/^https?:\/\//, "") || "";

  const text = [
    t.headline(firstName),
    "",
    t.intro,
    "",
    `${t.whenLabel}: ${data.dateLabel} · ${data.timeLabel} · ${data.timezoneLabel}`,
    data.meetLink ? `${t.meetLabel}: ${data.meetLink}` : "",
    "",
    `${t.topicLabel}:`,
    data.topic,
    "",
    `${t.tipsLabel}:`,
    ...t.tips.map((tip) => `• ${tip}`),
    "",
    t.questions,
    `→ ${SOCIAL_LINKS.whatsapp}`,
    "",
    t.signOff,
    t.signature,
    SITE_URL,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="${data.language}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>${escapeHtml(subject)}</title>
<!--[if mso]>
<style type="text/css">table,td,div,p,a {font-family: Arial, Helvetica, sans-serif !important;}</style>
<![endif]-->
<style>
  @media (prefers-color-scheme: light) {
    .force-dark-bg { background-color: ${BRAND.black} !important; }
    .force-dark-card { background-color: ${BRAND.black} !important; }
    .force-light-text { color: ${BRAND.white} !important; }
    .force-gray-text { color: ${BRAND.gray300} !important; }
  }
  a { text-decoration: none; }
  .btn:hover { opacity: 0.92 !important; }
</style>
</head>
<body class="force-dark-bg" style="margin:0;padding:0;background-color:${BRAND.black};color:${BRAND.white};font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;line-height:0;font-size:0;">${escapeHtml(t.preheader(data.dateLabel, data.timeLabel))}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="force-dark-bg" style="background-color:${BRAND.black};">
  <tr>
    <td align="center" style="padding:32px 16px 48px 16px;">

      <!-- Content wrapper (no card bg — brand-unified) -->
      <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" width="920" style="max-width:920px;width:100%;margin:0 auto;">

        <!-- Gradient accent top -->
        <tr>
          <td align="center" style="padding:0 0 36px 0;">
            <div style="width:80px;height:3px;border-radius:2px;background:${BRAND.gradientFull};line-height:3px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Header / Logo -->
        <tr>
          <td align="center" style="padding:0 40px 8px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:12px;">
                  <img src="${LOGO_URL}" alt="Nodo" width="44" height="44" style="display:block;border:0;outline:none;text-decoration:none;width:44px;height:44px;" />
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:13px;letter-spacing:0.32em;color:${BRAND.gray400};text-transform:uppercase;font-weight:600;">
                  NODO
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Eyebrow -->
        <tr>
          <td align="center" style="padding:28px 40px 0 40px;">
            <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(0,193,244,0.08);border:1px solid rgba(0,193,244,0.2);color:${BRAND.cyan};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;">
              ${escapeHtml(t.eyebrow)}
            </span>
          </td>
        </tr>

        <!-- Headline -->
        <tr>
          <td align="center" style="padding:18px 40px 0 40px;">
            <h1 class="force-light-text" style="margin:0;font-size:28px;line-height:1.2;font-weight:700;color:${BRAND.white};letter-spacing:-0.01em;">
              ${escapeHtml(t.headline(firstName))}
            </h1>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td align="center" style="padding:14px 40px 0 40px;">
            <p class="force-gray-text" style="margin:0;font-size:15px;line-height:1.6;color:${BRAND.gray300};max-width:460px;">
              ${escapeHtml(t.intro)}
            </p>
          </td>
        </tr>

        <!-- Info card -->
        <tr>
          <td style="padding:28px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;">
              <!-- Date row -->
              <tr>
                <td style="padding:18px 18px 14px 18px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td width="44" valign="top" style="width:44px;">
                        <div style="width:40px;height:40px;border-radius:8px;background:${BRAND.gradientFull};text-align:center;line-height:40px;font-size:18px;">📅</div>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.gray400};font-weight:600;padding-bottom:2px;">${escapeHtml(t.whenLabel)}</div>
                        <div class="force-light-text" style="font-size:15px;color:${BRAND.white};font-weight:600;line-height:1.3;">${escapeHtml(data.dateLabel)}</div>
                        <div class="force-gray-text" style="font-size:13px;color:${BRAND.gray300};line-height:1.4;padding-top:2px;">${escapeHtml(data.timeLabel)} · ${escapeHtml(data.timezoneLabel)}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${data.meetLink ? `
              <!-- Divider -->
              <tr><td style="padding:0 18px;"><div style="height:1px;background:rgba(255,255,255,0.04);line-height:1px;font-size:0;">&nbsp;</div></td></tr>
              <!-- Meet row -->
              <tr>
                <td style="padding:14px 18px 18px 18px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td width="44" valign="top" style="width:44px;">
                        <div style="width:40px;height:40px;border-radius:8px;background:rgba(39,133,254,0.14);text-align:center;line-height:40px;font-size:18px;">🎥</div>
                      </td>
                      <td valign="middle" style="padding-left:12px;">
                        <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.gray400};font-weight:600;padding-bottom:2px;">${escapeHtml(t.meetLabel)}</div>
                        <a href="${escapeHtml(data.meetLink)}" style="font-size:14px;color:${BRAND.cyan};font-weight:500;line-height:1.4;word-break:break-all;">${escapeHtml(meetHost)}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>` : ""}
            </table>
          </td>
        </tr>

        <!-- Primary CTA -->
        ${data.meetLink ? `
        <tr>
          <td align="center" style="padding:24px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background:${BRAND.gradientFull};border-radius:4px;">
                  <a href="${escapeHtml(data.meetLink)}" class="btn" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:600;color:${BRAND.white};letter-spacing:0.02em;border-radius:4px;">
                    ${escapeHtml(t.joinCta)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : ""}

        <!-- Secondary CTAs -->
        <tr>
          <td align="center" style="padding:12px 40px 0 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:4px 6px;">
                  <a href="${escapeHtml(icsAbsoluteUrl)}" style="display:inline-block;padding:10px 18px;font-size:12px;color:${BRAND.gray100};background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;font-weight:500;">${escapeHtml(t.addToCal)}</a>
                </td>
                <td style="padding:4px 6px;">
                  <a href="${escapeHtml(data.waShareUrl)}" style="display:inline-block;padding:10px 18px;font-size:12px;color:${BRAND.gray100};background:rgba(37,211,102,0.08);border:1px solid rgba(37,211,102,0.2);border-radius:4px;font-weight:500;">${escapeHtml(t.whatsapp)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Topic -->
        <tr>
          <td style="padding:32px 40px 0 40px;">
            <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.gray400};font-weight:600;padding-bottom:10px;">
              ${escapeHtml(t.topicLabel)}
            </div>
            <div class="force-gray-text" style="border-left:2px solid ${BRAND.indigo};padding-left:14px;font-size:14px;line-height:1.6;color:${BRAND.gray100};font-style:italic;">
              ${escapeHtml(data.topic)}
            </div>
          </td>
        </tr>

        <!-- Tips -->
        <tr>
          <td style="padding:28px 40px 0 40px;">
            <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.gray400};font-weight:600;padding-bottom:12px;">
              ${escapeHtml(t.tipsLabel)}
            </div>
            ${t.tips
              .map(
                (tip) => `<div class="force-gray-text" style="font-size:14px;line-height:1.6;color:${BRAND.gray100};padding:4px 0 4px 18px;position:relative;">
                <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:${BRAND.cyan};position:absolute;left:0;top:12px;"></span>
                ${escapeHtml(tip)}
              </div>`,
              )
              .join("")}
          </td>
        </tr>

        <!-- Questions -->
        <tr>
          <td style="padding:28px 40px 0 40px;">
            <p class="force-gray-text" style="margin:0;font-size:14px;line-height:1.6;color:${BRAND.gray300};">
              ${escapeHtml(t.questions)}
              <a href="${escapeHtml(SOCIAL_LINKS.whatsapp)}" style="color:${BRAND.cyan};font-weight:500;">→ WhatsApp</a>
            </p>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:28px 40px 36px 40px;">
            <p class="force-gray-text" style="margin:0;font-size:14px;line-height:1.6;color:${BRAND.gray300};">
              ${escapeHtml(t.signOff)}<br/>
              <span class="force-light-text" style="color:${BRAND.white};font-weight:600;">${escapeHtml(t.signature)}</span>
            </p>
          </td>
        </tr>

        <!-- Footer divider -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px;background:linear-gradient(90deg, transparent 0%, rgba(88,99,242,0.3) 50%, transparent 100%);line-height:1px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:28px 40px 36px 40px;">
            <div class="force-light-text" style="font-size:13px;font-weight:600;color:${BRAND.white};letter-spacing:-0.005em;padding-bottom:6px;">
              ${escapeHtml(t.footerTagline)}
            </div>
            <div style="padding-bottom:18px;">
              <a href="${SITE_URL}" style="font-size:12px;color:${BRAND.cyan};font-weight:500;">nodotech.dev</a>
            </div>
            <div style="padding-bottom:16px;">
              <a href="${escapeHtml(SOCIAL_LINKS.whatsapp)}" style="display:inline-block;padding:0 8px;font-size:12px;color:${BRAND.gray400};">WhatsApp</a>
              <span style="color:${BRAND.gray700};">·</span>
              <a href="${escapeHtml(SOCIAL_LINKS.instagram)}" style="display:inline-block;padding:0 8px;font-size:12px;color:${BRAND.gray400};">Instagram</a>
              <span style="color:${BRAND.gray700};">·</span>
              <a href="mailto:${escapeHtml(SOCIAL_LINKS.email)}" style="display:inline-block;padding:0 8px;font-size:12px;color:${BRAND.gray400};">Email</a>
            </div>
            <div style="font-size:11px;color:${BRAND.gray500};line-height:1.5;max-width:380px;margin:0 auto;">
              ${escapeHtml(t.footerCopy)}<br/>
              © ${year} Nodo · ${escapeHtml(t.rights)}
            </div>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;

  return { html, subject, text };
}

export async function sendBookingConfirmation(data: BookingEmailData, origin: string): Promise<void> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping branded confirmation email");
    return;
  }
  const icsAbsoluteUrl = data.icsUrl.startsWith("http") ? data.icsUrl : `${origin}${data.icsUrl}`;
  const { html, subject, text } = renderEmail(data, icsAbsoluteUrl);

  try {
    const res = await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: SOCIAL_LINKS.email,
      subject,
      html,
      text,
    });
    if (res.error) {
      console.error("[email] Resend error:", res.error);
    }
  } catch (err) {
    console.error("[email] send failed:", err);
  }
}
