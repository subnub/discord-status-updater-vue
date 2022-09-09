export default {
  async login({ commit }, password) {
    try {
      await this.$authAPI.login(password);
      commit("setLoggedIn");
    } catch (e) {
      console.log("Error Loggin in", e);
      commit("setFormLoginError");
    }
  },
  async loginWithCookie({ commit }) {
    try {
      await this.$authAPI.checkLogin();
      commit("setLoggedIn");
    } catch (e) {
      console.log("Error Loggin in with cookie", e);
      commit("setLoggedOut");
    }
  },
  async logout({ commit }) {
    try {
      await this.$authAPI.logout();
      commit("setLoggedOut");
    } catch (e) {
      console.log("Error Logging Out", e);
    }
  },
};
