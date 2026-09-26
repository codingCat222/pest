import React, { useState } from 'react';
import { CustomerNavTab, CaseRecord, PortalPersona } from '../../types';
import { Bell, Search, ShieldCheck, ChevronRight, Menu, CheckCircle2, Clock, X } from 'lucide-react';

interface CustomerTopHeaderProps {
  currentTab: CustomerNavTab;
  activeCase: CaseRecord;
  onOpenMobileMenu: () => void;
  onSwitchPersona: (persona: PortalPersona) => void;
}

export const CustomerTopHeader: React.FC<CustomerTopHeaderProps> = ({
  currentTab,
  activeCase,
  onOpenMobileMenu,
  onSwitchPersona
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Day 4 Monitoring Check-in',
      desc: 'Please submit your activity report for 14 Meadowcroft Grove.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Product Delivered Successfully',
      desc: 'Royal Mail confirmed delivery of Targeted Rodent Activity Kit.',
      time: 'Yesterday',
      read: true
    },
    {
      id: 'notif-3',
      title: 'Proofing Recommendation Generated',
      desc: 'Technician inspection identified 3 potential entry voids.',
      time: '3 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getBreadcrumbName = (tab: CustomerNavTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'journey': return 'My Journey';
      case 'orders': return 'My Orders';
      case 'appointments': return 'Appointments';
      case 'monitoring': return 'Activity & Monitoring';
      case 'proofing': return 'Proofing & Quotes';
      case 'documents': return 'Documents';
      case 'account': return 'Account Settings';
      case 'help': return 'Help & Support';
      default: return 'Overview';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="font-medium text-slate-600">Overview</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-900">{getBreadcrumbName(currentTab)}</span>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          {activeCase.pest}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors cursor-pointer"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div 
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="font-bold text-slate-900 text-sm">Notifications</div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-[11px] font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div 
                    key={n.id}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      n.read ? 'bg-white border-slate-100 text-slate-500' : 'bg-blue-50/50 border-blue-100 text-slate-800 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-900">{n.title}</span>
                      <span className="text-slate-400 text-[10px]">{n.time}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <button
            type="button"
            onClick={() => onSwitchPersona('storefront')}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            Public Website
          </button>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
          JS
        </div>
      </div>

    </header>
  );
};
