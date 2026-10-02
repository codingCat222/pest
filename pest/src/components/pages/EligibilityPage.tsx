import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PestType, ActivityLocation, CaseRecord, ProductItem } from '../../types';
import { ProductsService } from '../../services/products';
import { useAuth } from '../../context/AuthContext';
import { EligibilityModal } from '../EligibilityModal';
import { EligibilityProduct, EligibilityService } from '../../services/eligibility';
import { apiErrorMessage } from '../../services/format';

interface EligibilityPageProps {
    onOrderCompleted: (newCase: CaseRecord) => void;
}

const PEST_OPTIONS: PestType[] = ['Rats or mice', 'Bedbugs', 'Cockroaches', 'Foxes', 'Ants', 'Not sure'];
const LOCATION_OPTIONS: ActivityLocation[] = ['Inside my home', 'Garage', 'Loft/roof space', 'Garden/outside', 'Commercial property', 'Other'];
const DURATION_OPTIONS = ['Less than a week', '1–4 weeks', '1–3 months', 'Longer'] as const;
const SIGHTING_OPTIONS = ['Live rodent', 'Droppings', 'Scratching/noises', 'Gnawing', 'Damage', 'Other signs'] as const;

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ onOrderCompleted }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [eligibleProduct, setEligibleProduct] = useState<EligibilityProduct | null>(null);
    const [searchParams] = useSearchParams();

    const [pest, setPest] = useState<PestType>((searchParams.get('pest') as PestType) || 'Rats or mice');
    const [location, setLocation] = useState<ActivityLocation>((searchParams.get('location') as ActivityLocation) || 'Inside my home');
    const [duration, setDuration] = useState<typeof DURATION_OPTIONS[number]>('1–4 weeks');
    const [sightings, setSightings] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState(false);
    const [productId, setProductId] = useState('');

    useEffect(() => {
        let cancelled = false;
        ProductsService.list()
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch(() => {
                if (!cancelled) setProductsError(true);
            })
            .finally(() => {
                if (!cancelled) setProductsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const selectedProduct = products.find((p) => p.id === productId);

    useEffect(() => {
        if (products.length === 0) return;
        setProductId((current) => current || products.find((p) => p.pestTarget === pest)?.id || '');
    }, [products]);

    const handlePestChange = (value: PestType) => {
        setPest(value);
        setProductId(products.find((p) => p.pestTarget === value)?.id ?? '');
    };

    const handleProductChange = (id: string) => {
        setProductId(id);
        const chosen = products.find((p) => p.id === id);
        if (chosen && (PEST_OPTIONS as string[]).includes(chosen.pestTarget)) {
            setPest(chosen.pestTarget as PestType);
        }
    };

    const toggleSighting = (s: string) => {
        setSightings((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        if (!selectedProduct) {
            setSubmitError('Please choose your free product from the list.');
            return;
        }
        setSubmitting(true);
        try {
            const result = await EligibilityService.check(pest, postcode, selectedProduct.id);
            if (!result.eligible || !result.product) {
                setSubmitError(result.reason ?? "Sorry, we can't offer a free product for this request right now.");
                return;
            }
            setEligibleProduct({ name: selectedProduct.name, deliveryCost: selectedProduct.deliveryCost });
        } catch (err) {
            setSubmitError(apiErrorMessage(err, 'Unable to check your eligibility. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-10 sm:py-14">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 cursor-pointer"
                >
                    ← Back
                </button>

                {/* <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                    Page 11 — Check Eligibility / Start Journey
                </div> */}
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Let's Get Started
                </h1>
                <p className="mt-2 text-slate-500">
                    Tell us what you're dealing with. It only takes a few minutes.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-10">

                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Question 1: What pest are you dealing with?
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {PEST_OPTIONS.map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => handlePestChange(p)}
                                    className={`px-4 py-3.5 rounded-xl border text-sm font-semibold text-left transition-colors cursor-pointer ${pest === p ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="free-product" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Your free product
                        </label>
                        {productsLoading && <p className="text-sm text-slate-500">Loading products...</p>}
                        {!productsLoading && productsError && (
                            <p className="text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                We couldn't load our products right now. Please refresh the page or try again shortly.
                            </p>
                        )}
                        {!productsLoading && !productsError && products.length === 0 && (
                            <p className="text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                No products are available at the moment. Please check back soon.
                            </p>
                        )}
                        {!productsLoading && products.length > 0 && (
                            <div className="space-y-2">
                                <select
                                    id="free-product"
                                    value={productId}
                                    onChange={(e) => handleProductChange(e.target.value)}
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-600 cursor-pointer"
                                >
                                    <option value="">Choose your free product...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} — £0.00 product + £{p.deliveryCost.toFixed(2)} delivery
                                        </option>
                                    ))}
                                </select>
                                {selectedProduct?.description && (
                                    <p className="text-xs text-slate-500 leading-relaxed">{selectedProduct.description}</p>
                                )}
                                {!selectedProduct && !products.some((p) => p.pestTarget === pest) && (
                                    <p className="text-xs text-slate-500">Nothing is set up for "{pest}" yet. Pick a product from the list.</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Question 2: Where are you seeing activity?
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {LOCATION_OPTIONS.map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setLocation(l)}
                                    className={`px-4 py-3.5 rounded-xl border text-sm font-semibold text-left transition-colors cursor-pointer ${location === l ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Question 3: How long have you noticed activity?
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {DURATION_OPTIONS.map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => setDuration(d)}
                                    className={`px-4 py-3 rounded-full border text-sm font-semibold transition-colors cursor-pointer ${duration === d ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Question 4: What have you seen? (Multiple selection)
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {SIGHTING_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => toggleSighting(s)}
                                    className={`px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-colors cursor-pointer flex items-center justify-between ${sightings.includes(s) ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <span>{s}</span>
                                    {sightings.includes(s) && <span className="text-blue-600">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">
                            Customer Details
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                <input
                                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sarah Jenkins"
                                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="sarah@example.co.uk"
                                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
                                <input
                                    type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)}
                                    placeholder="07700 900123"
                                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Postcode</label>
                                <input
                                    type="text" required value={postcode} onChange={(e) => setPostcode(e.target.value)}
                                    placeholder="e.g. SW11 3RU"
                                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Address</label>
                                <input
                                    type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                                    placeholder="House number and street name"
                                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {submitError && <p className="text-sm font-semibold text-red-600">{submitError}</p>}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        <span>{submitting ? 'Checking...' : 'Check My Eligibility'}</span>
                        <span>→</span>
                    </button>

                </form>
            </div>

            {eligibleProduct && (
                <EligibilityModal
                    details={{
                        fullName: name,
                        email,
                        phone: mobile,
                        propertyAddress: address,
                        postcode,
                        pest,
                        location,
                        productId: selectedProduct?.id,
                    }}
                    product={eligibleProduct}
                    isLoggedIn={!!user}
                    onClose={() => setEligibleProduct(null)}
                    onFinished={(created) => {
                        onOrderCompleted(created);
                        navigate('/dashboard');
                    }}
                />
            )}
        </div>
    );
};