import React, { useState } from 'react';
import { CaseRecord, CaseStatus } from '../../types';
import { Search, RefreshCw } from 'lucide-react';

interface AdminCasesViewProps {
    cases: CaseRecord[];
    activeCase: CaseRecord;
    onUpdateCase: (updated: CaseRecord) => void;
    onSelectCase: (c: CaseRecord) => void;
}

export const AdminCasesView: React.FC<AdminCasesViewProps> = ({
    cases,
    activeCase,
    onUpdateCase,
    onSelectCase,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatusOverride, setSelectedStatusOverride] = useState<CaseStatus>(activeCase.status);
    const [statusUpdated, setStatusUpdated] = useState(false);

    const handleApplyOverride = () => {
        const updated: CaseRecord = {
            ...activeCase,
            status: selectedStatusOverride,
            timeline: [
                ...activeCase.timeline,
                {
                    title: `Admin Override: ${selectedStatusOverride}`,
                    date: 'Just now',
                    completed: true,
                    details: `Case stage adjusted by operations coordinator.`,
                },
            ],
        };
        onUpdateCase(updated);
        setStatusUpdated(true);
        setTimeout(() => setStatusUpdated(false), 2500);
    };

    const filteredCases = cases.filter(
        (c) =>
            c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Case Directory</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    Inspect and manage every active customer case
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">
                            Directory of Active Customer Cases
                        </h2>
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="Search customer, ref, or address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                                    <th className="py-3 px-3">Reference</th>
                                    <th className="py-3 px-3">Customer &amp; Site</th>
                                    <th className="py-3 px-3">Pest</th>
                                    <th className="py-3 px-3">Stage Status</th>
                                    <th className="py-3 px-3 text-right">Inspect</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCases.map((c) => (
                                    <tr
                                        key={c.id}
                                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${c.id === activeCase.id ? 'bg-blue-50/50' : ''
                                            }`}
                                        onClick={() => onSelectCase(c)}
                                    >
                                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                                            {c.referenceNumber}
                                        </td>
                                        <td className="py-3 px-3">
                                            <div className="font-semibold text-slate-900">{c.customerName}</div>
                                            <div className="text-[10px] text-slate-400">{c.propertyAddress}</div>
                                        </td>
                                        <td className="py-3 px-3">
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-medium">
                                                {c.pest}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3">
                                            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded text-[11px]">
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-right font-bold text-blue-600 hover:underline">
                                            Select
                                        </td>
                                    </tr>
                                ))}
                                {filteredCases.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-400">
                                            No cases match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            Operational Control
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                            Case #{activeCase.referenceNumber}
                        </h3>
                        <div className="text-xs text-slate-500">
                            {activeCase.customerName} • {activeCase.propertyAddress}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-3">
                        <div className="font-bold text-blue-950 text-[11px] uppercase tracking-wider">
                            Workflow Stage Override
                        </div>

                        <select
                            value={selectedStatusOverride}
                            onChange={(e) => setSelectedStatusOverride(e.target.value as CaseStatus)}
                            className="w-full p-2.5 rounded-xl border border-blue-300 bg-white font-medium text-xs"
                        >
                            <option value="MONITORING">MONITORING (7-Day Check-in)</option>
                            <option value="ACTIVITY_REPORTED">ACTIVITY_REPORTED (Needs Callout)</option>
                            <option value="PROFESSIONAL_BOOKED">PROFESSIONAL_BOOKED (£99 Active)</option>
                            <option value="PROFESSIONAL_COMPLETED">PROFESSIONAL_COMPLETED</option>
                            <option value="PROOFING_RECOMMENDED">PROOFING_RECOMMENDED (Quote Sent)</option>
                            <option value="PROOFING_ACCEPTED">PROOFING_ACCEPTED (Works Approved)</option>
                            <option value="RESOLVED">RESOLVED (Pest Ceased)</option>
                        </select>

                        <button
                            type="button"
                            onClick={handleApplyOverride}
                            className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Apply Stage Change</span>
                        </button>

                        {statusUpdated && (
                            <div className="text-[11px] font-bold text-emerald-700 text-center">
                                ✓ Case state successfully updated and audit trail logged.
                            </div>
                        )}
                    </div>

                    {activeCase.technicianName && (
                        <div className="text-xs space-y-1">
                            <div className="font-bold text-slate-800">Assigned Technician</div>
                            <div className="text-slate-600">{activeCase.technicianName}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};