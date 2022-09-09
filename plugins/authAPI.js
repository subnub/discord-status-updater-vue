export default ({ $axios }, inject) => {
  const login = async (password) => {
    await $axios.post("/auth/login", { password });
  };

  const checkLogin = async () => {
    await $axios.get("/auth/check-login");
  };

  inject("authAPI", {
    login,
    checkLogin,
  });
};
