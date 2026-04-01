import { useQuery } from '@tanstack/react-query';
import { productService, TSort } from '@/api/services/products.service';

interface UseProductsArgs {
  search?: string;
  sort?: TSort;
}

export const useProducts = ({ search, sort }: UseProductsArgs = {}) => {
  return useQuery({
    queryKey: ['products', { search, sort }], 
    
    queryFn: () => {
      if (search) {
        return productService.searchProducts(search);
      }
      return productService.getAll(sort);

    },
    placeholderData: (previousData) => previousData,
  });
};