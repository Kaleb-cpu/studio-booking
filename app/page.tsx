"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {  Exo_2 } from 'next/font/google';


const exo = Exo_2({
  subsets: ['latin'],
  variable: '--font-primary'
});

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Your Original Background (Unchanged) */}
      <motion.div
  initial={{ scale: 1, opacity: 0 }}
  animate={{ scale: 1.1, opacity: 1 }}
  transition={{ duration: 5, ease: "easeOut" }}
  className="absolute inset-0 z-0"
>
  <Image
    src="/studio.jpg"
    alt="Studio background"
    fill
    className="object-cover brightness-[0.25]"
    priority
    quality={90} // Increased to 90 for better quality
    sizes="100vw" // Simpler sizing strategy
    placeholder="empty" // Disables blur-up effect
    unoptimized={process.env.NODE_ENV !== "production"} // Full quality in dev
    style={{
      imageRendering: "-webkit-optimize-contrast", // Sharpness
      transform: "translateZ(0)", // GPU acceleration
    }}
  />
</motion.div>

      {/* Supercharged Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Dramatic Text Container */}
        <div className="relative mb-12">
          {/* Text Reflection Effect */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute -bottom-24 left-0 right-0 text-center scale-y-[-1] opacity-40 bg-gradient-to-t from-black to-transparent bg-clip-text"
          >
            
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold mb-4 relative"
          >
            <span className="text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.7)]">
              WELCOME TO
            </span>
            
            {/* Glitch Layers */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [0, -3, 3, 0],
                y: [0, 2, -2, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 10
              }}
              className="absolute top-0 left-0 text-amber-300"
            >
              WELCOME TO
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0],
                x: [0, 4, -4, 0],
                y: [0, -3, 3, 0]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatDelay: 8
              }}
              className="absolute top-0 left-0 text-amber-500"
            >
              WELCOME TO
            </motion.span>
          </motion.h1>

          {/* Studio Name with Animated Underline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`text-4xl sm:text-6xl font-bold ${exo.className} relative pb-4`}
          >
            <span className="text-white">
              BETHANY
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1, type: "spring" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 origin-left"
            />
            <div className="text-xl sm:text-2xl text-amber-300 mt-3 tracking-[0.5em]">
              RECORDING STUDIO
            </div>
          </motion.h2>
        </div>

        {/* Holographic Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative"
        >
          <Link href="/book">
            <button className="relative z-10 cursor-pointer bg-gradient-to-br from-amber-400 to-yellow-600 text-black font-bold px-12 py-4 text-xl rounded-full shadow-lg overflow-hidden group">
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.3)",
                    "0 0 15px rgba(255,255,255,0.6)",
                    "0 0 5px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="relative z-10"
              >
                BOOK A SESSION
              </motion.span>
              
              {/* Holographic Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  animate={{
                    x: ["-50%", "150%"],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
              </div>
            </button>
          </Link>
          
          {/* Button Halo */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px 2px rgba(245,158,11,0.5)",
                "0 0 20px 5px rgba(245,158,11,0.7)",
                "0 0 10px 2px rgba(245,158,11,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full -z-10"
          />
        </motion.div>

        {/* Subtle Animated Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-12 text-sm text-amber-100/70 tracking-widest"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ONE THING IS NEEDED LUKE 10:42
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
}