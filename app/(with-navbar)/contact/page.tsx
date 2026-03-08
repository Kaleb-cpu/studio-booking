import { 
  ChatBubbleLeftRightIcon, 
  ArrowUpRightIcon 
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const socials = [
    {
      name: "Instagram",
      handle: "@caku_j",
      url: "https://www.instagram.com/caku_j",
      description: "Direct message for session availability and portfolio works.",
      color: "bg-amber-900/10",
    },
    {
      name: "Facebook",
      handle: "Kaleb Studio",
      url: "https://www.facebook.com/kalebstudio",
      description: "Follow for studio updates, equipment news, and community posts.",
      color: "bg-stone-900/40",
    },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-32 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase mb-4">
            Start Your <span className="text-amber-600 font-medium italic">Session</span>
          </h1>
          <div className="h-[1px] w-24 bg-amber-700 mb-6" />
          <p className="text-stone-400 text-lg max-w-xl font-light leading-relaxed">
            Ready to record? I handle all bookings personally through social media to ensure 
            we're the right fit for your project.
          </p>
        </div>

        {/* Social Staircase Grid */}
        <div className="flex flex-col gap-8">
          {socials.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 rounded-2xl border border-stone-800/50 transition-all duration-500 hover:border-amber-700/50 ${social.color}`}
              style={{ 
                // Creating the visual staircase offset
                marginLeft: `${index * 3}rem`,
                maxWidth: "100%"
              }}
            >
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-full bg-gray-950 border border-stone-800 group-hover:border-amber-600 transition-colors">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-1">
                    {social.name}
                  </h2>
                  <p className="text-2xl font-medium text-stone-200 group-hover:text-white transition-colors">
                    {social.handle}
                  </p>
                  <p className="text-stone-500 text-sm mt-2 max-w-xs md:max-w-sm font-light">
                    {social.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex items-center gap-2 text-amber-600 font-medium uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                Open Link <ArrowUpRightIcon className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Studio Location Note */}
        <div className="mt-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-stone-600">
                Bethany Recording Studio &bull; Quality over everything
            </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;