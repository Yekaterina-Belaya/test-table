import { useQuery } from '@tanstack/react-query';
import { productService, TSort } from '@/api/services/products.service';

type TUseProductsArgs = {
  search?: string;
  sort?: TSort;
};

export const useProducts = ({ search, sort }: TUseProductsArgs = {}) => {
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
