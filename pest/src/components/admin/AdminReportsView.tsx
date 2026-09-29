import React, { useEffect, useState } from 'react';
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
import { AdminService } from '../../services/admin';
import { OrdersService } from '../../services/orders';
import { apiErrorMessage } from '../../services/format';

interface AdminReportsViewProps {
    cases: CaseRecord[];
}

const FUNNEL_COLOR = '#2563eb';

const tooltipStyle = {
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    fontSize: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
};

const percent = (part: number, whole: number) => (whole > 0 ? `${((part / whole) * 100).toFixed(0)}%` : '—');

export const AdminReportsView: React.FC<AdminReportsViewProps> = ({ cases }) => {
    const [orders, setOrders] = useState<OrderItemRecord[]>([]);
    const [revenueByMonth, setRevenueByMonth] = useState<{ month: string; revenue: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        Promise.all([OrdersService.list(), AdminService.getRevenueByMonth()])
            .then(([orderList, monthly]) => {
                if (cancelled) return;
                setOrders(orderList);
                setRevenueByMonth(
                    Object.entries(monthly)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([month, revenue]) => ({ month, revenue }))
                );
            })
            .catch((err) => {
                if (!cancelled) setError(apiErrorMessage(err, 'Unable to load report data.'));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const claimed = cases.length;
    const deliveryPaid = orders.filter((o) => o.status !== 'Cancelled').length;
    const delivered = orders.filter((o) => o.status === 'Delivered').length;
    const monitoring = cases.filter((c) => c.status === 'MONITORING').length;
    const continuedActivity = cases.filter((c) => ['ACTIVITY_REPORTED', 'PROFESSIONAL_OFFERED'].includes(c.status)).length;
    const proBooked = cases.filter((c) => c.status === 'PROFESSIONAL_BOOKED').length;
    const proofingRecommended = cases.filter((c) => ['PROOFING_RECOMMENDED', 'PROOFING_QUOTE_SENT'].includes(c.status)).length;
    const proofingSold = cases.filter((c) => c.proofingQuote?.status === 'accepted').length;
    const resolved = cases.filter((c) => ['RESOLVED', 'CLOSED'].includes(c.status)).length;

    const funnelData = [
        { stage: 'Claimed', value: claimed },
        { stage: 'Delivery Paid', value: deliveryPaid },
        { stage: 'Delivered', value: delivered },
        { stage: 'Monitoring', value: monitoring },
        { stage: 'Continued Activity', value: continuedActivity },
        { stage: '£95.99 Booking', value: proBooked },
        { stage: 'Proofing Rec.', value: proofingRecommended },
        { stage: 'Proofing Sold', value: proofingSold },
        { stage: 'Resolved', value: resolved },
    ];

    const deliveryRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
    const proofingRevenue = cases
        .filter((c) => c.proofingQuote?.status === 'accepted')
        .reduce((sum, c) => sum + (c.proofingQuote?.total || 0), 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports &amp; Analytics</h1>
                <p className="text-xs text-slate-500 mt-0.5">Live figures from your cases and orders</p>
            </div>

            {loading && <div className="text-center py-12 text-slate-400 text-sm">Loading reports...</div>}
            {!loading && error && <div className="text-center py-12 text-red-600 text-sm font-semibold">{error}</div>}

            {!loading && !error && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                            <div className="text-[10px] font-bold uppercase text-slate-400">Delivery Revenue</div>
                            <div className="text-xl font-black text-slate-900 mt-0.5 font-mono">£{deliveryRevenue.toFixed(2)}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{orders.length} order{orders.length === 1 ? '' : 's'}</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                            <div className="text-[10px] font-bold uppercase text-slate-400">Proofing Revenue</div>
                            <div className="text-xl font-black text-emerald-600 mt-0.5 font-mono">£{proofingRevenue.toFixed(2)}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{proofingSold} accepted</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                            <div className="text-[10px] font-bold uppercase text-slate-400">Claim → Delivered</div>
                            <div className="text-xl font-black text-blue-600 mt-0.5 font-mono">{percent(delivered, claimed)}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{delivered} of {claimed} cases</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                            <div className="text-[10px] font-bold uppercase text-slate-400">Resolution Rate</div>
                            <div className="text-xl font-black text-blue-600 mt-0.5 font-mono">{percent(resolved, claimed)}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{resolved} of {claimed} cases</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Case Funnel</div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                Based on {claimed} case{claimed === 1 ? '' : 's'} and {orders.length} order{orders.length === 1 ? '' : 's'}.
                            </p>
                        </div>
                        <div style={{ height: funnelData.length * 34 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 40, left: 8, bottom: 0 }}>
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
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={tooltipStyle} formatter={(value: any) => [value, 'Cases']} />
                                    <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={18}>
                                        {funnelData.map((d) => (
                                            <Cell key={d.stage} fill={FUNNEL_COLOR} fillOpacity={0.75} />
                                        ))}
                                        <LabelList dataKey="value" position="right" style={{ fontSize: 11, fontWeight: 700, fill: '#0f172a' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Revenue by Month</div>
                        {revenueByMonth.length === 0 ? (
                            <p className="text-sm text-slate-400">No revenue recorded yet.</p>
                        ) : (
                            <div style={{ height: 240 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={revenueByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={(v) => `£${v}`} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={tooltipStyle} formatter={(value: any) => [`£${Number(value).toFixed(2)}`, 'Revenue']} />
                                        <Bar dataKey="revenue" fill={FUNNEL_COLOR} radius={[6, 6, 0, 0]} maxBarSize={36} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};