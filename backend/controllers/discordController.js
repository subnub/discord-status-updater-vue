import DiscordService from "../services/discordService";

// const discordService = new DiscordService();

export default class DiscordController {
  constructor() {
    this.discordService = new DiscordService();
  }
  stopCronJob = (_, res) => {
    console.log("stop cron request");
    try {
      this.discordService.stopCronJob();
      res.send();
    } catch (e) {
      console.log("Error Stopping Cron Job", e);
      res.status(500).send("Server Error Stopping Cron Job");
    }
  };
  startCronJob = (_, res) => {
    try {
      this.discordService.startCronJob();
      res.send();
    } catch (e) {
      console.log("Error Starting Cron Job", e);
      res.status(500).send("Server Error Starting Cron Job");
    }
  };
}
