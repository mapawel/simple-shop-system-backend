import { Product } from '../../Product/Product.class';
import { IshopSystemOffer } from './ShopSystemOffer.interface';
import { Basket } from '../../Basket/Basket.class.js';
import { qtyValidator } from '../../validators/qtyValidator';
import { ProductWhQty } from '../../Product/ProductWhQty';
import { BasketWhDate } from '../../Basket/BasketWhDate.type';

export class ShopSystemOffer implements IshopSystemOffer {
  private readonly productList: Map<string, ProductWhQty> = new Map();
  private readonly closedBasketList: Map<string, BasketWhDate> = new Map();

  get shopProducts(): Map<string, ProductWhQty> {
    return new Map(this.productList);
  }

  get closedBaskets(): Map<string, BasketWhDate> {
    return new Map(this.closedBasketList);
  }

  validateStock(map: Map<string, ProductWhQty>) {
    for (let [_, productItem] of map) {
      if (
        (this.productList.get(productItem.product.uuid)?.qty || 0) <
        productItem.qty
      )
        throw new Error(
          `Stock on shop for product: ${productItem.product.name} is not sufficient to proceed checkout.`
        );
    }
  }

  addOrUpdateShopProduct(product: Product, qty: number): boolean {
    qtyValidator(qty);
    this.productList.set(product.uuid, {
      product,
      qty,
    });
    return true;
  }

  removeShopProduct(product: Product): boolean {
    this.productList.delete(product.uuid);
    return true;
  }

  checkout(basket: Basket): number {
    if (!basket.basketList.size)
      throw new Error('Cannot proceed checkout with an empty basket.');
    this.validateStock(basket.basketList);

    for (let [_, { product, qty }] of basket.basketList.entries()) {
      const currentShopItem = this.productList.get(product.uuid);
      if (currentShopItem)
        this.addOrUpdateShopProduct(product, currentShopItem.qty - qty);
    }

    this.closedBasketList.set(basket.uuid, { basket, date: new Date() });
    return basket.getFinalBasketValue();
  }
}
