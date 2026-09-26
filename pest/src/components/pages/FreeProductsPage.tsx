import React from 'react';
import { INITIAL_PRODUCTS } from '../../data/mockData';
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Package } from 'lucide-react';

interface FreeProductsPageProps {
  onStartEligibility: (pestName?: string) => void;
}

export const FreeProductsPage: React.FC<FreeProductsPageProps> = ({ onStartEligibility }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            PAGE 3 — FREE PEST-CONTROL PRODUCTS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Free Pest-Control Products
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Why pay for something before you've even tried it? Eligible customers can receive selected pest-control products free of charge. You simply pay the applicable delivery cost.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onStartEligibility()}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-sm transition-all inline-flex items-center gap-2"
            >
              <span>CHECK ELIGIBILITY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_PRODUCTS.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {prod.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                    {prod.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {prod.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {prod.description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    What's Enclosed in Kit:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {prod.contents.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
                  <strong>Safety Notice:</strong> {prod.safetyNotice}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Standard Value: £{prod.regularPrice.toFixed(2)}</div>
                  <div className="text-lg font-extrabold text-slate-900">Product: £0.00 <span className="text-xs font-normal text-slate-500">(+£4.95 post)</span></div>
                </div>

                <button
                  onClick={() => onStartEligibility(prod.pestTarget)}
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                >
                  Claim Kit
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Why Do We Give Products Away?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Simple. We want to help people take the first step without immediately committing to a professional visit.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              If the product works, you've solved the immediate problem at minimal expense. If activity continues, we have a professional next step ready: a certified inspection for a flat £99.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Important Product Information
            </h3>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Always read and follow the product label and supplied instructions.</li>
              <li>Only use products for their authorised purpose and in the manner specified.</li>
              <li>Keep products away from children, pets, and non-target animals as required by label instructions.</li>
              <li>Use customer dashboard daily to log activity and decide if escalation is required.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
