import { v4 as uuid4 } from 'uuid';
import { IshopSystemOffer } from './services/IshopSystemOffer';
import { IshopSystemCoupons } from './services/IshopSystemCoupons';
import { Basket } from '../Basket/Basket.js';
import { Product } from '../Product/Product.js';
import { ShopSystemOffer } from './services/ShopSystemOffer';
import { ShopSystemCoupons } from './services/ShopSystemCoupons';

// export class ShopSystem implements IshopSystemOffer, IshopSystemCoupons { .   // ?? :)
export class ShopSystem {
  readonly uuid: string;
  private shopOffer: ShopSystemOffer;
  private shopCoupons: ShopSystemCoupons;

  constructor(shopOffer: ShopSystemOffer, shopCoupons: ShopSystemCoupons) {
    this.uuid = uuid4();
    this.shopOffer = shopOffer;
    this.shopCoupons = shopCoupons;
  }

  get shopProducts() {
    return [...this.shopOffer.shopProducts];
  }

  get closedBaskets() {
    return [...this.shopOffer.closedBaskets];
  }

  get showShopCoupons() {
    return [...this.shopCoupons.validCoupons];
  }

  addOrUpdateShopProduct(product: Product, qty: number) {
    return this.shopOffer.addOrUpdateShopProduct(product, qty);
  }
  // gdy miałem tu implementację podawania w argumentach obiektów to mogłem podawać całą tablicę obiekt-produkt + qty. ... ?

  removeShopProduct(product: Product) {
    return this.shopOffer.removeShopProduct(product);
  }

  checkout(basket: Basket) {
    return this.shopOffer.checkout(basket);
  }

  addShopCoupon(coupon: string) {
    return this.shopCoupons.addShopCoupon(coupon);
  }
  removeShopCoupon(coupon: string) {
    return this.shopCoupons.removeShopCoupon(coupon);
  }
  useShopCoupon(coupon: string) {
    return this.shopCoupons.useShopCoupon(coupon);
  }
}
