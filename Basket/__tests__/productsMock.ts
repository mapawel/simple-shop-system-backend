import { Product } from '../../Product/Product.class';
import { productCategories } from '../../Product/productCategories.enum';

export const products: Product[] = [
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
