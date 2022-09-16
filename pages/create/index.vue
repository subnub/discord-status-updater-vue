<template>
  <div>
    <MessageForm @submit="createMessage" />
  </div>
</template>

<script>
export default {
  name: 'CreatePage',
  middleware: 'auth',
  methods: {
    async createMessage(text) {
      try {
        await this.$messageListAPI.addMessage(text);
        this.$router.push('/');
        this.$store.dispatch(
          'notifications/addSuccessNotification',
          'Created Status',
        );
      } catch (e) {
        console.log('Error creating new status', e);
        this.$store.dispatch(
          'notifications/addErrorNotification',
          'Error creating status',
        );
      }
    },
  },
};
</script>
