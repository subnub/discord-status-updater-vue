import schedule from "node-schedule";
import MessageListService from "./messageListService";
import puppeteer from "puppeteer-extra";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import wait from "../utils/wait";
import path from "path";
import { deleteDirectory } from "../utils/fileUtils";
import { createPuppeteerOptions } from "../utils/puppeteer-utils";
import logger from "../logger";

const chromeDataPath = path.join(__dirname, "../../chrome_data");

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
    this.job = schedule.scheduleJob(
      cronID,
      cronTime,
      this.setRandomDiscordStatusCronJob
    );
  }
  stopCronJob = async () => {
    schedule.cancelJob(cronID);
    await schedule.gracefulShutdown();
  };
  startCronJob = async () => {
    schedule.cancelJob(cronID);
    await schedule.gracefulShutdown();
    this.job = schedule.scheduleJob(
      cronID,
      cronTime,
      this.setRandomDiscordStatusCronJob
    );
  };
  setMessageAsDiscordStatus = async (browser, id) => {
    const message = await messageListService.getMessage(id);
    await this.setDiscordStatus(browser, message.text);
  };
  setRandomDiscordStatusCronJob = async () => {
    const puppeteerOptions = createPuppeteerOptions();
    const browser = await puppeteer.launch(puppeteerOptions);
    try {
      await this.setRandomDiscordStatus(browser);
    } catch (e) {
      console.log("Error Setting Random Custom Discord Status Cron Job", e);
    } finally {
      await browser.close();
    }
  };
  setRandomDiscordStatus = async (browser) => {
    const messageText = await messageListService.getRandomMessageText();
    if (!messageText) {
      throw new Error("No Messages Stored");
    }
    await this.setDiscordStatus(browser, messageText);
  };
  setDiscordStatus = async (browser, messageText) => {
    const page = await browser.newPage();

    await page.goto("https://discord.com/channels/@me", {
      waitUntil: "networkidle2",
    });

    if (page.url() !== "https://discord.com/channels/@me") {
      logger.warn("Not logged into discord when trying to set status");
      await this.removeLoginData();
      await this.logIntoDiscord(browser, page);
    } else {
      logger.info("Set discord status without reauthentication");
    }

    await wait(2000);
    await page.click(".nameTag-sc-gpq");

    await wait(1000);

    const editCustomStatusElementExist = await page.$(
      "#account-edit-custom-status"
    );

    const customStatusSelector = editCustomStatusElementExist
      ? "#account-edit-custom-status"
      : "#account-set-custom-status";

    await page.waitForSelector(customStatusSelector);
    await page.click(customStatusSelector);

    const clearIconExists = await page.$(".clearIcon-oT7WrW");
    if (clearIconExists) {
      await page.waitForSelector(".clearIcon-oT7WrW");
      await page.click(".clearIcon-oT7WrW");
    }

    await wait(1500);

    const input = await page.$('input[placeholder="Support has arrived!"]');

    await input.click({ clickCount: 3 });

    await page.keyboard.press("Backspace");

    await page.type('input[placeholder="Support has arrived!"]', messageText);

    await page.click(
      "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F"
    );
  };
  logIntoDiscord = async (browser, initPage) => {
    const email = process.env.email;
    const password = process.env.DISCORD_PASSWORD;
    if (!password || !email) {
      throw new Error("No Discord Email/Password Set, Cannot Log In");
    }
    const page = initPage || (await browser.newPage());

    await page.goto("https://discord.com/login", {
      waitUntil: "networkidle2",
    });

    if (page.url() === "https://discord.com/channels/@me") {
      logger.info("Already logged into discord");
      return;
    }

    await page.type('input[type="text"]', process.env.email);
    await page.type('input[type="Password"]', password);
    await page.click('button[type="submit"]');

    await wait();

    if (process.env.CAPTCHA_API_TOKEN) {
      await page.solveRecaptchas();
    }

    await wait();

    const loggedIn = page.url() === "https://discord.com/channels/@me";

    if (!loggedIn) {
      throw new Error("Not Logged In, Client Not Sent To The Me Page");
    }
  };
  removeLoginData = async () => {
    await deleteDirectory(chromeDataPath);
  };
}
