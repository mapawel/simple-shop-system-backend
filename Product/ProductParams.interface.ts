import { productCategories } from './productCategories.enum';

export interface IProductParams {
  name: string;
  category: productCategories;
  basePrice: number;
  discount?: number;
}
