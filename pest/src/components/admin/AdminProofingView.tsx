import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import { ShieldAlert, Plus, X } from 'lucide-react';
import { AdminService } from '../../services/admin';
import { apiErrorMessage } from '../../services/format';

interface AdminProofingViewProps {
    cases: CaseRecord[];
    onSelectCase: (c: CaseRecord) => void;
    onCasesChanged: () => void;
}

const statusStyle: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    accepted: 'bg-emerald-50 text-emerald-700',
    declined: 'bg-red-50 text-red-700',
};

const inputClass =
    'w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600';

const defaultValidUntil = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
};

export const AdminProofingView: React.FC<AdminProofingViewProps> = ({ cases, onSelectCase, onCasesChanged }) => {
    const quoted = cases.filter((c) => c.proofingQuote);
    const quotable = cases.filter(
        (c) => !c.proofingQuote && !['RESOLVED', 'CLOSED', 'CANCELLED'].includes(c.status)
    );

    const [formOpen, setFormOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [form, setForm] = useState({
        caseId: '',
        description: '',
        technicianExplanation: '',
        findings: '',
        materials: '',
        materialsCost: '',
        labourCost: '',
        vat: '',
        validUntil: defaultValidUntil(),
    });

    const setField = (key: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const openForm = () => {
        setFormError(null);
        setForm({
            caseId: quotable[0]?.id ?? '',
            description: '',
            technicianExplanation: '',
            findings: '',
            materials: '',
            materialsCost: '',
            labourCost: '',
            vat: '',
            validUntil: defaultValidUntil(),
        });
        setFormOpen(true);
    };

    const number = (v: string) => (v.trim() === '' ? 0 : parseFloat(v));
    const materialsCost = number(form.materialsCost);
    const labourCost = number(form.labourCost);
    const vat = number(form.vat);
    const formTotal = materialsCost + labourCost + vat;

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!form.caseId || !form.description.trim() || !form.technicianExplanation.trim()) {
            setFormError('Choose a case and fill in the description and technician explanation.');
            return;
        }
        if ([materialsCost, labourCost, vat].some((n) => isNaN(n) || n < 0)) {
            setFormError('Costs must be valid numbers of zero or more.');
            return;
        }
        if (formTotal <= 0) {
            setFormError('The quote total must be greater than zero.');
            return;
        }
        setSaving(true);
        try {
            await AdminService.createProofingQuote({
                caseId: form.caseId,
                description: form.description.trim(),
                technicianExplanation: form.technicianExplanation.trim(),
                findings: form.findings
                    .split('\n')
                    .map((l) => l.trim())
                    .filter(Boolean)
                    .map((l) => {
                        const [label, ...rest] = l.split('|');
                        return { label: label.trim(), detail: rest.join('|').trim() || undefined };
                    }),
                materials: form.materials.trim() || undefined,
                materialsCost,
                labourCost,
                vat,
                total: formTotal,
                validUntil: form.validUntil,
            });
            setFormOpen(false);
            onCasesChanged();
        } catch (err) {
            setFormError(apiErrorMessage(err, 'Unable to create the quote.'));
        } finally {
            setSaving(false);
        }
    };

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
                <div className="flex gap-3 items-center">
                    <button
                        type="button"
                        onClick={openForm}
                        disabled={quotable.length === 0}
                        title={quotable.length === 0 ? 'No open cases without a quote' : undefined}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                    >
                        <Plus className="w-3.5 h-3.5" /> New quote
                    </button>
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

            {formOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <form
                        onSubmit={handleCreate}
                        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">New proofing quote</h2>
                            <button type="button" onClick={() => setFormOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" aria-label="Close">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Case
                            <select className={inputClass} value={form.caseId} onChange={setField('caseId')}>
                                {quotable.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.referenceNumber} · {c.customerName} · {c.propertyAddress}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Description
                            <textarea rows={2} className={inputClass} value={form.description} onChange={setField('description')} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Technician explanation
                            <textarea rows={3} className={inputClass} value={form.technicianExplanation} onChange={setField('technicianExplanation')} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Findings (one per line, optional detail after a | )
                            <textarea rows={3} className={inputClass} value={form.findings} onChange={setField('findings')} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Materials
                            <input className={inputClass} value={form.materials} onChange={setField('materials')} />
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Materials (£)
                                <input className={inputClass} inputMode="decimal" value={form.materialsCost} onChange={setField('materialsCost')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Labour (£)
                                <input className={inputClass} inputMode="decimal" value={form.labourCost} onChange={setField('labourCost')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                VAT (£)
                                <input className={inputClass} inputMode="decimal" value={form.vat} onChange={setField('vat')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Valid until
                                <input type="date" className={inputClass} value={form.validUntil} onChange={setField('validUntil')} />
                            </label>
                        </div>
                        <div className="text-sm font-bold text-slate-900">Total: £{isNaN(formTotal) ? '0.00' : formTotal.toFixed(2)}</div>

                        {formError && <p className="text-xs font-semibold text-red-600">{formError}</p>}

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60">
                                {saving ? 'Sending...' : 'Send quote'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};