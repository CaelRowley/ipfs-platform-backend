import winston from 'winston';
import appRoot from 'app-root-path';
import 'winston-daily-rotate-file';

const { format } = winston;

const printFormat = format.printf((info) => {
  const {
    timestamp, level, message, ...args
  } = info;
  return `${timestamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
});

const enumerateErrorFormat = format((info) => {
  if (info.message instanceof Error) {
    info.message = Object.assign({ // eslint-disable-line no-param-reassign
      message: `${info.message.message}\n${info.message.stack}`,
    }, info.message);
  }
  if (info instanceof Error) {
    return Object.assign({
      message: `${info.message}\n${info.stack}`,
    }, info);
  }
  return info;
});

const logger = winston.createLogger({
  format: format.combine(
    enumerateErrorFormat(),
    format.json(),
    format.align(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
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
    new (winston.transports.DailyRotateFile)({
      level: process.env.LOG_LEVEL_FILE,
      dirname: `${appRoot}/logs/`,
      filename: 'ipfs-platform-backend-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      format: format.combine(
        printFormat,
      ),
      maxsize: '20m',
      maxFiles: 30,
      tailable: true,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
