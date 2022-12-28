import 'mocha';
import { assert } from 'chai';
import { ShopSystem } from '../ShopSystem.class';
import { ShopSystemOffer } from '../services/ShopSystemOffer.class';
import { ShopSystemCoupons } from '../services/ShopSystemCoupons.class';
import { initialCoupons } from './couponsMock';

describe('ShopSystem - coupons tests suite:', () => {
  let testShopOffer: ShopSystemOffer;
  let testShopCoupons: ShopSystemCoupons;
  let testShop: ShopSystem;

  beforeEach(() => {
    testShopOffer = new ShopSystemOffer();
    testShopCoupons = new ShopSystemCoupons();
    testShop = new ShopSystem(testShopOffer, testShopCoupons);

    initialCoupons.forEach((coupon: string) => testShop.addShopCoupon(coupon));
  });

  it('should add coupons to set', () => {
    //assert
    const shopCoupons = testShop.showShopCoupons;
    assert.deepEqual(new Set(initialCoupons), shopCoupons);
  });

  it('should remove specyfic coupon from set', () => {
    // act
    testShop.removeShopCoupon(initialCoupons[0]);

    //assert
    const shopCoupons = testShop.showShopCoupons;
    assert.deepEqual(new Set(initialCoupons.slice(1)), shopCoupons);
  });

  it('should move specyfic coupon from unused coupons set to used coupons set', () => {
    // act
    testShop.useShopCoupon(initialCoupons[0]);

    //assert
    const shopCoupons = testShop.showShopCoupons;
    const shopUsedCoupons = testShopCoupons.notValidCoupons;
    assert.deepEqual(new Set(initialCoupons.slice(1)), shopCoupons);
    assert.deepEqual(new Set([initialCoupons[0]]), shopUsedCoupons);
  });

  describe('coupon validator for each coupon method:', () => {
    it('should validate no proper coupon name (empty string) for addShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.addShopCoupon('');
      }, 'coupon name required');
    });
    it('should validate no proper coupon name (empty string) for removeShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.removeShopCoupon('');
      }, 'coupon name required');
    });
    it('should validate no proper coupon name (empty string) for useShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.useShopCoupon('');
      }, 'coupon name required');
    });

    it('should validate no proper coupon name (too long string) for addShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.addShopCoupon('123456789');
      }, 'coupon name should be at maximum 8 characters long');
    });
    it('should validate no proper coupon name (too long string) for removeShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.removeShopCoupon('123456789');
      }, 'coupon name should be at maximum 8 characters long');
    });
    it('should validate no proper coupon name (too long string) for useShopCoupon method', () => {
      // act+assert
      assert.throws(() => {
        testShop.useShopCoupon('123456789');
      }, 'coupon name should be at maximum 8 characters long');
    });
  });
});
