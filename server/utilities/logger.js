const path = require('path');
const winston = require('winston');
const config = require('../config')();

let transports = [];

if (process.env.NODE_ENV !== 'test') {
  transports = [
    // Write to all logs with level `info` and below to `combined.log`
    // Write all logs error (and below) to `error.log`.
    new winston.transports.File({
      filename: path.resolve(config.serverPath, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.resolve(config.serverPath, 'combined.log')
    })
  ];
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: transports
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;