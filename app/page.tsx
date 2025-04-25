// app/page.tsx
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white">
  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
    Book Your Studio Session 🎙️
  </h1>

  <div className="mb-10 max-w-xl">
    <p className="text-lg text-zinc-300">
      But one thing is needed, and Mary has chosen that good part, which will not be taken away from her.”
    </p>
    <p className="text-sm text-zinc-400 italic text-right mt-2">Luke 10:42</p>
  </div>

  <BookingForm />
</main>


  );
}
