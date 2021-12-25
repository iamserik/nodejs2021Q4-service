import dotenv from 'dotenv';

dotenv.config();

const levelParser = (level: string | undefined): number => {
  return level ? +level : 30;
}

/**
 * App configuration variables
 *
 * @type {{
 * PORT: string,
 * NODE_ENV: string,
 * MONGO_CONNECTION_STRING: string,
 * JWT_SECRET_KEY: string,
 * AUTH_MODE: boolean,
 * LOWEST_DEBUG_LEVEL: string,
 * EXIT_CODE: number
 * }}
 */
export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOWEST_DEBUG_LEVEL: process.env.LOWEST_DEBUG_LEVEL ?? '3',
  EXIT_CODE: 1,
};
