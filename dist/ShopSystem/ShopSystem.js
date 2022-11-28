import { v4 as uuid4 } from 'uuid';
export class ShopSystem {
    constructor(shopOffer, shopCoupons) {
        this.uuid = uuid4();
        this.shopOffer = shopOffer;
        this.shopCoupons = shopCoupons;
    }
    get shopProducts() {
        return [...this.shopOffer.shopProducts];
    }
    get closedBaskets() {
        return this.shopOffer.closedBaskets;
    }
    get showShopCoupons() {
        return this.shopCoupons.shopCoupons;
    }
    addShopProducts(productsItemsList) {
        this.shopOffer.addShopProducts(productsItemsList);
    }
    removeShopProducts(productsList) {
        this.shopOffer.removeShopProducts(productsList);
    }
    updateShopProductQty(productItem) {
        this.shopOffer.updateShopProductQty(productItem);
    }
    checkout(basket) {
        this.shopOffer.checkout(basket);
    }
    addShopCoupon(couponList) {
        this.shopCoupons.addShopCoupon(couponList);
    }
    removeShopCoupons(couponList) {
        this.shopCoupons.removeShopCoupons(couponList);
    }
    useShopCoupon(coupon) {
        this.shopCoupons.useShopCoupon(coupon);
    }
}
//# sourceMappingURL=ShopSystem.js.map