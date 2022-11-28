import { IshopCoupons } from './IshopCoupons';
import { Coupon } from '../../Coupon/Coupon';
import { couponsListValidator } from '../shopValidators/couponsListValidator.js';

export class ShopCoupons implements IshopCoupons {
  private usedCoupons: Coupon[] = [];
  private unusedCoupons: Coupon[] = [];

  get shopCoupons() {
    return this.unusedCoupons;
  }

  addShopCoupon(couponsList: Coupon[]): void {
    couponsListValidator(this.unusedCoupons, couponsList);
    this.unusedCoupons = [...this.unusedCoupons, ...couponsList];
  }

  removeShopCoupons(couponsList: Coupon[]): void {
    this.unusedCoupons = this.unusedCoupons.filter(
      (shopCoupon: Coupon) => !couponsList.includes(shopCoupon)
    );
  }

  useShopCoupon(coupon: Coupon): void {
    this.unusedCoupons = this.unusedCoupons.filter(
      (shopCoupon: Coupon) => shopCoupon.cName !== coupon.cName
    );
    this.usedCoupons = [...this.usedCoupons, coupon];
  }
}
