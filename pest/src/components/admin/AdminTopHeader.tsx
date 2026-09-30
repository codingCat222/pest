import React, { useState } from 'react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../context/AuthContext';
import { AdminNavTab } from '../../types';
import { Bell, ChevronRight, Menu, ScrollText } from 'lucide-react';

interface AdminTopHeaderProps {
    currentTab: AdminNavTab;
    onOpenMobileMenu: () => void;
    onOpenAuditLog: () => void;
}

const TAB_LABEL: Record<AdminNavTab, string> = {
    overview: 'Overview',
    cases: 'Case Directory',
    products: 'Products',
    technicians: 'Technicians',
    payments: 'Payments & Orders',
    proofing: 'Proofing Quotes',
    reports: 'Reports & Analytics',
    'audit-log': 'Audit Log',
};

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
    currentTab,
    onOpenMobileMenu,
    onOpenAuditLog,
}) => {
    const { user } = useAuth();
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const notifications = [
        {
            id: 'n1',
            title: 'New proofing quote accepted',
            desc: 'Case FP-10114 accepted their £340 proofing quote.',
            time: '18 min ago',
        },
        {
            id: 'n2',
            title: 'Monitoring reminder sent',
            desc: '46 customers reminded to submit Day-7 activity reports.',
            time: '1 hour ago',
        },
        {
            id: 'n3',
            title: 'Payment failed',
            desc: 'Delivery charge for order #FPP-2291 could not be captured.',
            time: 'Yesterday',
        },
    ];

    return (
        <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
                <button
                    type="button"
                    onClick={onOpenMobileMenu}
                    className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    aria-label="Toggle mobile menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 min-w-0">
                    <span className="font-medium text-slate-600 hidden sm:inline">Operations Console</span>
                    <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
                    <span className="font-bold text-slate-900 truncate">{TAB_LABEL[currentTab]}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    onClick={onOpenAuditLog}
                    className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${currentTab === 'audit-log'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                        }`}
                >
                    <ScrollText className="w-3.5 h-3.5" />
                    Audit Log
                </button>

                <button
                    type="button"
                    onClick={onOpenAuditLog}
                    className="sm:hidden p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    aria-label="Open audit log"
                >
                    <ScrollText className="w-4 h-4" />
                </button>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors cursor-pointer"
                        aria-label="Open notifications"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                    </button>

                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                <div className="font-bold text-slate-900 text-sm">Notifications</div>
                            </div>

                            <div className="space-y-2 max-h-72 overflow-y-auto">
                                {notifications.map((n) => (
                                    <div key={n.id} className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/50 text-slate-800">
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

                <Avatar name={user?.fullName} src={user?.avatarUrl} className="w-8 h-8 text-xs" />
            </div>
        </header>
    );
};