// app/page.tsx
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Book Your Studio Session 🎙️</h1>
      <p className="text-lg text-zinc-300 mb-10 text-center max-w-xl">
        Recording, mixing, and mastering sessions—tailored to your sound. Pick your time and lock in your session.
      </p>
      <BookingForm />
    </main>
  );
}
