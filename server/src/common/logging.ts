import Config from "../config/config";
import winston = require("winston");

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: Config.log_level,
            filename: Config.log_directory,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

if (Config.production_mode === true) {
    logger.remove(winston.transports.Console);
}

export default logger;