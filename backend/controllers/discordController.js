import DiscordService from "../services/discordService";
import puppeteer from "puppeteer-extra";
import { createPuppeteerOptions } from "../utils/puppeteer-utils";

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
  setRandomDiscordStatus = async (_, res) => {
    const browser = await puppeteer.launch(this.puppeteerOptions);
    try {
      await this.discordService.setRandomDiscordStatus(browser);
      res.send();
    } catch (e) {
      console.log("Error Setting Discord Status", e);
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
      console.log("Error Setting Message As Discord Status", e);
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
      console.log("Error Logging Into Discord", e);
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
      console.log("Error Removing Login Data", e);
      res.status(500).send("Server Error Removing Login Data");
    }
  };
}
