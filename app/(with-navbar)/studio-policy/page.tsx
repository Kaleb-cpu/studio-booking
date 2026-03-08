import {
  ClockIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-16 relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-amber-700/50" />
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-stone-100 uppercase">
            Studio <span className="text-amber-600 font-medium">Policies</span>
          </h1>
          <p className="text-stone-500 mt-2 tracking-widest text-xs uppercase">
            Professional standards for Bethany Recording Studio
          </p>
        </div>

        <div className="grid gap-10">
          {/* Cancellation Policy - Staggered Right */}
          <section className="relative group ml-0 md:ml-12">
            <div className="absolute -inset-y-2 -inset-x-4 bg-amber-900/5 rounded-xl transition-colors group-hover:bg-amber-900/10" />
            <div className="relative border-l border-amber-800/30 pl-8 py-2">
              <h2 className="text-xl font-medium text-stone-200 flex items-center gap-3 mb-6 uppercase tracking-widest text-sm">
                <ClockIcon className="w-5 h-5 text-amber-600" />
                Cancellation & Timing
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <XCircleIcon className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-stone-300 font-medium">24-Hour Notice</p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      We require a minimum of 24 hours notice for all cancellations to respect our engineers' schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-amber-800 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-stone-300 font-medium">Late Adjustments</p>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Please avoid short-notice changes. Repeated late cancellations may require a non-refundable deposit for future bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Studio Rules - Staggered Further Right */}
          <section className="relative group ml-0 md:ml-24">
            <div className="absolute -inset-y-2 -inset-x-4 bg-stone-900/20 rounded-xl" />
            <div className="relative border-l border-stone-700/30 pl-8 py-2">
              <h2 className="text-xl font-medium text-stone-200 flex items-center gap-3 mb-6 uppercase tracking-widest text-sm">
                <ShieldCheckIcon className="w-5 h-5 text-amber-600" />
                Studio Conduct
              </h2>
              
              <ul className="space-y-4">
                {[
                  { title: "Refreshments", desc: "Complimentary water is provided for all vocalists during sessions." },
                  { title: "File Delivery", desc: "Mastered files are delivered via high-quality Telegram or WhatsApp transfers." },
                  { title: "Guest Policy", desc: "To maintain focus, please limit additional guests to one person." }
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircleIcon className="w-6 h-6 text-amber-700/50 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-stone-300 font-medium">{rule.title}</p>
                      <p className="text-stone-500 text-sm leading-relaxed">{rule.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-10 border-t border-stone-900 flex flex-col items-center">
            <DocumentTextIcon className="w-8 h-8 text-stone-800 mb-4" />
            <p className="text-stone-600 text-xs text-center max-w-xs leading-loose uppercase tracking-[0.2em]">
                By booking a session, you agree to the terms outlined above.
            </p>
        </div>
      </div>
    </div>
  );
}