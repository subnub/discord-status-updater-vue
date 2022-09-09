import {
  attachLoginCookie,
  attachLogoutCookie,
  createToken,
  verifyToken,
} from "../utils/auth";
import { NotAuthorizedError } from "../utils/errors";

class AuthService {
  async login(password, res) {
    if (password !== process.env.LOGIN_PASSWORD) {
      throw new NotAuthorizedError("Incorrect Login Password");
    }

    const authToken = await createToken();
    attachLoginCookie(authToken, res);
  }
  async logout(res) {
    attachLogoutCookie(res);
  }
  async checkLogin(token) {
    if (!token) {
      throw new NotAuthorizedError("Invalid Token");
    }

    const verifiedToken = await verifyToken(token);
    if (!verifiedToken.loggedIn) {
      throw new NotAuthorizedError("Invalid Token");
    }
  }
}

export default AuthService;
