import 'mocha';
import { assert } from 'chai';
import { ShopSystem } from '../ShopSystem';
import { ShopSystemOffer } from '../services/ShopSystemOffer';
import { ShopSystemCoupons } from '../services/ShopSystemCoupons';
import { Basket } from '../../Basket/Basket';
import { Product } from '../../Product/Product';
import { productCategories } from '../../Product/productCategoriesEnum';
import { ProductWhQty } from '../../Product/ProductWhQty';
import { BasketWhDate } from '../../Basket/BasketWhDate';
import { getDiscontedFormatedPrc } from '../../utils/getDiscontedFormatedPrc';

describe('ShopSystem:', () => {
  // arrange
  const testShopOffer = new ShopSystemOffer();
  const testShopCoupons = new ShopSystemCoupons();
  const testShop = new ShopSystem(testShopOffer, testShopCoupons);

  const productItems: ProductWhQty[] = [
    {
      product: new Product({
        name: 'Nice Jacket',
        category: productCategories.JACKET,
        basePrice: 350.333333333,
      }),
      qty: 11,
    },
    {
      product: new Product({
        name: 'Nice Trousers',
        category: productCategories.TROUSERS,
        basePrice: 250,
        discount: 0.2,
      }),
      qty: 22,
    },
  ];

  const initialCoupons = ['QWE', 'ASD', 'ZXC'];

  describe('addOrUpdateShopProduct method:', () => {
    it('should add a product to shop system products map with planned quantity', () => {
      // act
      productItems.forEach((productItem: ProductWhQty) =>
        testShop.addOrUpdateShopProduct(productItem.product, productItem.qty)
      );

      // assert
      testShop.shopProducts.forEach((productItem: ProductWhQty) =>
        assert.deepInclude(productItems, productItem)
      );
    });

    it('should update a product quantity', () => {
      // act
      productItems.forEach((productItem: ProductWhQty) =>
        testShop.addOrUpdateShopProduct(
          productItem.product,
          productItem.qty - 1
        )
      );
      //assert
      testShop.shopProducts.forEach((productItem: ProductWhQty) =>
        assert.deepInclude(
          productItems.map((item) => ({ ...item, qty: item.qty - 1 })),
          productItem
        )
      );
    });

    it('should throw error as to wrong qty passed', () => {
      // act+assert
      assert.throws(() => {
        testShop.addOrUpdateShopProduct(productItems[0].product, -1);
      }, 'Quantity has to be a positive number.');
    });
  });

  describe('removeShopProduct method:', () => {
    it('should remove a product from shop', () => {
      // act
      testShop.removeShopProduct(productItems[0].product);
      // assert
      testShop.shopProducts.forEach((productItem: ProductWhQty) =>
        assert.notDeepEqual(productItem.product, productItems[0].product)
      );
    });
  });

  describe('addShopCoupon method:', () => {
    it('should add coupons to set', () => {
      // act
      initialCoupons.forEach((coupon: string) =>
        testShop.addShopCoupon(coupon)
      );

      //assert
      const shopCoupons = testShop.showShopCoupons;
      assert.deepEqual(new Set(initialCoupons), shopCoupons);
    });
  });

  describe('removeShopCoupon method:', () => {
    it('should remove specyfic coupon from set', () => {
      // act
      testShop.removeShopCoupon(initialCoupons[0]);

      //assert
      const shopCoupons = testShop.showShopCoupons;
      assert.deepEqual(new Set(initialCoupons.slice(1)), shopCoupons);
    });
  });

  describe('useShopCoupon method:', () => {
    it('should move specyfic coupon from unused coupons set to used coupons set', () => {
      // act
      testShop.useShopCoupon(initialCoupons[1]);

      //assert
      const shopCoupons = testShop.showShopCoupons;
      const shopUsedCoupons = testShopCoupons.notValidCoupons;
      assert.deepEqual(new Set([initialCoupons[2]]), shopCoupons);
      assert.deepEqual(new Set([initialCoupons[1]]), shopUsedCoupons);
    });
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

  describe('checkout method:', () => {
    //arrange

    productItems.forEach((productItem: ProductWhQty) =>
      testShop.addOrUpdateShopProduct(productItem.product, productItem.qty)
    );

    const testBasket = new Basket();
    const basketProductQty = 3;

    for (let i: number = 1; i <= basketProductQty; i++) {
      testBasket.addProduct(productItems[1].product);
    }

    const value = testShop.checkout(testBasket);

    it('should put a passed basket to clased baskets map', () => {
      //assert
      testShop.closedBaskets.forEach((basketItem: BasketWhDate) =>
        assert.deepEqual(basketItem.basket, testBasket.basket)
      );
    });

    it('should return the basket value', () => {
      //assert
      const productFromBasket = productItems[1].product;
      assert.equal(
        value,
        basketProductQty *
          getDiscontedFormatedPrc(
            productFromBasket.basePrice,
            productFromBasket.discount
          )
      );
    });
  });
});
