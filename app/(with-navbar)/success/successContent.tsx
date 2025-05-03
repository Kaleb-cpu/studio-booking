"use client";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SuccessContent() {
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
      return count <= 1 ? 30 : 30 + (count - 1) * 25;
    } else if (service === "final") {
      return count <= 1 ? 45 : 45 + (count - 1) * 40;
    }
    return 0;
  };

  // Calculate duration
  const durationMinutes = service === "final" 
    ? (Number(songCount) * 60) + 15
    : (Number(songCount) * 30) + 15;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationText = `${hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : ''}${
    hours > 0 && minutes > 0 ? ' ' : ''}${
    minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`;

  // Format date and time
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

  // Confetti effect
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

        {/* Enhanced details section */}
        <div className="bg-zinc-700/50 rounded-xl p-6 mb-8 border border-zinc-600">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            {service === "final" ? "Final Vocal Recording" : "Demo Recording"} Details
          </h2>

          <div className="text-center mb-4">
            <span className="bg-zinc-700 text-green-400 px-3 py-1 rounded-full text-sm font-mono">
              Booking BT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-3 text-zinc-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-sm">Name</p>
                <p className="font-medium">{name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Email</p>
                <p className="font-medium">{email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Phone</p>
                <p className="font-medium">{phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Service Type</p>
                <p className="font-medium">
                  {service === "final" ? "Final Recording" : "Demo Recording"}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Number of Songs</p>
                <p className="font-medium">{songCount}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Estimated Duration</p>
                <p className="font-medium">{durationText}</p>
              </div>
              {dateTime && (
                <>
                  <div>
                    <p className="text-zinc-400 text-sm">Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Time</p>
                    <p className="font-medium">{formattedTime}</p>
                  </div>
                </>
              )}
              <div className="col-span-2">
                <p className="text-zinc-400 text-sm">Estimated Price</p>
                <p className="font-medium text-xl text-green-400">
                  ${calculatePrice()}
                  <span className="text-sm text-zinc-400 ml-1">
                    ({service === "final" ? "$45" : "$30"} per song{service === "final" ? " + $40" : " + $25"} for each additional)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-400 text-sm">
        <p className="mt-2">
  Thank you for booking with <br /> 
  <span className="font-semibold text-amber-300">Bethany Recording Studio</span>
</p>
        </div>
      </motion.div>
    </div>
  );
}