import DiscordService from "../services/discordService";
import puppeteer from "puppeteer-extra";
import { createPuppeteerOptions } from "../utils/puppeteer-utils";
import logger from "../logger";

export default class DiscordController {
  constructor() {
    this.discordService = new DiscordService();
    this.puppeteerOptions = createPuppeteerOptions();
  }
  stopCronJob = async (_, res) => {
    console.log("stop cron request");
    try {
      await this.discordService.stopCronJob();
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Stopping Cron Job");
    }
  };
  startCronJob = async (_, res) => {
    try {
      await this.discordService.startCronJob();
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Starting Cron Job");
    }
  };
  setRandomDiscordStatus = async (_, res) => {
    const browser = await puppeteer.launch(this.puppeteerOptions);
    try {
      await this.discordService.setRandomDiscordStatus(browser);
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Setting Discord Status");
    } finally {
      await browser.close();
    }
  };
  setMessageAsDiscordStatus = async (req, res) => {
    const browser = await puppeteer.launch(this.puppeteerOptions);
    try {
      const id = req.body.id;
      await this.discordService.setMessageAsDiscordStatus(browser, id);
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Setting Message As Discord Status");
    } finally {
      await browser.close();
    }
  };
  logIntoDiscord = async (_, res) => {
    const browser = await puppeteer.launch(this.puppeteerOptions);
    try {
      await this.discordService.logIntoDiscord(browser);
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Logging Into Discord");
    } finally {
      await browser.close();
    }
  };
  removeLoginData = async (_, res) => {
    try {
      await this.discordService.removeLoginData();
      res.send();
    } catch (e) {
      logger.error(e);
      res.status(500).send("Server Error Removing Login Data");
    }
  };
}
