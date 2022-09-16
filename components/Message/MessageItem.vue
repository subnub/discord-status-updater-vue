<template>
  <div class="shadow-m p-5 w-11/12 m-3 border-2">
    <p>{{ messageItem.text }}</p>
    <div class="flex justify-end mt-5 items-center">
      <div class="loader-small mr-3" v-show="loading"></div>

      <button class="mr-3" @click="setMessageAsStatus" :disabled="loading">
        Set as status
      </button>
      <button class="mr-3" @click="$router.push(`edit/${messageItem.id}`)">
        Edit
      </button>
      <button @click="removeMessage">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageListItem',
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
