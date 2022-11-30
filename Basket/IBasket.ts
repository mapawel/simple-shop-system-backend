import { Product } from '../Product/Product';
import { OperationStatus } from '../OperationStatus/OperationStatus';

export interface IBasket {
  basketList: Map<Product, number>;
  addProduct(newProduct: Product): OperationStatus<Product>;
  removeProduct(toRmProduct: Product): OperationStatus<Product>;
  removeAllProducts(): OperationStatus<null>;
  getFinalBasketValue(): number;
}
