import 'mocha';
import { assert } from 'chai';
import { ShopSystem } from '../ShopSystem.class';
import { ShopSystemOffer } from '../services/ShopSystemOffer.class';
import { ShopSystemCoupons } from '../services/ShopSystemCoupons.class';
import { Basket } from '../../Basket/Basket.class';
import { ProductWhQty } from '../../Product/ProductWhQty';
import { getDiscontedFormatedPrc } from '../../utils/getDiscontedFormatedPrc';
import { productItems } from './productItemsMock';
import { BasketWhDate } from '../../Basket/BasketWhDate.type';

describe('ShopSystem - offer tests suite:', () => {
  // arrange
  let testShopOffer: ShopSystemOffer;
  let testShopCoupons: ShopSystemCoupons;
  let testShop: ShopSystem;

  beforeEach(() => {
    testShopOffer = new ShopSystemOffer();
    testShopCoupons = new ShopSystemCoupons();
    testShop = new ShopSystem(testShopOffer, testShopCoupons);

    productItems.forEach((productItem: ProductWhQty) =>
      testShop.addOrUpdateShopProduct(productItem.product, productItem.qty)
    );
  });

  describe('shop products methods:', () => {
    it('should add a product to shop system products map with planned quantity', () => {
      // assert
      testShop.shopProducts.forEach((productItem: ProductWhQty) =>
        assert.deepInclude(productItems, productItem)
      );
    });

    it('should update a product quantity', () => {
      // act
      const shopProducts: Map<string, ProductWhQty> = testShop.shopProducts;
      shopProducts.forEach((value: ProductWhQty) => {
        testShop.addOrUpdateShopProduct(value.product, value.qty - 1);
      });
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

    it('should remove a product from shop', () => {
      // act
      testShop.removeShopProduct(productItems[0].product);
      // assert
      testShop.shopProducts.forEach((productItem: ProductWhQty) =>
        assert.notDeepEqual(productItem.product, productItems[0].product)
      );
    });
  });

  describe('checkout method:', () => {
    let testBasket: Basket;
    const basketProductQty = 3;

    beforeEach(() => {
      testBasket = new Basket();
      for (let i: number = 1; i <= basketProductQty; i++) {
        testBasket.addProduct(productItems[1].product);
      }
    });

    it('should put a passed basket to closed baskets map', () => {
      //assert
      testShop.closedBaskets.forEach((basketItem: BasketWhDate) =>
        assert.deepEqual(basketItem.basket, testBasket.basket)
      );
    });

    it('should return the basket value', () => {
      const value = testShop.checkout(testBasket);

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
