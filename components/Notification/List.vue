<template>
  <div
    class="fixed bottom-3 right-3 w-full items-center justify-center flex flex-col md:block md:w-auto"
  >
    <NotificationItem
      v-for="notification in notificationList"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      notificationList: (state) => state.notifications.notificationList,
    }),
  },
};
</script>

<style></style>
