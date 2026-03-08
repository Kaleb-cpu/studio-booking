"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Exo_2 } from 'next/font/google';
import NavBar from "@/components/NavBar";

const exo = Exo_2({
  subsets: ['latin'],
  variable: '--font-primary'
});

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <NavBar />

      {/* NEW: Subtle Amber Light Leak Gradient */}
      {/* This layer sits above the image but below the text to create the "light" */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15)_0%,_transparent_70%)]" />
      
      {/* NEW: Bottom-up Amber Wash */}
      <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-amber-950/20 via-transparent to-transparent" />

      {/* Background Image Logic */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/studio.jpg"
          alt="Studio background"
          fill
          className="object-cover brightness-[0.2] contrast-[1.1]"
          priority
          quality={100}
          style={{
            transform: "translateZ(0)",
          }}
        />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        {/* Title Section */}
        <div className="relative mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold mb-4 relative"
          >
            <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
              WELCOME TO
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className={`text-4xl sm:text-6xl font-bold ${exo.className} relative pb-4`}
          >
            <span className="text-white tracking-tight">
              BETHANY
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2, type: "spring" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 origin-left shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            />
            <div className="text-xl sm:text-2xl text-amber-300/90 mt-3 tracking-[0.5em] font-light">
              RECORDING STUDIO
            </div>
          </motion.h2>
        </div>

        {/* Social Link Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-sm sm:text-base text-amber-100/60 mt-3 tracking-[0.3em] uppercase">
            Connect with us on social media
          </div>
        </motion.div>

        {/* Scripture Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 2 }}
          className="mt-16 text-[10px] sm:text-xs text-amber-200/50 tracking-[0.6em] uppercase"
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            ONE THING IS NEEDED &bull; LUKE 10:42
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}