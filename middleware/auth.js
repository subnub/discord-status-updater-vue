export default ({ store, redirect, route }) => {
  if (!store.state.auth.loggedIn) {
    return redirect(`/login?redirect=${route.path}`);
  }
};
