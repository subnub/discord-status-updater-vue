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
    console.log("id", id, message);
    return {
      message,
    };
  },
  methods: {
    async editMessage(newText) {
      console.log("edit message", newText);
      const id = this.$route.params.id;
      await this.$messageListAPI.editMessage(id, newText);
    },
  },
};
</script>
