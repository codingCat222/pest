import React from 'react';
import { CustomerNavTab } from '../../types';
import { LayoutDashboard, Compass, PackageCheck, CalendarDays, MoreHorizontal } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: CustomerNavTab;
  onSelectTab: (tab: CustomerNavTab) => void;
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMore
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-slate-500">
      
      <button
        type="button"
        onClick={() => onSelectTab('dashboard')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
          currentTab === 'dashboard' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Home</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('journey')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
          currentTab === 'journey' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Journey</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('orders')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
          currentTab === 'orders' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <PackageCheck className="w-4 h-4" />
        <span>Orders</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('appointments')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
          currentTab === 'appointments' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
        }`}
      >
        <CalendarDays className="w-4 h-4" />
        <span>Visits</span>
      </button>

      <button
        type="button"
        onClick={onOpenMore}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors text-slate-600 hover:text-slate-900 cursor-pointer"
      >
        <MoreHorizontal className="w-4 h-4" />
        <span>More</span>
      </button>

    </nav>
  );
};
