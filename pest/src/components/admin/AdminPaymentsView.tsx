import React, { useEffect, useState } from 'react';
import { OrderItemRecord } from '../../types';
import { Search } from 'lucide-react';
import { AdminService } from '../../services/admin';
import { adaptOrder } from '../../services/orders';
import { apiErrorMessage } from '../../services/format';

interface AwaitingCase {
    id: string;
    referenceNumber: string;
    customerName: string;
    propertyAddress: string;
    deliveryFee: number;
}

const statusStyle: Record<string, string> = {
    Delivered: 'bg-emerald-50 text-emerald-700',
    'In Transit': 'bg-blue-50 text-blue-700',
    Preparing: 'bg-amber-50 text-amber-700',
    Cancelled: 'bg-red-50 text-red-700',
};

export const AdminPaymentsView: React.FC = () => {
    const [orders, setOrders] = useState<OrderItemRecord[]>([]);
    const [awaiting, setAwaiting] = useState<AwaitingCase[]>([]);
    const [paidCount, setPaidCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let cancelled = false;
        AdminService.getPayments()
            .then((data) => {
                if (cancelled) return;
                setOrders(data.recentOrders.map(adaptOrder));
                setAwaiting(data.awaitingPayment);
                setPaidCount(data.paid.length);
            })
            .catch((err) => {
                if (!cancelled) setError(apiErrorMessage(err, 'Unable to load payments.'));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = orders.filter(
        (o) =>
            o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.caseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCollected = orders
        .filter((o) => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payments &amp; Orders</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Delivery charges and the order ledger</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Awaiting Payment</div>
                        <div className="text-lg font-black text-amber-600 font-mono">{awaiting.length}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Delivery Paid</div>
                        <div className="text-lg font-black text-slate-900 font-mono">{paidCount}</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 px-4 py-2.5 text-right">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Total Collected</div>
                        <div className="text-lg font-black text-emerald-600 font-mono">£{totalCollected.toFixed(2)}</div>
                    </div>
                </div>
            </div>

            {loading && <div className="text-center py-12 text-slate-400 text-sm">Loading payments...</div>}
            {!loading && error && <div className="text-center py-12 text-red-600 text-sm font-semibold">{error}</div>}

            {!loading && !error && awaiting.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Cases awaiting delivery payment
                    </div>
                    {awaiting.map((c) => (
                        <div key={c.id} className="bg-white rounded-xl border border-amber-100 px-3 py-2 flex items-center justify-between text-xs">
                            <div className="min-w-0">
                                <span className="font-semibold text-slate-900">{c.customerName}</span>{' '}
                                <span className="font-mono text-slate-400">{c.referenceNumber}</span>
                                <div className="text-slate-500 truncate">{c.propertyAddress}</div>
                            </div>
                            <span className="font-bold text-slate-900 shrink-0 ml-3">£{c.deliveryFee.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">Order &amp; Payment Ledger</h2>
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="Search order, case ref, or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                                    <th className="py-3 px-3">Order #</th>
                                    <th className="py-3 px-3">Case Ref</th>
                                    <th className="py-3 px-3">Product</th>
                                    <th className="py-3 px-3">Total</th>
                                    <th className="py-3 px-3">Status</th>
                                    <th className="py-3 px-3">Placed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                                        <td className="py-3 px-3 font-mono text-slate-600">{o.caseRef}</td>
                                        <td className="py-3 px-3 text-slate-700">{o.productName}</td>
                                        <td className="py-3 px-3 font-semibold text-slate-900">£{o.total.toFixed(2)}</td>
                                        <td className="py-3 px-3">
                                            <span className={`px-2 py-1 rounded text-[11px] font-bold ${statusStyle[o.status] ?? 'bg-slate-100 text-slate-600'}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-slate-400">{o.placedDate}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-slate-400">
                                            {orders.length === 0 ? 'No orders yet.' : 'No orders match your search.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};