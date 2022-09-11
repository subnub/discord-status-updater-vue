export const createPuppeteerOptions = () => {
  const options = {
    userDataDir: "./chrome_data",
  };

  if (process.env.HEADLESS === "false") {
    options.headless = false;
  } else {
    options.headless = true;
  }

  if (process.env.NO_SANDBOX === "true") {
    options.args = ["--no-sandbox"];
  }

  return options;
};
