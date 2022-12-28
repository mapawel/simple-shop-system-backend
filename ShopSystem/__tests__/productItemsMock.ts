import { Product } from '../../Product/Product.class';
import { productCategories } from '../../Product/productCategories.enum';
import { ProductWhQty } from '../../Product/ProductWhQty';

export const productItems: ProductWhQty[] = [
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
