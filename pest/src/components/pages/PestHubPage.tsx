import React from 'react';
import { PEST_DETAILS } from '../../data/mockData';
import { NavigationPage, PestType } from '../../types';
import { ArrowRight, CheckCircle2, ShieldAlert, AlertTriangle } from 'lucide-react';

interface PestHubPageProps {
  pestKey: string;
  onStartEligibility: (pestName?: string) => void;
  onBookProfessional: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const PestHubPage: React.FC<PestHubPageProps> = ({
  pestKey,
  onStartEligibility,
  onBookProfessional,
  onNavigate
}) => {
  const details = PEST_DETAILS[pestKey] || PEST_DETAILS['rats-mice'];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['rats-mice', 'bedbugs', 'cockroaches', 'foxes', 'ants'] as NavigationPage[]).map((key) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                pestKey === key 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {key === 'rats-mice' ? 'Rats & Mice' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            TARGETED PEST GUIDE • {details.name.toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {details.headline}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {details.description}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2>Signs of {details.name} Activity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {details.signs.map((sign, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{sign}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <h3 className="text-2xl font-extrabold">
            What Happens Next?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {details.nextSteps}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="font-bold text-blue-400 mb-1">1. Fast Eligibility</div>
              <p className="text-slate-300">Answer 4 simple questions regarding your property layout.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="font-bold text-blue-400 mb-1">2. Free {details.kitName}</div>
              <p className="text-slate-300">Pay only £4.95 standard delivery charge.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="font-bold text-blue-400 mb-1">3. 7-Day Observation</div>
              <p className="text-slate-300">Log activity in dashboard; escalate to £99 service if needed.</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onStartEligibility(details.name)}
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>START YOUR FREE PRODUCT JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Professional Service
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Still Seeing Activity?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Book a Professional Inspection &amp; Treatment — £99. Our professional service is designed for customers who have tried the initial treatment but are still seeing signs of activity.
            </p>
          </div>

          <button
            onClick={onBookProfessional}
            className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shrink-0 transition-all shadow-sm"
          >
            BOOK FOR £99
          </button>
        </div>

      </div>
    </div>
  );
};
