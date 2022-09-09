import jwt from "jsonwebtoken";

const maxAgeToken = 60 * 1000 * 60 * 24;

export const createToken = () => {
  return new Promise((resolve, reject) => {
    jwt.sign({ loggedIn: true }, process.env.JWT_PASSWORD, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_PASSWORD, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

export const attachLoginCookie = (token, res) => {
  res.cookie("access-token", token, {
    httpOnly: true,
    maxAge: maxAgeToken,
    sameSite: "strict",
  });
};

export const attachLogoutCookie = (res) => {
  res.cookie(
    "access-token",
    {},
    {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    }
  );
};
