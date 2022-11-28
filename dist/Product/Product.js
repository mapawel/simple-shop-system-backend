import { v4 as uuidv4 } from 'uuid';
import { nameValidator } from '../generalValidators/nameValidator.js';
import { priceValidator } from '../generalValidators/priceValidator.js';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
export class Product {
    constructor({ name, category, basePrice, discount = 0 }) {
        nameValidator(name);
        priceValidator(basePrice);
        discountValidator(discount);
        this.uuid = uuidv4();
        this.name = name;
        this.category = category;
        this.basePrice = parseFloat(basePrice.toFixed(2));
        this.discount = discount;
    }
    getFinalPrice() {
        return getDiscontedFormatedPrc(this.basePrice, this.discount);
    }
}
//# sourceMappingURL=Product.js.map