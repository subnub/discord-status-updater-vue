import fs from "fs";

export const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    });
  });
};

export const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

export const messageJSONToArray = (messageJSON) => {
  const objectKeys = Object.keys(messageJSON);

  const messageList = [];

  objectKeys.forEach((key) => {
    messageList.push(messageJSON[key]);
  });

  return messageList;
};

export const deleteDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.rm(path, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};
