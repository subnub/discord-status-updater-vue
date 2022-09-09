import AuthService from "../services/authService";

const authService = new AuthService();

class AuthController {
  async login(req, res) {
    try {
      const password = req.body.password;

      await authService.login(password, res);

      res.send();
    } catch (e) {
      console.log("Error Login In", e);
      const status = e.code || 500;
      res.status(status).send("Server Error Login In");
    }
  }
  async logout(_, res) {
    try {
      await authService.logout(res);

      res.send();
    } catch (e) {
      console.log("Error Logging Out", e);
      const status = e.code || 500;
      res.status(status).send("Server Error Login Out");
    }
  }
  async checkLogin(_, res) {
    try {
      res.send();
    } catch (e) {
      console.log("Error Checking Login", e);
      const status = e.code || 500;
      res.status(status).send("Server Error Login In");
    }
  }
}

export default AuthController;
