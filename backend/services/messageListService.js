import { readFile, writeFile, messageJSONToArray } from "../utils/fileUtils";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(__dirname, "../../db.json");

export default class MessageListService {
  async getMessageList() {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    return messageJSONToArray(messageJSON);
  }
  async getMessage(id) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    return messageJSON[id];
  }
  async editMessage(id, newText) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    messageJSON[id].text = newText;
    await writeFile(filePath, JSON.stringify(messageJSON));
    return messageJSON[id];
  }
  async createMessage(text) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    const id = uuidv4();
    messageJSON[id] = {
      id,
      text,
    };
    await writeFile(filePath, JSON.stringify(messageJSON));
    return messageJSON[id];
  }
  async removeMessage(id) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    delete messageJSON[id];
    await writeFile(filePath, JSON.stringify(messageJSON));
  }
}
