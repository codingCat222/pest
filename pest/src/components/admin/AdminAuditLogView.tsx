import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import { ScrollText, Search } from 'lucide-react';

interface AdminAuditLogViewProps {
    cases: CaseRecord[];
}

interface AuditEntry {
    caseRef: string;
    customerName: string;
    title: string;
    date: string;
    details?: string;
}

export const AdminAuditLogView: React.FC<AdminAuditLogViewProps> = ({ cases }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const entries: AuditEntry[] = cases
        .flatMap((c) =>
            c.timeline.map((t) => ({
                caseRef: c.referenceNumber,
                customerName: c.customerName,
                title: t.title,
                date: t.date,
                details: t.details,
            }))
        )
        // Most recent-looking entries first; "Just now" entries (fresh overrides) always float to top.
        .sort((a, b) => (a.date === 'Just now' ? -1 : b.date === 'Just now' ? 1 : 0));

    const filtered = entries.filter(
        (e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.caseRef.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit Log</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Every recorded event and stage change across all customer cases
                    </p>
                </div>
                <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search case, customer, or event..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-72 focus:outline-none focus:border-blue-600"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <ScrollText className="w-3.5 h-3.5" />
                    {filtered.length} recorded {filtered.length === 1 ? 'event' : 'events'}
                </div>

                <div className="divide-y divide-slate-100">
                    {filtered.map((e, i) => (
                        <div key={i} className="py-3.5 flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900">{e.title}</div>
                                {e.details && (
                                    <div className="text-[11px] text-slate-500 mt-0.5">{e.details}</div>
                                )}
                                <div className="text-[11px] text-slate-400 mt-1">
                                    {e.customerName} • <span className="font-mono">{e.caseRef}</span>
                                </div>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 shrink-0 whitespace-nowrap">
                                {e.date}
                            </span>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="py-10 text-center text-slate-400 text-sm">
                            No audit entries match your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};