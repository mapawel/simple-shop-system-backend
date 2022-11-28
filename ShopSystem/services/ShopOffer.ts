import { Product } from '../../Product/Product';
import { IshopSystemOffer } from './IshopSystemOffer';
import { Basket } from '../../Basket/Basket.js';
import { qtyValidator } from '../../generalValidators/qtyValidator';

export class ShopOffer implements IshopSystemOffer {
  private productList: Map<Product, number> = new Map();
  private closedBasketList: Map<Basket, Date> = new Map();

  get shopProducts() {
    return this.productList;
  }

  get closedBaskets() {
    return this.closedBasketList;
  }

  addOrUpdateShopProduct(product: Product, qty: number): void {
    qtyValidator(qty);
    this.productList.set(product, qty);
  }

  removeShopProduct(product: Product): void {
    this.productList.delete(product);
  }

  checkout(basket: Basket): void {
    basket.basketList.forEach((basketProduct: Product) => {
      const currentShopQty = this.productList.get(basketProduct);
      if (currentShopQty)
        this.addOrUpdateShopProduct(basketProduct, currentShopQty - 1);
    });
    this.closedBasketList.set(basket, new Date());
  }
}

//TODO jak zrobić najefektywniej, aby przykłądowo metoda checkout mogła gadać z instancją klasy shopCoupons?
