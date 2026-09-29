import React, { useEffect, useState } from 'react';
import { CaseRecord } from '../../types';
import { ScrollText, Search } from 'lucide-react';
import { AdminService, AuditLogEntry } from '../../services/admin';
import { apiErrorMessage } from '../../services/format';

interface AdminAuditLogViewProps {
    cases: CaseRecord[];
}

const PAGE_SIZE = 25;

const trim = (value: string, max: number) => (value.length > max ? `${value.slice(0, max)}…` : value);

export const AdminAuditLogView: React.FC<AdminAuditLogViewProps> = ({ cases }) => {
    const [tab, setTab] = useState<'actions' | 'events'>('actions');
    const [searchQuery, setSearchQuery] = useState('');
    const [entries, setEntries] = useState<AuditLogEntry[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        AdminService.getAuditLog({ page, pageSize: PAGE_SIZE })
            .then((data) => {
                if (cancelled) return;
                setEntries(data.entries);
                setTotal(data.total);
            })
            .catch((err) => {
                if (!cancelled) setError(apiErrorMessage(err, 'Unable to load the audit log.'));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [page]);

    const q = searchQuery.toLowerCase();

    const filteredEntries = entries.filter(
        (e) =>
            e.action.toLowerCase().includes(q) ||
            e.entityType.toLowerCase().includes(q) ||
            (e.user?.fullName ?? '').toLowerCase().includes(q) ||
            (e.user?.email ?? '').toLowerCase().includes(q)
    );

    const caseEvents = cases
        .flatMap((c) =>
            [...c.timeline].reverse().map((t) => ({
                caseRef: c.referenceNumber,
                customerName: c.customerName,
                title: t.title,
                date: t.date,
                details: t.details,
            }))
        )
        .filter(
            (e) =>
                e.title.toLowerCase().includes(q) ||
                e.customerName.toLowerCase().includes(q) ||
                e.caseRef.toLowerCase().includes(q)
        );

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit Log</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Who changed what, plus every recorded event on customer cases
                    </p>
                </div>
                <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-72 focus:outline-none focus:border-blue-600"
                    />
                </div>
            </div>

            <div className="flex gap-2">
                {(['actions', 'events'] as const).map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setTab(t)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${tab === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {t === 'actions' ? 'Staff & system actions' : 'Case events'}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                {tab === 'actions' && (
                    <>
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <ScrollText className="w-3.5 h-3.5" />
                            {total} recorded {total === 1 ? 'action' : 'actions'}
                        </div>

                        {loading && <div className="py-10 text-center text-slate-400 text-sm">Loading...</div>}
                        {!loading && error && <div className="py-10 text-center text-red-600 text-sm font-semibold">{error}</div>}

                        {!loading && !error && (
                            <div className="divide-y divide-slate-100">
                                {filteredEntries.map((e) => (
                                    <div key={e.id} className="py-3.5 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-slate-900">
                                                {e.entityType} · {e.action.replace(/_/g, ' ').toLowerCase()}
                                            </div>
                                            {e.details && e.details !== '{}' && (
                                                <div className="text-[11px] text-slate-500 mt-0.5 font-mono break-all" title={e.details}>
                                                    {trim(e.details, 140)}
                                                </div>
                                            )}
                                            <div className="text-[11px] text-slate-400 mt-1">
                                                {e.user ? `${e.user.fullName} (${e.user.role.toLowerCase()})` : 'System'}
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-400 shrink-0 whitespace-nowrap">
                                            {new Date(e.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}
                                {filteredEntries.length === 0 && (
                                    <div className="py-10 text-center text-slate-400 text-sm">
                                        {total === 0 ? 'No actions have been recorded yet.' : 'No entries on this page match your search.'}
                                    </div>
                                )}
                            </div>
                        )}

                        {!loading && !error && total > PAGE_SIZE && (
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                                <button
                                    type="button"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 disabled:opacity-40 cursor-pointer"
                                >
                                    Previous
                                </button>
                                <span className="text-slate-500">Page {page} of {totalPages}</span>
                                <button
                                    type="button"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 disabled:opacity-40 cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

                {tab === 'events' && (
                    <>
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <ScrollText className="w-3.5 h-3.5" />
                            {caseEvents.length} recorded {caseEvents.length === 1 ? 'event' : 'events'}
                        </div>
                        <div className="divide-y divide-slate-100">
                            {caseEvents.map((e, i) => (
                                <div key={i} className="py-3.5 flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-slate-900">{e.title}</div>
                                        {e.details && <div className="text-[11px] text-slate-500 mt-0.5">{e.details}</div>}
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            {e.customerName} • <span className="font-mono">{e.caseRef}</span>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-400 shrink-0 whitespace-nowrap">{e.date}</span>
                                </div>
                            ))}
                            {caseEvents.length === 0 && (
                                <div className="py-10 text-center text-slate-400 text-sm">No case events to show.</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};