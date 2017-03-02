// Using the Winston logger (https://github.com/winstonjs/winston)
import winston = require("winston");
require('winston-daily-rotate-file');
import config = require('../config/app.config');

let winstonTransports: winston.TransportInstance[];

// Add the file log
winstonTransports = [(new winston.transports.DailyRotateFile({
    filename: `${config.logging.filepath}_`,
    datePattern: 'yyyy-MM-dd',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: config.logging.level,
    json: config.logging.json
}))];

// Add the console log
winstonTransports.push(new winston.transports.Console({
   level: config.logging.level,
   colorize: true,
   handleExceptions: true 
}));

console.log(`Attempting to initialize Winston logger with level ${config.logging.level} and filepath ${config.logging.filepath}`);

const logger : winston.LoggerInstance = new winston.Logger({
    level: config.logging.level,
    transports: winstonTransports,
    exitOnError: false
});

// Wrap the logger functions so that it's easy to replace the log library in the future
class Logger {
    error(message: string, metadata?: any[]) {
        logger.error(message, metadata);
    }

    warn(message: string, metadata?: any[]) {
        logger.warn(message, metadata);
    }

    info(message: string, metadata?: any[]) {
        logger.info(message, metadata);
    };

    verbose(message: string, metadata?: any[]) {
        logger.verbose(message, metadata);
    }

    debug(message: string, metadata?: any[]) {
        logger.debug(message, metadata);
    }

    silly(message: string, metadata?: any[]) {
        logger.silly(message, metadata);
    };
};

// Export the logger
let logInstance = new Logger();
logInstance.info('Winston logger initialized.');
export = logInstance;
