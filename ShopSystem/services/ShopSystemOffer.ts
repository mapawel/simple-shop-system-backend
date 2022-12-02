import { Product } from '../../Product/Product';
import { IshopSystemOffer } from './IshopSystemOffer';
import { Basket } from '../../Basket/Basket.js';
import { qtyValidator } from '../../generalValidators/qtyValidator';
import { OperationStatus } from '../../OperationStatus/OperationStatus';
import { ProductWhQty } from '../../Product/ProductWhQty';
import { BasketWhDate } from '../../Basket/BasketWhDate';

export class ShopSystemOffer implements IshopSystemOffer {
  private productList: Map<string, ProductWhQty> = new Map();
  private closedBasketList: Map<string, BasketWhDate> = new Map();

  get shopProducts() {
    return [...this.productList];
  }

  get closedBaskets() {
    return [...this.closedBasketList];
  }

  validateStock(map: Map<string, ProductWhQty>) {
    for (let [_, productItem] of map) {
      if ((this.productList.get(productItem.product.uuid)?.qty || 0) < productItem.qty)
        throw new Error(
          `Stock on shop for product: ${productItem.product.name} is not sufficient to proceed checkout.`
        );
    }
  }

  addOrUpdateShopProduct(
    product: Product,
    qty: number
  ): OperationStatus<Product> {
    qtyValidator(qty);
    this.productList.set(product.uuid, {
      product,
      qty,
    });
    return new OperationStatus<Product>(
      'Product in the shop system added or updated succesfully.',
      product
    );
  }

  removeShopProduct(product: Product): OperationStatus<Product> {
    this.productList.delete(product.uuid);
    return new OperationStatus<Product>(
      'Product in the shop system removed succesfully.',
      product
    );
  }

  checkout(basket: Basket): {
    status: OperationStatus<Basket>;
    basketValue: number;
  } {
    if (!basket.basketList.size)
      throw new Error('Cannot proceed checkout with an empty basket.');
    this.validateStock(basket.basketList);

    for (let [_, { product, qty }] of basket.basketList.entries()) {
      const currentShopItem = this.productList.get(product.uuid);
      if (currentShopItem)
        this.addOrUpdateShopProduct(product, currentShopItem.qty - qty);
    }

    const basketValue = basket.getFinalBasketValue();
    this.closedBasketList.set(basket.uuid, { basket, date: new Date() });

    return {
      status: new OperationStatus<Basket>(
        'Checkout proceeded successfully',
        basket
      ),
      basketValue,
    };
  }
}

//TODO jak zrobić najefektywniej, aby przykłądowo metoda checkout mogła gadać z instancją klasy shopCoupons?
