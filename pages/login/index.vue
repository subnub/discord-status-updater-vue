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
      try {
        this.loading = true;
        await this.$authAPI.login(this.password);
        this.$store.dispatch("auth/setLoggedIn");
        this.loading = false;
      } catch (e) {
        console.log("Error Login In", e);
        this.loading = false;
      }
    },
  },
  async asyncData({ store, $authAPI }) {
    try {
      await $authAPI.checkLogin();
      store.dispatch("auth/setLoggedIn");
    } catch (e) {
      console.log("Error Login In", e);
      store.dispatch("auth/setLoggedOut");
    }
  },
  computed: {
    ...mapState({
      loggedIn: (state) => state.auth.loggedIn,
      loginChecked: (state) => state.auth.loginChecked,
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
