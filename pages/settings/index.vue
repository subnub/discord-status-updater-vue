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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null,
    };
  },
  methods: {
    async logout() {
      try {
        this.loading = 'logout';
        await this.$authAPI.logout();
        this.$router.push('/login');
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Logged out of web app',
        );
      } catch (e) {
        console.log('Error logging out', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error logging out of web app',
        );
      } finally {
        this.loading = null;
      }
    },
    async logIntoDiscord() {
      try {
        this.loading = 'logging-into-discord';
        await this.$discordAPI.logIntoDiscord();
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Logged into Discord',
        );
      } catch (e) {
        console.log('Error logging into discord', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error logging into Discord',
        );
      } finally {
        this.loading = null;
      }
    },
    async removeLoginData() {
      try {
        this.loading = 'remove-login-data';
        await this.$discordAPI.removeLoginData();
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Removed Discord login data',
        );
      } catch (e) {
        console.log('Error removing login data', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error removing Discord login data',
        );
      } finally {
        this.loading = null;
      }
    },
    async setDiscordStatus() {
      try {
        this.loading = 'set-random-discord-status';
        await this.$discordAPI.setDiscordStatus();
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Set random Discord status',
        );
      } catch (e) {
        console.log('Error setting Discord status', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error setting random Discord status',
        );
      } finally {
        this.loading = null;
      }
    },
    async startCronJob() {
      try {
        this.loading = 'start-cron';
        await this.$discordAPI.startCronJob();
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Started cron job',
        );
      } catch (e) {
        console.log('Error starting cron job', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error starting cron job',
        );
      } finally {
        this.loading = null;
      }
    },
    async stopCronJob() {
      try {
        this.loading = 'stop-cron';
        await this.$discordAPI.stopCronJob();
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Stopped cron job',
        );
      } catch (e) {
        console.log('Error stopping cron job', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error stopping cron job',
        );
      } finally {
        this.loading = null;
      }
    },
  },
  computed: {
    loadingMessage() {
      if (!this.loading) return '';

      switch (this.loading) {
        case 'logout': {
          return 'Logging out...';
        }
        case 'start-cron': {
          return 'Starting cron job...';
        }
        case 'stop-cron': {
          return 'Stopping cron job...';
        }
        case 'set-random-discord-status': {
          return 'Setting Discord status...';
        }
        case 'logging-into-discord': {
          return 'Logging Into Discord...';
        }
        case 'remove-login-data': {
          return 'Removing Login Data...';
        }
        default: {
          return 'Loading...';
        }
      }
    },
  },
};
</script>
