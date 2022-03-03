const { createLogger, transports, format } = require("winston");
const { timestamp, combine, printf, errors } = format;

// log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

// logging function
const customLogger = createLogger({
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.File({
            filename: "combined.log",
        }),
        new transports.Console(),
    ],
});

module.exports = customLogger;
