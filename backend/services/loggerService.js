import logger from "../logger";
import { queryLogger } from "../utils/loggerUtils";

class LoggerService {
  getLogs = async (
    limit = 30,
    from = new Date() - 24 * 60 * 60 * 1000 * 30 * 12,
    order = "desc",
    start = 0
  ) => {
    const queries = await queryLogger({
      from,
      until: new Date(),
      limit,
      start,
      order,
      fields: ["message", "level", "timestamp", "stack"],
    });
    return queries?.file || [];
  };
}

export default LoggerService;
