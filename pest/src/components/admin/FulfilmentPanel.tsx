import React, { useState } from 'react';
import { PackageCheck, Truck } from 'lucide-react';
import { CaseRecord } from '../../types';
import { AdminService } from '../../services/admin';
import { UNPAID_CASE_STATUSES } from '../../services/cases';
import { apiErrorMessage } from '../../services/format';

interface FulfilmentPanelProps {
    activeCase: CaseRecord;
    onUpdated: (updated: CaseRecord) => void;
}

const COURIERS = ['Royal Mail', 'DPD', 'Evri', 'DHL', 'UPS', 'Yodel'];

const inputClass =
    'w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600';

export const FulfilmentPanel: React.FC<FulfilmentPanelProps> = ({ activeCase, onUpdated }) => {
    const [courier, setCourier] = useState('Royal Mail');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDispatch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!courier.trim()) {
            setError('Enter the courier.');
            return;
        }
        setBusy(true);
        try {
            const updated = await AdminService.dispatchCase(activeCase.id, {
                courier: courier.trim(),
                trackingNumber: trackingNumber.trim() || undefined,
            });
            setTrackingNumber('');
            onUpdated(updated);
        } catch (err) {
            setError(apiErrorMessage(err, 'Unable to dispatch this order.'));
        } finally {
            setBusy(false);
        }
    };

    const handleDeliver = async () => {
        if (!confirm("Mark this order as delivered? This starts the customer's monitoring period and emails them.")) return;
        setError(null);
        setBusy(true);
        try {
            const updated = await AdminService.deliverCase(activeCase.id);
            onUpdated(updated);
        } catch (err) {
            setError(apiErrorMessage(err, 'Unable to mark this order as delivered.'));
        } finally {
            setBusy(false);
        }
    };

    if (UNPAID_CASE_STATUSES.includes(activeCase.status)) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
                <div className="font-bold text-slate-700 mb-0.5">Fulfilment</div>
                Waiting for the customer to pay the delivery charge before this order can be dispatched.
            </div>
        );
    }

    if (activeCase.status === 'DELIVERY_PAID') {
        return (
            <form onSubmit={handleDispatch} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Truck className="w-4 h-4" /> Ready to dispatch
                </div>
                <p className="text-[11px] text-amber-800">
                    Delivery is paid. Add the courier and tracking number, and the customer is emailed.
                </p>
                <label className="block text-[11px] font-bold text-slate-600 space-y-1">
                    Courier
                    <input
                        list="courier-options"
                        className={inputClass}
                        value={courier}
                        onChange={(e) => setCourier(e.target.value)}
                    />
                    <datalist id="courier-options">
                        {COURIERS.map((c) => (
                            <option key={c} value={c} />
                        ))}
                    </datalist>
                </label>
                <label className="block text-[11px] font-bold text-slate-600 space-y-1">
                    Tracking number
                    <input
                        className={inputClass}
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Optional"
                    />
                </label>
                {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer disabled:opacity-60"
                >
                    {busy ? 'Dispatching...' : 'Mark as dispatched'}
                </button>
            </form>
        );
    }

    if (activeCase.status === 'DISPATCHED') {
        return (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <PackageCheck className="w-4 h-4" /> In transit
                </div>
                <div className="text-[11px] text-blue-800">
                    {activeCase.courier || 'Courier not set'}
                    {activeCase.trackingNumber ? ` · ${activeCase.trackingNumber}` : ''}
                </div>
                {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
                <button
                    type="button"
                    onClick={handleDeliver}
                    disabled={busy}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60"
                >
                    {busy ? 'Updating...' : 'Mark as delivered'}
                </button>
            </div>
        );
    }

    return null;
};