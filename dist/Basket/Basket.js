import { v4 as uuidv4 } from 'uuid';
import { discountValidator } from '../generalValidators/discountValidator.js';
import { getDiscontedFormatedPrc } from '../utils/getDiscontedFormatedPrc.js';
import { getBasketProductsSum } from '../utils/getBasketProductsSum.js';
export class Basket {
    constructor(configObj) {
        this.discount = 1;
        this.list = [];
        const discount = (configObj === null || configObj === void 0 ? void 0 : configObj.discount) || 0;
        discountValidator(discount);
        this.uuid = uuidv4();
        this.discount = discount;
    }
    get basketList() {
        return this.list;
    }
    addProduct(newProduct) {
        this.list.push(newProduct);
    }
    removeProduct(toRmProduct) {
        const foundFirstProductIndex = this.list.findIndex((inCartProd) => inCartProd === toRmProduct);
        if (foundFirstProductIndex >= 0)
            this.list = this.list.filter((_, listIndex) => listIndex !== foundFirstProductIndex);
    }
    removeAllProducts() {
        this.list = [];
    }
    getFinalBasketValue() {
        return getDiscontedFormatedPrc(getBasketProductsSum(this.list), this.discount);
    }
}
//# sourceMappingURL=Basket.js.map