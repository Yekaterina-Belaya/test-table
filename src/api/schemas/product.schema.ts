import * as v from 'valibot';

export const ProductSchema = v.looseObject({
  id: v.number(),
  title: v.string(),
  price: v.number(),
  brand: v.optional(v.string()),
  sku: v.string(),
  images: v.array(v.string()),
  category: v.string(),
  rating: v.number(),
});

export const ProductsResponseSchema = v.object({
  products: v.array(ProductSchema),
  total: v.number(),
  skip: v.optional(v.number()),
  limit: v.optional(v.number()),
});
