import React, { useEffect, useState } from 'react';
import { ProductItem } from '../../types';
import { Search, Package, Plus, Pencil, Trash2, X } from 'lucide-react';
import { AdminService, CreateProductPayload } from '../../services/admin';
import { apiErrorMessage } from '../../services/format';

interface ProductForm {
    name: string;
    category: string;
    pestTarget: string;
    regularPrice: string;
    deliveryCost: string;
    description: string;
    contents: string;
    instructions: string;
    safetyNotice: string;
    badge: string;
    imageUrl: string;
}

const emptyForm: ProductForm = {
    name: '',
    category: '',
    pestTarget: '',
    regularPrice: '',
    deliveryCost: '',
    description: '',
    contents: '',
    instructions: '',
    safetyNotice: '',
    badge: '',
    imageUrl: '',
};

const toForm = (p: ProductItem): ProductForm => ({
    name: p.name,
    category: p.category,
    pestTarget: p.pestTarget,
    regularPrice: String(p.regularPrice),
    deliveryCost: String(p.deliveryCost),
    description: p.description,
    contents: p.contents.join('\n'),
    instructions: p.instructions.join('\n'),
    safetyNotice: p.safetyNotice,
    badge: p.badge ?? '',
    imageUrl: p.imageUrl ?? '',
});

const toLines = (v: string) => v.split('\n').map((l) => l.trim()).filter(Boolean);

const inputClass =
    'w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600';

export const AdminProductsView: React.FC = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        AdminService.listProducts()
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch((err) => {
                if (!cancelled) setLoadError(apiErrorMessage(err, 'Unable to load products.'));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.pestTarget.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFormError(null);
        setFormOpen(true);
    };

    const openEdit = (p: ProductItem) => {
        setEditingId(p.id);
        setForm(toForm(p));
        setFormError(null);
        setFormOpen(true);
    };

    const setField = (key: keyof ProductForm) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const regularPrice = parseFloat(form.regularPrice);
        const deliveryCost = parseFloat(form.deliveryCost);
        if (!form.name.trim() || !form.category.trim() || !form.pestTarget.trim()) {
            setFormError('Name, category and pest target are required.');
            return;
        }
        if (isNaN(regularPrice) || regularPrice < 0 || isNaN(deliveryCost) || deliveryCost < 0) {
            setFormError('Prices must be valid numbers of zero or more.');
            return;
        }

        const payload: CreateProductPayload = {
            name: form.name.trim(),
            category: form.category.trim(),
            pestTarget: form.pestTarget.trim(),
            regularPrice,
            deliveryCost,
            description: form.description.trim(),
            contents: toLines(form.contents),
            instructions: toLines(form.instructions),
            safetyNotice: form.safetyNotice.trim(),
            badge: form.badge.trim() || undefined,
            imageUrl: form.imageUrl.trim() || undefined,
        };

        setSaving(true);
        try {
            if (editingId) {
                const updated = await AdminService.updateProduct(editingId, payload);
                setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
            } else {
                const created = await AdminService.createProduct(payload);
                setProducts((prev) => [created, ...prev]);
            }
            setFormOpen(false);
        } catch (err) {
            setFormError(apiErrorMessage(err, 'Unable to save the product.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (p: ProductItem) => {
        if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
        setActionError(null);
        try {
            await AdminService.deleteProduct(p.id);
            setProducts((prev) => prev.filter((x) => x.id !== p.id));
        } catch (err) {
            setActionError(apiErrorMessage(err, 'Unable to delete the product.'));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Catalogue</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Manage the free pest-control products offered to customers
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-56 focus:outline-none focus:border-blue-600"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={openCreate}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add product
                    </button>
                </div>
            </div>

            {actionError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{actionError}</div>
            )}

            {loading && <div className="text-center py-12 text-slate-400 text-sm">Loading products...</div>}
            {!loading && loadError && (
                <div className="text-center py-12 text-red-600 text-sm font-semibold">{loadError}</div>
            )}

            {!loading && !loadError && (
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

                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{p.description}</p>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                                <div>
                                    <span className="font-bold text-emerald-600">FREE</span>
                                    <span className="text-slate-400"> + £{p.deliveryCost.toFixed(2)} delivery</span>
                                </div>
                                <span className="text-[10px] font-semibold text-slate-400">
                                    RRP £{p.regularPrice.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => openEdit(p)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer"
                                >
                                    <Pencil className="w-3 h-3" /> Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(p)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-[11px] font-semibold text-red-600 cursor-pointer"
                                >
                                    <Trash2 className="w-3 h-3" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                            {products.length === 0 ? 'No products yet. Add your first product.' : 'No products match your search.'}
                        </div>
                    )}
                </div>
            )}

            {formOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit product' : 'Add product'}</h2>
                            <button type="button" onClick={() => setFormOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" aria-label="Close">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Name
                                <input className={inputClass} value={form.name} onChange={setField('name')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Category
                                <input className={inputClass} value={form.category} onChange={setField('category')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Pest target
                                <input className={inputClass} value={form.pestTarget} onChange={setField('pestTarget')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Badge (optional)
                                <input className={inputClass} value={form.badge} onChange={setField('badge')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Regular price (£)
                                <input className={inputClass} inputMode="decimal" value={form.regularPrice} onChange={setField('regularPrice')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Delivery cost (£)
                                <input className={inputClass} inputMode="decimal" value={form.deliveryCost} onChange={setField('deliveryCost')} />
                            </label>
                        </div>

                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Description
                            <textarea rows={3} className={inputClass} value={form.description} onChange={setField('description')} />
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Kit contents (one per line)
                                <textarea rows={4} className={inputClass} value={form.contents} onChange={setField('contents')} />
                            </label>
                            <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                                Instructions (one step per line)
                                <textarea rows={4} className={inputClass} value={form.instructions} onChange={setField('instructions')} />
                            </label>
                        </div>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Safety notice
                            <textarea rows={2} className={inputClass} value={form.safetyNotice} onChange={setField('safetyNotice')} />
                        </label>
                        <label className="text-[11px] font-bold text-slate-600 space-y-1 block">
                            Image URL (optional)
                            <input className={inputClass} value={form.imageUrl} onChange={setField('imageUrl')} />
                        </label>

                        {formError && <p className="text-xs font-semibold text-red-600">{formError}</p>}

                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                Cancel
                            </button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60">
                                {saving ? 'Saving...' : editingId ? 'Save changes' : 'Create product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};