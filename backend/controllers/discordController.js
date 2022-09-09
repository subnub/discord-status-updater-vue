import DiscordService from "../services/discordService";

export default class DiscordController {
  constructor() {
    this.discordService = new DiscordService();
  }
  stopCronJob = async (_, res) => {
    console.log("stop cron request");
    try {
      await this.discordService.stopCronJob();
      res.send();
    } catch (e) {
      console.log("Error Stopping Cron Job", e);
      res.status(500).send("Server Error Stopping Cron Job");
    }
  };
  startCronJob = async (_, res) => {
    try {
      await this.discordService.startCronJob();
      res.send();
    } catch (e) {
      console.log("Error Starting Cron Job", e);
      res.status(500).send("Server Error Starting Cron Job");
    }
  };
  setDiscordStatus = async (_, res) => {
    try {
      await this.discordService.setDiscordStatus();
      res.send();
    } catch (e) {
      console.log("Error Setting Discord Status", e);
      res.status(500).send("Server Error Setting Discord Status");
    }
  };
}
