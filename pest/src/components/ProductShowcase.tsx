import React from 'react';

const PRODUCTS = [
    { name: 'Ultrasonic repellent', image: '/Images/ultrasonic-repellent.svg' },
    { name: 'Bait box', image: '/Images/bait-box.svg' },
    { name: 'Traps', image: '/Images/traps.svg' },
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