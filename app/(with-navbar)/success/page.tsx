"use client";
import { Suspense } from 'react';
import SuccessContent from './successContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-white">Loading booking confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}