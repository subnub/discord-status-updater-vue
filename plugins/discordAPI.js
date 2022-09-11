export default ({ $axios }, inject) => {
  const setDiscordStatus = async () => {
    await $axios.post("/discord/set-random-discord-status");
  };

  const setMessageAsDiscordStatus = async (id) => {
    await $axios.post("/discord/set-message-discord-status", { id });
  };

  const startCronJob = async () => {
    await $axios.post("/discord/start-cron");
  };

  const stopCronJob = async () => {
    await $axios.post("/discord/stop-cron");
  };

  const logIntoDiscord = async () => {
    await $axios.post("/discord/login");
  };

  const removeLoginData = async () => {
    await $axios.post("/discord/remove-login-data");
  };

  inject("discordAPI", {
    setDiscordStatus,
    startCronJob,
    stopCronJob,
    setMessageAsDiscordStatus,
    logIntoDiscord,
    removeLoginData,
  });
};
