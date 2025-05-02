// components/BookingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculatePrice } from "@/lib/calculatePrice";
import BookingCalendar from "@/components/BookingCalendar";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

const generateTimeSlots = () => {
  const slots: string[] = [];
  // From 9:00 AM to 9:00 PM (last start time)
  for (let hour = 9; hour <= 21; hour++) { // 21 = 9 PM in 24h
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? "PM" : "AM";
      slots.push(
        `${formattedHour}:${minute.toString().padStart(2, "0")} ${amPm}`
      );
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("null");
  const [dateTime, setDateTime] = useState("");
  const [songCount, setSongCount] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [busyTimes, setBusyTimes] = useState<{ start: string; end: string }[]>(
    []
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setEstimatedPrice(calculatePrice(service, songCount));
  }, [service, songCount]);

  useEffect(() => {
    if (selectedDate) {
      fetchBusyTimes(selectedDate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [time, modifier] = selectedTime.split(" ");
      // eslint-disable-next-line prefer-const
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

    setLoadingTimes(true);

    try {
      const res = await fetch("/api/calendar/busy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString().split("T")[0] }),
      });

      if (!res.ok) throw new Error("Failed to fetch busy times.");

      const data = await res.json();
      console.log("Busy slots from API:", data);
      setBusyTimes(data);

      filterAvailableTimes(date, data);
    } catch (error) {
      console.error(error);
      setBusyTimes([]); // fallback: assume everything is available
      setAvailableTimeSlots(TIME_SLOTS); // fallback: show all times
    } finally {
      setLoadingTimes(false);
    }
  }

  function filterAvailableTimes(
    date: Date,
    busySlots: { start: string; end: string }[]
  ) {
    const available: string[] = [];
  
    for (const slot of TIME_SLOTS) {
      const [time, modifier] = slot.split(" ");
      // eslint-disable-next-line prefer-const
      let [hours, minutes] = time.split(":").map(Number);
  
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
  
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);
  
      // ====== KEY CHANGE: Dynamic duration + 15min buffer ======
      const sessionMinutes = service === "final" ? songCount * 60 : songCount * 30;
      const totalMinutes = sessionMinutes + 15; // Add 15-minute buffer
      const slotEnd = new Date(slotStart.getTime() + totalMinutes * 60000);
  
      // Check for conflicts (now includes buffer time)
      const overlap = busySlots.some((busy) => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        return slotStart < busyEnd && slotEnd > busyStart;
      });
  
      // Only show non-overlapping future slots
      const now = new Date();
      if (!overlap && slotStart > now) {
        available.push(slot);
      }
    }
  
    setAvailableTimeSlots(available.length > 0 ? available : TIME_SLOTS);
  }


  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!dateTime) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, dateTime, songCount }),
      });
  
      if (res.ok) {
        // Reset form fields
        setName("");
        setEmail("");
        setPhone("");
        setService("null");
        setDateTime("");
        setSongCount(1);
  
        // Create URL with query parameters
        const params = new URLSearchParams({
          name: encodeURIComponent(name),
          email: encodeURIComponent(email),
          phone: encodeURIComponent(phone || ''), // Handle empty phone
          service: service || '',
          songCount: songCount.toString(),
          dateTime: encodeURIComponent(dateTime)
        });
        
        console.log('Redirecting with params:', params.toString());
        router.push(`/success?${params.toString()}`);
      }else {
        const errorData = await res.json();
        alert(errorData.error || "Booking failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            {songCount <= 1 ? (
              <>$30 for the first song and 25 after that</>
            ) : (
              <>$30 for first song + ${(songCount - 1) * 25} for {songCount - 1} additional song{songCount - 1 !== 1 ? 's' : ''}</>
            )}
            <div className="mt-1">You can pay after the session 😊</div>
          </div>
        </div>
      );
    }
  
    if (service === "final") {
      return (
        <div className="text-right sm:text-lg font-semibold text-green-400">
          Estimated Price: ${estimatedPrice}
          <div className="text-sm mt-2 text-green-500">
            {songCount <= 1 ? (
              <>$45 for the first hour and $40 after that</>
            ) : (
              <>$45 for first hour + ${(songCount - 1) * 40} for {songCount - 1} additional hour{songCount - 1 !== 1 ? 's' : ''}</>
            )}
            <div className="mt-1">You can pay after the session 😊</div>
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800 px-4">
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="bg-zinc-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 mt-20 border border-zinc-700"
        >
          {/* Title */}
          <h1 className="text-center text-3xl font-bold text-white font-serif mb-6">
            Book Your Session
          </h1>

          {/* Name Field */}
          {/* Name Field */}
          <div className="relative">
  <input
    id="name"
    className="peer w-full px-4 py-3 bg-zinc-700 text-white rounded-lg placeholder-transparent
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
      focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200"
    placeholder="Your Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <label
    htmlFor="name"
    className={`absolute left-4 ${
      name ? 'top-0.5 text-xs text-green-400' : 'top-4 text-base text-gray-500'
    } transition-all font-sans peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-green-400`}
  >
    Your Name
  </label>
</div>




{/* Email Field */}
<div className="relative">
  <input
    id="email"
    type="email"
    className="peer w-full px-4 py-3 bg-zinc-700 text-white rounded-lg placeholder-transparent
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
      focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <label
    htmlFor="email"
    className={`absolute left-4 ${
      email ? 'top-0.5 text-xs text-green-400' : 'top-4 text-base text-gray-500'
    } transition-all font-sans peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-green-400`}
  >
    Email
  </label>
</div>

<div className="relative">
  <input
    id="phone"
    type="tel"
    className="peer w-full px-4 py-3 bg-zinc-700 text-white rounded-lg placeholder-transparent
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
      focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required
  />
  <label
    htmlFor="phone"
    className={`absolute left-4 ${
      phone ? 'top-0.5 text-xs text-green-400' : 'top-4 text-base text-gray-500'
    } transition-all font-sans peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-green-400`}
  >
    Phone Number
  </label>
</div>


{/* Service Selection */}
<div className="relative">
  <select
    id="service"
    className="peer w-full px-4 py-3 bg-zinc-700 text-white rounded-lg placeholder-transparent
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
      focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300"
    value={service}
    onChange={(e) => {
      setService(e.target.value);
      // Reset song count to 1 when changing service type
      setSongCount(1);
    }}
  >
    <option value="null">Pick a service</option>
    <option value="demo">Demo</option>
    <option value="final">Final Vocal Recording</option>
  </select>
</div>

{/* Number of Songs - Show for both demo and final */}
{(service === "demo" || service === "final") && (
  <div className="relative flex flex-col gap-2">
    <span className="text-white text-md mb-2">
      {service === "demo" 
        ? "Enter the number of demo songs"
        : "Enter the number of songs for final recording"}
    </span>

    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setSongCount((prev) => Math.max(1, prev - 1))}
        className="px-3 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition"
      >
        −
      </button>
      <input
        id="songCount"
        type="number"
        min={1}
        max={service === "demo" ? 10 : 5} // Different max for demo vs final
        className="peer w-24 text-center px-4 py-3 bg-zinc-700 text-white rounded-lg placeholder-transparent
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
          focus:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300"
        value={songCount}
        onChange={(e) => {
          const max = service === "demo" ? 10 : 5;
          const value = Math.min(max, Math.max(1, parseInt(e.target.value) || 1));
          setSongCount(value);
        }}
        placeholder="Number of songs"
        required
      />
      <button
        type="button"
        onClick={() => {
          const max = service === "demo" ? 10 : 5;
          setSongCount((prev) => Math.min(max, prev + 1));
        }}
        className="px-3 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 transition"
      >
        +
      </button>
    </div>
    {service === "final" && (
      <p className="text-sm text-zinc-400 mt-1">
        Note: Each song typically requires 1 hour for final recording
      </p>
    )}
  </div>
)}



          {/* Booking Calendar */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-3 font-serif">
              Pick a Date
            </h2>
            
            <BookingCalendar onSelectDate={handleDateSelection} selectedDate={selectedDate} />
          </div>

{/* Time and Date Spinner */}
{loadingTimes ? (
  <div className="flex justify-center items-center mt-4">
    <svg
      className="animate-spin h-6 w-6 text-green-500 py-1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span> Loading available times...</span>
  </div>
) : (
  selectedDate && (
    <div className="my-6">
      <h3 className="text-xl text-white mb-4 font-serif">Pick a Time</h3>
      {availableTimeSlots.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {availableTimeSlots.map((time) => (
             <button
             key={time}
             onClick={() => handleTimeSelection(time)}
             type="button"
             className={`cursor-pointer w-full px-4 py-3 rounded-lg text-white bg-zinc-700 transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-zinc-800
               active:ring-2 active:ring-green-400 active:ring-offset-2 active:ring-offset-zinc-800
               active:shadow-[0_0_15px_rgba(34,197,94,0.6)]
               ${selectedTime === time
                ? "ring-2 ring-green-400 ring-offset-2 ring-offset-zinc-800 shadow-[0_0_25px_rgba(34,197,94,0.8)] animate-pulse-glow"
                : ""}`}
           >
             {time}
           </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 font-sans">No available times for this day.</p>
      )}
    </div>
  )
)}




{selectedDate && selectedTime && (
  <div className="mt-4 text-center text-green-400">
    You selected: {selectedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
  </div>
)}


          {/* Price Estimation */}
          {renderPrice()}

          {/* Submit Button */}
          <button
  type="submit"
  disabled={isSubmitting}
  className={`cursor-pointer w-full bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-black font-bold py-3 rounded-xl
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : "animate-customPulse"}
  `}
>
  {isSubmitting ? (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 mr-2 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      Loading...
    </div>
  ) : (
    "Book Now"
  )}
</button>

        </motion.form>
      </div>
    </>
  );
}
