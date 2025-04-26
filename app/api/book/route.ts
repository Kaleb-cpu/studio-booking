import { NextRequest, NextResponse } from "next/server";
import { addEventToCalendar } from "@/lib/googleCalendar";
import { sendEmailNotification } from "@/lib/sendEmailNotification";

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, dateTime } = await req.json();

    await addEventToCalendar({ name, email, service, dateTime });
    await sendEmailNotification({ name, email, service, dateTime });

    const res = NextResponse.json({ message: "Booking added to calendar." });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  } catch (error) {
    console.error("Calendar Error:", error);

    const res = NextResponse.json({ error: "Failed to add to calendar" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  }
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
