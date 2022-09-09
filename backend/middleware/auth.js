import AuthService from "../services/authService";

const authService = new AuthService();

export default async (req, res, next) => {
  try {
    console.log("test discord", process.env.DISCORD_PASSWORD);
    const accessToken = req.cookies["access-token"];
    await authService.checkLogin(accessToken);
    next();
  } catch (e) {
    console.log("Authentication Error", e);
    return res.status(401).send();
  }
};
