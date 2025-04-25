import Link from "next/link";
import Image from 'next/image';


export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/studio.jpg" 
        alt="Lazy loaded image"
        width={500} 
        height={300} 
        priority={false} 
      />
    
      
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="md:text-4xl sm:text-2xl font-bold mb-6 drop-shadow-xl">Welcome to Bethany Recording Studio</h1>
        <Link href="/book">
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 md:text-xl sm:text-lg rounded-xl shadow-lg">
            Book a Session
          </button>
        </Link>
      </div>
    </div>
  );
}
