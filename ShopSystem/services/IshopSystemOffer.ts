import { Product } from '../../Product/Product';
import { Basket } from '../../Basket/Basket';

export interface IshopSystemOffer {
  addOrUpdateShopProduct(product: Product, qty: number): void;
  removeShopProduct(product: Product): void;
  checkout(basket: Basket): void;
}
