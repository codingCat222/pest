import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, Check, X, HelpCircle, FileText, Download } from 'lucide-react';

interface ProofingViewProps {
  activeCase: CaseRecord;
  onUpdateCase: (updated: CaseRecord) => void;
}

export const ProofingView: React.FC<ProofingViewProps> = ({
  activeCase,
  onUpdateCase
}) => {
  const quote = activeCase.proofingQuote;
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleAction = (status: 'accepted' | 'declined') => {
    if (!quote) return;
    const updated: CaseRecord = {
      ...activeCase,
      status: status === 'accepted' ? 'PROOFING_ACCEPTED' : activeCase.status,
      proofingQuote: {
        ...quote,
        status,
        acceptedAt: status === 'accepted' ? 'Today' : undefined
      },
      timeline: [
        ...activeCase.timeline,
        {
          title: status === 'accepted' ? 'Proofing Quote Accepted' : 'Proofing Quote Declined',
          date: 'Today',
          completed: true,
          details: status === 'accepted' 
            ? `Customer accepted quotation ${quote.reference} (£${quote.total.toFixed(2)}). Works scheduled.`
            : `Customer declined quotation ${quote.reference}.`
        }
      ]
    };
    onUpdateCase(updated);
    setFeedbackMessage(status === 'accepted' ? 'Proofing quotation accepted! Our operations team will contact you to confirm materials fitting date.' : 'Quote has been marked as declined.');
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Proofing &amp; Structural Exclusion
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Inspection findings and quotations to seal physical ingress routes into {activeCase.propertyName}.
        </p>
      </div>

      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
          <span>{feedbackMessage}</span>
          <button type="button" onClick={() => setFeedbackMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {quote ? (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Proofing Assessment
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Potential Entry Points Identified
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  {(quote.findings || []).length} structural breaches require attention.
                </div>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
                quote.status === 'accepted'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : quote.status === 'declined'
                  ? 'bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {quote.status === 'accepted' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                <span>Status: {quote.status.toUpperCase()}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(quote.findings || []).map((f) => (
                <div key={f.id} className="rounded-xl border border-slate-200/80 bg-slate-50 overflow-hidden flex flex-col justify-between">
                  <div className="h-36 bg-slate-200 overflow-hidden relative">
                    <img 
                      src={f.imageUrl} 
                      alt={f.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                      {f.severity} priority
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{f.title}</div>
                      <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{f.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 mt-3 text-[11px] text-blue-900 font-medium">
                      <strong>Recommended work:</strong> {f.recommendedWork}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quotation Summary</span>
                <h3 className="text-xl font-bold text-slate-900">Proofing Quote #{quote.reference}</h3>
              </div>
              <div className="text-xs text-slate-500">
                Valid until: <strong className="text-slate-800">{quote.validUntil}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {quote.technicianExplanation}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Materials (stainless steel mesh, acoustic copper expanding matrix, air brick cowls):</span>
                <span className="font-mono text-slate-900 font-semibold">£{(quote.materialsCost ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Certified Technician Labour &amp; Fitting:</span>
                <span className="font-mono text-slate-900 font-semibold">£{(quote.labourCost ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Net):</span>
                <span className="font-mono text-slate-900 font-semibold">£{(quote.subtotal ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (20%):</span>
                <span className="font-mono text-slate-900 font-semibold">£{quote.vat.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-slate-900 text-base">
                <span>Total Amount:</span>
                <span className="text-xl font-mono text-slate-900">£{quote.total.toFixed(2)}</span>
              </div>
            </div>

            {quote.status === 'pending' ? (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleAction('accepted')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Accept Quote (£{quote.total.toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => handleAction('declined')}
                  className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => alert('Support enquiry sent for Quote ' + quote.reference + '. A technical lead will phone you back.')}
                  className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Ask a Question
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Quote #{quote.reference} marked as <strong>{quote.status}</strong>.</span>
                <button
                  type="button"
                  onClick={() => alert('Downloading official PDF quotation...')}
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 text-center space-y-4 shadow-xs">
          <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">No Proofing Required at this Time</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Proofing opportunities and structural quotation records are generated following an onsite inspection by a certified technician.
          </p>
        </div>
      )}

    </div>
  );
};
