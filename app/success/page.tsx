// app/success/page.tsx
"use client";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const duration = 10 * 1000; // 10 seconds of raining
    const end = Date.now() + duration;

    const interval = setInterval(function () {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 450); // shoots every 250ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed! ✅</h1>
      <p className="text-lg">
        Thank you for booking with Bethany Recording Studio!<br />
        Check your spam email for confirmation
      </p>

      <div className="text-4xl mt-6 animate-bounce">
      (｡◕‿◕｡)  🎶✨
      </div>

      <p className="mt-2 mb-2 animate-pulse text-purple-300 text-xl">
        I am excited to see you! 🎤🎧
      </p>
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
