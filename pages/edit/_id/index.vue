<template>
  <MessageForm :initialText="message.text" @submit="editMessage" />
</template>

<script>
export default {
  name: 'EditPage',
  middleware: 'auth',
  async asyncData({ $messageListAPI, route }) {
    const id = route.params.id;
    const message = await $messageListAPI.getMessage(id);
    return {
      message,
    };
  },
  methods: {
    async editMessage(newText) {
      try {
        const id = this.$route.params.id;
        await this.$messageListAPI.editMessage(id, newText);
        this.$router.push('/');
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Editted Status',
        );
      } catch (e) {
        console.log('Error editting status', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error editting status',
        );
      }
    },
  },
};
</script>
