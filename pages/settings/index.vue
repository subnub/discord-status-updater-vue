<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-col items-center mt-3">
      <button @click="logIntoDiscord" class="w-full">Log Into Discord</button>
      <button @click="setDiscordStatus" class="w-full mt-3">
        Set Random Discord Status
      </button>
      <button @click="logout" class="w-full mt-3">Logout Of Web App</button>
      <button @click="removeLoginData" class="w-full mt-3">
        Delete Discord Login Data
      </button>
      <button @click="startCronJob" class="w-full mt-3">Start Cron Job</button>
      <button @click="stopCronJob" class="w-full mt-3">Stop Cron Job</button>
      <div
        v-show="loading"
        class="flex flex-col justify-center items-center mt-3"
      >
        <div class="loader"></div>
        <p class="mt-2">{{ loadingMessage }}</p>
      </div>
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
        this.error = null;
        this.loading = "logout";
        await this.$authAPI.logout();
        this.$router.push("/login");
      } catch (e) {
        console.log("Error logging out", e);
        this.error = "logout";
      } finally {
        this.loading = null;
      }
    },
    async logIntoDiscord() {
      try {
        this.error = null;
        this.loading = "logging-into-discord";
        await this.$discordAPI.logIntoDiscord();
      } catch (e) {
        console.log("Error logging into discord", e);
        this.error = "logging-into-discord";
      } finally {
        this.loading = null;
      }
    },
    async removeLoginData() {
      try {
        this.error = null;
        this.loading = "remove-login-data";
        await this.$discordAPI.removeLoginData();
      } catch (e) {
        console.log("Error removing login data", e);
        this.error = "remove-login-data";
      } finally {
        this.loading = null;
      }
    },
    async setDiscordStatus() {
      try {
        this.error = null;
        this.loading = "set-random-discord-status";
        await this.$discordAPI.setDiscordStatus();
      } catch (e) {
        console.log("Error setting Discord status", e);
        this.error = "set-random-discord-status";
      } finally {
        this.loading = null;
      }
    },
    async startCronJob() {
      try {
        this.error = null;
        this.loading = "start-cron";
        await this.$discordAPI.startCronJob();
      } catch (e) {
        console.log("Error starting cron job", e);
        this.error = "start-cron";
      } finally {
        this.loading = null;
      }
    },
    async stopCronJob() {
      try {
        this.error = null;
        this.loading = "stop-cron";
        await this.$discordAPI.stopCronJob();
      } catch (e) {
        console.log("Error stopping cron job", e);
        this.error = "stop-cron";
      } finally {
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
        case "set-random-discord-status": {
          return "Setting Discord status...";
        }
        case "logging-into-discord": {
          return "Logging Into Discord...";
        }
        case "remove-login-data": {
          return "Removing Login Data...";
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
        case "set-random-discord-status": {
          return "Error Setting Discord Status";
        }
        case "logging-into-discord": {
          return "Error Logging Into Discord";
        }
        case "remove-login-data": {
          return "Error Removing Login Data";
        }
        default: {
          return "Error";
        }
      }
    },
  },
};
</script>
