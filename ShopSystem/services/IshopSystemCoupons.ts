export interface IshopSystemCoupons {
  addShopCoupon(coupon: string): boolean;
  removeShopCoupon(coupon: string): boolean;
  useShopCoupon(coupon: string): boolean;
}
