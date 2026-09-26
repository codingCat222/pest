import React from 'react';
import { CaseRecord } from '../../types';
import { Wrench, MapPin } from 'lucide-react';

interface AdminTechniciansViewProps {
    cases: CaseRecord[];
}

interface TechnicianSummary {
    name: string;
    activeJobs: CaseRecord[];
    completedJobs: number;
}

export const AdminTechniciansView: React.FC<AdminTechniciansViewProps> = ({ cases }) => {
    const technicianMap = new Map<string, TechnicianSummary>();

    cases.forEach((c) => {
        if (!c.technicianName) return;
        if (!technicianMap.has(c.technicianName)) {
            technicianMap.set(c.technicianName, { name: c.technicianName, activeJobs: [], completedJobs: 0 });
        }
        const entry = technicianMap.get(c.technicianName)!;
        if (c.status === 'PROFESSIONAL_COMPLETED' || c.status === 'RESOLVED' || c.status === 'CLOSED') {
            entry.completedJobs += 1;
        } else {
            entry.activeJobs.push(c);
        }
    });

    const technicians = Array.from(technicianMap.values());

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Technicians</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    Field technicians and their current job assignments
                </p>
            </div>

            {technicians.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-10 text-center text-sm text-slate-400">
                    No technicians are currently assigned to any cases.
                    <div className="text-xs mt-2 text-slate-400">
                        Technician profiles, scheduling and availability management require the technician
                        data model described in the MVP spec (section 8 &amp; 16) &mdash; not yet built.
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {technicians.map((t) => (
                        <div key={t.name} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                    {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900">{t.name}</div>
                                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <Wrench className="w-3 h-3" /> Field Technician
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs">
                                <div>
                                    <div className="font-bold text-slate-900">{t.activeJobs.length}</div>
                                    <div className="text-[10px] text-slate-400">Active Jobs</div>
                                </div>
                                <div>
                                    <div className="font-bold text-emerald-600">{t.completedJobs}</div>
                                    <div className="text-[10px] text-slate-400">Completed</div>
                                </div>
                            </div>

                            {t.activeJobs.length > 0 && (
                                <div className="pt-3 border-t border-slate-100 space-y-2">
                                    {t.activeJobs.slice(0, 3).map((job) => (
                                        <div key={job.id} className="flex items-center justify-between text-[11px]">
                                            <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
                                                <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                                                <span className="truncate">{job.propertyAddress}</span>
                                            </div>
                                            <span className="font-mono font-semibold text-slate-400 shrink-0 ml-2">
                                                {job.referenceNumber}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};