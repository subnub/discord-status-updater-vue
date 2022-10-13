import express from "express";
import messageListRouter from "./routers/messageListRouter";
import authRouter from "./routers/authRouter";
import discordRouter from "./routers/discordRouter";
import logsRouter from "./routers/logsRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import schedule from "node-schedule";

const app = new express();

app.use(cookieParser(process.env.cookiePassword));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(messageListRouter, authRouter, discordRouter, logsRouter);

process.on("SIGINT", function () {
  console.log("\nEXIT COMMAND, SHUTTING DOWN CRON JOBS");
  schedule.gracefulShutdown().then(() => {
    console.log("CRON JOBS SHUTDOWN");
    process.exit(0);
  });
});

export default app;
