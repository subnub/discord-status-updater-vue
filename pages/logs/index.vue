<template>
  <div>
    <LogsModal v-show="selectedLog" />
    <LogsList />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "auth",
  computed: {
    ...mapState({
      selectedLog: (state) => state.logs.selectedLog,
    }),
  },
};
</script>
