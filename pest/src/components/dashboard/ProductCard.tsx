import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Package, ShieldAlert } from 'lucide-react';
import { CaseRecord, ProductItem } from '../../types';
import { ProductsService } from '../../services/products';
import { UNPAID_CASE_STATUSES } from '../../services/cases';

interface ProductCardProps {
    activeCase: CaseRecord;
}

export const ProductCard: React.FC<ProductCardProps> = ({ activeCase }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductItem | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        ProductsService.list()
            .then((products) => {
                if (cancelled) return;
                const wanted = activeCase.productName.trim().toLowerCase();
                const byName = products.find((p) => p.name.trim().toLowerCase() === wanted);
                const byPest = products.find((p) => p.pestTarget === activeCase.pest);
                setProduct(byName ?? byPest ?? null);
            })
            .catch(() => {
                if (!cancelled) setProduct(null);
            });
        return () => {
            cancelled = true;
        };
    }, [activeCase.productName, activeCase.pest]);

    useEffect(() => {
        const open = () => setExpanded(true);
        window.addEventListener('open-product-details', open);
        return () => window.removeEventListener('open-product-details', open);
    }, []);

    const unpaid = UNPAID_CASE_STATUSES.includes(activeCase.status);

    return (
        <div id="your-product" className="scroll-mt-20 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div
                onClick={() => setExpanded((v) => !v)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
            >
                <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl bg-brand-green-soft text-brand-green flex items-center justify-center overflow-hidden">
                    {product?.imageUrl ? (
                        <img src={product.imageUrl} alt={activeCase.productName} className="w-full h-full object-cover" />
                    ) : (
                        <Package className="w-10 h-10" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple-soft">Your Free Product</span>
                        {product?.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-green-soft text-brand-green-dark border border-brand-green/30">
                                {product.badge}
                            </span>
                        )}
                    </div>
                    <h2 className="mt-1 text-lg font-extrabold text-brand-purple tracking-tight">{activeCase.productName}</h2>
                    {product?.description && (
                        <p className="mt-1 text-sm text-brand-purple-soft leading-relaxed">{product.description}</p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">Product £0.00</span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                            Delivery £{activeCase.deliveryFee.toFixed(2)}
                        </span>
                        {activeCase.trackingNumber && (
                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">
                                {activeCase.courier ? `${activeCase.courier} · ` : ''}
                                {activeCase.trackingNumber}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        {unpaid && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/checkout/${activeCase.id}`);
                                }}
                                className="px-4 py-2 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold cursor-pointer"
                            >
                                Pay delivery to claim it
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded((v) => !v);
                            }}
                            aria-expanded={expanded}
                            className="flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:underline cursor-pointer"
                        >
                            {expanded ? 'Hide' : 'View'} contents &amp; instructions
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {expanded && !product && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 text-sm text-slate-600">
                    Detailed instructions for this kit aren&apos;t available yet. Please follow the leaflet supplied with your product,
                    or contact support if you need help.
                </div>
            )}

            {expanded && product && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {product.contents.length > 0 && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">What&apos;s in the kit</div>
                            <ul className="space-y-1.5 text-slate-700 list-disc pl-5">
                                {product.contents.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {product.instructions.length > 0 && (
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">How to use it</div>
                            <ol className="space-y-1.5 text-slate-700 list-decimal pl-5">
                                {product.instructions.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                    {product.safetyNotice && (
                        <div className="md:col-span-2 flex gap-2.5 rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900">
                            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold">Safety notice: </span>
                                {product.safetyNotice}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};