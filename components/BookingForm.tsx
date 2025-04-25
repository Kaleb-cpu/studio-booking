// components/BookingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculatePrice } from "@/lib/calculatePrice";
import NavBar from "./NavBar";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("null");
  const [dateTime, setDateTime] = useState("");
  const [songCount, setSongCount] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setEstimatedPrice(calculatePrice(service, songCount));
  }, [service, songCount]);

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
      setService("null");
      setDateTime("");
      setSongCount(1);
      router.push("/success");
    } else {
      alert("Something went wrong.");
    }
  };

  // Calculate the price for demo or final
  const renderPrice = () => {
    if (service === "null") {
      return (
        <div className="text-right sm:text-lg font-semibold text-green-400">
          Estimated Price: $0
        </div>
      );
    }

    if (service === "demo") {
      return (
        <div className="text-right sm:text-lg font-semibold text-green-400">
          Estimated Price: ${estimatedPrice}
          <div className="text-sm mt-2 text-green-500">
            You can make your payments after the session 😊
          </div>
        </div>
      );
    }

    if (service === "final") {
      return (
        <div className="text-right sm:text-lg font-semibold text-red-400">
          The first hour is $45, and each additional hour is $40.
        </div>
      );
    }

    return null;
  };

  return (
    <>
    <NavBar />
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
          <option value="null">Pick a service</option>
          <option value="demo">Demo</option>
          <option value="final">Final Vocal Recording</option>
        </select>
      </div>

      {/* Number of Songs or Hours */}
      {service !== "final" && (
        <div>
          <label htmlFor="songCount" className="block text-white">
            {service === "final" ? "Number of Hours" : "Number of Songs"}
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
      )}

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
        <div className="text-sm text-zinc-400 mt-1">
          Format: YYYY-MM-DD HH:MM
        </div>
      </div>

      {/* Price Estimation */}
      {renderPrice()}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-black font-bold py-2 rounded-md"
        >
        Book Now
      </button>
    </form>
        </>
  );
}
