import React, { useState } from 'react';
import { CaseRecord } from '../../types';
import { User, MapPin, Bell, Shield, Check } from 'lucide-react';

interface AccountSettingsViewProps {
  activeCase: CaseRecord;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({ activeCase }) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-16">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal details, property locations, and notification preferences.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Account preferences successfully updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                defaultValue={activeCase.customerName}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={activeCase.customerEmail}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Telephone</label>
              <input 
                type="tel" 
                defaultValue={activeCase.customerPhone}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Role</label>
              <input 
                type="text" 
                disabled 
                defaultValue="Registered Property Owner / Tenant"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Registered Property</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Address</label>
              <input 
                type="text" 
                defaultValue={activeCase.propertyAddress}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Postcode</label>
              <input 
                type="text" 
                defaultValue={activeCase.postcode}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Property Type</label>
              <input 
                type="text" 
                defaultValue="Residential House"
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-slate-800">SMS Reminders &amp; Delivery Tracking</div>
                <div className="text-[11px] text-slate-500">Receive courier dispatch and monitoring check-in text messages.</div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0" 
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-slate-800">Email Treatment Reports &amp; Quotes</div>
                <div className="text-[11px] text-slate-500">Receive PDF records and inspection summaries to your email.</div>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0" 
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
};
