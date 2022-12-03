import { Product } from '../../Product/Product';
import { Basket } from '../../Basket/Basket';

export interface IshopSystemOffer {
  addOrUpdateShopProduct(product: Product, qty: number): boolean;
  removeShopProduct(product: Product): boolean;
  checkout(basket: Basket): number;
}
