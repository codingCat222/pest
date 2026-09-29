import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CaseRecord } from '../../types';

interface OrderConfirmationPageProps {
    activeCase: CaseRecord | null;
    onGoToDashboard: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
    activeCase,
    onGoToDashboard,
}) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-slate-200 shadow-xl text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">You're all set!</h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {activeCase
                            ? <>Your case <span className="font-bold text-slate-900">{activeCase.referenceNumber}</span> has been created. We'll be in touch about next steps for your free product.</>
                            : 'Your request has been submitted. We\'ll be in touch about next steps for your free product.'}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onGoToDashboard}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                    Go to My Dashboard
                </button>
            </div>
        </div>
    );
};