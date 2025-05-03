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
        className="bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-2xl p-8 max-w-3xl w-full shadow-2xl"
      >
        {/* Header with animation - Made smaller */}
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 10, -10, 10, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center mb-6" // Reduced margin-bottom
        >
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-1"> {/* Smaller text */}
            Booking Confirmed!
          </h1>
          <div className="text-4xl">🎸✨🎶</div> {/* Smaller emojis */}
        </motion.div>

        {/* Details section without box */}
        <div className="mb-6"> {/* Removed bg and border classes */}
          <h2 className="text-lg font-semibold text-green-400 mb-3"> {/* Smaller heading */}
            {service === "final" ? "Final Vocal Recording" : "Demo Recording"} Details
          </h2>

          <div className="text-center mb-3">
            <span className="bg-zinc-700 text-green-400 px-2 py-1 rounded-full text-xs font-mono"> {/* Smaller badge */}
              Booking BT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-3 text-zinc-200">
            <div className="grid grid-cols-2 gap-3"> {/* Reduced gap */}
              <div className="break-words">
                <p className="text-zinc-400 text-xs">Name</p> {/* Smaller text */}
                <p className="font-medium text-sm">{name || "Not provided"}</p> {/* Smaller text */}
              </div>
              <div className="break-all">
                <p className="text-zinc-400 text-xs">Email</p>
                <p className="font-medium text-sm">{email || "Not provided"}</p>
              </div>
              <div className="break-words">
                <p className="text-zinc-400 text-xs">Phone</p>
                <p className="font-medium text-sm">{phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Service Type</p>
                <p className="font-medium text-sm">
                  {service === "final" ? "Final Recording" : "Demo Recording"}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Number of Songs</p>
                <p className="font-medium text-sm">{songCount}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-xs">Estimated Duration</p>
                <p className="font-medium text-sm">{durationText}</p>
              </div>
              {dateTime && (
                <>
                  <div>
                    <p className="text-zinc-400 text-xs">Date</p>
                    <p className="font-medium text-sm">{formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs">Time</p>
                    <p className="font-medium text-sm">{formattedTime}</p>
                  </div>
                </>
              )}
              <div className="col-span-2 pt-1"> {/* Reduced padding */}
                <p className="text-zinc-400 text-xs">Estimated Price</p>
                <p className="font-medium text-lg text-green-400"> {/* Slightly smaller price */}
                  ${calculatePrice()}
                  <span className="text-xs text-zinc-400 ml-1"> {/* Smaller text */}
                    ({service === "final" ? "$45" : "$30"} per song{service === "final" ? " + $40" : " + $25"} for each additional)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-zinc-400 text-xs"> {/* Smaller footer text */}
          <p className="mt-3"> {/* Reduced margin */}
            Thank you for booking with <br /> 
            <span className="font-semibold text-amber-300">Bethany Recording Studio</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}