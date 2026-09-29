import React, { useState } from 'react';
import { CaseRecord, CaseStatus, PortalPersona } from '../../types';
import {
  Building2,
  Search,
  Filter,
  TrendingUp,
  Package,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Wrench
} from 'lucide-react';

interface AdminDashboardViewProps {
  cases: CaseRecord[];
  activeCase: CaseRecord;
  onUpdateCase: (updated: CaseRecord) => void;
  onSelectCase: (c: CaseRecord) => void;
  onSwitchPersona: (persona: PortalPersona) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  cases,
  activeCase,
  onUpdateCase,
  onSelectCase,
  onSwitchPersona
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusOverride, setSelectedStatusOverride] = useState<CaseStatus>(activeCase.status);
  const [statusUpdated, setStatusUpdated] = useState(false);

  const handleApplyOverride = () => {
    const updated: CaseRecord = {
      ...activeCase,
      status: selectedStatusOverride,
      timeline: [
        ...activeCase.timeline,
        {
          title: `Admin Override: ${selectedStatusOverride}`,
          date: 'Just now',
          completed: true,
          details: `Case stage adjusted by operations coordinator.`
        }
      ]
    };
    onUpdateCase(updated);
    setStatusUpdated(true);
    setTimeout(() => setStatusUpdated(false), 2500);
  };

  const filteredCases = cases.filter(c =>
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight">Free Pest Products • Operations Console</div>
            <div className="text-[11px] text-slate-400">Headquarters Administration</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSwitchPersona('customer')}
            className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
          >
            ← Switch to Customer View
          </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

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
            <div className="text-2xl font-black text-amber-600 mt-0.5 font-mono">312</div>
            <div className="text-[10px] text-slate-500 mt-1">Active customer runs</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-slate-400">£95.99 Bookings</div>
            <div className="text-2xl font-black text-blue-600 mt-0.5 font-mono">94</div>
            <div className="text-[10px] text-slate-500 mt-1">£9,306 collected</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-slate-400">Proofing Opps</div>
            <div className="text-2xl font-black text-purple-600 mt-0.5 font-mono">38</div>
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
              <div className="font-bold text-slate-900 text-lg">42</div>
              <div className="text-[11px] text-slate-500">New Claims</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="font-bold text-lg">312</div>
              <div className="text-[11px]">Monitoring</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
              <div className="font-bold text-lg">94</div>
              <div className="text-[11px]">£95.99 Pro Treatment</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
              <div className="font-bold text-lg">38</div>
              <div className="text-[11px]">Proofing Quoting</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="font-bold text-lg">510</div>
              <div className="text-[11px]">Resolved Cases</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Directory of Active Customer Cases
              </h2>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search customer, ref, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-3 px-3">Reference</th>
                    <th className="py-3 px-3">Customer &amp; Site</th>
                    <th className="py-3 px-3">Pest</th>
                    <th className="py-3 px-3">Stage Status</th>
                    <th className="py-3 px-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${c.id === activeCase.id ? 'bg-purple-50/50' : ''
                        }`}
                      onClick={() => onSelectCase(c)}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {c.referenceNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{c.customerName}</div>
                        <div className="text-[10px] text-slate-400">{c.propertyAddress}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-medium">
                          {c.pest}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded text-[11px]">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-purple-600 hover:underline">
                        Select
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                Operational Control
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Case #{activeCase.referenceNumber}
              </h3>
              <div className="text-xs text-slate-500">{activeCase.customerName} • {activeCase.propertyAddress}</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-3">
              <div className="font-bold text-purple-950 text-[11px] uppercase tracking-wider">
                Workflow Stage Override
              </div>

              <select
                value={selectedStatusOverride}
                onChange={(e) => setSelectedStatusOverride(e.target.value as CaseStatus)}
                className="w-full p-2.5 rounded-xl border border-purple-300 bg-white font-medium text-xs"
              >
                <option value="MONITORING">MONITORING (7-Day Check-in)</option>
                <option value="ACTIVITY_REPORTED">ACTIVITY_REPORTED (Needs Callout)</option>
                <option value="PROFESSIONAL_BOOKED">PROFESSIONAL_BOOKED (£95.99 Active)</option>
                <option value="PROFESSIONAL_COMPLETED">PROFESSIONAL_COMPLETED</option>
                <option value="PROOFING_RECOMMENDED">PROOFING_RECOMMENDED (Quote Sent)</option>
                <option value="PROOFING_ACCEPTED">PROOFING_ACCEPTED (Works Approved)</option>
                <option value="RESOLVED">RESOLVED (Pest Ceased)</option>
              </select>

              <button
                type="button"
                onClick={handleApplyOverride}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Apply Stage Change</span>
              </button>

              {statusUpdated && (
                <div className="text-[11px] font-bold text-emerald-700 text-center">
                  ✓ Case state successfully updated and audit trail logged.
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800">Quick Actions</div>
              <button
                type="button"
                onClick={() => onSwitchPersona('customer')}
                className="w-full py-2 px-3 text-left border rounded-xl hover:bg-slate-50 text-slate-700 font-medium"
              >
                → View as Customer in Dashboard
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};