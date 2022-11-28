import { Product } from '../Product/Product';

export interface IBasket {
  addProduct(newProduct: Product): void;
  removeProduct(toRmProduct: Product): void;
  removeAllProducts(): void;
  getFinalBasketValue(): number;
  basketList: Product[];
}
//TODO sprawdzić readonly w interface
