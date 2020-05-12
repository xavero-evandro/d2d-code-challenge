import dotenv from 'dotenv';
import fs from 'fs';

if (process.env.NODE_ENV !== 'test') {
  if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
  }
}

export const PORT = process.env.PORT || 3000;

export const ENVIRONMENT = process.env.NODE_ENV;

export const LOG_LEVEL = ENVIRONMENT === 'production' ? 'error' : 'debug';

export const LOG_FORMAT_JSON = process.env.LOG_FORMAT_JSON
  ? process.env.LOG_FORMAT_JSON
  : 'false';

export const { MONGODB_URI } = process.env;
