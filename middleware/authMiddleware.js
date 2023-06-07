const createError = require("http-errors");
const { User } = require("../models/userModel");
const { verifyToken } = require("../helpers/verifyToken");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  bearer !== "Bearer" && next(createError(401, "Not authorized"));
  try {
    const user = await User.findOne({ token });

    const verifiedToken = verifyToken(user.token);

    req.user = verifiedToken;

    next();
  } catch (error) {
    next(createError(401, "Not authorized"));
  }
};

module.exports = { authMiddleware };
