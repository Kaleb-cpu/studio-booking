// components/BookingForm.tsx
"use client";

import { useState } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("recording");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({ name, email, service, dateTime }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Booking confirmed!");
      setName(""); setEmail(""); setService("recording"); setDateTime("");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
      <input
        className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />
      <select
        className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="recording">Recording</option>
        <option value="mixing">Mixing</option>
        <option value="mastering">Mastering</option>
        <option value="combo">Recording + Mixing + Mastering</option>
      </select>
      <input
        type="datetime-local"
        className="w-full px-4 py-2 bg-zinc-700 rounded-md text-white"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />
      <div className="text-right text-lg font-semibold text-green-400">
        Estimated Price: ${service === "combo" ? 250 : 100}
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors text-black font-bold py-2 rounded-md">
        Book Now
      </button>
    </form>
  );
}
