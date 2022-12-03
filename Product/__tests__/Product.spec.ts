import 'mocha';
import { assert } from 'chai';
import { Product } from '../Product';
import { productCategories } from '../productCategoriesEnum';
import { IProductParams } from '../IProductParams';
import { getDiscontedFormatedPrc } from '../../utils/getDiscontedFormatedPrc';

describe('Product:', () => {
  // arrange
  const initialProducts: IProductParams[] = [
    {
      name: 'Nice Jacket',
      category: productCategories.JACKET,
      basePrice: 350.333333333,
    },
    {
      name: 'Nice Trousers',
      category: productCategories.TROUSERS,
      basePrice: 250,
      discount: 0.2,
    },
  ];

  const products: Product[] = initialProducts.map(
    (initialProduct: IProductParams) => new Product(initialProduct)
  );

  describe('getFinalPrice method:', () => {
    it('method "getFinalPrice" should return a product discounted value', () => {
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
});
