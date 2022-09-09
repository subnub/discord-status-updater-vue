import {
  attachLoginCookie,
  attachLogoutCookie,
  createToken,
  verifyToken,
} from "../utils/auth";
import { NotAuthorizedError } from "../utils/errors";

class AuthService {
  async login(password, res) {
    console.log("password", password, process.env.LOGIN_PASSWORD);
    if (password !== process.env.LOGIN_PASSWORD) {
      console.log("not right password");
      throw new NotAuthorizedError("Incorrect Login Password");
    }

    const authToken = await createToken();
    console.log("auth token", authToken);
    attachLoginCookie(authToken, res);
  }
  async logout(res) {
    attachLogoutCookie(res);
  }
  async checkLogin(token) {
    if (!token) {
      throw new NotAuthorizedError("Invalid Token");
    }
    console.log("token", token);
    const verifiedToken = await verifyToken(token);
    console.log("check login request", verifiedToken);
    if (!verifiedToken.loggedIn) {
      throw new NotAuthorizedError("Invalid Token");
    }
  }
}

export default AuthService;
