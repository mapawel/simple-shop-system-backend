import { v4 as uuidv4 } from 'uuid';
import { IBasket } from './IBasket';
import { IBasketParams } from './IBasketPArams';
import { Product } from '../Product/Product.js';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
import { getBasketProductsSum } from '../utils/getBasketProductsSum.js';

export class Basket implements IBasket {
  readonly uuid: string;
  readonly discount: number = 1;
  private list: Product[] = [];

  constructor(configObj?: IBasketParams) {
    const discount = configObj?.discount || 0;
    discountValidator(discount);
    this.uuid = uuidv4();
    this.discount = discount;
  }

  get basketList() {
    return this.list;
  }

  addProduct(newProduct: Product): void {
    this.list.push(newProduct);
  }

  removeProduct(toRmProduct: Product): void {
    const foundFirstProductIndex = this.list.findIndex(
      (inCartProd: Product) => inCartProd === toRmProduct
    );
    if (foundFirstProductIndex >= 0)
      this.list = this.list.filter(
        (_: Product, listIndex) => listIndex !== foundFirstProductIndex
      );
  }

  removeAllProducts(): void {
    this.list = [];
  }

  getFinalBasketValue(): number {
    return getDiscontedFormatedPrc(
      getBasketProductsSum(this.list),
      this.discount
    );
  }
}
