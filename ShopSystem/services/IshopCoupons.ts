import { Coupon } from '../../Coupon/Coupon';

export interface IshopCoupons {
  addShopCoupon(couponList: Coupon[]): void;
  removeShopCoupons(couponList: Coupon[]): void;
  useShopCoupon(coupon: Coupon): void;
}
