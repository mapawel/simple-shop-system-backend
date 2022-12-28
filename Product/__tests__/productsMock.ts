import { IProductParams } from '../../Product/ProductParams.interface';
import { productCategories } from '../../Product/productCategories.enum';

export const initialProducts: IProductParams[] = [
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
