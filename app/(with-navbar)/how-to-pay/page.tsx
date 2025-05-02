// app/how-to-pay/page.tsx
import { CheckBadgeIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function PaymentPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-400/30">
          <CheckBadgeIcon className="w-8 h-8 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-green-400 mb-2">Payment Process</h1>
        <p className="text-zinc-400">No upfront payment required</p>
      </div>

      {/* Payment Flow */}
      <div className="space-y-6 mb-8">
        {/* Step 1 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-green-400 flex items-center justify-center">
              <span className="text-green-400 text-sm font-bold">1</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Complete Your Session</h3>
            <p className="text-zinc-400 text-sm">
              Enjoy your studio time with no payment required beforehand
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-green-400 flex items-center justify-center">
              <span className="text-green-400 text-sm font-bold">2</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Automatic Invoice</h3>
            <p className="text-zinc-400 text-sm">
              Receive an e-Transfer request via email within 1 hour after your session
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-green-400 flex items-center justify-center">
              <span className="text-green-400 text-sm font-bold">3</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-zinc-400 text-sm">
              Pay conveniently through your online banking
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
        <div className="flex gap-3">
          <ClockIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-300">Payment Terms</h4>
            <ul className="text-xs text-zinc-400 space-y-1 mt-1 list-disc pl-4">
              <li>Payment due within 24 hours of session completion</li>
              <li>Late payments may affect future bookings</li>
              <li>Receipts provided automatically</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="mt-8 text-center text-sm text-zinc-500">
        <p>Questions? <span className="text-green-400">bethaniarecordingstudio@gmail.com</span></p>
      </div>
    </div>
  );
}