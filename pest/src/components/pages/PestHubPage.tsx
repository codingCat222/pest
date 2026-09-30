import React from 'react';
import { PEST_DETAILS } from '../../data/mockData';
import { NavigationPage, PestType } from '../../types';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';

interface PestHubPageProps {
  pestKey: string;
  onStartEligibility: (pestName?: string) => void;
  onBookProfessional: () => void;
  onNavigate: (page: NavigationPage) => void;
}

const PEST_TABS: { key: NavigationPage; label: string }[] = [
  { key: 'rats-mice', label: 'Rats & Mice' },
  { key: 'bedbugs', label: 'Bedbugs' },
  { key: 'cockroaches', label: 'Cockroaches' },
  { key: 'foxes', label: 'Foxes' },
  { key: 'ants', label: 'Ants' },
  { key: 'other', label: 'Other Pests' }
];

export const PestHubPage: React.FC<PestHubPageProps> = ({
  pestKey,
  onStartEligibility,
  onBookProfessional,
  onNavigate
}) => {
  const details = PEST_DETAILS[pestKey] || PEST_DETAILS['rats-mice'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top pest navigation switcher */}
      <div className="bg-white border-b border-brand-purple/10 sticky top-[76px] z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple/60 shrink-0 mr-1">
              Select Pest:
            </span>
            {PEST_TABS.map((tab) => {
              const isActive = pestKey === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onNavigate(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-purple text-white shadow-md scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-brand-purple/10 hover:text-brand-purple'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-brand-purple transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className="text-slate-400">Services</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className="text-brand-purple font-bold">{details.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-purple via-brand-purple-dark to-purple-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple-dark/40 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-brand-green-light">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-light" />
                <span>Targeted Pest Care Guide • {details.name}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {details.headline}
              </h1>

              <div className="space-y-3">
                <p className="text-xl sm:text-2xl font-bold text-brand-green-light">
                  {details.subheading || "You're not alone."}
                </p>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal">
                  {details.description}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onStartEligibility(details.name)}
                  className="px-7 py-3.5 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm shadow-xl transition-all inline-flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
                >
                  <span>START YOUR FREE PRODUCT JOURNEY</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={onBookProfessional}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
                >
                  Need Urgent Help? Book £95.99
                </button>
              </div>

              <p className="text-[11px] text-white/60">
                Free products subject to eligibility &amp; £4.95 standard delivery. 100% genuine BPCA-grade solutions.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 aspect-video lg:aspect-4/3 group">
                <img
                  src={details.image || '/Images/technician.jpeg'}
                  alt={details.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
                    {details.kitName}
                  </span>
                  <span className="bg-brand-green/90 backdrop-blur-md px-2.5 py-1 rounded-full font-bold">
                    £0 Free Kit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signs of Activity Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-purple/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Signs of {details.name} Activity
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Recognise these common indicators in and around your property
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
              {details.signs.length} key signs identified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {details.signs.map((sign, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 hover:border-brand-purple/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                </div>
                <span className="font-medium leading-relaxed">{sign}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What Happens Next? Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/30 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-green-light">
              Clear Step-by-Step Resolution
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              What Happens Next?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {details.nextSteps}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-brand-green text-white font-black flex items-center justify-center text-xs">
                1
              </div>
              <div className="font-extrabold text-white text-base">Quick Questions</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                We'll ask you a few simple questions about what you've seen and where activity is occurring.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-brand-green text-white font-black flex items-center justify-center text-xs">
                2
              </div>
              <div className="font-extrabold text-white text-base">Claim Free Product</div>
              <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 my-1.5">
                <img
                  src="/Images/three-products.jpg"
                  alt={details.kitName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                If eligible, claim your available {details.kitName} and pay only delivery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-brand-green text-white font-black flex items-center justify-center text-xs">
                3
              </div>
              <div className="font-extrabold text-white text-base">7-Day Monitoring</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                You'll monitor the situation and log updates directly in your online customer dashboard.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-brand-green text-white font-black flex items-center justify-center text-xs">
                4
              </div>
              <div className="font-extrabold text-white text-base">Professional Service</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                If activity continues, seamlessly move to our fixed-fee professional visit.
              </p>
            </div>
          </div>

          <div className="pt-2 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={() => onStartEligibility(details.name)}
              className="px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm sm:text-base shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>START YOUR FREE PRODUCT JOURNEY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Professional Service Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-brand-purple/20 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Professional Service</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Still Seeing Activity?
            </h3>

            <div className="text-base font-bold text-brand-purple">
              Book a Professional Inspection
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our professional service is designed for customers who have tried the initial treatment but are still seeing signs of activity, or who need urgent, qualified technician intervention on-site.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> BPCA Certified Technicians
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> Complete Property Assessment
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> Fixed Price £95.99
              </span>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              type="button"
              onClick={onBookProfessional}
              className="px-8 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold text-sm sm:text-base text-center transition-all shadow-md active:scale-98 cursor-pointer"
            >
              BOOK FOR £95.99
            </button>
            <button
              type="button"
              onClick={() => onNavigate('professional-treatment')}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:text-brand-purple hover:bg-slate-100 text-center transition-colors cursor-pointer"
            >
              Learn about our treatments →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};