import { Product } from '../../Product/Product';
import { IshopSystemOffer } from './IshopSystemOffer';
import { Basket } from '../../Basket/Basket.js';
import { qtyValidator } from '../../generalValidators/qtyValidator';

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

  addOrUpdateShopProduct(product: Product, qty: number): void {
    qtyValidator(qty);
    this.productList.set(product, qty);
  }

  removeShopProduct(product: Product): void {
    this.productList.delete(product);
  }

  checkout(basket: Basket): void {
    this.validateStock(basket.basketList);

    for (let [product, qty] of basket.basketList.entries()) {
      const currentShopQty = this.productList.get(product) || 0;
      this.addOrUpdateShopProduct(product, currentShopQty - qty);
    }

    this.closedBasketList.set(basket, new Date());
  }
}

//TODO jak zrobić najefektywniej, aby przykłądowo metoda checkout mogła gadać z instancją klasy shopCoupons?
