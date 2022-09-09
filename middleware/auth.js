export default ({ store, redirect, route }) => {
  console.log("route", route.path);
  if (!store.state.auth.loggedIn) {
    return redirect(`/login?redirect=${route.path}`);
  }
};
