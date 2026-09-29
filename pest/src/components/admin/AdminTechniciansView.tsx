import React, { useEffect, useState } from 'react';
import { CaseRecord } from '../../types';
import { Wrench, MapPin, Plus, X } from 'lucide-react';
import { AdminService, Technician } from '../../services/admin';
import { apiErrorMessage } from '../../services/format';

interface AdminTechniciansViewProps {
    cases: CaseRecord[];
    onCasesChanged: () => void;
}

const DONE_STATUSES = ['PROFESSIONAL_COMPLETED', 'RESOLVED', 'CLOSED'];

const inputClass =
    'w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600';

export const AdminTechniciansView: React.FC<AdminTechniciansViewProps> = ({ cases, onCasesChanged }) => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
    const [formError, setFormError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [selection, setSelection] = useState<Record<string, string>>({});
    const [assigningId, setAssigningId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        AdminService.listTechnicians()
            .then((data) => {
                if (!cancelled) setTechnicians(data);
            })
            .catch((err) => {
                if (!cancelled) setLoadError(apiErrorMessage(err, 'Unable to load technicians.'));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const activeTechnicians = technicians.filter((t) => t.active);
    const needsAssignment = cases.filter((c) => c.appointmentId && !c.technicianName);

    const jobsFor = (name: string) => cases.filter((c) => c.technicianName === name);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!form.fullName.trim() || !form.email.trim()) {
            setFormError('Name and email are required.');
            return;
        }
        setSaving(true);
        try {
            const created = await AdminService.createTechnician({
                fullName: form.fullName.trim(),
                email: form.email.trim().toLowerCase(),
                phone: form.phone.trim() || undefined,
            });
            setTechnicians((prev) => [...prev, created].sort((a, b) => a.fullName.localeCompare(b.fullName)));
            setForm({ fullName: '', email: '', phone: '' });
            setFormOpen(false);
        } catch (err) {
            setFormError(apiErrorMessage(err, 'Unable to add the technician.'));
        } finally {
            setSaving(false);
        }
    };

    const toggleActive = async (t: Technician) => {
        setActionError(null);
        try {
            const updated = await AdminService.updateTechnician(t.id, { active: !t.active });
            setTechnicians((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
        } catch (err) {
            setActionError(apiErrorMessage(err, 'Unable to update the technician.'));
        }
    };

    const assign = async (c: CaseRecord) => {
        const technicianId = selection[c.id];
        if (!c.appointmentId || !technicianId) return;
        setActionError(null);
        setAssigningId(c.id);
        try {
            await AdminService.reassignTechnician(c.appointmentId, technicianId);
            onCasesChanged();
        } catch (err) {
            setActionError(apiErrorMessage(err, 'Unable to assign the technician.'));
        } finally {
            setAssigningId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Technicians</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Field technicians and their current job assignments</p>
                </div>
                <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-3.5 h-3.5" /> Add technician
                </button>
            </div>

            {actionError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{actionError}</div>
            )}

            {needsAssignment.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Booked appointments awaiting a technician ({needsAssignment.length})
                    </div>
                    {needsAssignment.map((c) => (
                        <div key={c.id} className="bg-white rounded-xl border border-amber-100 p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                            <div className="min-w-0">
                                <div className="font-semibold text-slate-900">
                                    {c.customerName} <span className="font-mono text-slate-400">{c.referenceNumber}</span>
                                </div>
                                <div className="text-slate-500 truncate">{c.propertyAddress}</div>
                                <div className="text-slate-700 font-medium mt-0.5">
                                    {c.appointmentDate}{c.appointmentTime ? ` · ${c.appointmentTime}` : ''}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <select
                                    value={selection[c.id] ?? ''}
                                    onChange={(e) => setSelection((prev) => ({ ...prev, [c.id]: e.target.value }))}
                                    className="p-2 rounded-lg border border-slate-300 text-xs"
                                >
                                    <option value="">Select technician</option>
                                    {activeTechnicians.map((t) => (
                                        <option key={t.id} value={t.id}>{t.fullName}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => assign(c)}
                                    disabled={!selection[c.id] || assigningId === c.id}
                                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-50"
                                >
                                    {assigningId === c.id ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && <div className="text-center py-12 text-slate-400 text-sm">Loading technicians...</div>}
            {!loading && loadError && <div className="text-center py-12 text-red-600 text-sm font-semibold">{loadError}</div>}

            {!loading && !loadError && technicians.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-10 text-center text-sm text-slate-400">
                    No technicians yet. Add your first technician to start assigning appointments.
                </div>
            )}

            {!loading && !loadError && technicians.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {technicians.map((t) => {
                        const jobs = jobsFor(t.fullName);
                        const activeJobs = jobs.filter((j) => !DONE_STATUSES.includes(j.status));
                        const completed = jobs.length - activeJobs.length;
                        return (
                            <div key={t.id} className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 ${t.active ? '' : 'opacity-70'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                        {t.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-sm text-slate-900 truncate">{t.fullName}</div>
                                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                            <Wrench className="w-3 h-3" /> Field Technician
                                        </div>
                                    </div>
                                    <span className={`ml-auto text-[10px] font-bold px-2 py-1 rounded-full ${t.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {t.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="text-[11px] text-slate-500 space-y-0.5">
                                    <div className="truncate">{t.email}</div>
                                    {t.phone && <div>{t.phone}</div>}
                                </div>

                                <div className="flex items-center gap-4 text-xs">
                                    <div>
                                        <div className="font-bold text-slate-900">{activeJobs.length}</div>
                                        <div className="text-[10px] text-slate-400">Active Jobs</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-emerald-600">{completed}</div>
                                        <div className="text-[10px] text-slate-400">Completed</div>
                                    </div>
                                </div>

                                {activeJobs.length > 0 && (
                                    <div className="pt-3 border-t border-slate-100 space-y-2">
                                        {activeJobs.slice(0, 3).map((job) => (
                                            <div key={job.id} className="flex items-center justify-between text-[11px]">
                                                <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
                                                    <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                                                    <span className="truncate">{job.propertyAddress}</span>
                                                </div>
                                                <span className="font-mono font-semibold text-slate-400 shrink-0 ml-2">{job.referenceNumber}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => toggleActive(t)}
                                    className="w-full py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer"
                                >
                                    {t.active ? 'Deactivate' : 'Reactivate'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {formOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <form onSubmit={handleCreate} className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Add technician</h2>
                            <button type="button" onClick={() => setFormOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" aria-label="Close">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Full name
                            <input className={inputClass} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Email
                            <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Phone (optional)
                            <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </label>
                        {formError && <p className="text-xs font-semibold text-red-600">{formError}</p>}
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60">
                                {saving ? 'Saving...' : 'Add technician'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};