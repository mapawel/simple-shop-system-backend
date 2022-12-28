import 'mocha';
import { assert } from 'chai';
import { Basket } from '../Basket.class';
import { Product } from '../../Product/Product.class';
import { ProductWhQty } from '../../Product/ProductWhQty';
import { products } from './productsMock';

describe('Basket tests suite:', () => {
  const basketDiscountConfig: { discount: number } = { discount: 0.1 };
  let createdBasket: Basket;

  beforeEach(() => {
    createdBasket = new Basket(basketDiscountConfig);
    products.forEach((product: Product): boolean =>
      createdBasket.addProduct(product)
    );
  });

  describe('addProduct method:', () => {
    it('method "addProduct" should add a Product object to the Basket products map', () => {
      // assert
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty) => {
        assert.deepEqual(
          productItem.product,
          products.find(
            (product: Product) => product.uuid === productItem.product.uuid
          )
        );
      });
    });

    it('method "addProduct" should add a Product item to the Basket with qty key = 2', () => {
      // adding the same productd again
      products.forEach((product: Product): boolean =>
        createdBasket.addProduct(product)
      );

      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.equal(productItem.qty, 2);
      });
    });
  });

  describe('removeProduct method:', () => {
    it('method "removeProduct" should decrease qty key form 2 to 1 in product item in basket', () => {
      products.forEach((product: Product): boolean =>
        createdBasket.addProduct(product)
      );

      products.forEach((product: Product): boolean =>
        createdBasket.removeProduct(product)
      );

      // assert
      const productsList: Map<string, ProductWhQty> = createdBasket.basketList;
      productsList.forEach((productItem: ProductWhQty, _: string) => {
        assert.equal(productItem.qty, 1);
      });
    });

    it('method "removeProduct" should remove product instance from basket when qty key was equal 1 before removing', () => {
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
      createdBasket.removeAllProducts();

      // assert
      assert.isEmpty(createdBasket.basketList);
    });
  });
});
