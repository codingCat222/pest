import api from './api';
import { ProductItem } from '../types';

const CACHE_MS = 30000;
let cached: { at: number; promise: Promise<ProductItem[]> } | null = null;

export const ProductsService = {
    async list(): Promise<ProductItem[]> {
        if (cached && Date.now() - cached.at < CACHE_MS) return cached.promise;

        const promise = api.get<ProductItem[]>('/products').then(({ data }) => data);
        cached = { at: Date.now(), promise };
        promise.catch(() => {
            cached = null;
        });
        return promise;
    },
};

export default ProductsService;