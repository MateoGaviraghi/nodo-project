import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** ICS per RFC 5545 — folds long lines at 75 octets and escapes commas/semicolons/newlines */
function ics(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function fmt(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function fold(line: string) {
  // ICS lines should not exceed 75 octets; subsequent lines start with a space.
  const max = 73;
  if (line.length <= max) return line;
  const chunks: string[] = [];
  let rest = line;
  chunks.push(rest.slice(0, max));
  rest = rest.slice(max);
  while (rest.length > 0) {
    chunks.push(" " + rest.slice(0, max - 1));
    rest = rest.slice(max - 1);
  }
  return chunks.join("\r\n");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const title = searchParams.get("title") || "Nodo · Video call";
  const description = searchParams.get("description") || "";
  const location = searchParams.get("location") || "Google Meet";
  const organizerEmail = searchParams.get("organizerEmail") || "";
  const organizerName = searchParams.get("organizerName") || "Nodo";
  const attendeeEmail = searchParams.get("attendeeEmail") || "";
  const attendeeName = searchParams.get("attendeeName") || "";
  const uid = searchParams.get("uid") || `${Date.now()}@nodotech.dev`;

  if (!start || !end) {
    return NextResponse.json({ error: "Missing start/end" }, { status: 400 });
  }

  const now = new Date().toISOString();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nodo//nodotech.dev//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ics(uid)}@nodotech.dev`,
    `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${ics(title)}`,
    `DESCRIPTION:${ics(description)}`,
    `LOCATION:${ics(location)}`,
    organizerEmail
      ? `ORGANIZER;CN=${ics(organizerName)}:mailto:${organizerEmail}`
      : "",
    attendeeEmail
      ? `ATTENDEE;CN=${ics(attendeeName)};RSVP=TRUE:mailto:${attendeeEmail}`
      : "",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${ics(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .map(fold)
    .join("\r\n");

  return new NextResponse(lines, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="nodo-meeting.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
