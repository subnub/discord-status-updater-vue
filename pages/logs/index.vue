<template>
  <div>
    <!-- <div class="border-2 m-3">
      <LogsList :logs="logs" />
    </div> -->
    <LogsList />
  </div>
</template>

<script>
export default {
  // mounted() {
  //   this.getLogs();
  // },
  // data() {
  //   return {
  //     limit: 30,
  //     from: 24 * 60 * 60 * 1000,
  //     order: "desc",
  //     level: "all",
  //     logs: [],
  //   };
  // },
  // methods: {
  //   async getLogs() {
  //     try {
  //       const logsResponse = await this.$logsAPI.getLogs(
  //         this.limit,
  //         this.from,
  //         this.order
  //       );
  //       this.logs = logsResponse.data;
  //       console.log("logs response", logsResponse);
  //     } catch (e) {
  //       console.log("Error getting logs", e);
  //     }
  //   },
  // },
};
</script>
