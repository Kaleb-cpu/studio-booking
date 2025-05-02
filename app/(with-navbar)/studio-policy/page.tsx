import {
    ClockIcon,
    XCircleIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
  } from '@heroicons/react/24/outline';
export default function PolicyPage() {
    return (
      
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-400 mb-6">Studio Policies</h1>
  
        <div className="space-y-6">
          {/* Cancellation Policy */}
          <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <ClockIcon className="w-5 h-5" />
              Cancellation Policy
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>24-hour notice required for cancellations</span>
              </li>
              <li className="flex items-start gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span>Please avoid late cancellations as much as possible</span>
              </li>
            </ul>
          </div>
  
          {/* Studio Rules */}
          <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
            <h2 className="text-xl font-semibold mb-3">Studio Rules</h2>
            <ul className="space-y-3">
              {[
                "Water will be provided",
                "Files can be delivered via Telegram or Whatsapp"
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }