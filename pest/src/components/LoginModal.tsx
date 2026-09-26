import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { CaseRecord } from '../types';

interface LoginModalProps {
  currentCase: CaseRecord;
  onClose: () => void;
  onViewDashboard: () => void;
}

// Demo-only credential check (frontend has no backend auth yet).
// Password for every mock case is "demo1234" until real auth is wired up.
const DEMO_PASSWORD = 'demo1234';

export const LoginModal: React.FC<LoginModalProps> = ({
  currentCase,
  onClose,
  onViewDashboard
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refNum, setRefNum] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const expectedEmail = currentCase.customerEmail.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    if (normalizedEmail !== expectedEmail || password !== DEMO_PASSWORD) {
      setError('Incorrect email or password. Please try again.');
      return;
    }

    onViewDashboard();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Customer Login &amp; Tracking
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Access your 7-day monitoring dashboard, track your Royal Mail delivery, or view technician reports.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarah.jenkins@example.co.uk"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Order or Case Reference (Optional)
            </label>
            <input
              type="text"
              value={refNum}
              onChange={(e) => setRefNum(e.target.value)}
              placeholder={`e.g. ${currentCase.referenceNumber}`}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ACCESS MY DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Demo login: {currentCase.customerEmail} / {DEMO_PASSWORD}</span>
        </div>
      </div>
    </div>
  );
};