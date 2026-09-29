import api from './api';
import { ProductItem } from '../types';

export const ProductsService = {
    async list(): Promise<ProductItem[]> {
        const { data } = await api.get<ProductItem[]>('/products');
        return data;
    },
};

export default ProductsService;