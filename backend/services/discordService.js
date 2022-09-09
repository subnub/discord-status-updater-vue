import schedule from "node-schedule";
import MessageListService from "./messageListService";

const messageListService = new MessageListService();

export const cronID = "discord-cron-process";
const cronTime = process.env.CRON_TIME;

export default class DiscordService {
  constructor() {
    schedule.cancelJob(cronID);
    this.job = schedule.scheduleJob(cronID, cronTime, this.cronTask);
  }
  stopCronJob = async () => {
    await schedule.gracefulShutdown();
  };
  startCronJob = async () => {
    await schedule.gracefulShutdown();
    this.job = schedule.scheduleJob(cronID, cronTime, this.cronTask);
  };
  cronTask = async () => {
    console.log("cron executed");
    const randomMessage = await messageListService.getRandomMessageText();
    console.log("random message", randomMessage);
  };
}
