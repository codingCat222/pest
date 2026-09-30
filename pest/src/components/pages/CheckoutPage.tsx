import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';
import { CaseRecord } from '../../types';
import { CasesService, UNPAID_CASE_STATUSES } from '../../services/cases';
import { PaymentsService } from '../../services/payments';
import { apiErrorMessage } from '../../services/format';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface CheckoutPageProps {
    onPaymentSettled: () => Promise<void> | void;
}

const PaymentForm: React.FC<{
    caseId: string;
    onPaid: (paymentIntentId: string) => Promise<void>;
}> = ({ caseId, onPaid }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setSubmitting(true);
        setError(null);

        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: { return_url: `${window.location.origin}/order-confirmation/${caseId}` },
        });

        if (stripeError) {
            setError(stripeError.message ?? 'Your payment could not be completed.');
            setSubmitting(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                await onPaid(paymentIntent.id);
            } catch (err) {
                setError(
                    apiErrorMessage(err, 'Your payment went through but we could not update your order. Please contact support.')
                );
                setSubmitting(false);
            }
            return;
        }

        setError('Your payment is still processing. Please check your dashboard in a moment.');
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <PaymentElement />
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || submitting}
                className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
                <Lock className="w-4 h-4" />
                <span>{submitting ? 'Processing...' : 'PAY DELIVERY & CLAIM PRODUCT'}</span>
            </button>
        </form>
    );
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPaymentSettled }) => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const [caseRecord, setCaseRecord] = useState<CaseRecord | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!caseId || started.current) return;
        started.current = true;

        (async () => {
            try {
                const loaded = await CasesService.getById(caseId);
                setCaseRecord(loaded);

                if (!UNPAID_CASE_STATUSES.includes(loaded.status)) {
                    navigate(`/order-confirmation/${caseId}`, { replace: true });
                    return;
                }

                if (stripePromise) {
                    const intent = await PaymentsService.createIntent(caseId);
                    setClientSecret(intent.clientSecret);
                }
            } catch (err) {
                setError(apiErrorMessage(err, 'Unable to load your checkout.'));
            } finally {
                setLoading(false);
            }
        })();
    }, [caseId, navigate]);

    const handlePaid = async (paymentIntentId: string) => {
        if (!caseId) return;
        await PaymentsService.confirm(paymentIntentId);
        await onPaymentSettled();
        navigate(`/order-confirmation/${caseId}`);
    };

    const address = caseRecord ? [caseRecord.propertyAddress, caseRecord.postcode].filter(Boolean).join(', ') : '';

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-purple tracking-tight">Your Free Product</h1>
                    <p className="text-sm text-slate-500 mt-1">Pay the delivery charge to claim your product.</p>
                </div>

                {loading && <p className="text-sm text-slate-500">Loading your checkout...</p>}
                {!loading && error && <p className="text-sm font-semibold text-red-600">{error}</p>}

                {!loading && !error && caseRecord && (
                    <>
                        <div className="rounded-2xl border border-slate-200 p-6 space-y-3 text-sm">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Summary</div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Product: {caseRecord.productName}</span>
                                <span className="font-semibold text-slate-900">£0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Delivery</span>
                                <span className="font-semibold text-slate-900">£{caseRecord.deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-slate-100 text-base">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="font-extrabold text-slate-900">£{caseRecord.deliveryFee.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6 text-sm space-y-1">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Delivery Address</div>
                            <div className="text-slate-800">{address}</div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-xs text-slate-600 leading-relaxed">
                            <div className="font-bold text-slate-800 mb-1">Important Information</div>
                            Please review the product information and applicable instructions before completing your order.
                        </div>

                        {!stripePromise && (
                            <p className="text-sm font-semibold text-red-600">
                                Online payments aren't switched on yet. Please contact support to complete your order.
                            </p>
                        )}

                        {stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm caseId={caseRecord.id} onPaid={handlePaid} />
                            </Elements>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};