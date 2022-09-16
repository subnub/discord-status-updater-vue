<template>
  <div>
    <MessageList :messageList="messageList" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  middleware: 'auth',
  computed: {
    ...mapState({
      messageList: (state) => state.messages.messageList,
    }),
  },
  async asyncData({ store }) {
    await store.dispatch('messages/setMessageList');
  },
};
</script>
