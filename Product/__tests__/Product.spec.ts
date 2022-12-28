import 'mocha';
import { assert } from 'chai';
import { Product } from '../Product.class';
import { IProductParams } from '../ProductParams.interface';
import { getDiscontedFormatedPrc } from '../../utils/getDiscontedFormatedPrc';
import { initialProducts } from './productsMock';

describe('Product tests suite:', () => {
  describe('getFinalPrice method:', () => {
    it('method "getFinalPrice" should return a product discounted value', () => {
      const products: Product[] = initialProducts.map(
        (initialProduct: IProductParams) => new Product(initialProduct)
      );
      // act
      // assert
      products.forEach((product: Product, index: number) =>
        assert.equal(
          product.getFinalPrice(),
          getDiscontedFormatedPrc(
            initialProducts[index].basePrice,
            initialProducts?.[index]?.discount || 0
          )
        )
      );
    });
  });

  describe('adding a new product validators test:', () => {
    it('should throw a validator error while product name is to short', () => {
      // act+assert
      assert.throws(() => {
        new Product({ ...initialProducts[0], name: 'q' });
      }, 'Name has to be min 4 long.');
    });
    it('should throw a validator error while product name is to long', () => {
      // act+assert
      assert.throws(() => {
        new Product({
          ...initialProducts[0],
          name: '#'.repeat(37),
        });
      }, 'Name has to be max 36 long.');
    });
    it('should throw a validator error while product price is lower than 0', () => {
      // act+assert
      assert.throws(() => {
        new Product({ ...initialProducts[0], basePrice: -1 });
      }, 'Price has to be a positive number.');
    });
    it('should throw a validator error while discount is lower than 0%', () => {
      // act+assert
      assert.throws(() => {
        new Product({ ...initialProducts[0], discount: -1 });
      }, 'discount has to be a positive number.');
    });
    it('should throw a validator error while discount is higher than 100%', () => {
      // act+assert
      assert.throws(() => {
        new Product({ ...initialProducts[1], discount: 2 });
      }, 'discount has to be a number in range from 0 to 1 where 0 is 0% and 1 is 100%');
    });
  });
});
