<template>
  <MessageForm :initialText="message.text" @submit="editMessage" />
</template>

<script>
export default {
  name: "EditPage",
  middleware: "auth",
  async asyncData({ $messageListAPI, route }) {
    const id = route.params.id;
    const message = await $messageListAPI.getMessage(id);
    return {
      message,
    };
  },
  methods: {
    async editMessage(newText) {
      const id = this.$route.params.id;
      await this.$messageListAPI.editMessage(id, newText);
    },
  },
};
</script>
