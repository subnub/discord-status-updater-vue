<template>
  <div class="w-full flex flex-col items-center">
    <MessageSearch />
    <MessageItem
      v-for="messageItem in messageList"
      :key="messageItem.id"
      :messageItem="messageItem"
    />
  </div>
</template>

<script>
export default {
  props: {
    messageList: {
      type: Array,
      required: true,
    },
  },
};
</script>
