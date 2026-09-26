import React from 'react';
import { CaseRecord } from '../../types';
import { ShieldAlert } from 'lucide-react';

interface AdminProofingViewProps {
    cases: CaseRecord[];
    onSelectCase: (c: CaseRecord) => void;
}

const statusStyle: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    accepted: 'bg-emerald-50 text-emerald-700',
    declined: 'bg-red-50 text-red-700',
};

export const AdminProofingView: React.FC<AdminProofingViewProps> = ({ cases, onSelectCase }) => {
    const quoted = cases.filter((c) => c.proofingQuote);

    const totalValue = quoted.reduce((sum, c) => sum + (c.proofingQuote?.total || 0), 0);
    const acceptedValue = quoted
        .filter((c) => c.proofingQuote?.status === 'accepted')
        .reduce((sum, c) => sum + (c.proofingQuote?.total || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Proofing Quotes</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Quotations issued for identified pest entry points
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Total Quoted</div>
                        <div className="text-lg font-black text-slate-900 font-mono">£{totalValue.toFixed(2)}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Accepted</div>
                        <div className="text-lg font-black text-emerald-600 font-mono">£{acceptedValue.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            {quoted.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-10 text-center text-sm text-slate-400">
                    No proofing quotes have been issued yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quoted.map((c) => {
                        const q = c.proofingQuote!;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => onSelectCase(c)}
                                className="text-left bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3 hover:border-blue-300 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <ShieldAlert className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-900">{c.customerName}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{c.referenceNumber}</div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${statusStyle[q.status]}`}>
                                        {q.status}
                                    </span>
                                </div>

                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                                    {q.description}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                                    <span className="font-black text-slate-900">£{q.total.toFixed(2)}</span>
                                    <span className="text-[10px] text-slate-400">Valid until {q.validUntil}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};