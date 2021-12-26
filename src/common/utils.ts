import { validate as uuidValidate } from 'uuid';

/**
 * Validate uuid. Returns nothing if uuid valid. Otherwise throw an error.
 *
 * @param id - uuid which needs to validate
 * @return {void}
 * @throws Error - if not valid uuid
 */
export const validateId = (id: string): void => {
    const valid = uuidValidate(id);

    if (!valid) throw new Error('Not valid id');
};


const levels: Record<string, string> = {
    0: 'fatal',
    1: 'error',
    2: 'warn',
    3: 'info',
    4: 'debug',
    5: 'trace',
};

/**
 * Validate and return log level
 *
 * @param key - level number
 * @return level - lowest log level
 */
export const validateLevel = (key: string | undefined): string => {
    if (key && Object.keys(levels).includes(key)) {
        return levels[key];
    } else {
        return 'info';
    }
};