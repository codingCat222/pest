import React, { useEffect, useState } from 'react';
import { CustomerNavTab, CaseRecord, PortalPersona } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../Avatar';
import { ProductsService } from '../../services/products';
import {
  LayoutDashboard,
  Compass,
  PackageCheck,
  CalendarDays,
  Activity,
  FileText,
  ShieldAlert,
  Settings,
  HelpCircle,
  ChevronDown,
  Check,
  LogOut,
  User,
  ExternalLink,
  ShieldCheck,
  X,
  Package,
} from 'lucide-react';

interface CustomerSidebarProps {
  currentTab: CustomerNavTab;
  onSelectTab: (tab: CustomerNavTab) => void;
  cases: CaseRecord[];
  activeCase: CaseRecord | null;
  onSelectCase: (caseRecord: CaseRecord) => void;
  onSwitchPersona: (persona: PortalPersona) => void;
  onSignOut: () => void;
  variant?: 'desktop' | 'drawer';
  onClose?: () => void;
}

export const CustomerSidebar: React.FC<CustomerSidebarProps> = ({
  currentTab,
  onSelectTab,
  cases,
  activeCase,
  onSelectCase,
  onSwitchPersona,
  onSignOut,
  variant = 'desktop',
  onClose
}) => {
  const { user } = useAuth();
  const displayName = user?.fullName ?? activeCase?.customerName ?? '';
  const [productImage, setProductImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCase) {
      setProductImage(null);
      return;
    }
    let cancelled = false;
    const wanted = activeCase.productName.trim().toLowerCase();
    ProductsService.list()
      .then((products) => {
        if (cancelled) return;
        setProductImage(products.find((p) => p.name.trim().toLowerCase() === wanted)?.imageUrl ?? null);
      })
      .catch(() => {
        if (!cancelled) setProductImage(null);
      });
    return () => {
      cancelled = true;
    };
  }, [activeCase?.productName]);
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <aside
      className={
        variant === 'drawer'
          ? 'w-full h-full bg-white flex flex-col justify-between select-none'
          : 'w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 z-30 select-none'
      }
    >

      <div className="flex flex-col flex-1 min-h-0">

        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Free Pest Products
              </div>
              <div className="text-[11px] font-medium text-slate-400">
                Customer Portal
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative mt-3">
            <button
              type="button"
              onClick={() => cases.length > 0 && setCaseDropdownOpen(!caseDropdownOpen)}
              disabled={cases.length === 0}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors text-left cursor-pointer disabled:cursor-default disabled:hover:bg-slate-50"
            >
              <div className="min-w-0 pr-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Case
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {activeCase ? activeCase.propertyName : 'No case yet'}
                </div>
              </div>
              {cases.length > 0 && (
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${caseDropdownOpen ? 'rotate-180' : ''}`} />
              )}
            </button>

            {caseDropdownOpen && cases.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs"
                onClick={() => setCaseDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Active Property
                </div>
                {cases.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCase(c)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 text-slate-700 cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-slate-900 truncate">{c.propertyName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{c.propertyAddress}</div>
                    </div>
                    {activeCase && c.id === activeCase.id && (
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {activeCase && (
            <button
              type="button"
              onClick={() => {
                onSelectTab('dashboard');
                setTimeout(() => {
                  document.getElementById('your-product')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.dispatchEvent(new Event('open-product-details'));
                }, 80);
              }}
              className="mt-3 w-full flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 p-2.5 text-left transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green-soft text-brand-green flex items-center justify-center overflow-hidden shrink-0">
                {productImage ? (
                  <img src={productImage} alt={activeCase.productName} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Free Product</div>
                <div className="text-xs font-semibold text-slate-800 truncate">{activeCase.productName}</div>
                <div className="text-[10px] text-slate-500">£0.00 · Delivery £{activeCase.deliveryFee.toFixed(2)}</div>
              </div>
            </button>
          )}
        </div>

        <nav className="p-3 space-y-4 overflow-y-auto flex-1">
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Overview
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('dashboard')}
              className={`w-full relative flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'dashboard'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {currentTab === 'dashboard' && (
                <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
              )}
              <LayoutDashboard className={`w-4 h-4 ${currentTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Dashboard</span>
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              My Journey
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('journey')}
              className={`w-full relative flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'journey'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {currentTab === 'journey' && (
                <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
              )}
              <Compass className={`w-4 h-4 ${currentTab === 'journey' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>My Journey</span>
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Orders
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('orders')}
              className={`w-full relative flex items-center justify-between px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'orders'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                {currentTab === 'orders' && (
                  <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
                )}
                <PackageCheck className={`w-4 h-4 ${currentTab === 'orders' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>My Orders</span>
              </div>
              {cases.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-600">
                  {cases.length}
                </span>
              )}
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Appointments
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('appointments')}
              className={`w-full relative flex items-center justify-between px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'appointments'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                {currentTab === 'appointments' && (
                  <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
                )}
                <CalendarDays className={`w-4 h-4 ${currentTab === 'appointments' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>My Appointments</span>
              </div>
              {activeCase?.appointmentDate && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Monitoring
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('monitoring')}
              className={`w-full relative flex items-center justify-between px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'monitoring'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                {currentTab === 'monitoring' && (
                  <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
                )}
                <Activity className={`w-4 h-4 ${currentTab === 'monitoring' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>Activity &amp; Monitoring</span>
              </div>
              {activeCase && activeCase.monitoringDay > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                  Day {activeCase.monitoringDay}
                </span>
              )}
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Documents
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('documents')}
              className={`w-full relative flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'documents'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {currentTab === 'documents' && (
                <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
              )}
              <FileText className={`w-4 h-4 ${currentTab === 'documents' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Documents</span>
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Proofing
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('proofing')}
              className={`w-full relative flex items-center justify-between px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'proofing'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              <div className="flex items-center gap-3">
                {currentTab === 'proofing' && (
                  <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
                )}
                <ShieldAlert className={`w-4 h-4 ${currentTab === 'proofing' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>Proofing</span>
              </div>
              {activeCase?.proofingQuote && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Quote Ready
                </span>
              )}
            </button>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Account
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('account')}
              className={`w-full relative flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === 'account'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {currentTab === 'account' && (
                <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
              )}
              <Settings className={`w-4 h-4 ${currentTab === 'account' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Account Settings</span>
            </button>
          </div>
        </nav>
      </div>

      <div className="p-3 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={() => onSelectTab('help')}
          className="w-full flex items-center gap-3 px-3 h-9 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Help &amp; Support</span>
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={displayName} src={user?.avatarUrl} className="w-8 h-8 text-xs" />
              <div className="text-left min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {displayName || 'My account'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Customer Account
                </div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs space-y-0.5"
              onClick={() => setProfileDropdownOpen(false)}
            >
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Account &amp; Views
              </div>
              <button
                type="button"
                onClick={() => onSelectTab('account')}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>My Account</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('account')}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 text-left"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Notification Settings</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={() => onSwitchPersona('storefront')}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-blue-700 hover:bg-blue-50 text-left font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Website</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              <button
                type="button"
                onClick={onSignOut}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-50 text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

    </aside>
  );
};