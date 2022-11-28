import { IshopProductItem } from '../IshopProductItem';

export const productItemValidator = (productItem: IshopProductItem) => {
  if (productItem.qty < 0)
    throw new Error('Adding product quantity has to be greater or equal 0.');
  return;
};
