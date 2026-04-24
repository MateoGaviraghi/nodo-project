import { NextResponse } from "next/server";
import { getOwnerCalendar, BOOKING_CONFIG } from "@/lib/google";
import { SOCIAL_LINKS } from "@/lib/constants";
import { sendBookingConfirmation } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookBody {
  name: string;
  email: string;
  whatsapp?: string;
  topic?: string;
  startIso: string;
  endIso: string;
  timezoneGuest?: string;
  language?: "es" | "en";
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

/** Google Calendar "Add to calendar" template URL — universal, no login needed */
function buildAddToCalendarUrl(args: {
  title: string;
  description: string;
  startIso: string;
  endIso: string;
  location: string;
  hostEmail?: string;
}) {
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: args.title,
    dates: `${fmt(args.startIso)}/${fmt(args.endIso)}`,
    details: args.description,
    location: args.location,
  });
  if (args.hostEmail) params.set("add", args.hostEmail);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Prefilled WhatsApp chat URL (client → Nodo) */
function buildWaShareUrl(args: {
  name: string;
  dateLabel: string;
  timeLabel: string;
  topic: string;
  language: "es" | "en";
}) {
  const number = SOCIAL_LINKS.whatsapp.match(/\d+/g)?.join("") || "";
  const msg =
    args.language === "en"
      ? `Hi! I just booked a call with Nodo.\n\n📅 ${args.dateLabel}\n🕐 ${args.timeLabel}\n📝 Topic: ${args.topic}\n\nSee you then 👋\n— ${args.name}`
      : `¡Hola! Acabo de agendar una videollamada con Nodo.\n\n📅 ${args.dateLabel}\n🕐 ${args.timeLabel}\n📝 Tema: ${args.topic}\n\n¡Nos vemos! 👋\n— ${args.name}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

/** Branded event description — what the client sees in the Gcal email */
function buildEventDescription(args: {
  name: string;
  dateLabel: string;
  timeLabel: string;
  duration: number;
  timezoneLabel: string;
  topic: string;
  language: "es" | "en";
}) {
  if (args.language === "en") {
    return [
      `Hi ${args.name},`,
      ``,
      `Your video call with Nodo is confirmed. Here are the details:`,
      ``,
      `📅 ${args.dateLabel}`,
      `🕐 ${args.timeLabel} · ${args.duration} min · ${args.timezoneLabel}`,
      `🎥 Google Meet link is attached above`,
      ``,
      `What we'll cover:`,
      args.topic,
      ``,
      `To make the most of this call:`,
      `• Have examples or references on hand if you have any`,
      `• You don't need to prepare anything — we want to listen`,
      `• If the time doesn't work, please let us know at least 24h in advance`,
      ``,
      `Questions before we meet? WhatsApp us:`,
      `→ ${SOCIAL_LINKS.whatsapp}`,
      ``,
      `See you then,`,
      `Mateo + Justo · Nodo`,
      `nodotech.dev`,
    ].join("\n");
  }
  return [
    `Hola ${args.name},`,
    ``,
    `Tu videollamada con Nodo quedó confirmada. Estos son los detalles:`,
    ``,
    `📅 ${args.dateLabel}`,
    `🕐 ${args.timeLabel} · ${args.duration} min · ${args.timezoneLabel}`,
    `🎥 El link de Google Meet está arriba en este evento`,
    ``,
    `Qué vamos a ver:`,
    args.topic,
    ``,
    `Para aprovechar mejor la llamada:`,
    `• Tené a mano ejemplos o referencias si los tenés`,
    `• No necesitás preparar nada — queremos escucharte`,
    `• Si se te complica el horario, avisanos con 24hs de anticipación`,
    ``,
    `¿Preguntas antes? Escribinos por WhatsApp:`,
    `→ ${SOCIAL_LINKS.whatsapp}`,
    ``,
    `Nos vemos,`,
    `Mateo + Justo · Nodo`,
    `nodotech.dev`,
  ].join("\n");
}

function formatLabels(startIso: string, endIso: string, language: "es" | "en", timezone: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const locale = language === "en" ? "en-US" : "es-AR";
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(start);
  const timeFmt = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  });
  const timeLabel = `${timeFmt.format(start)} – ${timeFmt.format(end)}`;
  return { dateLabel, timeLabel };
}

export async function POST(request: Request) {
  let body: BookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, whatsapp, topic: rawTopic, startIso, endIso, timezoneGuest, language } = body;
  const topic = (rawTopic || "").trim();

  if (!name || !email || !startIso || !endIso) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (name.length > 120 || topic.length > 800) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const start = new Date(startIso);
  const end = new Date(endIso);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return NextResponse.json({ error: "Invalid time window" }, { status: 400 });
  }
  if (start.getTime() < Date.now()) {
    return NextResponse.json({ error: "Slot is in the past" }, { status: 400 });
  }

  const lang: "es" | "en" = language === "en" ? "en" : "es";

  try {
    const { calendarId, timezone, hostEmail, hostName, durationMin } = BOOKING_CONFIG;
    const calendar = getOwnerCalendar();

    // Re-check free/busy to prevent race with concurrent bookings
    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        items: [{ id: calendarId }],
        timeZone: timezone,
      },
    });
    const busy = fb.data.calendars?.[calendarId]?.busy ?? [];
    if (busy.length > 0) {
      return NextResponse.json(
        { error: "Slot just got taken. Pick another one." },
        { status: 409 },
      );
    }

    const { dateLabel, timeLabel } = formatLabels(start.toISOString(), end.toISOString(), lang, timezone);
    const tzLabel = lang === "en" ? "Argentina time (GMT-3)" : "Horario de Argentina (GMT-3)";

    const topicForDisplay =
      topic ||
      (lang === "en"
        ? "An exploratory call about your idea or project."
        : "Una charla exploratoria sobre tu idea o proyecto.");

    const summary = `Nodo · ${lang === "en" ? "Call with" : "Llamada con"} ${name}`;
    const description = buildEventDescription({
      name,
      dateLabel,
      timeLabel,
      duration: durationMin,
      timezoneLabel: tzLabel,
      topic: topicForDisplay,
      language: lang,
    });

    const internalNote = [
      `── Internal ──`,
      `Guest: ${name} <${email}>`,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      timezoneGuest ? `Guest TZ: ${timezoneGuest}` : null,
      topic ? null : `(Guest did not fill the topic field)`,
      `Booked via nodotech.dev`,
    ].filter(Boolean).join("\n");

    const requestId = `nodo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const res = await calendar.events.insert({
      calendarId,
      sendUpdates: "all",
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description: `${description}\n\n${internalNote}`,
        start: { dateTime: start.toISOString(), timeZone: timezone },
        end: { dateTime: end.toISOString(), timeZone: timezone },
        attendees: [
          { email, displayName: name, responseStatus: "accepted" },
          ...(hostEmail
            ? [{ email: hostEmail, displayName: hostName, organizer: true, responseStatus: "accepted" }]
            : []),
        ],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 10 },
          ],
        },
        guestsCanInviteOthers: false,
        guestsCanModify: false,
      },
    });

    const meetLink =
      res.data.hangoutLink ||
      res.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ||
      null;

    // Build guest-facing add-to-calendar URL (universal, no login)
    const addToCalendarUrl = buildAddToCalendarUrl({
      title: summary,
      description: description + (meetLink ? `\n\n🎥 Google Meet: ${meetLink}` : ""),
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      location: meetLink || "Google Meet",
      hostEmail,
    });

    // Prefilled WhatsApp chat URL to Nodo
    const waShareUrl = buildWaShareUrl({
      name,
      dateLabel,
      timeLabel,
      topic: topicForDisplay,
      language: lang,
    });

    // ICS download URL (self-contained, no auth)
    const icsParams = new URLSearchParams({
      start: start.toISOString(),
      end: end.toISOString(),
      title: summary,
      description: description + (meetLink ? `\n\nGoogle Meet: ${meetLink}` : ""),
      location: meetLink || "Google Meet",
      organizerEmail: hostEmail || "",
      organizerName: hostName,
      attendeeEmail: email,
      attendeeName: name,
      uid: res.data.id || requestId,
    });
    const icsUrl = `/api/book/ics?${icsParams.toString()}`;

    // Fire-and-forget branded confirmation email (does not block response)
    const origin = request.headers.get("origin") || new URL(request.url).origin;
    void sendBookingConfirmation(
      {
        name,
        email,
        dateLabel,
        timeLabel,
        timezoneLabel: tzLabel,
        meetLink,
        htmlLink: res.data.htmlLink,
        icsUrl,
        waShareUrl,
        topic: topicForDisplay,
        language: lang,
      },
      origin,
    );

    return NextResponse.json({
      ok: true,
      eventId: res.data.id,
      htmlLink: res.data.htmlLink,
      meetLink,
      addToCalendarUrl,
      icsUrl,
      waShareUrl,
      dateLabel,
      timeLabel,
      timezoneLabel: tzLabel,
      startIso: start.toISOString(),
      endIso: end.toISOString(),
      timezoneHost: timezone,
      timezoneGuest: timezoneGuest || null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[book] failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
