export const nameValidator = (name) => {
    const minLength = 4;
    const maxLength = 36;
    if (!name.trim().length)
        throw new Error('Name is required.');
    if (name.length > maxLength)
        throw new Error(`Name has to be max ${maxLength} long.`);
    if (name.length < minLength)
        throw new Error(`Name has to be min ${minLength} long.`);
    return;
};
//# sourceMappingURL=nameValidator.js.map