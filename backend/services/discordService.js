import schedule from "node-schedule";

export const cronID = "discord-cron-process";
const cronTime = process.env.CRON_TIME;

export default class DiscordService {
  constructor() {
    // task = cron.schedule("01,30,40,59 * * * * *", () => {
    //   console.log("ran ran ran");
    // });
    //tasks.push(task);
    //console.log("tafssks", tasks);
    schedule.cancelJob(cronID);
    this.job = schedule.scheduleJob(cronID, cronTime, this.cronTask);
    //console.log("constructor calffsfdf");
  }
  stopCronJob = async () => {
    // task.stop();
    console.log("Stopping all cron jobs");
    await schedule.gracefulShutdown();
    console.log("All cron jobs stopped");
  };
  startCronJob = async () => {
    // task.stop();
    // task.start();
    await schedule.gracefulShutdown();
    this.job = schedule.scheduleJob(cronID, cronTime, this.cronTask);
  };
  cronTask = () => {
    console.log("cron executed");
  };
}
