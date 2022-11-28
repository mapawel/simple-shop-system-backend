export const productItemValidator = (productItem) => {
    if (productItem.qty < 0)
        throw new Error('Adding product quantity has to be greater or equal 0.');
    return;
};
//# sourceMappingURL=productItemValidator.js.map