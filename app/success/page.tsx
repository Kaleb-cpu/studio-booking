// app/success/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed! ✅</h1>
      <p className="mb-8 text-lg">Thank you for booking with Bethany recording studio! We will see you soon!</p>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/")}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-xl"
        >
          Go Home
        </button>
        <button
          onClick={() => router.push("/book")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
}
