import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CaseRecord } from '../../types';

interface LoginPageProps {
    currentCase: CaseRecord;
    onLoginSuccess: (role: 'customer' | 'admin') => void;
    onNavigate: (page: string) => void;
}

const DEMO_PASSWORD = 'demo1234';
const ADMIN_EMAIL = 'admin@brivent-pest.co.uk';
const ADMIN_PASSWORD = 'admin1234';

export const LoginPage: React.FC<LoginPageProps> = ({
    currentCase,
    onLoginSuccess,
    onNavigate,
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

        if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            onLoginSuccess('admin');
            return;
        }

        if (normalizedEmail === expectedEmail && password === DEMO_PASSWORD) {
            onLoginSuccess('customer');
            return;
        }

        setError('Incorrect email or password. Please try again.');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                    ← Back to homepage
                </button>

                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h1 className="text-xl font-extrabold text-slate-900">
                        Customer Login &amp; Tracking
                    </h1>
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

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <p>Customer demo: {currentCase.customerEmail} / {DEMO_PASSWORD}</p>
                    <p>Admin demo: {ADMIN_EMAIL} / {ADMIN_PASSWORD}</p>
                </div>
            </div>
        </div>
    );
};