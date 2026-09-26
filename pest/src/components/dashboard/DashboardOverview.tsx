import React from 'react';
import { CaseRecord, CustomerNavTab } from '../../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Package, 
  FileText, 
  Download, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  Wrench,
  AlertCircle,
  Eye
} from 'lucide-react';

interface DashboardOverviewProps {
  activeCase: CaseRecord;
  onNavigateTab: (tab: CustomerNavTab) => void;
  onOpenReportModal: () => void;
  onOpenBookingModal: () => void;
  onOpenQuoteModal: () => void;
  onUpdateCase?: (updated: CaseRecord) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  activeCase,
  onNavigateTab,
  onOpenReportModal,
  onOpenBookingModal,
  onOpenQuoteModal,
  onUpdateCase
}) => {
  const milestonePipeline = [
    { key: 'START FREE', label: 'Start Free', active: activeCase.status === 'PRODUCT_CLAIMED' || activeCase.status === 'DELIVERY_PAID' || activeCase.status === 'DELIVERED', completed: activeCase.status !== 'PRODUCT_CLAIMED' && activeCase.status !== 'DELIVERY_PAID' },
    { key: 'MONITOR', label: 'Monitor', active: activeCase.status === 'MONITORING', completed: activeCase.status === 'ACTIVITY_REPORTED' || activeCase.status.includes('PROFESSIONAL') || activeCase.status.includes('PROOFING') || activeCase.status === 'RESOLVED' },
    { key: 'ESCALATE', label: 'Escalate', active: activeCase.status === 'ACTIVITY_REPORTED' || activeCase.status === 'PROFESSIONAL_OFFERED', completed: activeCase.status.includes('PROFESSIONAL') || activeCase.status.includes('PROOFING') || activeCase.status === 'RESOLVED' },
    { key: 'PROFESSIONAL TREATMENT', label: 'Professional Treatment', active: activeCase.status.includes('PROFESSIONAL'), completed: activeCase.status.includes('PROOFING') || activeCase.status === 'RESOLVED' },
    { key: 'PROOFING', label: 'Proofing', active: activeCase.status.includes('PROOFING'), completed: activeCase.status === 'RESOLVED' },
    { key: 'RESOLVED', label: 'Resolved', active: activeCase.status === 'RESOLVED', completed: false }
  ];

  const stages = [
    { id: 'claimed', label: 'Product claimed', status: 'completed' },
    { id: 'delivery', label: 'Delivery paid', status: 'completed' },
    { id: 'delivered', label: 'Delivered', status: 'completed' },
    { 
      id: 'monitoring', 
      label: 'Monitoring', 
      status: activeCase.status === 'MONITORING' ? 'active' : activeCase.status === 'RESOLVED' || activeCase.status.includes('PROFESSIONAL') || activeCase.status.includes('PROOFING') ? 'completed' : 'pending' 
    },
    { 
      id: 'professional', 
      label: 'Professional treatment', 
      status: activeCase.status.includes('PROFESSIONAL') ? 'active' : activeCase.status.includes('PROOFING') || activeCase.status === 'RESOLVED' ? 'completed' : 'pending' 
    },
    { 
      id: 'proofing', 
      label: 'Proofing', 
      status: activeCase.status.includes('PROOFING') ? 'active' : activeCase.status === 'RESOLVED' ? 'completed' : 'pending' 
    },
    { 
      id: 'resolved', 
      label: 'Resolved', 
      status: activeCase.status === 'RESOLVED' ? 'active' : 'pending' 
    }
  ];

  const handleQuickSetStage = (targetStatus: CaseRecord['status']) => {
    if (!onUpdateCase) return;
    let updated: CaseRecord = { ...activeCase, status: targetStatus };
    if (targetStatus === 'MONITORING') {
      updated.monitoringDay = 4;
      updated.appointmentDate = undefined;
    } else if (targetStatus === 'PROFESSIONAL_BOOKED') {
      updated.appointmentDate = '28 Sep 2026';
      updated.appointmentTime = '10:00 AM';
      updated.technicianName = 'Michael Vance';
    } else if (targetStatus === 'PROOFING_RECOMMENDED') {
      updated.appointmentDate = '22 Sep 2026';
    } else if (targetStatus === 'RESOLVED') {
      updated.activityReported = 'No activity';
      updated.lastReportedDate = 'Today';
    }
    onUpdateCase(updated);
  };

  return (
    <div className="space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {activeCase.customerName.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your {activeCase.pest.toLowerCase()} treatment journey at {activeCase.propertyAddress}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            Ref: <span className="font-mono font-bold text-slate-800">{activeCase.referenceNumber}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Case
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Journey Progression Roadmap
          </div>
          {onUpdateCase && (
            <div className="text-[10px] text-slate-400 font-medium">
              Click any stage below to preview experience
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {milestonePipeline.map((milestone, idx) => (
            <button
              key={milestone.key}
              type="button"
              onClick={() => {
                if (idx === 0) handleQuickSetStage('PRODUCT_CLAIMED');
                else if (idx === 1) handleQuickSetStage('MONITORING');
                else if (idx === 2) handleQuickSetStage('ACTIVITY_REPORTED');
                else if (idx === 3) handleQuickSetStage('PROFESSIONAL_BOOKED');
                else if (idx === 4) handleQuickSetStage('PROOFING_RECOMMENDED');
                else if (idx === 5) handleQuickSetStage('RESOLVED');
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                milestone.active
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-600/20'
                  : milestone.completed
                  ? 'bg-emerald-50/70 border-emerald-200/90 text-emerald-900 hover:bg-emerald-100/60'
                  : 'bg-slate-50 border-slate-200/70 text-slate-500 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className={`font-mono font-bold ${milestone.active ? 'text-blue-100' : 'text-slate-400'}`}>0{idx + 1}</span>
                {milestone.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {milestone.active && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
              </div>
              <div className={`text-xs font-bold leading-tight ${milestone.active ? 'text-white' : ''}`}>
                {milestone.key}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Journey
                </div>
                <div className="text-base font-bold text-slate-900">
                  {activeCase.propertyName}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>
                  {activeCase.status === 'MONITORING' && `MONITORING • Day ${activeCase.monitoringDay} of ${activeCase.monitoringDaysTotal}`}
                  {activeCase.status === 'PROFESSIONAL_BOOKED' && 'PROFESSIONAL VISIT BOOKED'}
                  {activeCase.status === 'PROOFING_RECOMMENDED' && 'PROOFING QUOTE READY'}
                  {activeCase.status === 'RESOLVED' && 'CASE RESOLVED'}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeCase.status === 'MONITORING' && `Day ${activeCase.monitoringDay} of 7 Monitoring`}
                {activeCase.status === 'PROFESSIONAL_BOOKED' && 'Specialist Inspection Scheduled'}
                {activeCase.status === 'PROOFING_RECOMMENDED' && 'Proofing Opportunity Identified'}
                {activeCase.status === 'RESOLVED' && 'Pest Activity Ceased'}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
                {activeCase.status === 'MONITORING' && 
                  `Your product has been delivered. Monitor activity for the next ${activeCase.monitoringDaysTotal - activeCase.monitoringDay} days and report what you observe so we can guide your next steps.`}
                {activeCase.status === 'PROFESSIONAL_BOOKED' && 
                  `Your appointment with technician ${activeCase.technicianName || 'Marcus'} is scheduled for ${activeCase.appointmentDate} at ${activeCase.appointmentTime}.`}
                {activeCase.status === 'PROOFING_RECOMMENDED' && 
                  'Our certified inspection located physical ingress points allowing pests into the cavity walls. Review your itemised proofing quote.'}
                {activeCase.status === 'RESOLVED' && 
                  'Treatment successfully concluded with no signs of active infestation reported.'}
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Treatment Progression System
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {stages.map((stage, idx) => (
                <div 
                  key={stage.id} 
                  className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    stage.status === 'active'
                      ? 'bg-blue-50/70 border-blue-400 text-blue-900 shadow-xs ring-1 ring-blue-500/20'
                      : stage.status === 'completed'
                      ? 'bg-slate-50 border-slate-200/90 text-slate-700'
                      : 'bg-white border-slate-200/50 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono text-slate-400 font-medium">0{idx + 1}</span>
                    {stage.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {stage.status === 'active' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                    {stage.status === 'pending' && <span className="w-2 h-2 rounded-full bg-slate-200" />}
                  </div>
                  <div className="text-xs font-semibold leading-tight line-clamp-2">
                    {stage.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Your Next Step
            </div>

            {activeCase.status === 'MONITORING' && (
              <>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Report your pest activity
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You've been monitoring for {activeCase.monitoringDay} days. Tell us what you're seeing so our system and technicians can determine the optimal next action.
                </p>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
                  Last observation: <strong className="text-white">{activeCase.activityReported || 'Less activity'}</strong> ({activeCase.lastReportedDate || 'Yesterday'})
                </div>
              </>
            )}

            {activeCase.status === 'PROFESSIONAL_BOOKED' && (
              <>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Prepare for your specialist inspection
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Technician {activeCase.technicianName} will arrive on {activeCase.appointmentDate} between {activeCase.appointmentTime}. Ensure subfloor and kitchen kickboards are accessible.
                </p>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300">
                  Fixed callout fee: <strong className="text-emerald-400 font-mono">£99.00</strong> (Confirmed)
                </div>
              </>
            )}

            {activeCase.status === 'PROOFING_RECOMMENDED' && (
              <>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Your proofing quote is ready
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  3 structural entry voids were mapped during inspection. Review the recommended exclusion materials and approve or decline online.
                </p>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Total (inc. VAT):</span>
                  <strong className="text-emerald-400 text-sm font-mono font-bold">£245.00</strong>
                </div>
              </>
            )}
          </div>

          <div className="pt-6 space-y-2">
            {activeCase.status === 'MONITORING' && (
              <button
                type="button"
                onClick={onOpenReportModal}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Report Activity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeCase.status === 'PROFESSIONAL_BOOKED' && (
              <button
                type="button"
                onClick={() => onNavigateTab('appointments')}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Appointment Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeCase.status === 'PROOFING_RECOMMENDED' && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Review Proofing Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="text-center text-[10px] text-slate-400">
              Takes about 1 minute.
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Monitoring
              </span>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                Day {activeCase.monitoringDay} / {activeCase.monitoringDaysTotal}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-2">
                <span>Activity:</span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-bold">
                  {activeCase.activityReported || 'Less activity'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Last reported: {activeCase.lastReportedDate || 'Yesterday'}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('monitoring')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Monitoring</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Next Appointment
              </span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            <div>
              <div className="text-base font-bold text-slate-900 tracking-tight">
                {activeCase.appointmentDate ? 'Professional Inspection' : 'No Visit Booked'}
              </div>
              {activeCase.appointmentDate ? (
                <>
                  <div className="text-xs font-semibold text-slate-700 mt-1">
                    {activeCase.appointmentDate} • {activeCase.appointmentTime}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Technician: {activeCase.technicianName || 'Michael Vance'}
                  </div>
                </>
              ) : (
                <div className="text-xs text-slate-500 mt-1">
                  £99 professional inspection available if needed after monitoring.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('appointments')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{activeCase.appointmentDate ? 'View Appointment' : 'Book for £99'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Latest Order
              </span>
              <Package className="w-4 h-4 text-slate-400" />
            </div>

            <div>
              <div className="text-base font-bold text-slate-900 tracking-tight">
                {activeCase.productName}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Delivered
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {activeCase.referenceNumber}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Tracking: {activeCase.trackingNumber || 'RM-7739-GB'}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Order</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Recent Activity
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('journey')}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Full History →
            </button>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Activity report submitted</span>
                  <span className="text-[10px] text-slate-400">Today</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  You reported less activity in subfloor stations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Product delivered</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  Targeted Rodent Activity Kit delivered successfully to your porch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Order dispatched</span>
                  <span className="text-[10px] text-slate-400">21 Sep</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  Courier tracking number assigned: {activeCase.trackingNumber || 'RM-7739-GB'}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Delivery payment received</span>
                  <span className="text-[10px] text-slate-400">21 Sep</span>
                </div>
                <p className="text-slate-600 mt-0.5">
                  £4.95 Royal Mail Tracked 24 postage confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Your Documents
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('documents')}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              All Files →
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 truncate">Product instructions</div>
                  <div className="text-[10px] text-slate-400">PDF • 1.2 MB</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Downloading product instructions...')}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 truncate">Delivery receipt</div>
                  <div className="text-[10px] text-slate-400">PDF • 140 KB</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Downloading delivery receipt...')}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 truncate">Proofing quotation</div>
                  <div className="text-[10px] text-slate-400">PDF • 480 KB</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                title="View Quote"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
