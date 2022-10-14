import AuthService from "../services/authService";
import logger from "../logger";

const authService = new AuthService();

class AuthController {
  async login(req, res) {
    try {
      const password = req.body.password;

      await authService.login(password, res);

      res.send();
    } catch (e) {
      logger.error(e);
      const status = e.code || 500;
      res.status(status).send("Server Error Login In");
    }
  }
  async logout(_, res) {
    try {
      await authService.logout(res);

      res.send();
    } catch (e) {
      logger.error(e);
      const status = e.code || 500;
      res.status(status).send("Server Error Login Out");
    }
  }
  async checkLogin(_, res) {
    try {
      res.send();
    } catch (e) {
      if (e.code !== 401) {
        logger.error(e);
      }
      const status = e.code || 500;
      res.status(status).send("Server Error Login In");
    }
  }
}

export default AuthController;
