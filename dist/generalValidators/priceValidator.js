export const priceValidator = (price) => {
    if (price <= 0)
        throw new Error('Price has to be a positive number.');
    return;
};
//# sourceMappingURL=priceValidator.js.map