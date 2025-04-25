// components/BookingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("demo");
  const [dateTime, setDateTime] = useState("");
  const [songCount, setSongCount] = useState(1);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service, dateTime, songCount }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setService("recording");
      setDateTime("");
      router.push("/success");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-6 rounded-2xl shadow-xl w-full max-w-lg space-y-4"
    >
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-white">
          Your Name
        </label>
        <input
          id="name"
          className="w-full px-4 py-2 mt-2 bg-zinc-700 rounded-md text-white"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-white">
          Email
        </label>
        <input
          id="email"
          className="w-full px-4 py-2 mt-2 bg-zinc-700 rounded-md text-white"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-white">
          Select Service
        </label>
        <select
          id="service"
          className="w-full px-4 py-2 mt-2 bg-zinc-700 rounded-md text-white"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="demo">Demo</option>
          <option value="final">Final Vocal Recording</option>
        </select>
      </div>

      {/* number of songs */}
      <div>
        <label htmlFor="songCount" className="block text-white">
          Number of Songs
        </label>
        <input
          id="songCount"
          type="number"
          min={1}
          max={10}
          className="w-full px-4 py-2 mt-2 bg-zinc-700 rounded-md text-white"
          value={songCount}
          onChange={(e) => setSongCount(parseInt(e.target.value))}
          required
        />
      </div>

      {/* Date-Time Input */}
      <div>
        <label htmlFor="dateTime" className="block text-white">
          Select Date and Time of Your Session
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          className="w-full px-4 py-2 mt-2 bg-zinc-700 rounded-md text-white"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
        {/* Add placeholder-like guidance below the input */}
        <div className="text-sm text-zinc-400 mt-1">
          Format: YYYY-MM-DD HH:MM
        </div>
      </div>

      {/* Price Estimation */}
      <div className="text-right text-lg font-semibold text-green-400">
        Estimated Price: ${songCount * (service === "final" ? 40 : 30)}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-black font-bold py-2 rounded-md"
      >
        Book Now
      </button>
    </form>
  );
}
