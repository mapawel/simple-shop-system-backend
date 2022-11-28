import { v4 as uuid4 } from 'uuid';
import { IshopSystemOffer } from './services/IshopSystemOffer';
import { IshopSystemCoupons } from './services/IshopSystemCoupons';
import { Basket } from '../Basket/Basket.js';
import { Product } from '../Product/Product.js';
import { Coupon } from '../Coupon/Coupon.js';
import { ShopOffer } from './services/shopOffer';
import { ShopCoupons } from './services/ShopCoupons';

export class ShopSystem implements IshopSystemOffer, IshopSystemCoupons {
  readonly uuid: string;
  private shopOffer: ShopOffer;
  private shopCoupons: ShopCoupons;

  constructor(shopOffer: ShopOffer, shopCoupons: ShopCoupons) {
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
    return [...this.shopCoupons.shopCoupons];
  }

  addOrUpdateShopProduct(product: Product, qty: number) {
    this.shopOffer.addOrUpdateShopProduct(product, qty);
  }
  // gdy miałem tu implementację podawania w argumentach obiektów to mogłem podawać całą tablicę obiekt-produkt + qty. ... ?

  removeShopProduct(product: Product) {
    this.shopOffer.removeShopProduct(product);
  }

  checkout(basket: Basket) {
    this.shopOffer.checkout(basket);
  }

  addShopCoupon(couponList: Coupon[]) {
    this.shopCoupons.addShopCoupon(couponList);
  }
  removeShopCoupons(couponList: Coupon[]) {
    this.shopCoupons.removeShopCoupons(couponList);
  }
  useShopCoupon(coupon: Coupon) {
    this.shopCoupons.useShopCoupon(coupon);
  }
}
