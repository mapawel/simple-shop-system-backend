import { Product } from '../../Product/Product.class';
import { Basket } from '../../Basket/Basket.class';

export interface IshopSystemOffer {
  addOrUpdateShopProduct(product: Product, qty: number): boolean;
  removeShopProduct(product: Product): boolean;
  checkout(basket: Basket): number;
}
