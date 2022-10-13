import prodLogger from "./prod-logger";
import devLogger from "./dev-logger";

console.log("node env", process.env.NODE_ENV);

const logger = process.env.NODE_ENV === "@development" ? devLogger : prodLogger;

export default logger;
