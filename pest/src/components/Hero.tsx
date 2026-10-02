import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { PestType, ActivityLocation } from '../types';

interface HeroProps {
  onStartEligibility: (pest?: PestType, location?: ActivityLocation) => void;
  onBookProfessional: () => void;
}

const HERO_IMAGE = '/Images/image.png';

export const Hero: React.FC<HeroProps> = ({
  onStartEligibility,
  onBookProfessional
}) => {
  const [selectedPest, setSelectedPest] = useState<PestType>('Rats or mice');
  const [selectedLocation, setSelectedLocation] = useState<ActivityLocation>('Inside my home');
  const [activeToggle, setActiveToggle] = useState<'free' | 'visit'>('free');

  const handleAction = () => {
    if (activeToggle === 'free') {
      onStartEligibility(selectedPest, selectedLocation);
    } else {
      onBookProfessional();
    }
  };

  const handlePestQuickClick = (pest: PestType) => {
    setSelectedPest(pest);
    onStartEligibility(pest, selectedLocation);
  };

  return (
    <section className="pt-4 pb-14 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Announcement banner */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-purple/10 rounded-full px-3.5 py-1.5 inline-flex items-center gap-2.5 text-xs sm:text-sm">
            <span className="bg-brand-purple text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              NEW
            </span>
            <span className="text-brand-purple font-medium">
              Now covering Bedbugs, Cockroaches &amp; Foxes
            </span>
          </div>
          <button
            type="button"
            onClick={() => onStartEligibility()}
            className="text-brand-green text-sm font-semibold underline underline-offset-2 hover:text-brand-green-dark transition-colors cursor-pointer"
          >
            See eligible pests →
          </button>
        </div>

        {/* ========== OLD HERO PANEL (purple bg + split layout) — commented out ==========
        <div className="rounded-3xl md:rounded-[36px] relative overflow-hidden shadow-2xl bg-brand-purple grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-stretch min-h-[520px]">
          <div className="relative z-10 max-w-2xl p-7 sm:p-12 lg:p-14 lg:pr-6 flex flex-col justify-center">

            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.12]">
              Pest Problem?
              <br />
              Start Free.
            </h1>

            <p className="mt-5 text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">
              We believe not all pest problems require a call out. So why not get
              the products and guideline to try it yourself first for free. If you
              then need a hand, our experts can step in for a flat £95.99 –
              with additional services available when required.
            </p>

            <div className="mt-7 flex items-center gap-2">
              <button type="button" onClick={() => setActiveToggle('free')} className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${activeToggle === 'free' ? 'bg-white text-brand-purple border-white shadow-md' : 'bg-transparent text-white border-white/40 hover:bg-white/10'}`}>Free product</button>
              <button type="button" onClick={() => { setActiveToggle('visit'); onBookProfessional(); }} className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${activeToggle === 'visit' ? 'bg-white text-brand-purple border-white shadow-md' : 'bg-transparent text-white border-white/40 hover:bg-white/10'}`}>Book <span className="text-brand-green-light font-semibold">£95.99</span> visit</button>
            </div>

            <div className="mt-4 bg-white text-brand-purple rounded-2xl md:rounded-full p-2 sm:p-2.5 shadow-2xl max-w-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2">
              ...eligibility bar...
            </div>

            <p className="mt-4 text-xs text-white/70 leading-normal max-w-xl">
              Eligibility, product availability and delivery charges apply.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              ...quick pest pills...
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img src={HERO_IMAGE} alt="Pest control products" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-purple/40 to-transparent" />
          </div>
          <div className="lg:hidden w-full h-56 sm:h-72 relative">
            <img src={HERO_IMAGE} alt="Pest control products" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 to-transparent" />
          </div>
        </div>
        ========== END OLD HERO PANEL ========== */}

        {/* ========== NEW HERO PANEL — full background image with overlay ========== */}
        <div className="rounded-3xl md:rounded-[36px] relative overflow-hidden shadow-2xl min-h-[480px]">
          {/* Background image */}
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content on top */}
          <div className="relative z-10 max-w-2xl p-7 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[480px]">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
              Pest Problem?
              <br />
              Start Free.
            </h1>

            <p className="mt-3 text-white text-base sm:text-lg font-semibold max-w-lg leading-snug">
              Get professional-grade pest-control products FREE — just pay delivery.
            </p>

            <p className="mt-3 text-white/85 text-sm sm:text-base max-w-lg leading-relaxed">
              We believe not all pest problems require a call out. So why not get
              the products and guideline to try it yourself first for free. If you
              then need a hand, our experts can step in for a flat £95.99 –
              with additional services available when required.
            </p>

            {/* Service area panel */}
            <div className="mt-5 max-w-lg rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
                </span>
                <MapPin className="w-4 h-4 text-brand-green-light" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white">
                  Service available now in these postcodes
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {['SM', 'CR', 'SW', 'SE', 'W', 'BR', 'EC'].map((code) => (
                  <span
                    key={code}
                    className="min-w-[2.75rem] text-center px-3 py-1.5 rounded-lg bg-brand-green text-white text-sm font-extrabold tracking-wide shadow-sm"
                  >
                    {code}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-lg border border-dashed border-white/40 text-white/80 text-xs font-semibold">
                  More coming soon
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => onStartEligibility(selectedPest, selectedLocation)}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                GET MY FREE PEST CONTROL KIT
              </button>
              <p className="mt-2 text-[11px] font-bold tracking-widest text-white/70 uppercase">
                Free product · Pay delivery only
              </p>
            </div>

            {/* Toggle */}
            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveToggle('free')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${activeToggle === 'free'
                  ? 'bg-white text-brand-purple border-white shadow-md'
                  : 'bg-transparent text-white border-white/40 hover:bg-white/10'
                  }`}
              >
                Free product
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveToggle('visit');
                  onBookProfessional();
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${activeToggle === 'visit'
                  ? 'bg-white text-brand-purple border-white shadow-md'
                  : 'bg-transparent text-white border-white/40 hover:bg-white/10'
                  }`}
              >
                Book <span className="text-brand-green-light font-semibold">£95.99</span> visit
              </button>
            </div>

            {/* Eligibility bar */}
            <div className="mt-3 bg-white text-brand-purple rounded-2xl md:rounded-full p-2 sm:p-2.5 shadow-2xl max-w-xl flex flex-col md:flex-row items-stretch md:items-center gap-2">

              <div className="flex-1 px-3 py-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-green mb-0.5">
                  PEST
                </label>
                <select
                  value={selectedPest}
                  onChange={(e) => setSelectedPest(e.target.value as PestType)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-purple appearance-none focus:outline-none cursor-pointer"
                >
                  <option value="Rats or mice">Rats or mice</option>
                  <option value="Bedbugs">Bedbugs</option>
                  <option value="Cockroaches">Cockroaches</option>
                  <option value="Foxes">Foxes</option>
                  <option value="Ants">Ants</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="hidden md:block w-px h-8 bg-brand-purple/15" />

              <div className="flex-1 px-3 py-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-green mb-0.5">
                  WHERE
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value as ActivityLocation)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-purple appearance-none focus:outline-none cursor-pointer"
                >
                  <option value="Inside my home">Inside my home</option>
                  <option value="Garage">Garage</option>
                  <option value="Loft/roof space">Loft/roof space</option>
                  <option value="Garden/outside">Garden/outside</option>
                  <option value="Commercial property">Commercial property</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl md:rounded-full inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Check Eligibility</span>
              </button>
            </div>

            <p className="mt-3 text-[11px] text-white/60 leading-normal max-w-lg">
              Eligibility, product availability and delivery charges apply. Products must be used strictly in accordance with their instructions.
            </p>

            {/* Quick pest pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {(['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes'] as PestType[]).map((pest) => (
                <button
                  key={pest}
                  type="button"
                  onClick={() => handlePestQuickClick(pest)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  <span>{pest === 'Rats or mice' ? 'Rats & Mice' : pest} →</span>
                </button>
              ))}
            </div>

          </div>
        </div>
        {/* ========== END NEW HERO PANEL ========== */}

        {/* Trust stats */}
        <div className="mt-14">
          <p className="text-center text-xs font-bold tracking-widest text-brand-purple/50 uppercase mb-8">
            TRUSTED BY HOMEOWNERS ACROSS THE UK
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-5 px-3 sm:py-6 sm:px-4">
              <div className="text-xl sm:text-3xl md:text-xl lg:text-3xl xl:text-4xl font-extrabold text-brand-purple tracking-tight leading-tight break-words">7 days</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Free monitoring period</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-5 px-3 sm:py-6 sm:px-4">
              <div className="text-xl sm:text-3xl md:text-xl lg:text-3xl xl:text-4xl font-extrabold text-brand-purple tracking-tight leading-tight break-words">3 Products</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">ultrasonic repellent, bait box and traps</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-5 px-3 sm:py-6 sm:px-4">
              <div className="text-xl sm:text-3xl md:text-xl lg:text-3xl xl:text-4xl font-extrabold text-brand-purple tracking-tight leading-tight break-words">£0</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Product cost, pay delivery only</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-5 px-3 sm:py-6 sm:px-4">
              <div className="text-xl sm:text-3xl md:text-xl lg:text-3xl xl:text-4xl font-extrabold text-brand-purple tracking-tight leading-tight break-words">40% Cheaper</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">process allows savings</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};