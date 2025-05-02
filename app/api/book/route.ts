import { NextRequest, NextResponse } from "next/server";
import { addEventToCalendar } from "@/lib/googleCalendar";
import { sendEmailNotification } from "@/lib/sendEmailNotification";

export async function POST(req: NextRequest) {
  try {
    // Add songCount to the destructured request body
    const { name, email, phone, service, dateTime, songCount } = await req.json();

    // Pass songCount to both functions
    await addEventToCalendar({ name, email, phone, service, dateTime, songCount });
    await sendEmailNotification({ name, email, phone, service, dateTime, songCount });

    const res = NextResponse.json({ message: "Booking added to calendar." });
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Calendar Error:", error);

    const res = NextResponse.json(
      { error: error.message || "Failed to add to calendar" },
      { status: 400 }
    );
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