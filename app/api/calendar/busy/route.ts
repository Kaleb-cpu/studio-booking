import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFileSync } from "fs";

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const calendarId = process.env.GOOGLE_CALENDAR_ID!;

let keyFile;
if (process.env.SERVICE_ACCOUNT_JSON) {
  keyFile = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);
} else {
  const keyPath = path.join(process.cwd(), "service-account.json");
  keyFile = JSON.parse(readFileSync(keyPath, "utf-8"));
}

const auth = new JWT({
  email: keyFile.client_email,
  key: keyFile.private_key.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

async function getBusySlotsForDate(date: string) {
  const calendar = google.calendar({ version: "v3", auth });

  // Create Edmonton timezone date boundaries
  const startOfDay = DateTime.fromISO(date, { zone: "America/Edmonton" }).startOf('day').toISO();
  const endOfDay = DateTime.fromISO(date, { zone: "America/Edmonton" })
  .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
  .toISO();




  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: startOfDay,
      timeMax: endOfDay,
      timeZone: "America/Edmonton",
      items: [{ id: calendarId }],
    },
  });

  return res.data.calendars?.[calendarId]?.busy || [];
}


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing `date` query parameter" }, { status: 400 });
  }
  try {
    const busySlots = await getBusySlotsForDate(date);
    return NextResponse.json(busySlots);
  } catch (err) {
    console.error("FreeBusy GET error:", err);
    return NextResponse.json({ error: "Failed to fetch busy times" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: { date?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.date) {
    return NextResponse.json({ error: "Missing `date` in request body" }, { status: 400 });
  }

  if (!body.date || isNaN(Date.parse(body.date))) {
    return NextResponse.json({ error: "Missing or invalid `date` in request body" }, { status: 400 });
  }
  try {
    const busySlots = await getBusySlotsForDate(body.date);
    return NextResponse.json(busySlots);
  } catch (err) {
    console.error("FreeBusy POST error:", err);
    return NextResponse.json({ error: "Failed to fetch busy times" }, { status: 500 });
  }
}
