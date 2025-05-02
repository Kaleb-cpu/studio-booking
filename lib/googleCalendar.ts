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
  key: keyFile.private_key.replace(/\\n/g, '\n'), 
  scopes: SCOPES,
});

export async function addEventToCalendar({
  name,
  email,
  phone,
  service,
  dateTime,
  songCount,
}: {
  name: string;
  email: string;
  phone: string;
  service: string;
  dateTime: string;
  songCount: number;
}) {
  const calendar = google.calendar({ version: "v3", auth });
  const timeZone = "America/Edmonton";
  const now = new Date();
  const eventStartTime = new Date(dateTime);

  // Calculate duration based on service type + 15 minute buffer
  const sessionMinutes = service === "final" ? songCount * 60 : songCount * 30;
  const totalMinutes = sessionMinutes + 15;
  const eventEndTime = new Date(eventStartTime.getTime() + totalMinutes * 60000);

  // Basic validation
  if (eventStartTime < now) {
    throw new Error("You cannot book for the past.");
  }

  // Check for existing events in the calculated time slot
  const existingEvents = await calendar.events.list({
    calendarId,
    timeMin: eventStartTime.toISOString(),
    timeMax: eventEndTime.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  if (existingEvents.data.items && existingEvents.data.items.length > 0) {
    throw new Error("This time slot is already booked.");
  }

  // Create event with dynamic duration
  const event = {
    summary: `${service === "final" ? "Final Vocal Recording" : "Demo"} - ${name} (${songCount} ${songCount === 1 ? 'song' : 'songs'})`,
    description: `Booked by ${name} (${email}) (${phone})`,
    start: {
      dateTime: formatISO(eventStartTime),
      timeZone,
    },
    end: {
      dateTime: formatISO(eventEndTime),
      timeZone,
    },
  };

  await calendar.events.insert({
    calendarId,
    requestBody: event,
  });
}