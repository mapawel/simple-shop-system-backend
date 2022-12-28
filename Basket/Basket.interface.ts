import { Product } from '../Product/Product.class';
import { ProductWhQty } from '../Product/ProductWhQty';
import { Basket } from './Basket.class';

export interface IBasket {
  basketList: Map<string, ProductWhQty>;
  basket: Basket;
  addProduct(newProduct: Product): boolean;
  removeProduct(toRmProduct: Product): boolean;
  removeAllProducts(): boolean;
  getFinalBasketValue(): number;
}
