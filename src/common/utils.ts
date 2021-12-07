import { validate as uuidValidate } from "uuid";

export const validateId = (id: string): void => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};