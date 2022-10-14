<template>
  <div class="full-height">
    <div class="flex flex-grow flex-col max-h-full h-full">
      <div class="flex justify-between p-3">
        <div><div v-show="loading" class="loader-extra-small"></div></div>
        <div class="flex">
          <!-- order select -->
          <select v-model="order" class="mr-3">
            <option disabled value="">Order</option>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <!-- Refresh Button -->
          <svg
            @click="getLogs"
            class="refresh-logs-icon"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
            />
          </svg>
        </div>
      </div>
      <div
        @scroll="listOnScroll"
        class="flex flex-col overflow-scroll border-2 h-full"
      >
        <LogsItem
          v-for="(log, index) of logs"
          :key="index"
          :log="log"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getLogs();
  },
  data() {
    return {
      limit: 30,
      from: new Date() - 24 * 60 * 60 * 1000,
      order: "desc",
      level: "all",
      logs: [],
      loading: false,
    };
  },
  methods: {
    async getLogs() {
      try {
        this.loading = true;
        const logsResponse = await this.$logsAPI.getLogs(
          this.limit,
          this.from,
          this.order,
          0
        );
        this.logs = logsResponse.data;
      } catch (e) {
        console.log("Error getting logs", e);
      } finally {
        this.loading = false;
      }
    },
    async loadMoreLogs() {
      if (this.loading) return;
      try {
        this.loading = true;
        const logsResponse = await this.$logsAPI.getLogs(
          this.limit,
          this.from,
          this.order,
          this.logs.length
        );
        this.logs = [...this.logs, ...logsResponse.data];
      } catch (e) {
        console.log("Error getting logs", e);
      } finally {
        this.loading = false;
      }
    },
    listOnScroll(e) {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.loadMoreLogs();
      }
    },
  },
  watch: {
    order() {
      this.getLogs();
    },
  },
};
</script>
