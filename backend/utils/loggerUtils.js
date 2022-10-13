import logger from "../logger";

export const queryLogger = (options) => {
  return new Promise((resolve, reject) => {
    logger.query(options, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
