import winston from 'winston';
import appRoot from 'app-root-path';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss ZZ',
      }),
      winston.format.align(),
      winston.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info;
        return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
    handleExceptions: true,
    maxsize: 1024 * 1024 * 5, // 5MB
    maxFiles: 10,
    tailable: true,
  },
  console: {
    level: process.env.LOG_LEVEL,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss ZZ',
      }),
      winston.format.align(),
      winston.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info;
        return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
    handleExceptions: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export default logger;
