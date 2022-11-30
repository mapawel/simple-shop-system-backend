export interface IshopSystemCoupons {
  addShopCoupon(coupon: string): void;
  removeShopCoupon(coupon: string): void;
  useShopCoupon(coupon: string): void;
}
