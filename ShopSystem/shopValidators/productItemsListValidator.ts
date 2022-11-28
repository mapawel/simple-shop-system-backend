import { IshopProductItem } from '../IshopProductItem';

export const productItemsListValidator = (
  shopProductsItemsList: IshopProductItem[],
  productsItemsList: IshopProductItem[]
) => {
  const shopProductsUuidArr = shopProductsItemsList.map(
    (shopProduct: IshopProductItem) => shopProduct.product.uuid
  );

  const arrayToValidat = [...productsItemsList];
  arrayToValidat.sort((a: IshopProductItem, b: IshopProductItem) =>
    a.product.uuid.localeCompare(b.product.uuid)
  );

  arrayToValidat.map(
    (
      productListItem: IshopProductItem,
      index: number,
      productItemsArray: IshopProductItem[]
    ) => {
      if (shopProductsUuidArr.includes(productListItem.product.uuid))
        throw new Error(
          `Product with uuid ${productListItem.product.uuid} already present in the shop. Don\'n duplicate products.`
        );

      if (
        index > 0 &&
        productItemsArray[index].product.uuid ===
          productItemsArray[index - 1].product.uuid
      ) {
        throw new Error("Don't place duplicated products.");
      }

      if (productListItem.qty < 0)
        throw new Error('Adding product quantity has to be greater than 0.');
      return;
    }
  );
  return;
};
