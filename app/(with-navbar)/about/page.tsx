import Image from "next/image";
import Link from "next/link";
import { 
  HeartIcon, 
  SparklesIcon, 
  WrenchScrewdriverIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const galleryImages = [
    "/abby-painting.png",
    "/wall-covered-plastic.png",
    "/josh-nailing-drywall-roof.png",
    "/people-standing.png" // Fixed the missing slash here
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - The Vision */}
        <div className="mb-24 relative">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-stone-100 uppercase leading-none">
            From Passion <br /> 
            <span className="text-amber-600 font-medium italic pl-12 md:pl-24">To Conviction</span>
          </h1>
          <p className="text-stone-500 mt-6 tracking-[0.2em] text-xs uppercase">The Journey of Bethany Recording Studio</p>
        </div>

        <div className="space-y-32">
          
          {/* Section 1: The Spark */}
          <section className="relative flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-amber-700 font-bold uppercase tracking-widest text-xs">
                <SparklesIcon className="w-5 h-5" /> The Beginning
              </div>
              <p className="text-stone-300 text-lg leading-relaxed font-light">
                It started in high school—producing for fun, just exploring sounds. But when I picked up the keyboard, everything changed. I didn't just like music anymore; I fell in love with it. That love led me to earn my <span className="text-white font-medium underline decoration-amber-900 underline-offset-4">Diploma in Audio Production and Engineering</span>, turning a hobby into a technical craft.
              </p>
            </div>
            <div className="w-full md:w-80 aspect-[4/5] bg-stone-900/40 rounded-2xl border border-stone-800 relative overflow-hidden group shadow-2xl">
               <Image 
                src="/early-days.PNG" 
                alt="Early studio days"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
               />
            </div>
          </section>

          {/* Section 2: The Conviction (Lyric Quote) */}
          <section className="relative md:ml-16">
            <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-amber-900/30" />
            <div className="max-w-2xl space-y-8">
              <div className="flex items-center gap-3 text-amber-700 font-bold uppercase tracking-widest text-xs">
                <HeartIcon className="w-5 h-5" /> 2024: The Turning Point
              </div>
              
              <div className="bg-stone-900/20 p-8 rounded-2xl border border-stone-800/50 italic relative">
                <div className="absolute top-4 left-4 text-4xl text-amber-900/20 font-serif">"</div>
                <p className="text-stone-200 text-xl md:text-2xl font-light leading-relaxed mb-4 relative z-10">
                  Not for anything that I could gain, Just to honor You and bring You praise... Like a fragrance broken on the floor, May my worship be pure.
                </p>
                <cite className="text-amber-600 text-xs uppercase tracking-widest not-italic">— Abbie Gamboa</cite>
              </div>

              <p className="text-stone-400 leading-relaxed font-light">
                In 2024, I felt a heavy conviction. I wanted to build a sanctuary where believers could worship without hidden motives. Music transitioned from a talent I owned to a gift I lay at the feet of Jesus.
              </p>
            </div>
          </section>

          {/* Section 3: Brotherhood & Build */}
          <section className="relative flex flex-col md:flex-row-reverse gap-12 items-center md:ml-32">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-amber-700 font-bold uppercase tracking-widest text-xs">
                <WrenchScrewdriverIcon className="w-5 h-5" /> Brotherhood
              </div>
              <p className="text-stone-300 text-lg leading-relaxed font-light">
                Bethany Recording Studio was physically brought to life in 2024. I haven’t been on this ride alone—my brother **Josh** has been there every step of the way, helping build this vision from the ground up.
              </p>
            </div>
            <div className="w-full md:w-96 aspect-video bg-stone-900/40 rounded-2xl border border-stone-800 relative overflow-hidden group shadow-2xl">
                <Image 
                    src="/josh-kaleb.JPG" 
                    alt="Kaleb and Josh building"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="md:ml-48">
             <div className="mb-8">
                <h2 className="text-stone-200 uppercase tracking-[0.3em] text-sm font-medium">Build Gallery</h2>
                <p className="text-stone-600 text-[10px] uppercase mt-1">Showcasing the 2024 Construction</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((src, i) => (
                  <div key={i} className="aspect-square bg-stone-900/60 border border-stone-800 rounded-xl overflow-hidden relative group">
                    <Image 
                        src={src} 
                        alt={`Process ${i}`} 
                        fill 
                        className="object-cover opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                ))}
             </div>
          </section>

        </div>

        {/* Closing CTA */}
        <div className="mt-48 text-center border-t border-stone-900 pt-20">
          <h2 className="text-stone-200 text-3xl font-light mb-8 uppercase tracking-tighter">Ready to create something pure?</h2>
          <Link 
            href="/contact" 
            className="group inline-flex items-center gap-4 px-10 py-4 border border-amber-800/40 rounded-full text-amber-500 uppercase tracking-[0.2em] text-xs font-bold hover:bg-amber-600 hover:text-black transition-all duration-500"
          >
            Book a Session <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
          <div className="w-px h-24 bg-gradient-to-b from-stone-900 to-transparent mx-auto mt-20" />
          <p className="text-stone-700 uppercase tracking-[0.4em] text-[10px]">Quality &bull; Worship &bull; Excellence</p>
        </div>
      </div>
    </div>
  );
}