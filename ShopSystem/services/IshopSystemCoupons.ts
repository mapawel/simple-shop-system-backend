export interface IshopSystemCoupons {
  addShopCoupon(coupon: string): Set<string>;
  removeShopCoupon(coupon: string): Set<string>;
  useShopCoupon(coupon: string): boolean;
}
