<template>
  <div
    class="flex border-2 bg-white shadow-xl rounded-lg p-3 mt-3 max-w-xs items-center"
  >
    <div>
      <svg
        v-if="notification.type === 'success'"
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
        class="notification-success mr-3"
      >
        <path
          fill="currentColor"
          d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        />
      </svg>
      <svg
        v-else
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
        class="notification-error mr-3"
      >
        <path
          fill="currentColor"
          d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </svg>
    </div>
    <div>
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch(
        'notifications/removeNotification',
        this.notification.id,
      );
    }, 4000);
  },
};
</script>

<style></style>
