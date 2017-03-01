import winston = require("winston");
import config = require('../config/app.config');

const transport = new winston.transports.File({ 
    filename: config.logging.filepath,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: config.logging.level,
    json: config.logging.json
});

console.log(`Initializing log with level ${config.logging.level} and filepath ${config.logging.filepath}`);

const logger : winston.LoggerInstance = new winston.Logger({
    level: config.logging.level,
    transports: [ new (winston.transports.Console)(), transport ],
    exitOnError: false
});

logger.info('Logger initialized');

export = logger;