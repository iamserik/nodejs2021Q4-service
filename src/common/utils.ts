const { validate: uuidValidate } = require("uuid");

export const validateId = (id: string): void => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};