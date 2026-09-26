import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface AboutUsPageProps {
  onStartEligibility: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onStartEligibility }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">

        <div className="text-center space-y-4">

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Making Pest Control Simpler
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pest control doesn't always need to start with a costly professional visit. We created Free Pest Products to give people an honest, simple way to take the first step.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block text-base mb-1">01. Start simple</span>
              <p className="text-xs text-slate-600">Claim targeted UK compliant product free of charge. You just cover standard courier delivery.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block text-base mb-1">02. Monitor the result</span>
              <p className="text-xs text-slate-600">Your custom dashboard guides you day-by-day across a 7-day observation period.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block text-base mb-1">03. Get professional help when needed</span>
              <p className="text-xs text-slate-600">If activity continues, book our certified technician for a flat transparent £99.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block text-base mb-1">04. Address the underlying cause</span>
              <p className="text-xs text-slate-600">Pinpoint entry holes, gaps around pipes, and vents with optional permanent proofing.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <h2 className="text-2xl font-black">
            Why We're Different
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Traditional pest control can feel opaque and frustrating. You find a pest. You call around. You wait for an expensive contractor to show up, often charging exorbitant sums before you even know if a simple bait station would have resolved it.
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We wanted to build a modern, customer-first platform where you are in control every step of the way: start free, track your timeline, and escalate only if the problem requires specialist equipment.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            What We're Focused On
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Simple, guided customer journeys</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Clear and transparent fixed pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Professional certified field support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Practical, long-term exclusion solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Honest, pressure-free recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Responsible, UK compliant product usage</span>
            </div>
          </div>
        </div>

        <div className="text-center">
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
