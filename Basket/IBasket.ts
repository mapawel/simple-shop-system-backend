import { Product } from '../Product/Product';
import { OperationStatus } from '../OperationStatus/OperationStatus';
import { ProductWhQty } from '../Product/ProductWhQty';

export interface IBasket {
  basketList: Map<string, ProductWhQty>;
  addProduct(newProduct: Product): OperationStatus<Product>;
  removeProduct(toRmProduct: Product): OperationStatus<Product>;
  removeAllProducts(): OperationStatus<null>;
  getFinalBasketValue(): number;
}
