<template>
  <div class="w-full flex flex-col items-center">
    <MessageItem
      v-for="messageItem in messageList"
      :key="messageItem.id"
      :messageItem="messageItem"
    />
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messageList: {
      type: Array,
      required: true,
    },
  },
};
</script>
