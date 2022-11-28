import { productCategories } from './productCategoriesEnum';

export interface IProductParams {
  name: string;
  category: productCategories;
  basePrice: number;
  discount?: number;
}
