import { couponsListValidator } from '../shopValidators/couponsListValidator.js';
export class ShopCoupons {
    constructor() {
        this.usedCoupons = [];
        this.unusedCoupons = [];
    }
    get shopCoupons() {
        return this.unusedCoupons;
    }
    addShopCoupon(couponsList) {
        couponsListValidator(this.unusedCoupons, couponsList);
        this.unusedCoupons = [...this.unusedCoupons, ...couponsList];
    }
    removeShopCoupons(couponsList) {
        this.unusedCoupons = this.unusedCoupons.filter((shopCoupon) => !couponsList.includes(shopCoupon));
    }
    useShopCoupon(coupon) {
        this.unusedCoupons = this.unusedCoupons.filter((shopCoupon) => shopCoupon.cName !== coupon.cName);
        this.usedCoupons = [...this.usedCoupons, coupon];
    }
}
//# sourceMappingURL=ShopCoupons.js.map