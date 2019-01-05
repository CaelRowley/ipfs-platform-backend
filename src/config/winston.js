import winston from 'winston';
import appRoot from 'app-root-path';

const format = winston.format;

const printFormat = format.printf(info => {
  const {
    timestamp, level, message, ...args
  } = info;
  return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
});

const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    info.message = Object.assign({
      message: `${info.message.message}\n${info.message.stack}`
    }, info.message);
  };
  if (info instanceof Error) {
    return Object.assign({
      message: `${info.message}\n${info.stack}`
    }, info);
  };
  return info;
});

const logger = winston.createLogger({
  format: format.combine(
    enumerateErrorFormat(),
    format.json(),
    format.align(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss ZZ',
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL_CONSOLE,
      format: format.combine(
        format.colorize(),
        printFormat,
      ),
      handleExceptions: true,
    }),
    new winston.transports.File({
      level: process.env.LOG_LEVEL_FILE,
      filename: `${appRoot}/logs/app.log`,
      format: format.combine(
        printFormat,
      ),
      maxsize: 1024 * 1024 * 5, // 5MB
      maxFiles: 10,
      tailable: true,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
