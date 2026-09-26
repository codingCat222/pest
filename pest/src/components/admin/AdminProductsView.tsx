import React, { useState } from 'react';
import { ProductItem } from '../../types';
import { Search, Package } from 'lucide-react';

interface AdminProductsViewProps {
    products: ProductItem[];
}

export const AdminProductsView: React.FC<AdminProductsViewProps> = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.pestTarget.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Catalogue</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Manage the free pest-control products offered to customers
                    </p>
                </div>
                <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:border-blue-600"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Package className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                {p.category}
                            </span>
                        </div>

                        <div>
                            <div className="font-bold text-sm text-slate-900">{p.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Targets: {p.pestTarget}</div>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                            {p.description}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <div>
                                <span className="font-bold text-emerald-600">FREE</span>
                                <span className="text-slate-400"> + £{p.deliveryCost.toFixed(2)} delivery</span>
                            </div>
                            <span className="text-[10px] font-semibold text-slate-400">
                                RRP £{p.regularPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                        No products match your search.
                    </div>
                )}
            </div>
        </div>
    );
};