import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Camera, Flame, Wrench, ShieldAlert } from 'lucide-react';

interface ProfessionalTreatmentPageProps {
  onBookProfessional: () => void;
}

export const ProfessionalTreatmentPage: React.FC<ProfessionalTreatmentPageProps> = ({
  onBookProfessional
}) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            PAGE 5 — PROFESSIONAL TREATMENT
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Still Seeing Pest Activity?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Sometimes the first step isn't enough. That's why we've created our £99 Professional Inspection &amp; Treatment service.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Clear Fixed Pricing
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              Professional Inspection &amp; Treatment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A certified technician will attend your property and thoroughly assess the situation. Unlike traditional pest control companies charging opaque hourly rates, we offer a transparent single fee.
            </p>
            <div className="pt-2">
              <button
                onClick={onBookProfessional}
                className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>BOOK YOUR £99 VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-900 text-white rounded-2xl p-6 text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              All-Inclusive Rate
            </div>
            <div className="text-5xl font-black text-blue-400">
              £99
            </div>
            <p className="text-xs text-slate-300">
              Comprehensive onsite inspection &amp; initial treatment where applicable.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">
            What Happens During the Visit?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Inspection of relevant areas</h4>
                <p className="text-xs text-slate-500 mt-1">Loft, subfloor, cavity, kitchen voids and perimeter foundation lines.</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <Camera className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Powerful ultrasonic inspection camera</h4>
                <p className="text-xs text-slate-500 mt-1">High-definition borescope inspection behind drywall and pipe conduits.</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Heat Steamer (for stubborn bedbugs)</h4>
                <p className="text-xs text-slate-500 mt-1">Superheated 180°C steam penetration killing bugs and eggs in mattress seams.</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <Wrench className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Golf size proofing materials</h4>
                <p className="text-xs text-slate-500 mt-1">Initial gap closure and immediate blocking of detected access holes.</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">High Strength commercial bait</h4>
                <p className="text-xs text-slate-500 mt-1">Professional grade formulations deployed strictly in authorized tamper boxes.</p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Review of previous treatment</h4>
                <p className="text-xs text-slate-500 mt-1">Assessment of station placement from your free kit monitoring period.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            What Happens Afterwards?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            You'll receive a full digital record of the visit through your account. If the issue appears to require further structural work, we'll explain your options clearly.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            This may include permanent proofing or additional targeted follow-ups. You are under zero obligation to purchase additional proofing work.
          </p>
        </div>

      </div>
    </div>
  );
};
