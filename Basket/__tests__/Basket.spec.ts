import 'mocha';
import { assert } from 'chai';
import { Basket } from '../Basket';
import { Product } from '../../Product/Product';
import { productCategories } from '../../Product/productCategoriesEnum';
import { ProductWhQty } from '../../Product/ProductWhQty';

describe('Basket:', () => {
  // arrange
  const basketDiscountConfig: { discount: number } = { discount: 0.1 };
  const createdBasket: Basket = new Basket(basketDiscountConfig);

  const products: Product[] = [
    new Product({
      name: 'Nice Jacket',
      category: productCategories.JACKET,
      basePrice: 350.333333333,
    }),
    new Product({
      name: 'Nice Trousers',
      category: productCategories.TROUSERS,
      basePrice: 250,
      discount: 0.2,
    }),
  ];

  describe('addProduct method:', () => {
    it('method "addProduct" should add a Product with quantity object to the Basket products map', () => {
      // act
      products.forEach(
        (product: Product): Map<string, ProductWhQty> =>
          createdBasket.addProduct(product)
      );
      products.forEach(
        (product: Product): Map<string, ProductWhQty> =>
          createdBasket.addProduct(product)
      );

      // assert
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.deepEqual(
          productItem.product,
          products.find(
            (product: Product) => product.uuid === productItem.product.uuid
          )
        );
      });
    });
    it('method "addProduct" should add a Product item to the Basket with qty key = 2', () => {
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.equal(productItem.qty, 2);
      });
    });
  });

  describe('removeProduct method:', () => {
    it('method "removeProduct" should decrease qty key form 2 to 1 in product item in basket', () => {
      // act
      products.forEach(
        (product: Product): Map<string, ProductWhQty> =>
          createdBasket.removeProduct(product)
      );

      // assert
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.equal(productItem.qty, 1);
      });
    });

    it('method "removeProduct" should remove product instance from basket when qty key was equal 1 before removing', () => {
      // act
      createdBasket.removeProduct(products[0]);

      // assert
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.notDeepEqual(productItem.product, products[0]);
        assert.deepEqual(productItem.product, products[1]);
      });
    });
  });

  describe('removeAllProducts method:', () => {
    it('method "removeProduct" should clean basket products map', () => {
      // act
      createdBasket.removeAllProducts();

      // assert
      assert.isEmpty(createdBasket.basketList);
    });
  });
});
