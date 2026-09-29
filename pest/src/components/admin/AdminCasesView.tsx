import React, { useState, useEffect, useRef } from 'react';
import { CaseRecord, CaseStatus, PestType, ActivityLocation } from '../../types';
import { Search, RefreshCw, Plus, X } from 'lucide-react';
import { CasesService, CreateCasePayload } from '../../services/cases';
import { AdminService } from '../../services/admin';

interface AdminCasesViewProps {
    cases: CaseRecord[];
    activeCase: CaseRecord | null;
    onUpdateCase: (updated: CaseRecord) => void;
    onSelectCase: (c: CaseRecord) => void;
    onCaseCreated: (created: CaseRecord) => void;
}

const PEST_OPTIONS: PestType[] = ['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes', 'Ants', 'Other', 'Not sure'];
const LOCATION_OPTIONS: ActivityLocation[] = ['Inside my home', 'Garage', 'Loft/roof space', 'Garden/outside', 'Commercial property', 'Other'];

const NEW_CASE_INITIAL: CreateCasePayload = {
    propertyName: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    propertyAddress: '',
    postcode: '',
    pest: PEST_OPTIONS[0],
    location: LOCATION_OPTIONS[0],
    productName: '',
    deliveryFee: 0,
    courier: '',
};

export const AdminCasesView: React.FC<AdminCasesViewProps> = ({
    cases,
    activeCase,
    onUpdateCase,
    onSelectCase,
    onCaseCreated,
}) => {
    const [directoryCases, setDirectoryCases] = useState<CaseRecord[]>(cases);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchErrored, setSearchErrored] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [selectedStatusOverride, setSelectedStatusOverride] = useState<CaseStatus>(activeCase?.status ?? 'NEW');
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [statusError, setStatusError] = useState('');
    const [isApplyingOverride, setIsApplyingOverride] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newCase, setNewCase] = useState<CreateCasePayload>(NEW_CASE_INITIAL);
    const [createError, setCreateError] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            setIsSearching(true);
            setSearchErrored(false);
            try {
                const results = await AdminService.listCases(
                    searchQuery.trim() ? { search: searchQuery.trim() } : undefined
                );
                setDirectoryCases(results);
            } catch {
                setSearchErrored(true);
                setDirectoryCases(cases);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    useEffect(() => {
        if (activeCase) setSelectedStatusOverride(activeCase.status);
    }, [activeCase?.id, activeCase?.status]);

    const handleApplyOverride = async () => {
        if (!activeCase) return;
        setStatusError('');
        setIsApplyingOverride(true);
        try {
            const updated = await CasesService.updateStatus(activeCase.id, {
                status: selectedStatusOverride,
                note: 'Stage adjusted by operations coordinator.',
            });
            onUpdateCase(updated);
            setDirectoryCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setStatusUpdated(true);
            setTimeout(() => setStatusUpdated(false), 2500);
        } catch (err: any) {
            setStatusError(err?.response?.data?.error || 'Unable to update case status.');
        } finally {
            setIsApplyingOverride(false);
        }
    };

    const handleCreateCase = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError('');

        if (!newCase.propertyName || !newCase.customerName || !newCase.customerEmail || !newCase.customerPhone || !newCase.propertyAddress || !newCase.postcode || !newCase.productName) {
            setCreateError('Please fill in all required fields.');
            return;
        }

        setIsCreating(true);
        try {
            const created = await CasesService.create(newCase);
            onCaseCreated(created);
            setDirectoryCases((prev) => [created, ...prev]);
            setNewCase(NEW_CASE_INITIAL);
            setIsCreateOpen(false);
        } catch (err: any) {
            setCreateError(err?.response?.data?.error || 'Unable to create case.');
        } finally {
            setIsCreating(false);
        }
    };

    const filteredCases = directoryCases;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Case Directory</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Inspect and manage every active customer case
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Case</span>
                </button>
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
                            {isSearching && (
                                <span className="absolute right-3 top-2 text-[10px] font-semibold text-slate-400">...</span>
                            )}
                        </div>
                    </div>

                    {searchErrored && (
                        <p className="text-[11px] font-semibold text-red-600 -mt-2">
                            Search failed — showing last known results.
                        </p>
                    )}

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
                                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${c.id === activeCase?.id ? 'bg-blue-50/50' : ''
                                            }`}
                                        onClick={() => { onSelectCase(c); setSelectedStatusOverride(c.status); }}
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

                {activeCase ? (
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
                                disabled={isApplyingOverride}
                                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>{isApplyingOverride ? 'Applying...' : 'Apply Stage Change'}</span>
                            </button>

                            {statusUpdated && (
                                <div className="text-[11px] font-bold text-emerald-700 text-center">
                                    ✓ Case state successfully updated and audit trail logged.
                                </div>
                            )}
                            {statusError && (
                                <div className="text-[11px] font-bold text-red-600 text-center">
                                    {statusError}
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
                ) : (
                    <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs text-xs text-slate-500">
                        No case selected. Create a case or adjust your search to get started.
                    </div>
                )}
            </div>

            {isCreateOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Create New Case</h2>
                            <button
                                type="button"
                                onClick={() => { setIsCreateOpen(false); setCreateError(''); }}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateCase} className="space-y-3 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                                    <input
                                        type="text"
                                        value={newCase.customerName}
                                        onChange={(e) => setNewCase({ ...newCase, customerName: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Property Name</label>
                                    <input
                                        type="text"
                                        value={newCase.propertyName}
                                        onChange={(e) => setNewCase({ ...newCase, propertyName: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Customer Email</label>
                                    <input
                                        type="email"
                                        value={newCase.customerEmail}
                                        onChange={(e) => setNewCase({ ...newCase, customerEmail: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Customer Phone</label>
                                    <input
                                        type="tel"
                                        value={newCase.customerPhone}
                                        onChange={(e) => setNewCase({ ...newCase, customerPhone: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Property Address</label>
                                <input
                                    type="text"
                                    value={newCase.propertyAddress}
                                    onChange={(e) => setNewCase({ ...newCase, propertyAddress: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Postcode</label>
                                    <input
                                        type="text"
                                        value={newCase.postcode}
                                        onChange={(e) => setNewCase({ ...newCase, postcode: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Courier (optional)</label>
                                    <input
                                        type="text"
                                        value={newCase.courier}
                                        onChange={(e) => setNewCase({ ...newCase, courier: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Pest Type</label>
                                    <select
                                        value={newCase.pest}
                                        onChange={(e) => setNewCase({ ...newCase, pest: e.target.value as PestType })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-600"
                                    >
                                        {PEST_OPTIONS.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                                    <select
                                        value={newCase.location}
                                        onChange={(e) => setNewCase({ ...newCase, location: e.target.value as ActivityLocation })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-blue-600"
                                    >
                                        {LOCATION_OPTIONS.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        value={newCase.productName}
                                        onChange={(e) => setNewCase({ ...newCase, productName: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Delivery Fee (£)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newCase.deliveryFee}
                                        onChange={(e) => setNewCase({ ...newCase, deliveryFee: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                    />
                                </div>
                            </div>

                            {createError && (
                                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                    {createError}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                            >
                                {isCreating ? 'Creating...' : 'Create Case'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};