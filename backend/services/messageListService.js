import { readFile, writeFile, messageJSONToArray } from "../utils/fileUtils";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "../utils/errors";

const filePath = path.join(__dirname, "../../db.json");

export default class MessageListService {
  async getMessageList() {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    return messageJSONToArray(messageJSON).reverse();
  }
  async searchMessageList(searchText) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    return messageJSONToArray(messageJSON)
      .reverse()
      .filter((message) =>
        message.text.toLowerCase().includes(searchText.toLowerCase())
      );
  }
  async getMessage(id) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    const message = messageJSON[id];
    if (!message) {
      throw new NotFoundError("Message Not Found");
    }
    return message;
  }
  async editMessage(id, newText) {
    const rawMessageList = await readFile(filePath);
    const messageJSON = JSON.parse(rawMessageList);
    if (!messageJSON[id]) {
      throw new NotFoundError("Message Not Found");
    }
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
    if (!messageJSON[id]) {
      throw new NotFoundError("Message Not Found");
    }
    delete messageJSON[id];
    await writeFile(filePath, JSON.stringify(messageJSON));
  }
  async getRandomMessageText() {
    const messageList = await this.getMessageList();
    return messageList[Math.floor(Math.random() * messageList.length)]?.text;
  }
}
