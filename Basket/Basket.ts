import { v4 as uuidv4 } from 'uuid';
import { IBasket } from './IBasket';
import { Product } from '../Product/Product.js';
import { discountValidator } from '../validators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
import { getBasketProductsSum } from '../utils/getBasketProductsSum.js';
import { ProductWhQty } from '../Product/ProductWhQty';

export class Basket implements IBasket {
  readonly uuid: string;
  private readonly discount: number = 1;
  private readonly list: Map<string, ProductWhQty> = new Map();

  constructor(configObj?: { discount: number }) {
    const discount: number = configObj?.discount || 0;
    discountValidator(discount);
    this.uuid = uuidv4();
    this.discount = discount;
  }

  get basket(): Basket {
    return this;
  }

  get basketList(): Map<string, ProductWhQty> {
    return new Map(this.list);
  }

  addProduct(newProduct: Product): Map<string, ProductWhQty> {
    const cartProductItemFound: ProductWhQty | undefined = this.list.get(
      newProduct.uuid
    );
    const qty: number = cartProductItemFound ? cartProductItemFound.qty + 1 : 1;

    this.list.set(newProduct.uuid, {
      product: newProduct,
      qty,
    });

    return new Map(this.list);
  }

  removeProduct(toRmProduct: Product): Map<string, ProductWhQty> {
    const cartProductItemFound: ProductWhQty | undefined = this.list.get(
      toRmProduct.uuid
    );

    if (cartProductItemFound && cartProductItemFound.qty > 1)
      this.list.set(toRmProduct.uuid, {
        product: cartProductItemFound.product,
        qty: cartProductItemFound.qty - 1,
      });
    if (cartProductItemFound?.qty === 1)
      this.list.delete(cartProductItemFound.product.uuid);

    return new Map(this.list);
  }

  removeAllProducts(): Map<string, ProductWhQty> {
    this.list.clear();

    return new Map(this.list);
  }

  getFinalBasketValue(): number {
    return getDiscontedFormatedPrc(
      getBasketProductsSum(this.list),
      this.discount
    );
  }
}
