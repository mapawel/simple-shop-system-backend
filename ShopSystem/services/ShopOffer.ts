import { IshopProductItem } from '../IshopProductItem';
import { Product } from '../../Product/Product';
import { productItemsListValidator } from '../shopValidators/productItemsListValidator.js';
import { productItemValidator } from '../shopValidators/productItemValidator.js';
import { IshopOffer } from './IshopOffer';
import { shopProdVsBasketValidator } from '../shopValidators/shopProdVsBasketValidator.js';
import { IshopBasketItem } from '../IshopBasketItem';
import { Basket } from '../../Basket/Basket.js';

export class ShopOffer implements IshopOffer {
  private productList: IshopProductItem[] = [];
  private closedBasketList: IshopBasketItem[] = [];

  get shopProducts() {
    return this.productList;
  }

  get closedBaskets() {
    return this.closedBasketList;
  }

  addShopProducts(productsItemsList: IshopProductItem[]): void {
    productItemsListValidator(this.productList, productsItemsList);
    this.productList = [...this.productList, ...productsItemsList];
  }

  removeShopProducts(productsList: Product[]): void {
    this.productList = this.productList.filter(
      (shopProduct: IshopProductItem) =>
        !productsList.includes(shopProduct.product)
    );
  }

  updateShopProductQty(productItem: IshopProductItem): void {
    productItemValidator(productItem);
    const productItemIndex = this.productList.findIndex(
      (shopProdItem: IshopProductItem) =>
        shopProdItem.product === productItem.product
    );
    if (productItemIndex >= 0) {
      this.productList[productItemIndex].qty = productItem.qty;
    }
  }

  checkout(basket: Basket): void {
    basket.basketList.forEach((basketProduct: Product) => {
      const shopProdToUpdate = this.shopProducts.find(
        (shopProduct: IshopProductItem) => shopProduct.product === basketProduct
      );
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

//TODO jak zrobić najefektywniej, aby przykłądowo metoda checkout mogła gadać z instancją klasy shopCoupons?
