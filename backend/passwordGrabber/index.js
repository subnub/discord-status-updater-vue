import passwordPrompt from "password-prompt";

export default async (_req, _res, next) => {
  console.log("test password grabber");
  if (!process.env.DISCORD_PASSWORD) {
    const password = await passwordPrompt("Enter Discord Password: ", {
      method: "hide",
    });
    process.env.DISCORD_PASSWORD = password;
  }
  next();
};
