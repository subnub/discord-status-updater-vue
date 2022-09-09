export default ({ $axios }, inject) => {
  const login = async (password) => {
    await $axios.post("/auth/login", { password });
  };

  const checkLogin = async () => {
    await $axios.get("/auth/check-login");
  };

  const logout = async () => {
    await $axios.post("/auth/logout");
  };

  inject("authAPI", {
    login,
    checkLogin,
    logout,
  });
};
