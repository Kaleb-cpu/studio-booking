
import { WrenchScrewdriverIcon, MusicalNoteIcon, SparklesIcon } from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Worship Music Production',
    description: 'Full song arrangement and instrumentation to shape your song into a powerful worship arrangement.',
    icon: MusicalNoteIcon,
    features: [
      'Piano, pads, ambient textures, and modern worship sound design',
      'Live or programmed drums, bass, guitars, and orchestral elements',
      'Guidance to shape your song into a powerful worship arrangement',
    ],
  },
  {
    title: 'Mixing',
    description: 'Clean, balanced mix with clarity and depth, with a modern worship sound similar to Hillsong, Bethel, and Elevation style.',
    icon: WrenchScrewdriverIcon,
    features: [
      'Vocal enhancement to keep the message front and center',
      'Stereo imaging and dynamics for emotional impact',
      'Modern worship sound similar to Hillsong, Bethel, Elevation style',
    ],
  },
  {
    title: 'Mastering',
    description: 'Loudness optimized for Spotify, Apple Music, YouTube, and radio, with a final polish for clarity, warmth, and punch.',
    icon: SparklesIcon,
    features: [
      'Industry-standard mastering chain',
      'Ready-to-release high-quality files',
      'Final polish for clarity, warmth, and punch',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl"> Services</h1>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            We offer a range of services to help you create powerful and professional worship music.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <service.icon className="h-8 w-8 text-amber-400" />
                <h2 className="ml-4 text-2xl font-bold">{service.title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact Us</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
                Ready to start your project? Reach out to us on social media.
            </p>
        </div>
      </div>
    </div>
  );
}
