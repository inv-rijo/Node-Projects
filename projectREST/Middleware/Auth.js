const jwt = require("jsonwebtoken");

let TOKEN_KEY = "123456789";
//verify the token which user are just login
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
//verify the token which role is admin
const adminAccess = (req, res, next) => {
  const accessToken = req.headers["user"];
  try {
    const decodedToken = jwt.verify(accessToken, TOKEN_KEY);
    if (decodedToken.role=="admin") {
      req.user = decodedToken;
    } else {
      return res.status(403).send("access denied");
    }
  } catch (err) {
    return res.status(403).send("Access denied");
  }
  return next();
};
//verify the token which role is user
const userAccess = (req, res, next) => {
  const accessToken = req.headers["user"];
  try {
    const decodedToken = jwt.verify(accessToken, TOKEN_KEY);
    if (decodedToken.role == "user") {
      req.user = decodedToken;
    } else {
      return res.status(403).send("access denied");
    }
  } catch (err) {
    return res.status(403).send("Access denied");
  }
  return next();
};

module.exports = {userAccess,adminAccess,verifyToken}
