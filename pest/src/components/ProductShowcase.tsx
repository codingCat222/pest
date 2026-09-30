import React from 'react';

const PRODUCTS = [
    { name: 'Ultrasonic repellent', image: '/Images/product.png' },
    { name: 'Bait box', image: '/Images/product2.png' },
    { name: 'Traps', image: '/Images/product3.png' },
];

export const ProductShowcase: React.FC = () => {
    return (
        <section className="pb-14 bg-white">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {PRODUCTS.map((product) => (
                        <div
                            key={product.name}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-center"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-56 object-contain rounded-xl"
                            />
                            <div className="mt-4 text-base font-bold text-brand-purple">{product.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};