// app/success/page.tsx
"use client";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  
  // Safely get all parameters with defaults
  const name = decodeURIComponent(searchParams.get("name") || "");
  const email = decodeURIComponent(searchParams.get("email") || "");
  const phone = decodeURIComponent(searchParams.get("phone") || "");
  const service = searchParams.get("service") || "";
  const songCount = searchParams.get("songCount") || "1";
  const dateTime = decodeURIComponent(searchParams.get("dateTime") || "");

  // Calculate price based on service type
const calculatePrice = () => {
  const count = Number(songCount);
  if (service === "demo") {
    return count <= 1 ? 30 : 30 + (count - 1) * 25; // $30 first song, $25 each additional
  } else if (service === "final") {
    return count <= 1 ? 45 : 45 + (count - 1) * 40; // $45 first hour, $40 each additional
  }
  return 0;
};

  // Calculate duration based on service type
const durationMinutes = service === "final" 
? (Number(songCount) * 60) + 15 // 1 hour per song + 15min buffer
: (Number(songCount) * 30) + 15; // 30min per song + 15min buffer
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationText = `${hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : ''}${
    hours > 0 && minutes > 0 ? ' ' : ''}${
    minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`;

  // Format date and time separately for better display
  const formattedDate = dateTime 
    ? new Date(dateTime).toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : "";
    
  const formattedTime = dateTime 
    ? new Date(dateTime).toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
      })
    : "";

  // Confetti effect (keep your existing implementation)
  useEffect(() => {
    const duration = 100;
    const end = Date.now() + duration;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      requestAnimationFrame(frame);
    };

    frame();

    const interval = setInterval(() => {
      confetti({
        particleCount: 3,
        spread: 60,
        startVelocity: 30,
        origin: { y: 0.6 }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
      >
        {/* Header with animation */}
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 10, -10, 10, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2">
            Booking Confirmed!
          </h1>
          <div className="text-5xl">🎸✨🎶</div>
        </motion.div>

        {/* Enhanced details section showing all form fields */}
        <div className="bg-zinc-700/50 rounded-xl p-6 mb-8 border border-zinc-600">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            {service === "final" ? "Final Vocal Recording" : "Demo Recording"} Details
          </h2>

          {/* Add to success page (near top)*/}
<div className="text-center mb-4">
  <span className="bg-zinc-700 text-green-400 px-3 py-1 rounded-full text-sm font-mono">
    Booking BT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
  </span>
</div>
          
          <div className="space-y-3 text-zinc-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-zinc-400">Name:</p>
                <p className="text-white">{name}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-400">Email:</p>
                <p className="text-white">{email}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-400">Phone:</p>
                <p className="text-white">{phone || "Not provided"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-400">Service Type:</p>
                <p className="text-white">
                  {service === "final" ? "Final Recording" : "Demo Recording"}
                </p>
              </div>
              <div>
                <p className="font-medium text-zinc-400">Number of Songs:</p>
                <p className="text-purple-300">{songCount}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-400">Estimated Price:</p>
                <p className="text-green-300">${calculatePrice()}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-600 mt-4">
              <p className="font-medium text-zinc-400">Session Date:</p>
              <p className="text-yellow-300">{formattedDate}</p>
              
              <p className="font-medium text-zinc-400 mt-2">Session Time:</p>
              <p className="text-yellow-300">{formattedTime}</p>
              
              <p className="font-medium text-zinc-400 mt-2">Duration:</p>
              <p className="text-blue-300">{durationText} (incl. setup)</p>
            </div>
          </div>
        </div>

        {/* Emoji animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center text-5xl mb-6"
        >
          🎤🔥
        </motion.div>

        {/* Confirmation message */}
        <p className="text-center text-zinc-400 mb-6">
  A confirmation has been sent to {email}.<br />
  <span className="block mt-2">
    For any changes, please call: 
    <span className="font-semibold text-white ml-1">
      {phone || "(your contact number)"}
    </span>
  </span>
</p>
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-green-500 to-green-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg"
          >
            Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/book"}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
          >
            Book Another
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}