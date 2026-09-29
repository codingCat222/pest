import React, { useState } from 'react';
import { FAQ_DATA, PEST_DETAILS } from '../data/mockData';
import { PestType } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  Camera,
  Flame,
  Wrench,
  ChevronDown,
  AlertTriangle,
  ClipboardCheck,
  Search
} from 'lucide-react';

interface HomeSectionsProps {
  onStartEligibility: (pest?: PestType) => void;
  onBookProfessional: () => void;
}

export const HomeSections: React.FC<HomeSectionsProps> = ({
  onStartEligibility,
  onBookProfessional
}) => {
  const [activeFaq, setActiveFaq] = useState<string | null>('0-0');
  const [activePestTab, setActivePestTab] = useState<string>('rats-mice');

  const toggleFaq = (key: string) => {
    setActiveFaq(activeFaq === key ? null : key);
  };

  const currentPest = PEST_DETAILS[activePestTab] || PEST_DETAILS['rats-mice'];

  return (
    <div className="space-y-24 py-6 bg-white">

      {/* SECTION 6 — Why Free Products */}
      <section id="why-free" className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
          Why free products?
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">
          Why Free Pest Products?
        </h2>
        <p className="text-base text-brand-purple/75 leading-relaxed">
          We believe getting started shouldn't be complicated.
        </p>
        <p className="text-base text-brand-purple/75 leading-relaxed">
          Instead of having you pay for a visit, we give eligible customers access to selected pest-control products and let you do the first step yourself with an included comprehensive professional guidance to help you save money and learn to manage the issue yourself.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4 text-sm font-semibold text-brand-purple">
          <div className="p-4 bg-white rounded-xl shadow-md">
            If that solves the problem — great.
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md">
            If it doesn't, we're here for the next step.
          </div>
        </div>
      </section>

      {/* SECTION 3 — Simple Approach */}
      <section className="bg-brand-purple text-white py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-brand-green-light uppercase tracking-widest mb-2">
                A simple approach
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                The Simple Way To Deal With Pest Problems
              </h2>
              <div className="mt-6 space-y-4 text-white/80 text-base leading-relaxed">
                <p>You don't always need a professional visit on day one.</p>
                <p>That's why we've created a simple step-by-step approach.</p>
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white pt-2">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20">Try first</span>
                  <span className="text-brand-green-light font-bold">→</span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20">Monitor</span>
                  <span className="text-brand-green-light font-bold">→</span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20">Escalate if necessary</span>
                  <span className="text-brand-green-light font-bold">→</span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20">Fix the cause</span>
                </div>
                <p className="pt-2">Our platform keeps everything in one place so you know exactly what to do next.</p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onStartEligibility()}
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <span>START NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white/10 rounded-3xl p-8 border border-white/15 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-brand-green-light shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Start Free</h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1">
                    Receive UK-compliant products free. You only pay standard delivery cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-brand-green-light shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">7-Day Observation</h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1">
                    Deploy tamper-resistant stations and monitor results with our guided instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-brand-green-light shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Specialist Visit</h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1">
                    If activity persists, a certified technician attends with ultrasonic camera, heat steamer, and commercial treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — How It Works */}
      <section id="how-it-works" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-brand-green uppercase tracking-widest mb-2">
            How it works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-brand-purple/75">
            A simple, logical journey designed to help you solve pest issues without paying for an expensive call-out on day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Tell us what you're dealing with
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                Answer a few simple questions about your pest problem and property layout.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Takes 2 minutes online
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Get your product
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                If eligible, we'll send you the appropriate product. The product is free — you simply pay delivery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Tracked Royal Mail 24/48
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Monitor for 7 days
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                Follow the product instructions and monitor the situation. Use stations along wall runs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Clear instruction manual included
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Still seeing activity?
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                No problem. If you're still seeing signs of pest activity, maybe it is because you have missed something or there is a small issue that needs to be addressed first. So you can book our £95.99 Professional Inspection &amp; Treatment.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Fixed transparent rate
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Get professional help
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                A professional will come with High Strength bait, Powerful ultrasonic inspection camera, Heat Steamer (for stubborn bedbugs), golf size proofing materials and properly inspect the property, assess the situation and carry out appropriate treatment where applicable.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Certified UK pest technicians
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-purple">
                Fix the underlying problem
              </h3>
              <p className="mt-2 text-sm text-brand-purple/75 leading-relaxed">
                If potential entry points are identified, we can also recommend proofing so rodents or pests cannot re-enter.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-brand-purple/10 text-xs font-semibold text-brand-green">
              Long-term exclusion work
            </div>
          </div>

        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onStartEligibility()}
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>CLICK TO GET YOUR FREE PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 4 — £95.99 Professional Service */}
      <section id="professional-treatment" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl bg-white shadow-lg border border-brand-purple/10 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
                £95.99 professional service
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">
                Still Seeing Rats or Mice?
              </h2>
              <p className="text-brand-purple/75 text-base leading-relaxed">
                If you've followed the instructions and you're still seeing signs of activity, don't keep guessing.
              </p>
              <p className="text-brand-purple/75 text-base leading-relaxed">
                Our professional service gives you the opportunity to have the property inspected and the situation assessed by a professional.
              </p>

              <div className="pt-2">
                <div className="text-sm font-bold text-brand-purple mb-3">
                  Professional Inspection &amp; Treatment — £95.99 includes:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-brand-purple/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Property inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>High Strength bait</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Powerful ultrasonic inspection camera</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Heat Steamer (for stubborn bedbugs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Golf size proofing materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Assessment of signs of activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Identification of likely activity areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Review of previous treatment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Appropriate professional treatment where applicable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Recommendations for next steps</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Assessment of potential entry points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xl border border-brand-purple/10 text-center space-y-4">
              <div className="text-xs font-bold text-brand-purple/50 uppercase tracking-widest">
                Transparent single fee
              </div>
              <div className="text-6xl font-black text-brand-purple tracking-tight">
                £95.99
              </div>
              <div className="text-sm font-bold text-brand-purple">
                Professional Inspection &amp; Treatment
              </div>
              <p className="text-xs text-brand-purple/70 leading-relaxed max-w-xs mx-auto">
                A professional attends your property, inspects with specialized camera tech, applies high-strength treatment, and provides recommendations.
              </p>
              <button
                type="button"
                onClick={onBookProfessional}
                className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                BOOK FOR ONLY £95.99
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — Proofing */}
      <section id="proofing" className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
              Proofing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight leading-tight">
              Don't Just Treat the Problem. Look for the Way In.
            </h2>
            <p className="text-brand-purple/75 text-base leading-relaxed">
              Rodents can enter buildings through surprisingly small gaps.
            </p>
            <p className="text-brand-purple/75 text-base leading-relaxed">
              If our professional inspection identifies potential access points, we can recommend proofing and exclusion work.
            </p>
            <p className="text-brand-purple/75 text-base leading-relaxed">
              That means addressing potential routes into the property rather than simply dealing with the current activity.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onBookProfessional}
                className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all cursor-pointer"
              >
                <span>LEARN ABOUT PROOFING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-brand-purple/10 space-y-4">
            <h3 className="font-bold text-brand-purple text-lg">
              Potential Entry Points We Inspect:
            </h3>
            <div className="space-y-3 text-sm text-brand-purple/80">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-purple/10 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                <span><strong className="text-brand-purple">Gaps around pipes:</strong> Waste lines, drain breaches, radiator feeds.</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-purple/10 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                <span><strong className="text-brand-purple">Openings around doors:</strong> Thresholds, worn draft excluders, frame gaps.</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-purple/10 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                <span><strong className="text-brand-purple">Damaged vents:</strong> Subfloor air bricks lacking stainless mesh screens.</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-purple/10 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                <span><strong className="text-brand-purple">Gaps in walls &amp; roofline:</strong> Mortar cavities, soffit boards, fascia.</span>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-purple/10 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-green mt-2 shrink-0" />
                <span><strong className="text-brand-purple">Damaged grilles:</strong> Broken cellar covers, uncapped drains.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs & Identification Guide */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-brand-purple/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
              Signs &amp; identification guide
            </div>
            <h2 className="text-3xl font-extrabold text-brand-purple">
              Signs of Activity by Pest
            </h2>
            <p className="text-sm text-brand-purple/70">
              Select your pest to view typical indications and next recommended action.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'rats-mice', label: 'Rats & Mice' },
              { id: 'bedbugs', label: 'Bedbugs' },
              { id: 'cockroaches', label: 'Cockroaches' },
              { id: 'foxes', label: 'Foxes' },
              { id: 'ants', label: 'Ants' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePestTab(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activePestTab === tab.id
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'bg-white text-brand-purple border border-brand-purple/20 hover:bg-brand-purple/5'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-purple/10 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-brand-purple">{currentPest.headline}</h3>
                <p className="text-xs text-brand-purple/70 mt-0.5">{currentPest.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onStartEligibility(currentPest.name as PestType)}
                className="px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                Claim Free {currentPest.name} Kit →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentPest.signs.map((sign, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white text-xs text-brand-purple/80 border border-brand-purple/10 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQs */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-bold text-brand-green uppercase tracking-widest">
            Frequently asked questions
          </div>
          <h2 className="text-3xl font-extrabold text-brand-purple">
            FAQs
          </h2>
          <p className="text-sm text-brand-purple/70">
            Clear answers to common questions about eligibility, products, and our £95.99 service.
          </p>
        </div>

        <div className="space-y-6">
          {FAQ_DATA.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h3 className="text-xs font-bold text-brand-purple/50 uppercase tracking-wider">
                {cat.category}
              </h3>
              <div className="space-y-2.5">
                {cat.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = activeFaq === key;
                  return (
                    <div
                      key={qIdx}
                      className="bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(key)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-brand-purple text-sm hover:text-brand-green transition-colors cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-green' : 'text-brand-purple/40'}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-brand-purple/75 leading-relaxed border-t border-brand-purple/10 pt-3 bg-white">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-purple text-white p-8 sm:p-14 text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-white/80 text-base max-w-xl mx-auto">
            Get your eligible pest-control products today.
          </p>
          <div className="mt-2 text-xl font-bold tracking-wide text-brand-green-light">
            FREE PRODUCT + DELIVERY
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onStartEligibility()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              CHECK ELIGIBILITY
            </button>
            <button
              type="button"
              onClick={onBookProfessional}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 font-semibold text-sm transition-all border border-white/30 cursor-pointer"
            >
              BOOK £95.99 VISIT
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};