<template>
  <div class="shadow-m p-5 w-11/12 m-3 border-2">
    <p>{{ messageItem.text }}</p>
    <div class="flex justify-end mt-5 items-center">
      <div class="loader-small mr-3" v-show="loading"></div>

      <button class="mr-3" @click="setMessageAsStatus" :disabled="loading">
        Set as status
      </button>
      <svg
        @click="$router.push(`edit/${messageItem.id}`)"
        class="delete-icon mx-2"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35C16.92,9.14 16.92,8.79 16.7,8.58L15.42,7.3C15.21,7.08 14.86,7.08 14.65,7.3L13.65,8.3L15.7,10.35L16.7,9.35M7,14.94V17H9.06L15.12,10.94L13.06,8.88L7,14.94Z"
        />
      </svg>
      <svg @click="removeMessage" class="edit-icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: {
    messageItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeMessage() {
      await this.$store.dispatch('messages/removeMessage', this.messageItem.id);
    },
    async setMessageAsStatus() {
      if (this.loading) return;
      try {
        this.loading = true;
        await this.$discordAPI.setMessageAsDiscordStatus(this.messageItem.id);
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Set Discord Status',
        );
      } catch (e) {
        console.log('Error Setting Message As Discord Status', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error setting Discord Status',
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
