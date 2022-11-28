import { v4 as uuidv4 } from 'uuid';
import { productCategories } from './productCategoriesEnum';
import { IProduct } from './IProduct';
import { IProductParams } from './IProductParams';
import { nameValidator } from '../generalValidators/nameValidator.js';
import { priceValidator } from '../generalValidators/priceValidator.js';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';

export class Product implements IProduct {
  readonly uuid: string;
  readonly name: string;
  readonly category: productCategories;
  readonly basePrice: number;
  readonly discount: number;

  constructor({ name, category, basePrice, discount = 0 }: IProductParams) {
    nameValidator(name);
    priceValidator(basePrice);
    discountValidator(discount);

    this.uuid = uuidv4();
    this.name = name;
    this.category = category;
    this.basePrice = parseFloat(basePrice.toFixed(2));
    this.discount = discount;
  }

  getFinalPrice(): number {
    return getDiscontedFormatedPrc(this.basePrice, this.discount);
  }
}
