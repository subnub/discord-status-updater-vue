<template>
  <div class="w-full flex justify-center items-center">
    <div class="loader-small mx-3" v-show="loading"></div>
    <input
      type="text"
      class="border-2 w-full m-3 md:w-3/4 p-1"
      placeholder="Search"
      v-model="searchText"
    />
  </div>
</template>

<script>
import debounce from "../../utils/debounce";
export default {
  data() {
    return {
      searchText: "",
      loading: false,
    };
  },
  watch: {
    searchText: debounce(async function () {
      this.loading = true;
      if (this.searchText.length === 0) {
        await this.$store.dispatch("messages/setMessageList", this.searchText);
      } else {
        await this.$store.dispatch(
          "messages/searchMessageList",
          this.searchText
        );
      }
      this.loading = false;
    }, 250),
  },
  //   computed: {
  //     searchModel: {
  //       get() {
  //         return this.searchText;
  //       },
  //       set(value) {
  //         console.log("val", value);
  //         this.searchText = value;
  //         debounce(console.log("fs"));
  //       },
  //     },
  //   },
};
</script>
