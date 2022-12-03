import { IshopSystemCoupons } from './IshopSystemCoupons';

export class ShopSystemCoupons implements IshopSystemCoupons {
  private readonly usedCoupons: Set<string> = new Set();
  private readonly unusedCoupons: Set<string> = new Set();

  get validCoupons(): Set<string> {
    return new Set(this.unusedCoupons);
  }

  validate(name: string): void | Error {
    if (!name.trim().length) throw new Error('coupon name required');
    if (name.trim().length > 8)
      throw new Error('coupon name should be at maximum 8 characters long');
    return;
  }

  addShopCoupon(coupon: string): Set<string> {
    this.validate(coupon);
    this.unusedCoupons.add(coupon);
    return new Set(this.unusedCoupons);
  }

  removeShopCoupon(coupon: string): Set<string> {
    this.validate(coupon);
    this.unusedCoupons.delete(coupon);
    return new Set(this.unusedCoupons);
  }

  useShopCoupon(coupon: string): boolean {
    this.validate(coupon);
    this.removeShopCoupon(coupon);
    this.usedCoupons.add(coupon);
    return true;
  }
}
