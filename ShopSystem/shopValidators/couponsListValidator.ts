import { Coupon } from 'Coupon/Coupon';

export const couponsListValidator = (
  shopCouponsList: Coupon[],
  couponsList: Coupon[]
) => {
  const shopCouponNamesArr = shopCouponsList.map(
    (coupon: Coupon) => coupon.cName
  );
  const arrayToValidate = [...couponsList];
  arrayToValidate.sort((a: Coupon, b: Coupon) =>
    a.cName.localeCompare(b.cName)
  );

  arrayToValidate.map(
    (coupon: Coupon, index: number, couponsArray: Coupon[]) => {
      if (shopCouponNamesArr.includes(coupon.cName))
        throw new Error(
          `Coupon ${coupon.cName} already present in the shop. Don\'t duplicate coupon names.`
        );

      if (
        index > 0 &&
        couponsArray[index].cName ===
          couponsArray[index - 1].cName
      ) {
        throw new Error("Don't pass duplicated coupon names.");
      }
      return;
    }
  );
  return;
};
