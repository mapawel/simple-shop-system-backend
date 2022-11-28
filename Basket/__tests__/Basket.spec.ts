import { assert } from 'chai';
import 'mocha';
import { Basket } from '../Basket';
import { Product } from '../../Product/Product';
import { productCategories } from '../../Product/productCategoriesEnum';

describe('Basket Class:', () => {
  // // arrange
  // const basketDiscountConfig = { discount: 0.1 };
  // // act
  // const createdBasket = new Basket(basketDiscountConfig);
  // describe('a new basket instance properties / getters:', () => {
  //   //assert
  //   it('should return a new basket instance', () => {
  //     assert.instanceOf(createdBasket, Basket);
  //   });
  //   it('should return a new basket instance with getters for bUuid, bDiscount, bList', () => {
  //     assert.typeOf(createdBasket.bUuid, 'string');
  //     assert.typeOf(createdBasket.bDiscount, 'number');
  //     assert.typeOf(createdBasket.bList, 'array');
  //   });
  //   it('should return a new basket instance with discount equal configured discount', () => {
  //     assert.equal(createdBasket.bDiscount, basketDiscountConfig.discount);
  //   });
  //   it('should return a new basket instance with add', () => {
  //     assert.equal(createdBasket.bDiscount, basketDiscountConfig.discount);
  //   });
  // });
  // describe('a new basket instance methods:', () => {
  //   // arrange
  //   const products = [
  //     new Product({
  //       name: 'Nice Jacket',
  //       category: productCategories.JACKET,
  //       basePrice: 350.333333333,
  //     }),
  //     new Product({
  //       name: 'Nice Trousers',
  //       category: productCategories.TROUSERS,
  //       basePrice: 250,
  //       discount: 0.2,
  //     }),
  //   ];
  //   // act
  //   products.forEach((product: Product) => createdBasket.addProduct(product));
  //   it('method "addProduct" should add a Product instance to the array of Product instances in bList key in the Basket', () => {
  //     const productsList = createdBasket.bList;
  //     // assert
  //     productsList.forEach((product: Product, i) => {
  //       assert.deepEqual(product, products[i]);
  //     });
  //   });
  // });
});
