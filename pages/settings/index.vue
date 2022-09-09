<template>
  <div class="flex flex-col w-full items-center mt-3">
    <button @click="setDiscordStatus">Set Random Discord Status</button>
    <button @click="logout" class="mt-3">Logout</button>
    <button @click="startCronJob" class="mt-3">Start Cron Job</button>
    <button @click="stopCronJob" class="mt-3">Stop Cron Job</button>
    <div
      v-show="loading"
      class="flex flex-col justify-center items-center mt-3"
    >
      <div class="loader"></div>
      <p class="mt-2">{{ loadingMessage }}</p>
    </div>
    <div v-show="error" class="mt-3">
      <p class="text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      loading: null,
      error: null,
    };
  },
  methods: {
    async logout() {
      try {
        this.loading = "logout";
        await this.$authAPI.logout();
        this.loading = null;
        this.error = null;
        this.$router.push("/login");
      } catch (e) {
        console.log("Error logging out", e);
        this.error = "logout";
        this.loading = null;
      }
    },
    async setDiscordStatus() {
      try {
        this.loading = "set-discord-status";
        await this.$discordAPI.setDiscordStatus();
        this.loading = null;
        this.error = null;
      } catch (e) {
        console.log("Error setting Discord status", e);
        this.error = "set-discord-status";
        this.loading = null;
      }
    },
    async startCronJob() {
      try {
        this.loading = "start-cron";
        await this.$discordAPI.startCronJob();
        this.loading = null;
        this.error = null;
      } catch (e) {
        console.log("Error starting cron job", e);
        this.error = "start-cron";
        this.loading = null;
      }
    },
    async stopCronJob() {
      try {
        this.loading = "stop-cron";
        await this.$discordAPI.stopCronJob();
        this.loading = null;
        this.error = null;
      } catch (e) {
        console.log("Error stopping cron job", e);
        this.error = "stop-cron";
        this.loading = null;
      }
    },
  },
  computed: {
    loadingMessage() {
      if (!this.loading) return "";

      switch (this.loading) {
        case "logout": {
          return "Logging out...";
        }
        case "start-cron": {
          return "Starting cron job...";
        }
        case "stop-cron": {
          return "Stopping cron job...";
        }
        case "set-discord-status": {
          return "Setting Discord status...";
        }
        default: {
          return "Loading...";
        }
      }
    },
    errorMessage() {
      if (!this.error) return "";

      switch (this.error) {
        case "logout": {
          return "Error Logging Out";
        }
        case "start-cron": {
          return "Error Starting Cron Job";
        }
        case "stop-cron": {
          return "Error Stopping Cron Job";
        }
        case "set-discord-status": {
          return "Error Setting Discord Status";
        }
        default: {
          return "Error";
        }
      }
    },
  },
};
</script>
