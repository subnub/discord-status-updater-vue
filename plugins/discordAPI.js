export default ({ $axios }, inject) => {
  const setDiscordStatus = async () => {
    await $axios.post("/discord/set-discord-status");
  };

  const startCronJob = async () => {
    await $axios.post("/discord/start-cron");
  };

  const stopCronJob = async () => {
    await $axios.post("/discord/stop-cron");
  };

  inject("discordAPI", {
    setDiscordStatus,
    startCronJob,
    stopCronJob,
  });
};
