// components/BookingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculatePrice } from "@/lib/calculatePrice";
import BookingCalendar from "@/components/BookingCalendar";
import NavBar from "./NavBar";

const TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "09:00 PM",
];

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("null");
  const [dateTime, setDateTime] = useState("");
  const [songCount, setSongCount] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [busyTimes, setBusyTimes] = useState<{ start: string; end: string }[]>([]);
const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const router = useRouter();


  useEffect(() => {
    setEstimatedPrice(calculatePrice(service, songCount));
  }, [service, songCount]);

  useEffect(() => {
    if (selectedDate) {
      fetchBusyTimes(selectedDate);
    }
  }, [selectedDate]);
  
  
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [time, modifier] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      const combined = new Date(selectedDate);
      combined.setHours(hours);
      combined.setMinutes(minutes);
      combined.setSeconds(0);
      combined.setMilliseconds(0);

      setDateTime(combined.toISOString());
    }
  }, [selectedDate, selectedTime]);

  async function fetchBusyTimes(date: Date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date selected!");
      return;
    }
    
    try {
      const res = await fetch("/api/calendar/busy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString().split('T')[0] }),
      });
      
      if (!res.ok) throw new Error('Failed to fetch busy times.');
      
      const data = await res.json();
      console.log("Busy slots from API:", data);
      setBusyTimes(data);
  
      filterAvailableTimes(date, data);
    } catch (error) {
      console.error(error);
      setBusyTimes([]); // fallback: assume everything is available
      setAvailableTimeSlots(TIME_SLOTS); // fallback: show all times
    }
  }
  

  function filterAvailableTimes(date: Date, busySlots: { start: string; end: string }[]) {
    const available: string[] = [];
  
    for (const slot of TIME_SLOTS) {
      const [time, modifier] = slot.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
  
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
  
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);
  
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(slotStart.getHours() + 1); // 1 hour sessions
      console.log("Checking slot:", slotStart.toISOString(), "against busy", busySlots);

      const overlap = busySlots.some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
  
      const now = new Date();
  
      if (!overlap && slotStart > now) {
        available.push(slot);
      }
    }
  
    setAvailableTimeSlots(available);
  }
  
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date); 
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // e.g., "2025-04-29"
      const finalDateTime = `${formattedDate}T${time}:00`; // e.g., "2025-04-29T10:00:00"
      setDateTime(finalDateTime);
    }
  };
  
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateTime) {
      return;
    }
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service, dateTime, songCount }),
    });

    const data = await res.json();

    if (res.ok) {
      setName("");
      setEmail("");
      setService("null");
      setDateTime("");
      setSongCount(1);
      router.push("/success");
    } else {
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
<div>
      <h2 className="text-xl font-bold mb-4">Pick a Date</h2>
      <BookingCalendar onSelectDate={handleDateSelection} />

      
      {selectedDate && (
  <div className="my-6">
    <h3 className="text-xl mb-2">Pick a Time</h3>
    {availableTimeSlots.length > 0 ? (
      <div className="grid grid-cols-3 gap-4">
        {availableTimeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelection(time)}
            className={`p-2 rounded ${
              selectedTime === time
                ? "bg-green-400 text-black"
                : "bg-gray-600 hover:bg-green-800"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    ) : (
      <p className="text-gray-400">No available times for this day.</p>
    )}
  </div>
)}

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
