import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react';
import { CaseRecord } from '../types';
import { useAuth } from '../context/AuthContext';
import { CasesService, CreateCasePayload } from '../services/cases';
import { EligibilityProduct, EligibilityService } from '../services/eligibility';
import { apiErrorMessage } from '../services/format';

export interface EligibilityDetails {
    fullName: string;
    email: string;
    phone: string;
    propertyAddress: string;
    postcode: string;
    pest: string;
    location: string;
    productId?: string;
}

interface EligibilityModalProps {
    details: EligibilityDetails;
    product: EligibilityProduct;
    isLoggedIn: boolean;
    onClose: () => void;
    onFinished: (created: CaseRecord) => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
    details,
    product,
    isLoggedIn,
    onClose,
    onFinished,
}) => {
    const navigate = useNavigate();
    const { startSession } = useAuth();
    const [step, setStep] = useState<'eligible' | 'password'>('eligible');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailTaken, setEmailTaken] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !submitting) onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose, submitting]);

    const casePayload = (): CreateCasePayload => ({
        propertyName: details.propertyAddress || 'My Property',
        customerName: details.fullName,
        customerEmail: details.email,
        customerPhone: details.phone,
        propertyAddress: details.propertyAddress,
        postcode: details.postcode,
        pest: details.pest,
        location: details.location,
        productId: details.productId,
    });

    const handleContinue = async () => {
        setError(null);
        if (!isLoggedIn) {
            setStep('password');
            return;
        }
        setSubmitting(true);
        try {
            const created = await CasesService.create(casePayload());
            onFinished(created);
        } catch (err) {
            setError(apiErrorMessage(err, 'Unable to submit your request. Please try again.'));
            setSubmitting(false);
        }
    };

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setEmailTaken(false);

        if (password.length < 8) {
            setError('Your password must be at least 8 characters.');
            return;
        }
        if (password !== confirm) {
            setError('The two passwords do not match.');
            return;
        }

        setSubmitting(true);
        try {
            const result = await EligibilityService.claim({
                fullName: details.fullName,
                email: details.email,
                password,
                phone: details.phone,
                propertyAddress: details.propertyAddress,
                postcode: details.postcode,
                pest: details.pest,
                location: details.location,
                productId: details.productId,
            });
            startSession(result.auth);
            onFinished(result.case);
        } catch (err: any) {
            if (err?.response?.status === 409) setEmailTaken(true);
            setError(apiErrorMessage(err, 'Unable to create your account. Please try again.'));
            setSubmitting(false);
        }
    };

    const handleLoginInstead = () => {
        sessionStorage.setItem('pendingCase', JSON.stringify(casePayload()));
        navigate('/login');
    };

    const rows: { label: string; value: string }[] = [
        { label: 'Name', value: details.fullName },
        { label: 'Email', value: details.email },
        { label: 'Mobile', value: details.phone },
        { label: 'Address', value: details.propertyAddress },
        { label: 'Postcode', value: details.postcode.toUpperCase() },
        { label: 'Pest', value: details.pest },
        { label: 'Where', value: details.location },
    ];

    const inputClass =
        'w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-purple';

    return (
        <div
            className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eligibility-modal-title"
        >
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
                {step === 'eligible' && (
                    <div className="space-y-6">
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h2 id="eligibility-modal-title" className="text-2xl font-extrabold text-brand-purple tracking-tight">
                                Good news, you're eligible!
                            </h2>
                            <p className="text-sm text-slate-600">
                                You qualify for a free {details.pest.toLowerCase()} product. Here's what you've told us.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 text-sm">
                            {rows.map((row) => (
                                <div key={row.label} className="flex justify-between gap-4 px-4 py-2.5">
                                    <span className="text-slate-500 shrink-0">{row.label}</span>
                                    <span className="font-semibold text-slate-900 text-right break-words min-w-0">{row.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl bg-brand-green/10 border border-brand-green/20 px-4 py-3 text-sm">
                            <div className="font-bold text-brand-purple">{product.name}</div>
                            <div className="text-slate-600 mt-0.5">
                                Product £0.00 · Delivery £{product.deliveryCost.toFixed(2)}
                            </div>
                        </div>

                        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={handleContinue}
                                disabled={submitting}
                                className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-60"
                            >
                                {submitting ? 'Please wait...' : isLoggedIn ? 'Continue to my dashboard' : 'Continue'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={submitting}
                                className="w-full py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                                Edit my details
                            </button>
                        </div>
                    </div>
                )}

                {step === 'password' && (
                    <form onSubmit={handleCreateAccount} className="space-y-5">
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-14 h-14 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                                <Lock className="w-7 h-7" />
                            </div>
                            <h2 id="eligibility-modal-title" className="text-2xl font-extrabold text-brand-purple tracking-tight">
                                Secure your account
                            </h2>
                            <p className="text-sm text-slate-600">
                                Create a password to protect your account and access your dashboard.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                            <input type="email" value={details.email} readOnly className={`${inputClass} bg-slate-50 text-slate-500`} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    autoFocus
                                    placeholder="At least 8 characters"
                                    className={`${inputClass} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                autoComplete="new-password"
                                placeholder="Re-enter your password"
                                className={inputClass}
                            />
                        </div>

                        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

                        {emailTaken && (
                            <button
                                type="button"
                                onClick={handleLoginInstead}
                                className="w-full py-3 border border-brand-purple text-brand-purple font-bold rounded-xl hover:bg-brand-purple/5 cursor-pointer"
                            >
                                Log in instead
                            </button>
                        )}

                        <div className="space-y-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-sm cursor-pointer disabled:opacity-60"
                            >
                                {submitting ? 'Creating your account...' : 'Create account & go to my dashboard'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setStep('eligible'); setError(null); setEmailTaken(false); }}
                                disabled={submitting}
                                className="w-full py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                                ← Back
                            </button>
                        </div>

                        <p className="text-[11px] text-slate-500 text-center">
                            We'll also email you a welcome message with your next steps.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};