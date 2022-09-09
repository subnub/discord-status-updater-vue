<template>
  <form @submit.prevent="submitForm" class="flex flex-col items-center">
    <input v-model="text" class="border w-11/12 p-3 mt-6" />
    <div class="flex justify-end w-11/12">
      <button class="mt-3">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "MessageForm",
  data() {
    return {
      text: this.initialText,
    };
  },
  props: {
    initialText: {
      type: String,
      default: "",
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", this.text);
    },
  },
};
</script>
