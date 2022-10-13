import logger from "../logger";
import LoggerService from "../services/loggerService";

const loggerService = new LoggerService();

const sleep = () => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), 200));
};

class LogsController {
  getLogs = async (req, res) => {
    try {
      //logger.info("Info");
      // logger.info("d");
      // for (let i = 0; i < 300; i++) {
      //   if (i % 2 === 0) {
      //     logger.info(`${i} Info`);
      //   } else {
      //     logger.error(`${i} Error`);
      //   }
      // }
      const { limit, from, order, start } = req.query;
      console.log("req", limit, from, order, start);
      const logs = await loggerService.getLogs(limit, from, order, start);
      res.send(logs);
    } catch (e) {
      logger.error(e);
      res.status(500).send("Error Getting Logs");
    }
  };
}

export default LogsController;
