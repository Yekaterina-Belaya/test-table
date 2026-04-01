import * as v from 'valibot';
import { ProductSchema, ProductsResponseSchema } from '../schemas/product.schema';
import { IProduct } from '@/types/home';
import api from '../axiosInstance';

export type TSort = {
    sortBy: string,
    order: 'asc' | 'desc'
}

export const productService = {
  getAll: async (sort?: TSort) => {
    const { data } = await api.get('/products', {
      params: sort?.sortBy ? { sortBy: sort.sortBy, order: sort.order } : {}
    });
    return v.parse(ProductsResponseSchema, data);
  },
  
  searchProducts: async (search: string) => {
    const { data } = await api.get('/products/search', {
      params: { q: search }
    });
    return v.parse(ProductsResponseSchema, data);
  },
  
  addProduct: async (productData: IProduct) => {
    const { data } = await api.post('/products/add', productData);
    return v.parse(v.partial(ProductSchema), data);
  },
};