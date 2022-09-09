export default {
  setLoggedIn(state) {
    state.loggedIn = true;
    state.loginChecked = true;
  },
  setLoggedOut(state) {
    state.loggedIn = false;
    state.loginChecked = true;
  },
};
