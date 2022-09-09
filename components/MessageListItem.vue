<template>
  <div class="shadow-m p-5 w-11/12 m-3 border-2">
    <p>{{ messageItem.text }}</p>
    <div class="flex justify-end">
      <button class="mr-3" @click="$router.push(`edit/${messageItem.id}`)">
        Edit
      </button>
      <button @click="removeMessage">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageListItem",
  props: {
    messageItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeMessage() {
      await this.$messageListAPI.removeMessage(this.messageItem.id);
      this.$store.dispatch("messages/removeMessage", this.messageItem.id);
      console.log("message removed");
    },
  },
};
</script>
