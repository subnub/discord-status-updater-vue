<template>
  <div class="fixed w-screen h-screen flex justify-center items-center">
    <div
      class="w-screen h-screen md:w-10/12 md:h-4/6 bg-white border-2 shadow-lg"
    >
      <div class="w-full flex justify-end p-3">
        <svg
          @click="clearSelectedLog"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
          class="close-logs-icon"
        >
          <path
            fill="currentColor"
            d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
          />
        </svg>
      </div>
      <div
        class="p-3 overflow-y-scroll flex flex-grow flex-col logs-modal-height"
      >
        <p class="font-bold">{{ selectedLog?.message }}</p>
        <p class="mt-2">{{ formattedDate }}</p>
        <p v-if="!selectedLog?.stack" class="mt-2">No stack trace</p>
        <p v-else class="mt-2">{{ selectedLog?.stack }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      selectedLog: (state) => state.logs.selectedLog,
    }),
    formattedDate() {
      return moment(this.selectedLog?.timestamp).format("MM/DD/YYYY hh:mm a");
    },
  },
  methods: {
    clearSelectedLog() {
      this.$store.dispatch("logs/clearSelectedLog");
    },
  },
};
</script>
