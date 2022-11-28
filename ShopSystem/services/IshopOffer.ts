import { IshopProductItem } from '../IshopProductItem';
import { Product } from '../../Product/Product';
import { Basket } from '../../Basket/Basket';

export interface IshopOffer {
  addShopProducts(productsItemsList: IshopProductItem[]): void;
  removeShopProducts(productsList: Product[]): void;
  updateShopProductQty(productItem: IshopProductItem): void;
  checkout(basket: Basket): void;
}
