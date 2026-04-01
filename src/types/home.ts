export interface IProduct {
  title: string,
  category: string,
  images: string[],
  brand?: string,
  sku: string,
  rating: number,
  price: number
}