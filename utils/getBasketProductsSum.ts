import { Product } from '../Product/Product';

export const getBasketProductsSum = (list: Product[]) =>
  list.reduce((acc, x) => acc + x.getFinalPrice(), 0);
