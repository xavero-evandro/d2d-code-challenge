import winston from 'winston';
import { LOG_LEVEL, LOG_FORMAT_JSON } from './config';

let logFormat = winston.format.simple();

if (LOG_FORMAT_JSON === 'true') {
  logFormat = winston.format.json();
}

const options = {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
    }),
  ],
};

const logger = winston.createLogger(options);

if (LOG_LEVEL === 'debug') {
  // logger.debug('Logging initialized at debug level');
}

export default logger;
