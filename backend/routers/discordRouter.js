import { Router } from "express";
import DiscordController from "../controllers/discordController";
import auth from "../middleware/auth";

const discordController = new DiscordController();
const router = Router();

router.post("/discord/stop-cron", auth, discordController.stopCronJob);

router.post("/discord/start-cron", auth, discordController.startCronJob);

router.post(
  "/discord/set-random-discord-status",
  auth,
  discordController.setRandomDiscordStatus
);

router.post(
  "/discord/set-message-discord-status",
  auth,
  discordController.setMessageAsDiscordStatus
);

router.post("/discord/login", auth, discordController.logIntoDiscord);

router.post(
  "/discord/remove-login-data",
  auth,
  discordController.removeLoginData
);
export default router;
