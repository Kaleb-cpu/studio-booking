"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MicrophoneIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  UserIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const menuItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/services", label: "Services", icon: MicrophoneIcon },
    { href: "/booking", label: "Booking", icon: PhoneIcon },
    { href: "/how-to-pay", label: "Payments", icon: CreditCardIcon },
    { href: "/about", label: "About Us", icon: UserIcon },
    { href: "/studio-policy", label: "Policies", icon: DocumentTextIcon },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[150] py-7 transition-all duration-500 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1 group">
            <div className="relative h-13 w-13 md:h-14 md:w-14 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-[0.2em] text-xs uppercase leading-none">House Of</span>
              <span className="text-amber-400 text-[15px, bold] uppercase tracking-[0.3em] mt-1 opacity-80 font-bold">Bethany</span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[160] group flex flex-col items-end justify-center w-10 h-10 gap-1.5 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7 text-amber-500" />
            ) : (
              <>
                <div className="w-8 h-[2px] bg-amber-500 transition-all duration-300" />
                <div className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:w-8" />
                <div className="w-3 h-[2px] bg-amber-900 transition-all duration-300 group-hover:w-8" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* OVERLAY SYSTEM */}
      <div className={`fixed inset-0 z-[140] transition-all duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        
        {/* 1. BACKDROP: This captures clicks on the entire screen */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 85% 50%, rgba(69, 26, 3, 0.45) 0%, rgba(0, 0, 0, 1) 85%)`
          }}
          onClick={() => setIsOpen(false)} 
        />

        {/* 2. INTERACTION LAYER: Contains the links, but passes clicks through to backdrop if you miss a link */}
        <div 
          className={`absolute inset-0 flex items-center justify-end pr-[10vw] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform pointer-events-none ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={() => setIsOpen(false)} // Secondary click-to-close on this layer
        >
          {/* 3. THE ACTUAL MENU: Re-enables pointer events so links work */}
          <div 
            className="relative flex flex-col items-end gap-6 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking a link
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-5 transition-all duration-500 ease-out transform will-change-transform ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${100 + index * 40}ms` : "0ms",
                  marginRight: `${index * 1.5}rem` 
                }}
              >
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-light tracking-[0.2em] transition-all duration-300 uppercase ${
                    pathname === item.href 
                      ? "text-amber-500 font-semibold" 
                      : "text-stone-300 group-hover:text-white"
                  }`}>
                    {item.label}
                  </span>
                  <div className={`h-[1px] bg-amber-500 transition-all duration-500 ${
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </div>
                
                <div className={`p-3 rounded-full border border-stone-800 bg-black transition-all duration-300 ${
                  pathname === item.href 
                    ? "border-amber-500 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                    : "group-hover:border-amber-500/60 group-hover:bg-stone-900"
                }`}>
                  <item.icon className={`h-6 w-6 ${
                    pathname === item.href ? "text-amber-400" : "text-stone-400 group-hover:text-amber-400"
                  }`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}