import { v4 as uuidv4 } from 'uuid';
import { IBasket } from './IBasket';
import { Product } from '../Product/Product.js';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
import { getBasketProductsSum } from '../utils/getBasketProductsSum.js';
import { OperationStatus } from '../OperationStatus/OperationStatus';
import { ProductWhQty } from '../Product/ProductWhQty';

export class Basket implements IBasket {
  readonly uuid: string;
  readonly discount: number = 1;
  private list: Map<string, ProductWhQty> = new Map();

  constructor(configObj?: { discount: number }) {
    const discount = configObj?.discount || 0;
    discountValidator(discount);
    this.uuid = uuidv4();
    this.discount = discount;
  }

  get basketList() {
    return new Map(this.list);
  }

  addProduct(newProduct: Product): OperationStatus<Product> {
    const cartProductItemFound = this.list.get(newProduct.uuid);
    const qty = cartProductItemFound ? cartProductItemFound.qty + 1 : 1;

    this.list.set(newProduct.uuid, {
      product: newProduct,
      qty,
    });

    return new OperationStatus<Product>(
      'Product added to the basket succesfully.',
      newProduct
    );
  }

  removeProduct(toRmProduct: Product): OperationStatus<Product> {
    const cartProductItemFound = this.list.get(toRmProduct.uuid);

    if (cartProductItemFound && cartProductItemFound.qty > 1)
      this.list.set(toRmProduct.uuid, {
        product: cartProductItemFound.product,
        qty: cartProductItemFound.qty - 1,
      });
    if (cartProductItemFound?.qty === 1)
      this.list.delete(cartProductItemFound.product.uuid);
    return new OperationStatus(
      'Product removed from the basket succesfully.',
      toRmProduct
    );
  }

  removeAllProducts(): OperationStatus<null> {
    this.list.clear();
    return new OperationStatus(
      'All products removed from the basket succesfully.',
      null
    );
  }

  getFinalBasketValue(): number {
    return getDiscontedFormatedPrc(
      getBasketProductsSum(this.list),
      this.discount
    );
  }
}
