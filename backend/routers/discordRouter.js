import { Router } from "express";
import DiscordController from "../controllers/discordController";
import auth from "../middleware/auth";

const discordController = new DiscordController();
const router = Router();

router.post("/discord/stop-cron", auth, discordController.stopCronJob);

router.post("/discord/start-cron", auth, discordController.startCronJob);

router.post(
  "/discord/set-discord-status",
  auth,
  discordController.setDiscordStatus
);

export default router;
