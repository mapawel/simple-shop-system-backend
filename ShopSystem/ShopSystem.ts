import { v4 as uuid4 } from 'uuid';
import { IShopSystem } from './IShopSystem';
import { IshopProductItem } from './IshopProductItem';
import { Basket } from '../Basket/Basket.js';
import { Product } from '../Product/Product.js';
import { Coupon } from '../Coupon/Coupon.js';
import { ShopOffer } from './services/shopOffer';
import { ShopCoupons } from './services/ShopCoupons';

export class ShopSystem implements IShopSystem {
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
    return this.shopOffer.closedBaskets;
  }

  get showShopCoupons() {
    return this.shopCoupons.shopCoupons;
  }

  
  addShopProducts(productsItemsList: IshopProductItem[]) {
    this.shopOffer.addShopProducts(productsItemsList);
  }

  removeShopProducts(productsList: Product[]) {
    this.shopOffer.removeShopProducts(productsList);
  }

  updateShopProductQty(productItem: IshopProductItem) {
    this.shopOffer.updateShopProductQty(productItem);
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
