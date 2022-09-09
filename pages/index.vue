<template>
  <div>
    <MessageList :messageList="messageList" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "IndexPage",
  middleware: "auth",
  computed: {
    ...mapState({
      messageList: (state) => state.messages.messageList,
    }),
  },
  async asyncData({ $messageListAPI, store }) {
    try {
      console.log("get message list");
      const messageList = await $messageListAPI.getMessageList();
      store.dispatch("messages/setMessageList", messageList);
      console.log(messageList);
    } catch (e) {
      console.log("error getting message list", e);
    }
  },
};
</script>
