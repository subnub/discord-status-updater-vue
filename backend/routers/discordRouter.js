import { Router } from "express";
import DiscordController from "../controllers/discordController";
import auth from "../middleware/auth";

const discordController = new DiscordController();
const router = Router();

router.post("/discord/stop-cron", discordController.stopCronJob);

router.post("/discord/start-cron", discordController.startCronJob);

export default router;
