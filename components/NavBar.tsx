
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
  UserIcon,
  PhoneIcon,
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

  const menuItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/about", label: "About Us", icon: UserIcon },
    { href: "/services", label: "Services", icon: MicrophoneIcon },
    { href: "/how-to-pay", label: "Payments", icon: CreditCardIcon },
    { href: "/studio-policy", label: "Policies", icon: DocumentTextIcon },
    { href: "/contact", label: "Booking", icon: PhoneIcon },
  ];

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
          {menuItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg group transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-gray-800/60 text-amber-100"
                  : "hover:bg-gray-800/40 text-gray-300"
              }`}
            >
              <item.icon
                className={`h-[18px] w-[18px] ${
                  isActive(item.href)
                    ? "text-amber-400"
                    : "text-gray-400 group-hover:text-amber-400/90"
                }`}
              />
              <span className="hidden sm:inline text-sm group-hover:text-amber-100">
                {item.label}
              </span>
            </Link>
          ))}
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

      {/* Mobile Menu - Staircase animation */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-16 right-0 w-full max-w-xs h-[calc(100vh-4rem)] bg-gray-950/80 backdrop-blur-xl border-l border-gray-800/50 shadow-2xl transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.href)
                  ? "bg-amber-900/30 text-amber-100"
                  : "hover:bg-gray-800/40 text-gray-300"
              } staircase-item`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive(item.href) ? "text-amber-400" : "text-gray-400"
                }`}
              />
              <span className="text-base">{item.label}</span>
            </Link>
          ))}

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
