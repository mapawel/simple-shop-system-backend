import { ProductWhQty } from '../Product/ProductWhQty';

export const getBasketProductsSum = (
  list: Map<string, ProductWhQty>
): number => {
  const listArr = Array.from(list.values());
  return listArr.reduce(
    (acc: number, x: ProductWhQty) => acc + x.product.getFinalPrice() * x.qty,
    0
  );
};
