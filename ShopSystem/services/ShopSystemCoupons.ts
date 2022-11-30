import { IshopSystemCoupons } from './IshopSystemCoupons';
import { OperationStatus } from '../../OperationStatus/OperationStatus';

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

  addShopCoupon(coupon: string): OperationStatus<string> {
    this.validate(coupon);
    this.unusedCoupons.add(coupon);
    return new OperationStatus<string>(
      'Coupon added to unused coupons succesfully.',
      coupon
    );
  }

  removeShopCoupon(coupon: string): OperationStatus<string> {
    this.validate(coupon);
    this.unusedCoupons.delete(coupon);
    return new OperationStatus<string>(
      'Coupon removed from unused coupons succesfully.',
      coupon
    );
  }

  useShopCoupon(coupon: string): OperationStatus<string> {
    this.validate(coupon);
    this.removeShopCoupon(coupon);
    this.usedCoupons.add(coupon);
    return new OperationStatus<string>(
      'Coupon moved from unused to used coupons succesfully.',
      coupon
    );
  }
}
