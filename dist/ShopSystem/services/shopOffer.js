import { productItemsListValidator } from '../shopValidators/productItemsListValidator.js';
import { productItemValidator } from '../shopValidators/productItemValidator.js';
import { shopProdVsBasketValidator } from '../shopValidators/shopProdVsBasketValidator.js';
export class ShopOffer {
    constructor() {
        this.productList = [];
        this.closedBasketList = [];
    }
    get shopProducts() {
        return this.productList;
    }
    get closedBaskets() {
        return this.closedBasketList;
    }
    addShopProducts(productsItemsList) {
        productItemsListValidator(this.productList, productsItemsList);
        this.productList = [...this.productList, ...productsItemsList];
    }
    removeShopProducts(productsList) {
        this.productList = this.productList.filter((shopProduct) => !productsList.includes(shopProduct.product));
    }
    updateShopProductQty(productItem) {
        productItemValidator(productItem);
        const productItemIndex = this.productList.findIndex((shopProdItem) => shopProdItem.product === productItem.product);
        if (productItemIndex >= 0) {
            this.productList[productItemIndex].qty = productItem.qty;
        }
    }
    checkout(basket) {
        basket.basketList.forEach((basketProduct) => {
            const shopProdToUpdate = this.shopProducts.find((shopProduct) => shopProduct.product === basketProduct);
            shopProdVsBasketValidator(shopProdToUpdate);
            if (shopProdToUpdate) {
                this.updateShopProductQty({
                    product: shopProdToUpdate.product,
                    qty: shopProdToUpdate.qty - 1,
                });
            }
        });
        this.closedBasketList = [
            ...this.closedBasketList,
            { basket, purchaseDate: new Date() },
        ];
    }
}
//# sourceMappingURL=shopOffer.js.map