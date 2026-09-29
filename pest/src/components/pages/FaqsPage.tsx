import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/mockData';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqsPageProps {
  onStartEligibility: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onStartEligibility }) => {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const toggleAccordion = (catIdx: number, qIdx: number) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

        <div className="text-center space-y-4">

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Common Questions Answered
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to know about our free products, 7-day monitoring, £95.99 professional treatment, and proofing.
          </p>
        </div>

        <div className="space-y-8">
          {FAQ_DATA.map((section, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
                {section.category}
              </h2>

              <div className="space-y-2.5">
                {section.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={qIdx}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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

        <div className="bg-blue-600 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-bold">
            Still have questions?
          </h3>
          <p className="text-blue-100 text-sm max-w-md mx-auto">
            Check your eligibility now or contact our London support office on 0800 048 7291.
          </p>
          <button
            onClick={onStartEligibility}
            className="px-8 py-3.5 rounded-full bg-white text-blue-900 font-extrabold text-sm shadow-md hover:bg-slate-100 transition-all inline-flex items-center gap-2"
          >
            <span>CHECK ELIGIBILITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};