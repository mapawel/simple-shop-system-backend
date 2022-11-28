export const priceValidator = (price: number): void | Error => {
  if (price <= 0) throw new Error('Price has to be a positive number.');
  return;
};
