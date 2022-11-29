import { Product } from '../Product/Product';

export const getBasketProductsSum = (list: Map<Product, number>) => {
  let sum: number = 0;
  for (let [product, qty] of list.entries()) {
    sum += product.getFinalPrice() * qty;
  }
  return sum;
};
