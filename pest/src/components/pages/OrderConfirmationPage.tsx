import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CaseRecord, OrderItemRecord } from '../../types';
import { CasesService, UNPAID_CASE_STATUSES } from '../../services/cases';
import { OrdersService } from '../../services/orders';
import { PaymentsService } from '../../services/payments';
import { apiErrorMessage } from '../../services/format';

interface OrderConfirmationPageProps {
    onPaymentSettled: () => Promise<void> | void;
}

const NEXT_STEPS = [
    "We'll prepare your order",
    "We'll dispatch your product",
    "You'll receive delivery confirmation",
    'Your monitoring journey begins',
];

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ onPaymentSettled }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [caseRecord, setCaseRecord] = useState<CaseRecord | null>(null);
    const [order, setOrder] = useState<OrderItemRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!caseId || started.current) return;
        started.current = true;

        (async () => {
            try {
                let loaded = await CasesService.getById(caseId);
                const paymentIntentId = searchParams.get('payment_intent');

                if (UNPAID_CASE_STATUSES.includes(loaded.status) && paymentIntentId) {
                    await PaymentsService.confirm(paymentIntentId);
                    await onPaymentSettled();
                    loaded = await CasesService.getById(caseId);
                }

                setCaseRecord(loaded);
                const orders = await OrdersService.list();
                setOrder(orders.find((o) => o.caseRef === loaded.referenceNumber) ?? null);
            } catch (err) {
                setError(apiErrorMessage(err, 'Unable to load your order.'));
            } finally {
                setLoading(false);
            }
        })();
    }, [caseId, searchParams, onPaymentSettled]);

    const unpaid = caseRecord ? UNPAID_CASE_STATUSES.includes(caseRecord.status) : false;

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                {loading && <p className="text-sm text-slate-500">Loading your order...</p>}
                {!loading && error && <p className="text-sm font-semibold text-red-600">{error}</p>}

                {!loading && !error && caseRecord && unpaid && (
                    <div className="space-y-4">
                        <h1 className="text-3xl font-extrabold text-brand-purple tracking-tight">Payment not completed</h1>
                        <p className="text-sm text-slate-600">
                            We haven't received your delivery payment yet, so your product hasn't been ordered.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate(`/checkout/${caseRecord.id}`)}
                            className="px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl cursor-pointer"
                        >
                            Return to checkout
                        </button>
                    </div>
                )}

                {!loading && !error && caseRecord && !unpaid && (
                    <>
                        <div className="text-center space-y-3">
                            <div className="mx-auto w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-brand-purple tracking-tight">You're All Set!</h1>
                            <p className="text-slate-600">Your free product has been ordered.</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6 space-y-2 text-sm">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Details</div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Order</span>
                                <span className="font-mono font-semibold text-slate-900">
                                    #{order?.orderNumber ?? caseRecord.referenceNumber}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Product</span>
                                <span className="font-semibold text-slate-900">{caseRecord.productName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Delivery</span>
                                <span className="font-semibold text-slate-900">
                                    £{(order?.deliveryFee ?? caseRecord.deliveryFee).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6 text-sm">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">What Happens Next?</div>
                            <ol className="space-y-3">
                                {NEXT_STEPS.map((step, i) => (
                                    <li key={step} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-xs font-bold flex items-center justify-center shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-slate-700">{step}</span>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-5 text-xs text-slate-500">You can track everything from your dashboard.</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-sm cursor-pointer"
                        >
                            GO TO MY DASHBOARD
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};