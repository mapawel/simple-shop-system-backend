import { OperationStatus } from "../../OperationStatus/OperationStatus";

export interface IshopSystemCoupons {
  addShopCoupon(coupon: string): OperationStatus<string>;
  removeShopCoupon(coupon: string): OperationStatus<string>;
  useShopCoupon(coupon: string): OperationStatus<string>;
}
