"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white p-4 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Home Link */}
        <Link href="/" className="sm:text-md font-semibold hover:text-green-500 transition-colors">
          Studio Booking
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/" className="sm:text-md hover:text-green-500 transition-colors">
            Home
          </Link>
          {/* <Link href="/book" className="text-md hover:text-green-500 transition-colors">
            Book a Session
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
