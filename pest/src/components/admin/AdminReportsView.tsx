import React from 'react';
import { CaseRecord, OrderItemRecord } from '../../types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
} from 'recharts';

interface AdminReportsViewProps {
    cases: CaseRecord[];
    orders: OrderItemRecord[];
}

// Illustrative platform-wide funnel — represents what a live funnel looks like at scale.
// Not derived from the small local case sample below; the two are shown separately.
const ILLUSTRATIVE_FUNNEL = [
    { stage: 'Leads', value: 1482 },
    { stage: 'Free Product Claimed', value: 834 },
    { stage: 'Delivery Paid', value: 780 },
    { stage: 'Product Delivered', value: 690 },
    { stage: 'Monitoring', value: 312 },
    { stage: 'Continued Activity', value: 140 },
    { stage: '£99 Booking', value: 94 },
    { stage: 'Proofing Recommended', value: 38 },
    { stage: 'Proofing Sold', value: 26 },
    { stage: 'Case Resolved', value: 510 },
];

const FUNNEL_COLOR = '#2563eb';

export const AdminReportsView: React.FC<AdminReportsViewProps> = ({ cases, orders }) => {
    // Real, local-session figures derived from actual case/order data in this environment.
    const realClaimed = cases.length;
    const realDeliveryPaid = orders.filter((o) => o.status !== 'Cancelled').length;
    const realDelivered = orders.filter((o) => o.status === 'Delivered').length;
    const realMonitoring = cases.filter((c) => c.status === 'MONITORING').length;
    const realContinuedActivity = cases.filter((c) =>
        ['ACTIVITY_REPORTED', 'PROFESSIONAL_OFFERED'].includes(c.status)
    ).length;
    const realProBooked = cases.filter((c) => c.status === 'PROFESSIONAL_BOOKED').length;
    const realProofingRecommended = cases.filter((c) =>
        ['PROOFING_RECOMMENDED', 'PROOFING_QUOTE_SENT'].includes(c.status)
    ).length;
    const realProofingSold = cases.filter((c) => c.proofingQuote?.status === 'accepted').length;
    const realResolved = cases.filter((c) => ['RESOLVED', 'CLOSED'].includes(c.status)).length;

    const realFunnelData = [
        { stage: 'Claimed', value: realClaimed },
        { stage: 'Delivery Paid', value: realDeliveryPaid },
        { stage: 'Delivered', value: realDelivered },
        { stage: 'Monitoring', value: realMonitoring },
        { stage: 'Continued Activity', value: realContinuedActivity },
        { stage: '£99 Booking', value: realProBooked },
        { stage: 'Proofing Rec.', value: realProofingRecommended },
        { stage: 'Proofing Sold', value: realProofingSold },
        { stage: 'Resolved', value: realResolved },
    ];

    const revenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
    const proofingRevenue = cases
        .filter((c) => c.proofingQuote?.status === 'accepted')
        .reduce((sum, c) => sum + (c.proofingQuote?.total || 0), 0);

    const illustrativeLeads = ILLUSTRATIVE_FUNNEL[0].value;
    const illustrativeClaimed = ILLUSTRATIVE_FUNNEL[1].value;
    const illustrativeResolved = ILLUSTRATIVE_FUNNEL[ILLUSTRATIVE_FUNNEL.length - 1].value;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports &amp; Analytics</h1>
                <p className="text-xs text-slate-500 mt-0.5">Success funnel and revenue overview</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Delivery Revenue</div>
                    <div className="text-xl font-black text-slate-900 mt-0.5 font-mono">£{revenue.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400 mt-1">This session</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Proofing Revenue</div>
                    <div className="text-xl font-black text-emerald-600 mt-0.5 font-mono">£{proofingRevenue.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400 mt-1">This session</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Lead → Claim Rate</div>
                    <div className="text-xl font-black text-blue-600 mt-0.5 font-mono">
                        {((illustrativeClaimed / illustrativeLeads) * 100).toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Illustrative platform figure</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Overall Resolution Rate</div>
                    <div className="text-xl font-black text-blue-600 mt-0.5 font-mono">
                        {((illustrativeResolved / illustrativeLeads) * 100).toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Illustrative platform figure</div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Illustrative Success Funnel
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                        Shows what a live funnel looks like at platform scale — not derived from local case data.
                    </p>
                </div>

                <div style={{ height: ILLUSTRATIVE_FUNNEL.length * 34 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={ILLUSTRATIVE_FUNNEL}
                            layout="vertical"
                            margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="stage"
                                width={140}
                                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: '1px solid #e2e8f0',
                                    fontSize: 12,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                }}
                                formatter={(value: any) => [Number(value).toLocaleString(), 'Count']}
                            />
                            <Bar dataKey="value" fill={FUNNEL_COLOR} radius={[0, 6, 6, 0]} maxBarSize={18}>
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    style={{ fontSize: 11, fontWeight: 700, fill: '#0f172a' }}
                                    formatter={(v: any) => Number(v).toLocaleString()}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        This Session&apos;s Case Breakdown
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                        Real counts from the {cases.length} case{cases.length === 1 ? '' : 's'} and {orders.length} order
                        {orders.length === 1 ? '' : 's'} currently loaded.
                    </p>
                </div>

                <div style={{ height: realFunnelData.length * 34 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={realFunnelData}
                            layout="vertical"
                            margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" allowDecimals={false} hide />
                            <YAxis
                                type="category"
                                dataKey="stage"
                                width={140}
                                tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    borderRadius: 12,
                                    border: '1px solid #e2e8f0',
                                    fontSize: 12,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                }}
                                formatter={(value: any) => [value, 'Cases']}
                            />
                            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={18}>
                                {realFunnelData.map((d) => (
                                    <Cell key={d.stage} fill={FUNNEL_COLOR} fillOpacity={0.75} />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    style={{ fontSize: 11, fontWeight: 700, fill: '#0f172a' }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};