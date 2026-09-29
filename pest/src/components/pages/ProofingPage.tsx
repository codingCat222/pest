import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, Shield, Home } from 'lucide-react';

interface ProofingPageProps {
  onStartEligibility: () => void;
  onBookProfessional: () => void;
}

export const ProofingPage: React.FC<ProofingPageProps> = ({
  onStartEligibility,
  onBookProfessional
}) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            PAGE 6 — PROOFING
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Stop Them Getting Back In
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Treating current activity is only part of the solution. If rodents have found a way into your property, addressing potential entry points can help reduce the opportunity for future access. That's where proofing comes in.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            What Is Proofing?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Proofing is the process of identifying and addressing potential pest entry points. Rodents can squeeze through gaps as narrow as a pencil (6mm for mice, 12mm for rats). Proofing seals these structural access routes using chew-proof materials.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Gaps around pipes</span>
              Waste pipes, radiator feeds, plumbing breaches.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Openings around doors</span>
              Worn weather stripping and external thresholds.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Damaged air vents</span>
              Subfloor vents without stainless steel mesh.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Gaps in exterior walls</span>
              Cavity wall breaches and weeping holes.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Roofline openings</span>
              Soffits, eaves, fascia boards and lead flashing.
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Damaged drainage grilles</span>
              Uncapped sewer lines and broken inspection covers.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900">
            How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600">01</div>
              <h4 className="font-bold text-slate-900 text-sm">Identify Entry Points</h4>
              <p className="text-xs text-slate-500">During professional inspection, technician maps all external access points.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600">02</div>
              <h4 className="font-bold text-slate-900 text-sm">Show What We Found</h4>
              <p className="text-xs text-slate-500">High-resolution photos and diagnostic notes appear in your dashboard.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600">03</div>
              <h4 className="font-bold text-slate-900 text-sm">Provide a Quote</h4>
              <p className="text-xs text-slate-500">Clear itemised quotation covering materials and professional fitting.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600">04</div>
              <h4 className="font-bold text-slate-900 text-sm">You Decide</h4>
              <p className="text-xs text-slate-500">No pushy sales calls. Review and accept or decline on your dashboard.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-xs font-bold text-blue-600">05</div>
              <h4 className="font-bold text-slate-900 text-sm">Complete the Work</h4>
              <p className="text-xs text-slate-500">If accepted, certified team completes permanent exclusion works.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl font-bold">
            Ready to secure your property?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Start with our free product assessment. If activity persists, our £95.99 professional inspection includes entry point diagnosis.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onStartEligibility}
              className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all"
            >
              START FREE JOURNEY
            </button>
            <button
              onClick={onBookProfessional}
              className="px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
            >
              BOOK £95.99 VISIT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};