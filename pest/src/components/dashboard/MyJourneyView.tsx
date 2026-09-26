import React, { useState } from 'react';
import { CaseRecord, CustomerNavTab } from '../../types';
import { CheckCircle2, ChevronDown, ChevronRight, Package, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface MyJourneyViewProps {
  activeCase: CaseRecord;
  onNavigateTab: (tab: CustomerNavTab) => void;
  onOpenReportModal: () => void;
}

export const MyJourneyView: React.FC<MyJourneyViewProps> = ({
  activeCase,
  onNavigateTab,
  onOpenReportModal
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(4);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Pest-Control Journey
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {activeCase.propertyName} • {activeCase.propertyAddress}, {activeCase.postcode}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Milestone
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              Monitoring — Day {activeCase.monitoringDay} of {activeCase.monitoringDaysTotal}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenReportModal}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
          >
            Submit Day {activeCase.monitoringDay} Report
          </button>
        </div>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {activeCase.timeline.map((step, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div key={idx} className="relative flex items-start gap-4">
                <div className={`absolute -left-[27px] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step.completed 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : step.current 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {step.completed ? '✓' : idx + 1}
                </div>

                <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200/80 transition-all overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{step.title}</span>
                        {step.current && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{step.date}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-200/50 space-y-2">
                      <p className="leading-relaxed">{step.details || 'Step completed in accordance with platform guidelines.'}</p>
                      
                      {step.title.includes('Product Delivered') && (
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onNavigateTab('orders')}
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            View Order Record →
                          </button>
                        </div>
                      )}

                      {step.title.includes('Monitoring') && (
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onNavigateTab('monitoring')}
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            Open Activity Log →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
