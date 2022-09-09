import { Router } from "express";
import MessageListController from "../controllers/messageListController";
import auth from "../middleware/auth";

const messageListController = new MessageListController();

const router = Router();

router.get("/get-message-list", auth, messageListController.getMessageList);

router.get("/get-message/:id", auth, messageListController.getMessage);

router.patch("/edit-message", auth, messageListController.editMessage);

router.post("/create-message", auth, messageListController.createMessage);

router.delete("/remove-message/:id", auth, messageListController.removeMessage);

export default router;
