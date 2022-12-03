import { Product } from '../Product/Product';
import { ProductWhQty } from '../Product/ProductWhQty';
import { Basket } from './Basket';

export interface IBasket {
  basketList: Map<string, ProductWhQty>;
  basket: Basket;
  addProduct(newProduct: Product): Map<string, ProductWhQty>;
  removeProduct(toRmProduct: Product): Map<string, ProductWhQty>;
  removeAllProducts(): Map<string, ProductWhQty>;
  getFinalBasketValue(): number;
}
