import express from "express";
import messageListRouter from "./routers/messageListRouter";
import authRouter from "./routers/authRouter";
import discordRouter from "./routers/discordRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import schedule from "node-schedule";
// import passwordPrompt from "password-prompt";

console.log("ENV VAR", process.env.cookiePassword);

const app = new express();

app.use(cookieParser(process.env.cookiePassword));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(messageListRouter, authRouter, discordRouter);

// const task = cron.schedule("01,30,40,59 * * * * *", () => {
//   console.log("ran ran ranff2");
// });

// cron.schedule("01 * * * * *", () => {
//   console.log("ran ran ran");
// });

// let password = passwordPrompt("password: ");
// console.log("password", password);

process.on("SIGINT", function () {
  console.log("\nEXIT COMMAND, SHUTTING DOWN CRON JOBS");
  schedule.gracefulShutdown().then(() => {
    console.log("CRON JOBS SHUTDOWN");
    process.exit(0);
  });
});

export default app;
