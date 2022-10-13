import winston, { format } from "winston";

const { combine, timestamp, errors, colorize, printf } = format;

const myFormat = printf(({ level, message, stack, timestamp }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), errors({ stack: true }), myFormat),
  transports: [new winston.transports.Console()],
});

export default logger;
