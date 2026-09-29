import React, { useMemo } from 'react';
import { CaseRecord, CustomerNavTab } from '../../types';
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
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Package,
  FileText,
  Download,
  Activity,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface DashboardOverviewProps {
  activeCase: CaseRecord;
  onNavigateTab: (tab: CustomerNavTab) => void;
  onOpenReportModal: () => void;
  onOpenBookingModal: () => void;
  onOpenQuoteModal: () => void;
  onUpdateCase: (c: CaseRecord) => void;
}

const STAGE_ORDER: { status: CaseRecord['status'][]; label: string }[] = [
  { status: ['PRODUCT_CLAIMED', 'AWAITING_DELIVERY_PAYMENT', 'DELIVERY_PAID', 'DISPATCHED'], label: 'Product claimed' },
  { status: ['DELIVERED'], label: 'Delivered' },
  { status: ['MONITORING', 'ACTIVITY_REPORTED', 'FOLLOW_UP_MONITORING'], label: 'Monitoring' },
  { status: ['PROFESSIONAL_OFFERED', 'PROFESSIONAL_BOOKED', 'PROFESSIONAL_COMPLETED'], label: 'Professional treatment' },
  { status: ['PROOFING_RECOMMENDED', 'PROOFING_QUOTE_SENT', 'PROOFING_ACCEPTED', 'PROOFING_BOOKED', 'PROOFING_COMPLETED'], label: 'Proofing' },
  { status: ['RESOLVED', 'CLOSED'], label: 'Resolved' },
];

const STAGE_COLORS = ['#94a3b8', '#16a34a', '#d97706', '#3b0764', '#6b21a8', '#15803d'];

const ACTIVITY_SCALE: Record<string, number> = {
  'No activity': 0,
  'Less activity': 1,
  'Same activity': 2,
  'More activity': 3,
  'Not sure': 1,
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  activeCase,
  onNavigateTab,
  onOpenReportModal,
  onOpenBookingModal,
  onOpenQuoteModal,
}) => {
  const currentStageIndex = STAGE_ORDER.findIndex((s) => s.status.includes(activeCase.status));

  const donutData = useMemo(
    () =>
      STAGE_ORDER.map((s, i) => ({
        name: s.label,
        value: i <= currentStageIndex ? 1 : 0,
        color: STAGE_COLORS[i],
      })).filter((d) => d.value > 0),
    [currentStageIndex]
  );

  const remainingStages = STAGE_ORDER.length - (currentStageIndex + 1);

  const activityPoints = useMemo(
    () =>
      activeCase.timeline
        .filter((t) => Object.keys(ACTIVITY_SCALE).some((k) => t.title.includes(k) || (t.details || '').includes(k)))
        .map((t) => {
          const matchedKey = Object.keys(ACTIVITY_SCALE).find(
            (k) => t.title.includes(k) || (t.details || '').includes(k)
          )!;
          return { date: t.date, level: ACTIVITY_SCALE[matchedKey], label: matchedKey };
        }),
    [activeCase.timeline]
  );

  const upcomingCount = activeCase.appointmentDate ? 1 : 0;
  const documentsCount = 2 + (activeCase.proofingQuote ? 1 : 0);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-purple tracking-tight">
            Good morning, {activeCase.customerName.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-brand-purple-soft">
            Here&apos;s an overview of your {activeCase.pest.toLowerCase()} treatment journey at {activeCase.propertyAddress}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-brand-purple-soft bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            Ref: <span className="font-mono font-bold text-brand-purple">{activeCase.referenceNumber}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-green-soft text-brand-green-dark border border-brand-green/30">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Active Case
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="w-9 h-9 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mb-4">
            <Activity className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-brand-purple">
            {activeCase.monitoringDay}/{activeCase.monitoringDaysTotal}
          </div>
          <div className="text-xs text-brand-purple-soft mt-0.5">Monitoring day</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="w-9 h-9 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mb-4">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-brand-purple">{currentStageIndex + 1}/{STAGE_ORDER.length}</div>
          <div className="text-xs text-brand-purple-soft mt-0.5">Stages complete</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="w-9 h-9 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mb-4">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-brand-purple">{upcomingCount}</div>
          <div className="text-xs text-brand-purple-soft mt-0.5">Upcoming appointments</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="w-9 h-9 rounded-full bg-brand-green-soft text-brand-green flex items-center justify-center mb-4">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-brand-purple">{documentsCount}</div>
          <div className="text-xs text-brand-purple-soft mt-0.5">Documents available</div>
        </div>
      </div>

      {/* Trend + Donut */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
          <div className="mb-6">
            <h2 className="font-bold text-brand-purple">Activity level over time</h2>
            <p className="text-xs text-brand-purple-soft mt-0.5">
              Based on your submitted monitoring reports
            </p>
          </div>

          {activityPoints.length >= 2 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityPoints} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[0, 3]}
                    ticks={[0, 1, 2, 3]}
                    tickFormatter={(v) => ['None', 'Less', 'Same', 'More'][v as number]}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                    width={44}
                  />
                  <Tooltip
                    cursor={{ stroke: '#e2e8f0' }}
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      fontSize: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                    formatter={(_: any, __: any, item: any) => [item?.payload?.label, 'Activity']}
                  />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center gap-2 text-brand-purple-soft">
              <Activity className="w-6 h-6 opacity-40" />
              <p className="text-xs max-w-xs">
                Once you&apos;ve submitted at least two activity reports, your trend will appear here.
              </p>
              <button
                type="button"
                onClick={onOpenReportModal}
                className="mt-1 text-xs font-bold text-brand-green hover:text-brand-green-dark cursor-pointer"
              >
                Report activity now →
              </button>
            </div>
          )}
        </div>

        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6">
          <h2 className="font-bold text-brand-purple">Journey progress</h2>
          <p className="text-xs text-brand-purple-soft mt-0.5 mb-2">Stages completed so far</p>

          <div className="h-52 relative">
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
                  formatter={(_: any, name: any) => [name, '']}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-brand-purple">{currentStageIndex + 1}/{STAGE_ORDER.length}</span>
              <span className="text-[10px] text-brand-purple-soft">stages</span>
            </div>
          </div>

          <div className="space-y-2.5 mt-3">
            {STAGE_ORDER.map((s, i) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: STAGE_COLORS[i] }} />
                  <span className={i <= currentStageIndex ? 'text-brand-purple font-medium' : 'text-brand-purple-soft'}>
                    {s.label}
                  </span>
                </div>
                {i <= currentStageIndex ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                ) : (
                  <span className="text-[10px] text-brand-purple-soft">Pending</span>
                )}
              </div>
            ))}
          </div>

          {remainingStages > 0 && (
            <p className="text-[11px] text-brand-purple-soft mt-3 pt-3 border-t border-slate-100">
              {remainingStages} stage{remainingStages === 1 ? '' : 's'} remaining
            </p>
          )}
        </div>
      </div>

      {/* Current status + next action */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-purple-soft">
              Current Journey
            </div>
            <div className="text-base font-bold text-brand-purple">{activeCase.propertyName}</div>
          </div>

          <div className="inline-flex items-center gap-2 bg-brand-green-soft text-brand-green-dark px-3 py-1 rounded-full text-xs font-bold border border-brand-green/30 self-start">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span>
              {activeCase.status === 'MONITORING' && `MONITORING • Day ${activeCase.monitoringDay} of ${activeCase.monitoringDaysTotal}`}
              {activeCase.status === 'PROFESSIONAL_BOOKED' && 'PROFESSIONAL VISIT BOOKED'}
              {activeCase.status === 'PROOFING_RECOMMENDED' && 'PROOFING QUOTE READY'}
              {activeCase.status === 'RESOLVED' && 'CASE RESOLVED'}
              {!['MONITORING', 'PROFESSIONAL_BOOKED', 'PROOFING_RECOMMENDED', 'RESOLVED'].includes(activeCase.status) &&
                activeCase.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-5">
          <div className="flex-1 space-y-2">
            <p className="text-sm text-brand-purple-soft leading-relaxed">
              {activeCase.status === 'MONITORING' &&
                `Your product has been delivered. Monitor activity for the next ${Math.max(activeCase.monitoringDaysTotal - activeCase.monitoringDay, 0)} days and report what you observe so we can guide your next steps.`}
              {activeCase.status === 'PROFESSIONAL_BOOKED' &&
                `Your appointment with technician ${activeCase.technicianName || 'our technician'} is scheduled for ${activeCase.appointmentDate} at ${activeCase.appointmentTime}.`}
              {activeCase.status === 'PROOFING_RECOMMENDED' &&
                'Our certified inspection located possible entry points. Review your itemised proofing quote.'}
              {activeCase.status === 'RESOLVED' &&
                'Treatment successfully concluded with no signs of active infestation reported.'}
            </p>

            {activeCase.status === 'MONITORING' && (
              <button
                type="button"
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs cursor-pointer"
              >
                <span>Report Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {activeCase.status === 'PROFESSIONAL_BOOKED' && (
              <button
                type="button"
                onClick={() => onNavigateTab('appointments')}
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs cursor-pointer"
              >
                <span>View Appointment Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {activeCase.status === 'PROOFING_RECOMMENDED' && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-soft text-white font-bold text-xs cursor-pointer"
              >
                <span>Review Proofing Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Monitoring / Next appointment / Latest order */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-soft">Monitoring</span>
              <Activity className="w-4 h-4 text-brand-purple-soft" />
            </div>
            <div>
              <div className="text-2xl font-black text-brand-purple tracking-tight font-mono">
                Day {activeCase.monitoringDay} / {activeCase.monitoringDaysTotal}
              </div>
              <div className="text-xs font-semibold text-brand-purple mt-1 flex items-center gap-2 flex-wrap">
                <span>Activity:</span>
                <span className="text-brand-green-dark bg-brand-green-soft px-2 py-0.5 rounded text-[11px] font-bold">
                  {activeCase.activityReported || 'Not yet reported'}
                </span>
              </div>
              <div className="text-[11px] text-brand-purple-soft mt-1">
                Last reported: {activeCase.lastReportedDate || 'No reports yet'}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('monitoring')}
              className="text-xs font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Monitoring</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-soft">Next Appointment</span>
              <Calendar className="w-4 h-4 text-brand-purple-soft" />
            </div>
            <div>
              <div className="text-base font-bold text-brand-purple tracking-tight">
                {activeCase.appointmentDate ? 'Professional Inspection' : 'No Visit Booked'}
              </div>
              {activeCase.appointmentDate ? (
                <>
                  <div className="text-xs font-semibold text-brand-purple mt-1">
                    {activeCase.appointmentDate} • {activeCase.appointmentTime}
                  </div>
                  <div className="text-[11px] text-brand-purple-soft mt-0.5">
                    Technician: {activeCase.technicianName || 'To be assigned'}
                  </div>
                </>
              ) : (
                <div className="text-xs text-brand-purple-soft mt-1">
                  £99 professional inspection available if needed after monitoring.
                </div>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => (activeCase.appointmentDate ? onNavigateTab('appointments') : onOpenBookingModal())}
              className="text-xs font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{activeCase.appointmentDate ? 'View Appointment' : 'Book for £99'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple-soft">Latest Order</span>
              <Package className="w-4 h-4 text-brand-purple-soft" />
            </div>
            <div>
              <div className="text-base font-bold text-brand-purple tracking-tight">{activeCase.productName}</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-brand-green-soft text-brand-green-dark">
                  <CheckCircle2 className="w-3 h-3 text-brand-green" />
                  {['DISPATCHED', 'DELIVERED'].includes(activeCase.status) || currentStageIndex >= 1 ? 'Delivered' : 'Processing'}
                </span>
                <span className="text-[11px] font-mono text-brand-purple-soft">{activeCase.referenceNumber}</span>
              </div>
              <div className="text-[11px] text-brand-purple-soft mt-1">
                Tracking: {activeCase.trackingNumber || 'Not yet assigned'}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-brand-green hover:text-brand-green-dark inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Order</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent activity + Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-brand-purple">Recent Activity</h3>
            <button
              type="button"
              onClick={() => onNavigateTab('journey')}
              className="text-xs font-semibold text-brand-green hover:text-brand-green-dark cursor-pointer"
            >
              Full History →
            </button>
          </div>

          {activeCase.timeline.length === 0 ? (
            <p className="text-xs text-brand-purple-soft py-4 text-center">No activity recorded yet.</p>
          ) : (
            <div className="space-y-4 pt-1">
              {[...activeCase.timeline]
                .slice(-5)
                .reverse()
                .map((entry, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${entry.current ? 'bg-brand-green' : entry.completed ? 'bg-brand-purple-soft' : 'bg-slate-300'
                        }`}
                    />
                    <div className="flex-1 text-xs min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-brand-purple">{entry.title}</span>
                        <span className="text-[10px] text-brand-purple-soft shrink-0">{entry.date}</span>
                      </div>
                      {entry.details && <p className="text-brand-purple-soft mt-0.5">{entry.details}</p>}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-brand-purple">Your Documents</h3>
            <button
              type="button"
              onClick={() => onNavigateTab('documents')}
              className="text-xs font-semibold text-brand-green hover:text-brand-green-dark cursor-pointer"
            >
              All Files →
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-brand-green shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-brand-purple truncate">Product instructions</div>
                  <div className="text-[10px] text-brand-purple-soft">PDF</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('documents')}
                className="p-1.5 rounded-lg text-brand-purple-soft hover:text-brand-purple hover:bg-slate-200 transition-colors cursor-pointer"
                title="View"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-brand-green shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-brand-purple truncate">Delivery receipt</div>
                  <div className="text-[10px] text-brand-purple-soft">PDF</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('documents')}
                className="p-1.5 rounded-lg text-brand-purple-soft hover:text-brand-purple hover:bg-slate-200 transition-colors cursor-pointer"
                title="View"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeCase.proofingQuote && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-brand-green shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold text-brand-purple truncate">Proofing quotation</div>
                    <div className="text-[10px] text-brand-purple-soft">PDF</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="p-1.5 rounded-lg text-brand-purple-soft hover:text-brand-purple hover:bg-slate-200 transition-colors cursor-pointer"
                  title="View Quote"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};