<template>
  <div>
    <form v-show="!loggedIn && loginChecked" @submit.prevent="login">
      <div class="flex flex-col items-center justify-center full-height">
        <div
          class="flex flex-col items-center justify-center border-2 shadow-lg w-1/2 p-6"
        >
          <h3 class="text-lg">Enter Server Password</h3>
          <input
            class="border w-11/12 p-2 mt-6"
            v-model="password"
            type="password"
          />
          <button class="mt-3">Login</button>
          <div v-show="loading" class="mt-3">
            <div class="loader"></div>
          </div>
          <div v-show="formLoginError" class="mt-3">
            <p class="text-red-500">Error Logging In</p>
          </div>
        </div>
      </div>
    </form>
    <div
      v-show="!loginChecked || loggedIn"
      class="flex w-full full-height justify-center items-center"
    >
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      password: "",
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      await this.$store.dispatch("auth/login", this.password);
      this.loading = false;
    },
  },
  async asyncData({ store }) {
    await store.dispatch("auth/loginWithCookie");
  },
  computed: {
    ...mapState({
      loggedIn: (state) => state.auth.loggedIn,
      loginChecked: (state) => state.auth.loginChecked,
      formLoginError: (state) => state.auth.formLoginError,
    }),
  },
  watch: {
    loggedIn: {
      handler(loggedIn) {
        if (loggedIn) {
          const redirect = this.$route.query.redirect || "/";
          this.$router.push(redirect);
        }
      },
      immediate: true,
    },
  },
};
</script>
