<template>
  <div>
    <MessageForm @submit="createMessage" />
  </div>
</template>

<script>
export default {
  name: "CreatePage",
  middleware: "auth",
  methods: {
    async createMessage(text) {
      await this.$messageListAPI.addMessage(text);
      this.$router.push("/");
    },
  },
};
</script>
