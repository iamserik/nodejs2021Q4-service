import * as dotenv from 'dotenv';

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
 * EXIT_CODE: number
 * }}
 */
export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  EXIT_CODE: 1,
};
