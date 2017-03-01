import winston = require("winston");
require('winston-daily-rotate-file');
import config = require('../config/app.config');

const transport = new winston.transports.DailyRotateFile({ 
    filename: `${config.logging.filepath}_`,
    datePattern: 'yyyy-MM-dd',
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