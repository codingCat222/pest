import React, { useState } from 'react';
import { Avatar } from '../Avatar';
import { useAuth } from '../../context/AuthContext';
import { AdminNavTab } from '../../types';
import {
    LayoutDashboard,
    FolderKanban,
    Package,
    Wrench,
    CreditCard,
    ShieldAlert,
    BarChart3,
    ScrollText,
    ChevronDown,
    LogOut,
    User,
    Building2,
} from 'lucide-react';

interface AdminSidebarProps {
    currentTab: AdminNavTab;
    onSelectTab: (tab: AdminNavTab) => void;
    onLogout: () => void;
    pendingProofingCount?: number;
    activeCasesCount?: number;
}

const NAV_ITEMS: { tab: AdminNavTab; label: string; icon: React.ElementType; group: string }[] = [
    { tab: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'Overview' },
    { tab: 'cases', label: 'Case Directory', icon: FolderKanban, group: 'Operations' },
    { tab: 'products', label: 'Products', icon: Package, group: 'Operations' },
    { tab: 'technicians', label: 'Technicians', icon: Wrench, group: 'Operations' },
    { tab: 'payments', label: 'Payments & Orders', icon: CreditCard, group: 'Finance' },
    { tab: 'proofing', label: 'Proofing Quotes', icon: ShieldAlert, group: 'Finance' },
    { tab: 'reports', label: 'Reports & Analytics', icon: BarChart3, group: 'Insights' },
    { tab: 'audit-log', label: 'Audit Log', icon: ScrollText, group: 'Insights' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
    currentTab,
    onSelectTab,
    onLogout,
    pendingProofingCount,
    activeCasesCount,
}) => {
    const { user } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const groups = Array.from(new Set(NAV_ITEMS.map((i) => i.group)));

    const badgeFor = (tab: AdminNavTab): number | undefined => {
        if (tab === 'proofing') return pendingProofingCount;
        if (tab === 'cases') return activeCasesCount;
        return undefined;
    };

    return (
        <aside className="w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">

            <div className="flex flex-col min-h-0">
                <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                            <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                                Free Pest Products
                            </div>
                            <div className="text-[11px] font-medium text-slate-400">
                                Operations Console
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="p-3 space-y-4 overflow-y-auto flex-1">
                    {groups.map((group) => (
                        <div key={group}>
                            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                {group}
                            </div>
                            <div className="space-y-1">
                                {NAV_ITEMS.filter((i) => i.group === group).map(({ tab, label, icon: Icon }) => {
                                    const badge = badgeFor(tab);
                                    return (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => onSelectTab(tab)}
                                            className={`w-full relative flex items-center justify-between px-3 h-10 rounded-lg text-sm transition-colors cursor-pointer ${currentTab === tab
                                                ? 'bg-slate-100 text-slate-900 font-semibold'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {currentTab === tab && (
                                                    <span className="w-1 h-5 bg-blue-600 rounded-r absolute left-0" />
                                                )}
                                                <Icon className={`w-4 h-4 ${currentTab === tab ? 'text-blue-600' : 'text-slate-400'}`} />
                                                <span>{label}</span>
                                            </div>
                                            {typeof badge === 'number' && badge > 0 && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                                                    {badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="p-3 border-t border-slate-100 space-y-2">
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/70 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <Avatar name={user?.fullName} src={user?.avatarUrl} className="w-8 h-8 text-xs" />
                            <div className="text-left min-w-0">
                                <div className="text-xs font-semibold text-slate-900 truncate">
                                    {user?.fullName ?? 'Operations Admin'}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">
                                    Headquarters
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
                                Account
                            </div>
                            <button
                                type="button"
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 text-left"
                            >
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>My Account</span>
                            </button>

                            <div className="my-1 border-t border-slate-100" />

                            <button
                                type="button"
                                onClick={onLogout}
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