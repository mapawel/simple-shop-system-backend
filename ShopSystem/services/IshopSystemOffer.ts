import { Product } from '../../Product/Product';
import { Basket } from '../../Basket/Basket';
import { OperationStatus } from "../../OperationStatus/OperationStatus";

export interface IshopSystemOffer {
  addOrUpdateShopProduct(product: Product, qty: number): OperationStatus<Product>;
  removeShopProduct(product: Product): OperationStatus<Product>;
  checkout(basket: Basket): {status: OperationStatus<Basket>, basketValue: number};
}
