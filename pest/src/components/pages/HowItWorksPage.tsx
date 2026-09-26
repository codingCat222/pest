import React from 'react';
import { ArrowRight, CheckCircle2, Package, Eye, ShieldAlert, Wrench, ShieldCheck } from 'lucide-react';

interface HowItWorksPageProps {
  onStartEligibility: () => void;
  onBookProfessional: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onStartEligibility,
  onBookProfessional
}) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">

        <div className="text-center max-w-3xl mx-auto space-y-4">

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            A Different Way to Deal With Pest Problems
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We've made pest control simple. You start with the free product. You monitor the result. If the problem continues, you have the option to move to professional treatment.
          </p>
        </div>

        <div className="space-y-6">

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              1
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 1: Tell Us About Your Problem
              </h2>
              <p className="text-sm text-slate-600">
                We'll ask simple, direct questions to understand the scope of the problem:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-slate-700">
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">• What you're seeing</span>
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">• Where you're seeing it</span>
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">• How long you've noticed it</span>
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">• Your property type</span>
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">• Your location</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 2: Get Your Free Product
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you're eligible, we'll show you the product available to you. The product is free — you pay only the applicable delivery charge of £4.95 for Royal Mail tracked delivery.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              3
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 3: Follow the Instructions
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                When your product arrives, follow the supplied instructions carefully. Don't improvise or use products outside their intended purpose. Place stations along perimeter walls in undisturbed runs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              4
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 4: Monitor for 7 Days
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your dashboard starts a 7-day monitoring period. You can report:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">No activity</span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">Less activity</span>
                <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">Same activity</span>
                <span className="px-3 py-1.5 rounded-lg bg-red-50 text-red-800 border border-red-200">More activity</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">Not sure</span>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Photographs can also be uploaded directly through your account.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0">
              5
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 5: Still Seeing Activity?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The customer can move straight to: <strong>£99 Professional Inspection &amp; Treatment</strong>. No hidden callout charges or inflated quotes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              6
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 6: Professional Treatment
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Where appropriate, the certified technician carries out treatment in accordance with applicable requirements, product instructions, and company procedures. A record of the visit is immediately available through your account.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0">
              7
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                Step 7: Proofing &amp; Exclusion
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                If potential entry points are identified, structural proofing is recommended so pests cannot re-enter. Customers receive an itemised quote and decide whether to accept.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center pt-6 space-y-4">
          <button
            onClick={onStartEligibility}
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>GET YOUR FREE PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
