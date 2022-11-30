import { Product } from '../../Product/Product';
import { IshopSystemOffer } from './IshopSystemOffer';
import { Basket } from '../../Basket/Basket.js';
import { qtyValidator } from '../../generalValidators/qtyValidator';
import { OperationStatus } from '../../OperationStatus/OperationStatus';

export class ShopSystemOffer implements IshopSystemOffer {
  private productList: Map<Product, number> = new Map();
  private closedBasketList: Map<Basket, Date> = new Map();

  get shopProducts() {
    return [...this.productList];
  }

  get closedBaskets() {
    return [...this.closedBasketList];
  }

  validateStock(map: Map<Product, number>) {
    for (let [product, qty] of map) {
      if ((this.productList.get(product) || 0) < qty)
        throw new Error(
          `Stock on shop for product: ${product.name} is not sufficient to proceed checkout.`
        );
    }
  }

  addOrUpdateShopProduct(
    product: Product,
    qty: number
  ): OperationStatus<Product> {
    qtyValidator(qty);
    this.productList.set(product, qty);
    return new OperationStatus<Product>(
      'Product in the shop system added or updated succesfully.',
      product
    );
  }

  removeShopProduct(product: Product): OperationStatus<Product> {
    this.productList.delete(product);
    return new OperationStatus<Product>(
      'Product in the shop system removed succesfully.',
      product
    );
  }

  checkout(basket: Basket): {
    status: OperationStatus<Basket>;
    basketValue: number;
  } {
    if (!basket.basketList.size) throw new Error('Cannot proceed checkout with an empty basket.')
    this.validateStock(basket.basketList);

    for (let [product, qty] of basket.basketList.entries()) {
      const currentShopQty = this.productList.get(product) || 0;
      this.addOrUpdateShopProduct(product, currentShopQty - qty);
    }

    const basketValue = basket.getFinalBasketValue();
    this.closedBasketList.set(basket, new Date());

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
