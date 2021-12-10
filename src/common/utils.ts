import { validate as uuidValidate } from 'uuid';

/**
 * Validate uuid
 *
 * @param {string} id (uuid)
 * @return {void}
 * @throws {Error} if not valid uuid
 */
export const validateId = (id: string): void => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};