import { Coupon } from '../../Coupon/Coupon';

export interface IshopSystemCoupons {
  addShopCoupon(couponList: Coupon[]): void;
  removeShopCoupons(couponList: Coupon[]): void;
  useShopCoupon(coupon: Coupon): void;
}
