export const discountValidator = (discount: number): void | Error => {
  if (discount < 0) throw new Error('discount has to be a positive number.');
  if (discount > 1)
    throw new Error(
      'discount has to be a number in range from 0 to 1 where 0 is 0% and 1 is 100%'
    );
  return;
};
