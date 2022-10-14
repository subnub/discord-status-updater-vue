import logger from "../logger";
import LoggerService from "../services/loggerService";

const loggerService = new LoggerService();

class LogsController {
  getLogs = async (req, res) => {
    try {
      const { limit, from, order, start } = req.query;
      const logs = await loggerService.getLogs(limit, from, order, start);
      res.send(logs);
    } catch (e) {
      logger.error(e);
      res.status(500).send("Error Getting Logs");
    }
  };
}

export default LogsController;
