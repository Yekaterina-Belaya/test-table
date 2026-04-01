import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/api/services/products.service';
import { IProduct } from '@/types/home';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Partial<IProduct>) => productService.addProduct(newProduct as IProduct),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};