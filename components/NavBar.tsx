"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MicrophoneIcon,
  CreditCardIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track scroll position for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to check active link
  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  return (
    <nav
      className={`bg-gray-950/80 text-gray-100 p-3 fixed w-full top-0 left-0 z-50 border-b border-gray-800/50 backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 group text-gray-300 hover:text-amber-100"
        >
          <div className="relative h-8.5 w-8.5 opacity-90 transition-all duration-200 group-hover:opacity-100">
            <Image
              src="/logo.png"
              alt="Bethany Recording Studio"
              fill
              className="object-contain transition-all duration-200 group-hover:brightness-110"
              sizes="40px"
            />
          </div>
          <span className="hidden sm:inline text-[15px] transition-colors">
            Home
          </span>
        </Link>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
          <Link
            href="/how-to-pay"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg group transition-all duration-200 ${
              isActive("/how-to-pay")
                ? "bg-gray-800/60 text-amber-100"
                : "hover:bg-gray-800/40 text-gray-300"
            }`}
          >
            <CreditCardIcon
              className={`h-[18px] w-[18px] ${
                isActive("/how-to-pay")
                  ? "text-amber-400"
                  : "text-gray-400 group-hover:text-amber-400/90"
              }`}
            />
            <span className="hidden sm:inline text-sm group-hover:text-amber-100">
              Payments
            </span>
          </Link>

          <Link
            href="/studio-policy"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg group transition-all duration-200 ${
              isActive("/studio-policy")
                ? "bg-gray-800/60 text-amber-100"
                : "hover:bg-gray-800/40 text-gray-300"
            }`}
          >
            <DocumentTextIcon
              className={`h-[18px] w-[18px] ${
                isActive("/studio-policy")
                  ? "text-amber-400"
                  : "text-gray-400 group-hover:text-amber-400/90"
              }`}
            />
            <span className="hidden sm:inline text-sm group-hover:text-amber-100">
              Policies
            </span>
          </Link>

          {/* Book Now button */}
          <div className="relative pl-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-px bg-gradient-to-b from-transparent via-amber-600/30 to-transparent"></div>
            <Link
              href="/book"
              className={`relative flex items-center gap-2 ${
                isActive("/book")
                  ? "border-amber-500/40"
                  : "bg-gray-900/70 border-amber-600/20"
              } hover:bg-gray-800/80 border text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 group/button ml-2`}
            >
              <MicrophoneIcon
                className={`h-4 w-4 ${
                  isActive("/book")
                    ? "text-amber-300"
                    : "text-amber-400 group-hover/button:text-amber-300"
                } transition-colors`}
              />
              <span className="text-sm tracking-wide">Book Now</span>
              {isActive("/book") && (
                <div className="absolute inset-0 rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10"></div>
                  <div className="absolute bottom-0 left-2 right-2 h-px bg-amber-400/60"></div>
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-amber-400" />
          ) : (
            <Bars3Icon className="h-7.75 w-7.75 text-gray-200 hover:text-amber-400 transition-colors" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Slides in from right */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 right-0 w-full max-w-xs h-[calc(100vh-4rem)] bg-gray-950/80 backdrop-blur-xl border-l border-gray-800/50 shadow-2xl transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-4 overflow-y-auto">
          {/* Added Home Link */}
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/")
                ? "bg-amber-900/30 text-amber-100"
                : "hover:bg-gray-800/40 text-gray-300"
            }`}
          >
            <HomeIcon
              className={`h-5 w-5 ${isActive("/") ? "text-amber-400" : "text-gray-400"}`}
            />
            <span className="text-base">Home</span>
          </Link>

          <Link
            href="/how-to-pay"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/how-to-pay")
                ? "bg-amber-900/30 text-amber-100"
                : "hover:bg-gray-800/40 text-gray-300"
            }`}
          >
            <CreditCardIcon
              className={`h-5 w-5 ${
                isActive("/how-to-pay") ? "text-amber-400" : "text-gray-400"
              }`}
            />
            <span className="text-base">Payments</span>
          </Link>

          <Link
            href="/studio-policy"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/studio-policy")
                ? "bg-amber-900/30 text-amber-100"
                : "hover:bg-gray-800/40 text-gray-300"
            }`}
          >
            <DocumentTextIcon
              className={`h-5 w-5 ${
                isActive("/studio-policy") ? "text-amber-400" : "text-gray-400"
              }`}
            />
            <span className="text-base">Policies</span>
          </Link>

          <div className="pt-2">
            <Link
              href="/book"
              className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive("/book")
                  ? "bg-amber-800/30 text-amber-100 border border-amber-600/30"
                  : "hover:bg-amber-800/30 text-white border border-amber-700/30"
              }`}
            >
              <MicrophoneIcon className="h-5 w-5 text-amber-300" />
              <span className="text-base">Book Now</span>
            </Link>
          </div>

          {/* Optional decorative elements */}
          <div className="mt-auto pt-6 border-t border-gray-800/50">
            <div className="flex justify-center">
              <div className="text-xs text-gray-500">
                Bethany Recording Studio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}