export default {
  setLoggedIn(state) {
    state.loggedIn = true;
    state.loginChecked = true;
    state.formLoginError = false;
  },
  setLoggedOut(state) {
    state.loggedIn = false;
    state.loginChecked = true;
    state.formLoginError = false;
  },
  setFormLoginError(state) {
    state.loggedIn = false;
    state.loginChecked = true;
    state.formLoginError = true;
  },
};
