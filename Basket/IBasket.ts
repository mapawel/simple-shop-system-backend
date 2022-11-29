import { Product } from '../Product/Product';

export interface IBasket {
  basketList: Map<Product, number>;
  addProduct(newProduct: Product): void;
  removeProduct(toRmProduct: Product): void;
  removeAllProducts(): void;
  getFinalBasketValue(): number;
}
