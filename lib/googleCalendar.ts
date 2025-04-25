import { google } from "googleapis";
import { formatISO } from "date-fns";
import path from "path";
import { readFileSync } from "fs";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const calendarId = process.env.GOOGLE_CALENDAR_ID!;
console.log("Using calendar ID:", calendarId);

const keyPath = path.join(process.cwd(), "service-account.json");
const keyFile = JSON.parse(readFileSync(keyPath, "utf-8"));

const auth = new google.auth.GoogleAuth({
  credentials: keyFile,
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
  const client = await auth.getClient();
  const calendar = google.calendar({ version: "v3", auth: client });

  const eventStartTime = new Date(dateTime);
  const eventEndTime = new Date(new Date(dateTime).getTime() + 60 * 60 * 1000); // 1 hour session

  const event = {
    summary: `${service === "final" ? "Final Vocal Recording" : "Demo"} - ${name}`,
    description: `Booked by ${name} (${email})`,
    start: {
      dateTime: formatISO(eventStartTime),
      timeZone: "America/Edmonton", // adjust for Calgary
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
