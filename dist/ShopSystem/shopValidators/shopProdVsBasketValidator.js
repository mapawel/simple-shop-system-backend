export const shopProdVsBasketValidator = (shopProdToUpdate) => {
    if (!shopProdToUpdate)
        throw new Error('Cannot proceed checkout. There is no product in our system which would correspond with all basket products');
    if (shopProdToUpdate.qty < 1)
        throw new Error('Cannot proceed checkout. There is no quantity available on stock for each product from the basket');
    return;
};
//# sourceMappingURL=shopProdVsBasketValidator.js.map