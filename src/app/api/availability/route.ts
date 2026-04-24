import { NextResponse } from "next/server";
import { getOwnerCalendar, BOOKING_CONFIG } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Slot {
  startIso: string;
  endIso: string;
  label: string;
}

// Weekly availability (host timezone). 0 = Sunday, 6 = Saturday.
// Adjust here or via env later.
const WEEKLY_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null,
  1: { start: 10, end: 18 },
  2: { start: 10, end: 18 },
  3: { start: 10, end: 18 },
  4: { start: 10, end: 18 },
  5: { start: 10, end: 18 },
  6: null,
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatInTz(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
    weekday: "short",
  }).formatToParts(date);
  const obj: Record<string, string> = {};
  parts.forEach((p) => (obj[p.type] = p.value));
  return obj;
}

function dateFromTzParts(dateStr: string, hour: number, minute: number, timeZone: string): Date {
  // dateStr: YYYY-MM-DD interpreted in `timeZone`. Build a Date representing that wall-clock in tz.
  const [y, m, d] = dateStr.split("-").map(Number);
  // Start from UTC guess, then shift by offset
  const utcGuess = Date.UTC(y, m - 1, d, hour, minute, 0);
  const parts = formatInTz(new Date(utcGuess), timeZone);
  const actualH = Number(parts.hour);
  const actualM = Number(parts.minute);
  const diffMin = (hour - actualH) * 60 + (minute - actualM);
  return new Date(utcGuess + diffMin * 60_000);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date"); // YYYY-MM-DD

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "Invalid or missing `date` (YYYY-MM-DD)" }, { status: 400 });
  }

  try {
    const { calendarId, timezone, durationMin, bufferMin } = BOOKING_CONFIG;

    // Determine weekday in host timezone
    const probe = dateFromTzParts(dateStr, 12, 0, timezone);
    const weekdayLabel = formatInTz(probe, timezone).weekday.toLowerCase();
    const weekdayMap: Record<string, number> = {
      sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
    };
    const dow = weekdayMap[weekdayLabel.slice(0, 3)];
    const hours = WEEKLY_HOURS[dow];

    if (!hours) {
      return NextResponse.json({ slots: [], reason: "closed" });
    }

    // Build candidate slots — iterate on whole minutes to avoid float drift
    const candidates: Slot[] = [];
    const step = durationMin + bufferMin;
    const dayStartMin = hours.start * 60;
    const dayEndMin = hours.end * 60;
    for (let totalMin = dayStartMin; totalMin + durationMin <= dayEndMin; totalMin += step) {
      const startH = Math.floor(totalMin / 60);
      const startM = totalMin % 60;
      const endMin = totalMin + durationMin;
      const endH = Math.floor(endMin / 60);
      const endM = endMin % 60;
      const start = dateFromTzParts(dateStr, startH, startM, timezone);
      const end = dateFromTzParts(dateStr, endH, endM, timezone);
      candidates.push({
        startIso: start.toISOString(),
        endIso: end.toISOString(),
        label: `${pad(startH)}:${pad(startM)}`,
      });
    }

    // Filter out past slots (if today)
    const now = Date.now();
    const minStart = now + 4 * 60 * 60 * 1000; // 4h buffer from now

    // Query free/busy for the full day window
    const dayStart = dateFromTzParts(dateStr, 0, 0, timezone);
    const dayEnd = dateFromTzParts(dateStr, 23, 59, timezone);
    const calendar = getOwnerCalendar();
    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        items: [{ id: calendarId }],
        timeZone: timezone,
      },
    });

    const busy = fb.data.calendars?.[calendarId]?.busy ?? [];

    const available = candidates.filter((slot) => {
      const slotStart = new Date(slot.startIso).getTime();
      const slotEnd = new Date(slot.endIso).getTime();
      if (slotStart < minStart) return false;
      return !busy.some((b) => {
        const bStart = new Date(b.start!).getTime();
        const bEnd = new Date(b.end!).getTime();
        return slotStart < bEnd && slotEnd > bStart;
      });
    });

    return NextResponse.json({ slots: available, timezone });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
