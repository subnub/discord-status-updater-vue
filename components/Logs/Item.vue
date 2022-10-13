<template>
  <div class="flex p-1">
    <div class="w-1/2 flex">
      <div>
        <svg
          v-if="log.level === 'error'"
          style="width: 24px; height: 24px; color: red"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <svg
          v-else-if="log.level === 'warn'"
          style="width: 24px; height: 24px; color: orange"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"
          />
        </svg>
        <svg v-else style="width: 24px; height: 24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
      </div>
      <p class="ml-1">{{ log.message }}</p>
    </div>
    <div class="w-1/2 flex justify-end">
      <p class="mr-2">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    log: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return moment(this.log.timestamp).format("MM/DD/YYYY hh:mm a");
    },
  },
};
</script>
