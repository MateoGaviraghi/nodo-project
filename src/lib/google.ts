import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.events.freebusy",
];

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

let warnedMissingHost = false;
function assertHostEmail() {
  if (!process.env.BOOKING_HOST_EMAIL && !warnedMissingHost) {
    warnedMissingHost = true;
    console.warn(
      "[booking] BOOKING_HOST_EMAIL is not set. Events will be created without an explicit organizer attendee — the booker will not see the host in the invite.",
    );
  }
}

export function getOAuthClient() {
  return new google.auth.OAuth2(
    requireEnv("GOOGLE_CLIENT_ID"),
    requireEnv("GOOGLE_CLIENT_SECRET"),
    requireEnv("GOOGLE_REDIRECT_URI"),
  );
}

export function getAuthUrl() {
  return getOAuthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    include_granted_scopes: true,
  });
}

export function getOwnerCalendar() {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error(
      "GOOGLE_REFRESH_TOKEN not set. Visit /api/google/auth once to complete initial authorization.",
    );
  }
  assertHostEmail();
  const oauth = getOAuthClient();
  oauth.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth });
}

export const BOOKING_CONFIG = {
  calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
  hostEmail: process.env.BOOKING_HOST_EMAIL || "",
  hostName: process.env.BOOKING_HOST_NAME || "Nodo",
  timezone: process.env.BOOKING_HOST_TIMEZONE || "America/Argentina/Buenos_Aires",
  durationMin: Number(process.env.BOOKING_DURATION_MIN || 30),
  bufferMin: Number(process.env.BOOKING_BUFFER_MIN || 15),
  windowDays: Number(process.env.BOOKING_WINDOW_DAYS || 30),
};
