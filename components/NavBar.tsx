"use client";

import Link from "next/link";
import { MicrophoneIcon, CreditCardIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white p-4 shadow-lg fixed w-full top-0 left-0 z-50 border-b border-zinc-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Home Link with Icon */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-lg font-semibold hover:text-green-400 transition-colors"
        >
          <MicrophoneIcon className="h-6 w-6 text-green-400" />
          <span>Studio Booking</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="hidden sm:inline-block hover:text-green-400 transition-colors px-3 py-1 rounded hover:bg-zinc-800"
          >
            Home
          </Link>
          
          <Link 
            href="/how-to-pay" 
            className="flex items-center gap-1 hover:text-green-400 transition-colors px-3 py-1 rounded hover:bg-zinc-800"
          >
            <CreditCardIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Payments</span>
          </Link>
          
          <Link 
            href="/studio-policy" 
            className="flex items-center gap-1 hover:text-green-400 transition-colors px-3 py-1 rounded hover:bg-zinc-800"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Policies</span>
          </Link>

          <Link 
            href="/book" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}