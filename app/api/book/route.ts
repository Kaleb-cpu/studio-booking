// app/api/book/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, service, dateTime } = await req.json();

  console.log("📆 Booking received:", { name, email, service, dateTime });

  // TODO: Add to DB, Google Calendar, email notification

  return NextResponse.json({ message: "Booking received" }, { status: 200 });
}
