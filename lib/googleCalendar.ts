import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { formatISO } from "date-fns";
import path from "path";
import { readFileSync } from "fs";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const calendarId = process.env.GOOGLE_CALENDAR_ID!;

let keyFile;

if (process.env.SERVICE_ACCOUNT_JSON) {
  // Running on Netlify — read from env var
  keyFile = JSON.parse(process.env.SERVICE_ACCOUNT_JSON);
} else {
  // Running locally — read from file
  const keyPath = path.join(process.cwd(), "service-account.json");
  keyFile = JSON.parse(readFileSync(keyPath, "utf-8"));
}


// Create JWT auth client
const auth = new JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: SCOPES,
});

export async function addEventToCalendar({
  name,
  email,
  service,
  dateTime,
}: {
  name: string;
  email: string;
  service: string;
  dateTime: string;
}) {
  const calendar = google.calendar({ version: "v3", auth });

  const eventStartTime = new Date(dateTime);
  const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000); // 1 hour

  const event = {
    summary: `${service === "final" ? "Final Vocal Recording" : "Demo"} - ${name}`,
    description: `Booked by ${name} (${email})`,
    start: {
      dateTime: formatISO(eventStartTime),
      timeZone: "America/Edmonton",
    },
    end: {
      dateTime: formatISO(eventEndTime),
      timeZone: "America/Edmonton",
    },
  };

  await calendar.events.insert({
    calendarId,
    requestBody: event,
  });
}
