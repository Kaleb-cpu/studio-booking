"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});


export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/studio.jpg"
          alt="Studio background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 mt-16">
        {/* Title with Quicksand font */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`md:text-5xl sm:text-3xl font-extrabold mb-8 drop-shadow-2xl ${quicksand.className}`}
        >
          Welcome to Bethany Recording Studio

        </motion.h1>
        <motion.h1
          initial={{ x: 55, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className={`md:text-5xl sm:text-3xl font-extrabold mb-8 drop-shadow-2xl`}
        >

        <Link href="/book">
          <button className="cursor-pointer relative bg-green-500 hover:bg-green-600 text-black font-bold px-10 py-4 md:text-xl sm:text-lg rounded-full shadow-2xl transition transform hover:scale-105 overflow-hidden">
            {/* Text with Pulse */}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
              >
              Book a Session
            </motion.span>

            {/* Glow effect behind */}
            <span className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 blur-md transition-all duration-500 hover:opacity-40"></span>
          </button>
        </Link>
              </motion.h1>
      </div>
    </div>
  );
}
