import MessageListService from "../services/messageListService";

const messageListService = new MessageListService();

export default class MessageListController {
  async getMessageList(_, res) {
    try {
      const messageList = await messageListService.getMessageList();
      res.send(messageList);
    } catch (e) {
      console.log("Error Getting Message List", e);
      res.status(500).send("Server Error Getting Message List");
    }
  }
  async searchMessageList(req, res) {
    try {
      const searchText = req.params.searchText;
      const messageList = await messageListService.searchMessageList(
        searchText
      );
      res.send(messageList);
    } catch (e) {
      console.log("Error Searching Message List", e);
      res.status(500).send("Server Error Searching Message List");
    }
  }
  async getMessage(req, res) {
    try {
      const message = await messageListService.getMessage(req.params.id);
      res.send(message);
    } catch (e) {
      console.log("Error Getting Message", e);
      res.status(500).send("Server Error Getting Message");
    }
  }
  async editMessage(req, res) {
    try {
      const id = req.body.id;
      const newText = req.body.newText;

      const edittedMessage = await messageListService.editMessage(id, newText);

      res.send(edittedMessage);
    } catch (e) {
      console.log("Error Editing Message", e);
      res.status(500).send("Server Error Editting Message");
    }
  }
  async createMessage(req, res) {
    try {
      const text = req.body.text;

      const createdMessage = await messageListService.createMessage(text);

      res.send(createdMessage);
    } catch (e) {
      console.log("Error Creating Message", e);
      res.status(500).send("Server Error Creating Message");
    }
  }
  async removeMessage(req, res) {
    try {
      const id = req.params.id;

      await messageListService.removeMessage(id);

      res.send();
    } catch (e) {
      console.log("Error Deleting Message", e);
      res.status(500).send("Server Error Deleting Message");
    }
  }
}
