import React, { useRef, useState } from 'react';
import { CaseRecord } from '../../types';
import { User, MapPin, Bell, Shield, Check, Camera, Trash2 } from 'lucide-react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../context/AuthContext';
import { fileToAvatarDataUrl } from '../../utils/image';
import { apiErrorMessage } from '../../services/format';

interface AccountSettingsViewProps {
  activeCase: CaseRecord | null;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({ activeCase }) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? activeCase?.customerName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? activeCase?.customerPhone ?? '');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    if (!fullName.trim()) {
      setSaveError('Full name cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ fullName: fullName.trim(), phone: phone.trim() || null });
      flashSaved();
    } catch (err) {
      setSaveError(apiErrorMessage(err, 'Unable to save your changes.'));
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setPhotoError(null);
    setPhotoBusy(true);
    try {
      const avatarUrl = await fileToAvatarDataUrl(file);
      await updateProfile({ avatarUrl });
      flashSaved();
    } catch (err: any) {
      setPhotoError(err?.response?.data?.error || err?.message || 'Unable to upload your photo.');
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleRemovePhoto = async () => {
    setPhotoError(null);
    setPhotoBusy(true);
    try {
      await updateProfile({ avatarUrl: null });
      flashSaved();
    } catch (err) {
      setPhotoError(apiErrorMessage(err, 'Unable to remove your photo.'));
    } finally {
      setPhotoBusy(false);
    }
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

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Camera className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Profile Photo</h2>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
          <Avatar name={fullName} src={user?.avatarUrl} className="w-20 h-20 text-xl" />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePhotoSelected}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={photoBusy}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer disabled:opacity-60"
              >
                {photoBusy ? 'Working...' : user?.avatarUrl ? 'Change photo' : 'Upload photo'}
              </button>
              {user?.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={photoBusy}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer disabled:opacity-60"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500">JPG, PNG or WebP. Your photo is cropped to a square.</p>
            {photoError && <p className="text-xs font-semibold text-red-600">{photoError}</p>}
          </div>
        </div>
      </div>

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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email ?? activeCase?.customerEmail ?? ''}
                readOnly
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Telephone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                defaultValue={activeCase?.propertyAddress ?? ''}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Postcode</label>
              <input
                type="text"
                defaultValue={activeCase?.postcode ?? ''}
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

        {saveError && <p className="text-xs font-semibold text-red-600 text-right">{saveError}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </form>

    </div>
  );
};