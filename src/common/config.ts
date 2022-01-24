import dotenv from 'dotenv';

dotenv.config();

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
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOWEST_DEBUG_LEVEL: process.env.LOWEST_DEBUG_LEVEL,
  EXIT_CODE: 1,

  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
