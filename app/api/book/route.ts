import { NextRequest, NextResponse } from "next/server";
import { addEventToCalendar } from "@/lib/googleCalendar";
import { sendEmailNotification } from "@/lib/sendEmailNotification";

export async function POST(req: NextRequest) {
  const { name, email, service, dateTime } = await req.json();

  try {
    await addEventToCalendar({ name, email, service, dateTime });
    await sendEmailNotification({ name, email, service, dateTime });
    const res = NextResponse.json({ message: "Booking added to calendar." }, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  } catch (error) {
    console.error("Calendar Error:", error);
    return NextResponse.json({ error: "Failed to add to calendar" }, { status: 500 });
  }
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
