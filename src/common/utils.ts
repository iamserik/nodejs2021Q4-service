import { validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Validate uuid. Returns nothing if uuid valid. Otherwise throw an error.
 *
 * @param id - uuid which needs to validate
 * @return {void}
 * @throws Error - if not valid uuid
 */
export const validateId = (id: string): void => {
  const valid = uuidValidate(id);

  if (!valid) throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST);
};