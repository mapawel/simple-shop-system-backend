import { Product } from '../Product/Product';
import { ProductWhQty } from '../Product/ProductWhQty';

export const getBasketProductsSum = (
  list: Map<string, ProductWhQty>
): number => {
  let sum: number = 0;
  for (let productItem of list.values()) {
    sum += productItem.product.getFinalPrice() * productItem.qty;
  }
  return sum;
};
