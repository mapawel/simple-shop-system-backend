export const couponsListValidator = (shopCouponsList, couponsList) => {
    const shopCouponNamesArr = shopCouponsList.map((coupon) => coupon.cName);
    const arrayToValidate = [...couponsList];
    arrayToValidate.sort((a, b) => a.cName.localeCompare(b.cName));
    arrayToValidate.map((coupon, index, couponsArray) => {
        if (shopCouponNamesArr.includes(coupon.cName))
            throw new Error(`Coupon ${coupon.cName} already present in the shop. Don\'t duplicate coupon names.`);
        if (index > 0 &&
            couponsArray[index].cName ===
                couponsArray[index - 1].cName) {
            throw new Error("Don't pass duplicated coupon names.");
        }
        return;
    });
    return;
};
//# sourceMappingURL=couponsListValidator.js.map