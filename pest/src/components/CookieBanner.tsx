import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { NavigationPage } from '../types';

interface CookieBannerProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fpp_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fpp_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('fpp_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-700 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 font-bold text-xs text-blue-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Cookie Preferences</span>
        </div>
        <button
          onClick={handleEssentialOnly}
          className="text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        We use essential cookies for your security and customer dashboard. Optional analytics cookies help us measure journey efficiency.
      </p>

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={() => {
            setVisible(false);
            onNavigate('cookies');
          }}
          className="text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
        >
          Policy Details
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEssentialOnly}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
