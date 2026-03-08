// app/how-to-pay/page.tsx
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  BanknotesIcon, 
  EnvelopeOpenIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

export default function PaymentPage() {
  const steps = [
    {
      id: "01",
      title: "Complete Your Session",
      desc: "Create without friction. Enjoy your full studio time with no upfront deposit or payment required beforehand.",
      icon: SparklesIcon,
    },
    {
      id: "02",
      title: "Automatic Invoice",
      desc: "A formal e-Transfer request will be sent to your registered email within 1 hour of wrapping up the session.",
      icon: EnvelopeOpenIcon,
    },
    {
      id: "03",
      title: "Secure Settlement",
      desc: "Complete the transfer conveniently through your preferred online banking platform.",
      icon: BanknotesIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-900/10 border border-amber-800/30 mb-6">
            <CheckBadgeIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-stone-100 uppercase mb-4">
            Payment <span className="text-amber-600 font-medium italic">Protocol</span>
          </h1>
          <p className="text-stone-500 tracking-[0.2em] text-xs uppercase">
            Seamless transactions &bull; No upfront costs
          </p>
        </div>

        {/* Vertical Staircase Timeline */}
        <div className="relative space-y-12 mb-20">
          {/* Vertical Line Decor */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-stone-900" />

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="relative flex gap-8 group transition-all duration-500"
              style={{ paddingLeft: `${index * 1}rem` }} // Subtle staircase shift
            >
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gray-950 border border-amber-800/50 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                <span className="text-[10px] font-bold text-amber-600 uppercase">{step.id}</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <step.icon className="w-5 h-5 text-stone-400 group-hover:text-amber-500 transition-colors" />
                  <h3 className="text-lg font-medium text-stone-200 tracking-wide uppercase text-sm">
                    {step.title}
                  </h3>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Terms Box */}
        <div className="bg-stone-900/20 border border-stone-800/50 rounded-2xl p-8 relative overflow-hidden">
          {/* Abstract corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-600/5 rounded-bl-full" />
          
          <div className="flex gap-5">
            <ClockIcon className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-stone-200 font-medium uppercase tracking-widest text-xs mb-4">
                Session Terms
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Payment due within 24h",
                  "Automated digital receipts",
                  "Late payments affect booking",
                  "Secure e-Transfer protocol"
                ].map((term, i) => (
                  <li key={i} className="text-stone-500 text-[13px] flex items-center gap-2">
                    <span className="w-1 h-1 bg-amber-900 rounded-full" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-16 text-center">
          <p className="text-stone-600 text-[11px] tracking-[0.1em] uppercase">
            Inquiries &bull; <span className="text-stone-400 select-all">houseofbethanya@gmail.com
</span>
          </p>
        </div>
      </div>
    </div>
  );
}