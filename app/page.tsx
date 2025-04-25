import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/studio.jpg"
        alt="Studio"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-xl">Welcome to Kaleb’s Studio</h1>
        <Link href="/book">
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-xl rounded-xl shadow-lg">
            Book a Session
          </button>
        </Link>
      </div>
    </div>
  );
}
