import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/api/services/products.service';
import { TProduct } from '@/types/home';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Partial<TProduct>) => productService.addProduct(newProduct as TProduct),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};