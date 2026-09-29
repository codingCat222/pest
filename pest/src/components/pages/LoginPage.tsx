// import React, { useState } from 'react';
// import { ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
// import { CaseRecord } from '../../types';
// import { useAuth } from '../../context/AuthContext';

// interface LoginPageProps {
//     currentCase: CaseRecord;
//     onLoginSuccess: (role: 'customer' | 'admin') => void;
//     onNavigate: (page: string) => void;
// }

// export const LoginPage: React.FC<LoginPageProps> = ({
//     currentCase,
//     onLoginSuccess,
//     onNavigate,
// }) => {
//     const { login } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [refNum, setRefNum] = useState('');
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         const normalizedEmail = email.trim().toLowerCase();

//         if (!normalizedEmail || !password) {
//             setError('Please enter both your email and password.');
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const user = await login({ email: normalizedEmail, password });
//             onLoginSuccess(user.role === 'ADMIN' ? 'admin' : 'customer');
//         } catch (err: any) {
//             const message = err?.response?.data?.error || 'Incorrect email or password. Please try again.';
//             setError(message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
//                 <button
//                     type="button"
//                     onClick={() => onNavigate('home')}
//                     className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
//                 >
//                     ← Back to homepage
//                 </button>

//                 <div className="flex items-center gap-2">
//                     <ShieldCheck className="w-5 h-5 text-blue-600" />
//                     <h1 className="text-xl font-extrabold text-slate-900">
//                         Customer Login &amp; Tracking
//                     </h1>
//                 </div>

//                 <p className="text-xs text-slate-600 leading-relaxed">
//                     Access your 7-day monitoring dashboard, track your Royal Mail delivery, or view technician reports.
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="e.g. sarah.jenkins@example.co.uk"
//                             className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Enter your password"
//                                 className="w-full text-xs px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword((v) => !v)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
//                                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//                             >
//                                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                             Order or Case Reference (Optional)
//                         </label>
//                         <input
//                             type="text"
//                             value={refNum}
//                             onChange={(e) => setRefNum(e.target.value)}
//                             placeholder={`e.g. ${currentCase.referenceNumber}`}
//                             className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
//                         />
//                     </div>

//                     {error && (
//                         <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
//                             {error}
//                         </p>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
//                     >
//                         <span>{isSubmitting ? 'SIGNING IN...' : 'ACCESS MY DASHBOARD'}</span>
//                         <ArrowRight className="w-4 h-4" />
//                     </button>
//                 </form>

//                 <p className="text-xs text-slate-500 text-center">
//                     Don't have an account?{' '}
//                     <button
//                         type="button"
//                         onClick={() => onNavigate('signup')}
//                         className="text-blue-600 font-bold hover:underline cursor-pointer"
//                     >
//                         Sign up
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {
    onLoginSuccess: (role: 'customer' | 'admin') => void;
    onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
    onLoginSuccess,
    onNavigate,
}) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            setError('Please enter both your email and password.');
            return;
        }

        setIsSubmitting(true);
        try {
            const user = await login({ email: normalizedEmail, password });
            onLoginSuccess(user.role === 'ADMIN' ? 'admin' : 'customer');
        } catch (err: any) {
            const message = err?.response?.data?.error || 'Incorrect email or password. Please try again.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full text-xs px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                        <span>{isSubmitting ? 'SIGNING IN...' : 'ACCESS MY DASHBOARD'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <p className="text-xs text-slate-500 text-center">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => onNavigate('signup')}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};