"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";  
import Link from "next/link";
import { 
  HeartIcon, 
  SparklesIcon, 
  AcademicCapIcon,
  UsersIcon,
  ArrowRightIcon,
  MusicalNoteIcon,
  ArrowRightCircleIcon
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const constructionImages = [
  "/abby-painting.png",
  "/wall-covered-plastic.png",
  "/josh-nailing-drywall-roof.png",
  "/people-standing.png",
  "/control.png",
  "/booth.png",
  "/frontview-studio.JPG",
  "/cranny.png"
];

const scrollRef = useRef<HTMLDivElement>(null);

const scroll = (direction: 'left' | 'right') => {
  if (scrollRef.current) {
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth 
      : scrollLeft + clientWidth;
    
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  }
};

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 px-6 text-stone-300">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Header - The Narrative */}
        <div className="mb-24 relative text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-stone-100 uppercase leading-none">
            From Passion <br /> 
            <span className="text-amber-600 font-medium italic">To Conviction</span>
          </h1>
          <p className="text-stone-500 mt-6 tracking-[0.2em] text-xs uppercase">The Heart Behind Bethany Recording Studio</p>
        </div>

        {/* 1. THE BEGINNING: PASSION */}
        <section className="relative mb-32 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 md:pr-12">
            <div className="flex items-center gap-3 text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-4">
              <SparklesIcon className="w-4 h-4" /> The Spark
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 uppercase tracking-tight">A Hobby <br/><span className="italic font-serif">Became a Heartbeat</span></h2>
            <p className="font-light leading-relaxed mb-8">
              It started in high school—producing music just for the fun of it, chasing sounds in my bedroom. But everything shifted the moment I sat behind the keyboard. I didn't just like music anymore; I fell in love with it. That curiosity turned into a drive for excellence.
            </p>
          </div>
          <div className="w-full md:w-72 aspect-square bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 relative shadow-2xl">
             <Image 
              src="/early-days.PNG" 
              alt="Me starting out in high school"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
             />
          </div>
        </section>

        {/* 2. THE CRAFT: DIPLOMA */}
        <section className="relative mb-32 flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1 md:pl-12">
            <div className="flex items-center gap-3 text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-4">
              <AcademicCapIcon className="w-4 h-4" /> The Craft
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 uppercase tracking-tight">Refining <br/><span className="italic font-serif">The Technical</span></h2>
            <p className="font-light leading-relaxed mb-4">
              Love wasn't enough; I wanted to master the airwaves. I committed to the craft, earning my <span className="text-white border-b border-amber-900">Diploma in Audio Production and Engineering</span>. 
            </p>
            <p className="font-light leading-relaxed">
              This journey from a bedroom producer to a certified engineer taught me that every frequency has a purpose and every mix deserves professional excellence.
            </p>
          </div>
          <div className="w-full md:w-72 aspect-square bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 relative shadow-2xl">
             <Image 
              src="/kaleb-studioA.jpg" 
              alt="Professional audio engineering work"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
             />
          </div>
        </section>

        {/* 3. THE TURNING POINT: CONVICTION */}
        <section className="relative mb-40">
          <div className="bg-stone-900/60 backdrop-blur-sm border border-amber-900/20 rounded-[3rem] p-8 md:p-20 text-center shadow-3xl">
            <HeartIcon className="w-10 h-10 text-amber-600 mx-auto mb-8" />
            <h2 className="text-amber-700 uppercase tracking-[0.4em] text-[10px] font-bold mb-10">2024: The Conviction</h2>
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-2xl md:text-4xl font-light text-stone-100 italic leading-tight mb-8">
                "Not for anything that I could gain, Just to honor You and bring You praise... May my worship be pure."
              </p>
              <cite className="text-stone-500 text-xs uppercase tracking-widest not-italic">— Abbie Gamboa, <span className="text-amber-800">"Pure"</span></cite>
            </blockquote>
            <p className="mt-14 max-w-xl mx-auto font-light text-lg text-stone-300 leading-relaxed">
              In 2024, the "Why" changed. I felt a heavy conviction to build a sanctuary—a place where believers could worship without hidden motives. Music transitioned from a talent I owned to a gift I lay at the feet of Jesus.
            </p>
          </div>
        </section>

        {/* 4. THE BUILD: BROTHERHOOD */}
        <section className="relative mb-32 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 md:pr-12">
            <div className="flex items-center gap-3 text-amber-600 font-bold uppercase tracking-widest text-[10px] mb-4">
              <UsersIcon className="w-4 h-4" /> Together
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 uppercase tracking-tight">The Hands Behind <br/><span className="italic font-serif">The Walls</span></h2>
            <p className="font-light leading-relaxed mb-6">
              Bethany Recording Studio was physically brought to life in 2024. My brother <span className="text-white font-medium">Josh</span> has been there every step of the way, helping build this vision from the ground up with his own hands. 
            </p>
            <p className="font-light leading-relaxed">
              Alongside my brothers and sisters in Calgary, we stand together in this shared conviction: to create a home for pure worship in our city.
            </p>
          </div>
          <div className="w-full md:w-80 aspect-[4/5] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 relative shadow-2xl">
             <Image 
              src="/josh-kaleb.jpg" 
              alt="Me and Josh building the studio"
              fill
              className="object-cover"
             />
          </div>
        </section>

        {/* --- GALLERY SECTION START --- */}
<section className="mb-40 relative group">
  <div className="flex items-end justify-between mb-10 px-2">
    <div>
      <h3 className="text-stone-200 uppercase tracking-[0.3em] text-sm font-medium">The Build</h3>
      <p className="text-stone-600 text-[10px] uppercase mt-1">From raw materials to sanctuary</p>
    </div>
    
    {/* Navigation Buttons */}
    <div className="flex gap-2">
      <button 
        onClick={() => scroll('left')}
        className="p-3 rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 hover:text-amber-500 hover:border-amber-900/50 transition-all active:scale-95"
        aria-label="Scroll Left"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="p-3 rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 hover:text-amber-500 hover:border-amber-900/50 transition-all active:scale-95"
        aria-label="Scroll Right"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  </div>

  {/* Scrollable Container */}
  <div 
    ref={scrollRef}
    className="flex gap-4 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
  >
    {constructionImages.map((src, i) => (
      <div 
        key={i} 
        className="flex-none w-[calc(50%-8px)] md:w-[calc(25%-12px)] snap-start aspect-[4/5] bg-stone-900 border border-stone-800/50 rounded-xl overflow-hidden relative group/item shadow-2xl"
      >
        <Image 
          src={src} 
          alt={`Construction phase ${i + 1}`} 
          fill 
          className="object-cover opacity-40 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-700 ease-out grayscale group-hover/item:grayscale-0"
        />
        
        {/* Subtle Overlay Label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        </div>
      </div>
    ))}
  </div>
  
  {/* Progress Bar (Visual Polish) */}
  <div className="w-full h-[1px] bg-stone-900 mt-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent animate-shimmer" />
  </div>
</section>
{/* --- GALLERY SECTION END --- */}

        {/* FINAL CTA */}
        <footer className="text-center pt-20 border-t border-stone-900 relative">
          <MusicalNoteIcon className="w-6 h-6 text-amber-800 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-light text-white mb-10 uppercase tracking-tighter">Ready to create something pure?</h2>
          <Link 
            href="/booking" 
            className="group inline-flex items-center gap-4 px-12 py-4 bg-amber-700/5 border border-amber-600/30 rounded-full text-amber-500 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-amber-600 hover:text-black transition-all duration-500"
          >
            Book a Session <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-stone-700 uppercase tracking-[0.5em] text-[9px] mt-24">Quality &bull; Worship &bull; Excellence</p>
        </footer>

      </div>
    </div>
  );
}