import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PestType, ActivityLocation } from '../types';

interface HeroProps {
  onStartEligibility: (pest?: PestType, location?: ActivityLocation) => void;
  onBookProfessional: () => void;
}

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

        {/* Hero panel */}
        <div
          className="rounded-3xl md:rounded-[36px] relative overflow-hidden shadow-2xl min-h-[560px] sm:min-h-[620px] flex items-end"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(59,15,122,0.94) 0%, rgba(59,15,122,0.78) 40%, rgba(59,15,122,0.28) 75%, rgba(59,15,122,0.05) 100%), url('/Images/technician.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 max-w-2xl p-7 sm:p-12 md:p-16">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Get pest-free,
              <br />
              starting with a free
              <br />
              product
            </h1>

            <p className="mt-6 text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">
              Tell us what you're dealing with. If you're eligible, we'll send the
              right product free — you just cover delivery. Monitor it for 7 days,
              escalate only if you need to.
            </p>

            {/* Toggle */}
            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveToggle('free')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${activeToggle === 'free'
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
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${activeToggle === 'visit'
                    ? 'bg-white text-brand-purple border-white shadow-md'
                    : 'bg-transparent text-white border-white/40 hover:bg-white/10'
                  }`}
              >
                Book <span className="text-brand-green-light font-semibold">£99</span> visit
              </button>
            </div>

            {/* Eligibility bar */}
            <div className="mt-4 bg-white text-brand-purple rounded-2xl md:rounded-full p-2 sm:p-2.5 shadow-2xl max-w-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2">

              <div className="flex-1 px-4 py-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-green mb-0.5">
                  PEST
                </label>
                <select
                  value={selectedPest}
                  onChange={(e) => setSelectedPest(e.target.value as PestType)}
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-brand-purple appearance-none focus:outline-none cursor-pointer"
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

              <div className="flex-1 px-4 py-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-green mb-0.5">
                  WHERE
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value as ActivityLocation)}
                  className="w-full bg-transparent text-sm sm:text-base font-semibold text-brand-purple appearance-none focus:outline-none cursor-pointer"
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
                className="bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm px-6 py-3.5 rounded-xl md:rounded-full inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Check Eligibility</span>
              </button>
            </div>

            <p className="mt-4 text-xs text-white/70 leading-normal max-w-xl">
              Eligibility, product availability and delivery charges apply. Products must be used strictly in accordance with their instructions.
            </p>

            {/* Quick pest pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {(['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes'] as PestType[]).map((pest) => (
                <button
                  key={pest}
                  type="button"
                  onClick={() => handlePestQuickClick(pest)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-xs sm:text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  <span>{pest === 'Rats or mice' ? 'Rats & Mice' : pest} →</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Trust stats */}
        <div className="mt-14">
          <p className="text-center text-xs font-bold tracking-widest text-brand-purple/50 uppercase mb-8">
            TRUSTED BY HOMEOWNERS ACROSS THE UK
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">7 days</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Free monitoring period</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">£99</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Professional visit if needed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">£0</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Product cost, pay delivery only</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-purple tracking-tight">5 pests</div>
              <div className="mt-1 text-xs sm:text-sm text-brand-green font-semibold">Covered: rats, mice, bedbugs, roaches, foxes</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};