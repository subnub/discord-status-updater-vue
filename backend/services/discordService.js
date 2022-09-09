import schedule from "node-schedule";
import MessageListService from "./messageListService";
import puppeteer from "puppeteer-extra";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import wait from "../utils/wait";

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.CAPTCHA_API_TOKEN,
      method: "hcaptcha",
    },
    visualFeedback: true,
  })
);

const messageListService = new MessageListService();

export const cronID = "discord-cron-process";
const cronTime = process.env.CRON_TIME;

export default class DiscordService {
  constructor() {
    schedule.cancelJob(cronID);
    this.job = schedule.scheduleJob(cronID, cronTime, this.setDiscordStatus);
  }
  stopCronJob = async () => {
    await schedule.gracefulShutdown();
  };
  startCronJob = async () => {
    await schedule.gracefulShutdown();
    this.job = schedule.scheduleJob(cronID, cronTime, this.setDiscordStatus);
  };
  setDiscordStatus = async () => {
    const password = process.env.DISCORD_PASSWORD;
    if (!password) {
      console.log("No Discord Password Set, Skipping Cron Job");
      return;
    }
    try {
      const randomListPick = await messageListService.getRandomMessageText();

      if (!randomListPick) {
        console.log("No Messages Stored, Skipping Cron Job");
        return;
      }

      puppeteer.use(pluginStealth());
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();

      await page.goto("https://discord.com/login", {
        waitUntil: "networkidle2",
      });

      await page.type('input[type="text"]', process.env.email);
      await page.type('input[type="Password"]', password);
      await page.click('button[type="submit"]');

      await wait();

      if (process.env.CAPTCHA_API_TOKEN) {
        await page.solveRecaptchas();
      }

      await wait();
      await page.click(".nameTag-sc-gpq");

      await page.waitForSelector("#account-edit-custom-status");
      await page.click("#account-edit-custom-status");

      await page.waitForSelector(".clearIcon-oT7WrW");
      await page.click(".clearIcon-oT7WrW");

      await wait(2000);

      for (let i = 0; i < 300; i++) {
        await page.keyboard.press("Backspace");
      }

      await page.type(
        'input[placeholder="Support has arrived!"]',
        randomListPick
      );

      await wait(2000);

      await page.click(".lookFilled-yCfaCM");

      await browser.close();
    } catch (e) {
      console.log("Error", e);
    }
  };
}
