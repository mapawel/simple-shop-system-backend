import { IshopSystemCoupons } from './IshopSystemCoupons';

export class ShopSystemCoupons implements IshopSystemCoupons {
  private usedCoupons: Set<string> = new Set();
  private unusedCoupons: Set<string> = new Set();

  get validCoupons() {
    return [...this.unusedCoupons];
  }

  validate(name: string) {
    if (!name.trim().length) throw new Error('coupon name required');
    if (name.trim().length > 8)
      throw new Error('coupon name should be at maximum 8 characters long');
    return;
  }

  addShopCoupon(coupon: string): void {
    this.validate(coupon);
    this.unusedCoupons.add(coupon);
  }

  removeShopCoupon(coupon: string): void {
    this.validate(coupon);
    this.unusedCoupons.delete(coupon);
  }

  useShopCoupon(coupon: string): void {
    this.validate(coupon);
    this.removeShopCoupon(coupon);
    this.usedCoupons.add(coupon);
  }
}
