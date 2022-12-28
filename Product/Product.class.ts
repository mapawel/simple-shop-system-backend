import { v4 as uuidv4 } from 'uuid';
import { productCategories } from './productCategories.enum';
import { IProduct } from './Product.interface';
import { IProductParams } from './ProductParams.interface';
import { nameValidator } from '../validators/nameValidator.js';
import { priceValidator } from '../validators/priceValidator.js';
import { discountValidator } from '../validators/discountValidator.js';
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
