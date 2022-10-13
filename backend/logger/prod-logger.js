import winston, { format } from "winston";

const { combine, timestamp, errors } = format;

const timestampFormatter = () => {
  return new Date();
};

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: timestampFormatter }),
    errors({ stack: true }),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "prod.log" })],
});

export default logger;
