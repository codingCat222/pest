import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Timer, ClipboardList, CalendarClock, Users, ChevronDown, Plus } from 'lucide-react';

interface AdminOverviewViewProps {
    cases: CaseRecord[];
}

const PEST_COLORS: Record<string, string> = {
    'Rats or mice': '#2563eb',
    Bedbugs: '#7c3aed',
    Cockroaches: '#d97706',
    Foxes: '#059669',
    Ants: '#db2777',
    Other: '#64748b',
    'Not sure': '#94a3b8',
};

const TIME_RANGES = ['7 days', '30 days', '3 months', '6 months'] as const;

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({ cases }) => {
    const [timeRange, setTimeRange] = useState<(typeof TIME_RANGES)[number]>('6 months');

    const activeCases = cases.filter(
        (c) => !['RESOLVED', 'CLOSED', 'CANCELLED'].includes(c.status)
    ).length;
    const upcomingAppointments = cases.filter(
        (c) => c.appointmentStatus === 'Scheduled' || c.appointmentStatus === 'Pending'
    ).length;
    const resolvedCases = cases.filter((c) => ['RESOLVED', 'CLOSED'].includes(c.status)).length;

    // Illustrative platform-wide lead count — see AdminReportsView for the full illustrative funnel.
    const newLeadsThisWeek = 1482;

    // Case volume trend — illustrative shape at platform scale, since the local
    // case sample is too small (a handful of cases) to plot a meaningful trend line.
    const trendData = [
        { period: 'Apr', cases: 210 },
        { period: 'May', cases: 265 },
        { period: 'Jun', cases: 298 },
        { period: 'Jul', cases: 340 },
        { period: 'Aug', cases: 312 },
        { period: 'Sep', cases: 358 },
    ];

    const pestCounts = cases.reduce<Record<string, number>>((acc, c) => {
        acc[c.pest] = (acc[c.pest] || 0) + 1;
        return acc;
    }, {});

    const donutData = Object.entries(pestCounts).map(([pest, count]) => ({
        name: pest,
        value: count,
        color: PEST_COLORS[pest] || '#94a3b8',
    }));

    const totalPestCases = donutData.reduce((sum, d) => sum + d.value, 0);

    const upcoming = cases
        .filter((c) => c.appointmentStatus === 'Scheduled' || c.appointmentStatus === 'Pending')
        .slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 px-1"
                >
                    All
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Timer className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{newLeadsThisWeek.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-0.5">New leads</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <ClipboardList className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{activeCases}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Active cases</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <CalendarClock className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{upcomingAppointments}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Upcoming appointments</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Users className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{resolvedCases}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Resolved cases</div>
                </div>
            </div>

            {/* Trend + Donut */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-slate-900">Case volume</h2>

                        <div className="relative">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value as (typeof TIME_RANGES)[number])}
                                className="appearance-none text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 cursor-pointer"
                            >
                                {TIME_RANGES.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                        </div>
                    </div>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="period"
                                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                                    tickLine={false}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                                    tickLine={false}
                                    axisLine={false}
                                    width={32}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#e2e8f0' }}
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: '1px solid #e2e8f0',
                                        fontSize: 12,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                    }}
                                    formatter={(value: any) => [value, 'Cases']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cases"
                                    stroke="#2563eb"
                                    strokeWidth={2.5}
                                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
                    <h2 className="font-bold text-slate-900">Case mix</h2>
                    <p className="text-xs text-slate-500 mt-0.5 mb-2">Active cases by pest type</p>

                    <div className="h-52 relative">
                        {totalPestCases > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius="62%"
                                        outerRadius="95%"
                                        paddingAngle={2}
                                        stroke="none"
                                    >
                                        {donutData.map((d) => (
                                            <Cell key={d.name} fill={d.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any, name: any) => [value, name]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #e2e8f0',
                                            fontSize: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-xs text-slate-400">
                                No case data yet
                            </div>
                        )}
                    </div>

                    <div className="space-y-2.5 mt-3">
                        {Object.entries(PEST_COLORS).map(([pest, color]) => (
                            <div key={pest} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                                    <span className="text-slate-600">{pest}</span>
                                </div>
                                <span className="font-semibold text-slate-900">{pestCounts[pest] || 0}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming + Quick actions */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold text-slate-900">Upcoming appointments</h2>
                        <button type="button" className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                            View all
                        </button>
                    </div>

                    {upcoming.length === 0 ? (
                        <div className="py-10 text-center text-sm text-slate-400">
                            No appointments scheduled right now.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {upcoming.map((c) => (
                                <div key={c.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-bold text-sm text-slate-900">{c.pest} treatment</div>
                                            <div className="text-xs text-blue-600 font-medium">{c.propertyAddress}</div>
                                        </div>
                                        <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-amber-50 text-amber-700 shrink-0">
                                            {c.appointmentStatus === 'Scheduled' ? 'Upcoming' : 'Pending'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                                        <span>Reference: {c.referenceNumber}</span>
                                        <span>
                                            {c.appointmentDate ? `Date: ${c.appointmentDate}` : 'Date: TBC'}
                                            {c.appointmentTime ? `, ${c.appointmentTime}` : ''}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
                    <h2 className="font-bold text-slate-900 mb-4">Quick actions</h2>

                    <div className="space-y-2">
                        <button
                            type="button"
                            className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-colors cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add new case
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-colors cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Schedule appointment
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-200 text-xs font-semibold text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-colors cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Send proofing quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};