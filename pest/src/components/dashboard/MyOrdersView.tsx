import React, { useEffect, useState } from 'react';
import { OrdersService } from '../../services/orders';
import { apiErrorMessage } from '../../services/format';
import { OrderItemRecord } from '../../types';
import { Package, Truck, CheckCircle2, Download, ArrowUpRight, X } from 'lucide-react';

export const MyOrdersView: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<OrderItemRecord | null>(null);
  const [orders, setOrders] = useState<OrderItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    OrdersService.list()
      .then((data) => { if (!cancelled) setOrders(data); })
      .catch((err) => { if (!cancelled) setError(apiErrorMessage(err, 'Unable to load your orders.')); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="max-w-5xl space-y-8 pb-16">

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track product dispatch, delivery confirmation, and download fulfillment receipts.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="sm:hidden px-4 py-2 text-[11px] font-medium text-slate-400 border-b border-slate-100">
          Swipe sideways to see all columns →
        </div>
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[760px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Order</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Delivery</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr><td colSpan={6} className="py-10 text-center text-slate-500">Loading your orders...</td></tr>
              )}
              {!loading && error && (
                <tr><td colSpan={6} className="py-10 text-center text-red-600 font-semibold">{error}</td></tr>
              )}
              {!loading && !error && orders.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-slate-500">You don't have any orders yet.</td></tr>
              )}
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-slate-900">
                    {ord.orderNumber}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-900">{ord.productName}</div>
                    <div className="text-[11px] text-slate-400">Kit £0.00 • Post £{ord.deliveryFee.toFixed(2)}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    <div className="font-medium text-slate-800">{ord.carrier || '—'}</div>
                    <div className="text-[10px] font-mono text-slate-400">{ord.trackingNumber || 'Tracking pending'}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {ord.placedDate}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order Details</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">{selectedOrder.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Product Cost:</span>
                <span className="font-bold text-emerald-600">FREE (£0.00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tracked Shipping:</span>
                <span className="font-bold text-slate-900">£{selectedOrder.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Paid:</span>
                <span>£{selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Delivery Address</div>
              <div className="text-slate-700">{selectedOrder.propertyAddress}</div>
              <div className="text-slate-500 text-[11px]">Courier: {selectedOrder.carrier || '—'} ({selectedOrder.trackingNumber || 'tracking pending'})</div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};