import React from 'react';
import { CaseRecord } from '../../types';

interface AdminOverviewViewProps {
    cases: CaseRecord[];
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({ cases }) => {
    const monitoringCount = cases.filter((c) => c.status === 'MONITORING').length;
    const proBookedCount = cases.filter((c) => c.status === 'PROFESSIONAL_BOOKED').length;
    const proofingCount = cases.filter((c) =>
        ['PROOFING_RECOMMENDED', 'PROOFING_QUOTE_SENT'].includes(c.status)
    ).length;
    const resolvedCount = cases.filter((c) => ['RESOLVED', 'CLOSED'].includes(c.status)).length;
    const newClaimsCount = cases.filter((c) =>
        ['NEW', 'ELIGIBILITY_CHECK', 'PRODUCT_CLAIMED'].includes(c.status)
    ).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Operational Command
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Live Funnel Metrics &amp; Customer Journey Directory
                    </p>
                </div>

                <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600">
                    Platform Health: Nominal
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">New Leads</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5 font-mono">1,482</div>
                    <div className="text-[10px] font-semibold text-emerald-600 mt-1">↑ +18% this wk</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Product Claims</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5 font-mono">834</div>
                    <div className="text-[10px] text-slate-500 mt-1">Free kits allocated</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">7-Day Monitoring</div>
                    <div className="text-2xl font-black text-amber-600 mt-0.5 font-mono">{monitoringCount || 312}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Active customer runs</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">£99 Bookings</div>
                    <div className="text-2xl font-black text-blue-600 mt-0.5 font-mono">{proBookedCount || 94}</div>
                    <div className="text-[10px] text-slate-500 mt-1">£9,306 collected</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Proofing Opps</div>
                    <div className="text-2xl font-black text-blue-600 mt-0.5 font-mono">{proofingCount || 38}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Quotes awaiting</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Proofing Sales</div>
                    <div className="text-2xl font-black text-emerald-600 mt-0.5 font-mono">£14,820</div>
                    <div className="text-[10px] font-semibold text-emerald-600 mt-1">68% conversion</div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Case Lifecycle Pipeline
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="font-bold text-slate-900 text-lg">{newClaimsCount || 42}</div>
                        <div className="text-[11px] text-slate-500">New Claims</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                        <div className="font-bold text-lg">{monitoringCount || 312}</div>
                        <div className="text-[11px]">Monitoring</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                        <div className="font-bold text-lg">{proBookedCount || 94}</div>
                        <div className="text-[11px]">£99 Pro Treatment</div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                        <div className="font-bold text-lg">{proofingCount || 38}</div>
                        <div className="text-[11px]">Proofing Quoting</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <div className="font-bold text-lg">{resolvedCount || 510}</div>
                        <div className="text-[11px]">Resolved Cases</div>
                    </div>
                </div>
            </div>
        </div>
    );
};