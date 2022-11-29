import { v4 as uuidv4 } from 'uuid';
import { IBasket } from './IBasket';
import { Product } from '../Product/Product.js';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
import { getBasketProductsSum } from '../utils/getBasketProductsSum.js';

export class Basket implements IBasket {
  readonly uuid: string;
  readonly discount: number = 1;
  private list: Map<Product, number> = new Map();

  constructor(configObj?: { discount: number }) {
    const discount = configObj?.discount || 0;
    discountValidator(discount);
    this.uuid = uuidv4();
    this.discount = discount;
  }

  get basketList() {
    return new Map(this.list);
  }

  addProduct(newProduct: Product): void {
    const cartProductQtyFound = this.list.get(newProduct);
    this.list.set(newProduct, (cartProductQtyFound || 0) + 1);
  }

  removeProduct(toRmProduct: Product): void {
    const cartProductQtyFound = this.list.get(toRmProduct);
    if (cartProductQtyFound && cartProductQtyFound > 0)
      this.list.set(toRmProduct, cartProductQtyFound - 1);
    if (cartProductQtyFound === 0) this.list.delete(toRmProduct);
  }

  removeAllProducts(): void {
    this.list.clear();
  }

  getFinalBasketValue(): number {
    return getDiscontedFormatedPrc(
      getBasketProductsSum(this.list),
      this.discount
    );
  }
}
