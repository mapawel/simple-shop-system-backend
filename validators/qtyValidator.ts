export const qtyValidator = (qty: number): void | Error => {
  if (qty < 0) throw new Error('Quantity has to be a positive number.');
  return;
};
