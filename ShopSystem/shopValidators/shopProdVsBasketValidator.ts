import { Basket } from 'Basket/Basket';
import { Product } from 'Product/Product';
import { IshopBasketItem } from 'ShopSystem/IshopBasketItem';
import { IshopProductItem } from '../IshopProductItem';

export const shopProdVsBasketValidator = (
  shopProdToUpdate: IshopProductItem | undefined
) => {
  if (!shopProdToUpdate)
    throw new Error(
      'Cannot proceed checkout. There is no product in our system which would correspond with all basket products'
    );
  if (shopProdToUpdate.qty < 1)
    throw new Error(
      'Cannot proceed checkout. There is no quantity available on stock for each product from the basket'
    );
  return;
};
