import React, { useState } from 'react';
import { CaseRecord, CaseStatus, NavigationPage } from '../types';
import {
  ShieldAlert,
  ArrowLeft,
  TrendingUp,
  Package,
  CreditCard,
  CheckCircle2,
  Filter,
  UserCheck,
  Layers,
  Eye,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  currentCase: CaseRecord;
  onUpdateCase: (updated: CaseRecord) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentCase,
  onUpdateCase,
  onNavigate
}) => {
  const [filterPest, setFilterPest] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus>(currentCase.status);

  const handleStageOverride = () => {
    const updated: CaseRecord = {
      ...currentCase,
      status: selectedStatus,
      timeline: [
        ...currentCase.timeline,
        {
          title: `Admin Override: ${selectedStatus}`,
          date: 'Just now',
          completed: true,
          details: 'Staff workflow status manual progression'
        }
      ]
    };
    onUpdateCase(updated);
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Customer View</span>
              </button>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Operations &amp; Dispatch Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Admin &amp; Customer Service Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-medium bg-white px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
            >
              Back to Storefront
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">Total Leads</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">1,482</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +18% this week</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">Product Claims</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">834</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">Free kits allocated</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">Delivery Paid</div>
            <div className="text-2xl font-black text-blue-600 mt-0.5">£4,128</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">@ £4.95 Royal Mail</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">Active Monitoring</div>
            <div className="text-2xl font-black text-amber-600 mt-0.5">312</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">7-day period ongoing</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">£95.99 Bookings</div>
            <div className="text-2xl font-black text-purple-600 mt-0.5">94</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">£9,306 revenue</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase text-slate-400">Proofing Sales</div>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">£14,820</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">68% acceptance rate</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Active Cases Management
              </h2>
              <p className="text-xs text-slate-500">
                Inspect, modify stage progression, and manage logistics dispatch.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterPest}
                onChange={(e) => setFilterPest(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-medium"
              >
                <option value="All">All Pests</option>
                <option value="Rats or mice">Rats &amp; Mice</option>
                <option value="Bedbugs">Bedbugs</option>
                <option value="Cockroaches">Cockroaches</option>
                <option value="Foxes">Foxes</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Pest</th>
                  <th className="py-3 px-3">Current Status</th>
                  <th className="py-3 px-3">Monitoring</th>
                  <th className="py-3 px-3">Tracking</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {currentCase.referenceNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{currentCase.customerName}</div>
                    <div className="text-[10px] text-slate-400">{currentCase.propertyAddress}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-800">
                      {currentCase.pest}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                      {currentCase.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    Day {currentCase.monitoringDay} of {currentCase.monitoringDaysTotal}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                    {currentCase.trackingNumber || 'RM-7739-GB'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Open Case
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 opacity-75">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    FPP-83912
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">David Miller</div>
                    <div className="text-[10px] text-slate-400">22 Crescent Road, Bristol</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-800">
                      Bedbugs
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-md">
                      PROFESSIONAL_BOOKED
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    Completed
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                    RM-4819-GB
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-xs text-slate-400">Assigned</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 opacity-75">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    FPP-81204
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">Emma Thornton</div>
                    <div className="text-[10px] text-slate-400">8 Highfield Avenue, Leeds</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-800">
                      Rats or mice
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      PROOFING_ACCEPTED
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    Completed
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                    RM-2091-GB
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-xs text-slate-400">Quote £280</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/70 space-y-3">
            <div className="text-xs font-bold text-purple-950 uppercase tracking-wider">
              Workflow Stage Override (Developer MVP Feature)
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as CaseStatus)}
                className="w-full sm:w-auto flex-1 text-xs border border-purple-300 rounded-xl px-3 py-2 bg-white font-medium"
              >
                <option value="MONITORING">MONITORING (Customer 7-day period)</option>
                <option value="ACTIVITY_REPORTED">ACTIVITY_REPORTED (Customer reported activity)</option>
                <option value="PROFESSIONAL_BOOKED">PROFESSIONAL_BOOKED (£95.99 visit booked)</option>
                <option value="PROFESSIONAL_COMPLETED">PROFESSIONAL_COMPLETED (Visit finished)</option>
                <option value="PROOFING_RECOMMENDED">PROOFING_RECOMMENDED (Quote pending customer)</option>
                <option value="PROOFING_ACCEPTED">PROOFING_ACCEPTED (Works approved)</option>
                <option value="RESOLVED">RESOLVED (Pest eradicated, case closed)</option>
              </select>

              <button
                type="button"
                onClick={handleStageOverride}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Apply Status Change</span>
              </button>
            </div>
            <p className="text-[11px] text-purple-900">
              Applying changes updates Sarah's live customer dashboard and adds a dated entry into the audit trail.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};