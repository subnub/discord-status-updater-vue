import { Router } from "express";
import auth from "../middleware/auth";
import LogsController from "../controllers/logsController";

const logsController = new LogsController();

const router = Router();

router.get("/logs/get-logs", auth, logsController.getLogs);

export default router;
