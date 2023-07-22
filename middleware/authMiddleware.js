const { User } = require("../models/userModel");
const { verifyToken } = require("../helpers/verifyToken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  bearer !== "Bearer" && next(new NotAuthorizedError("Not authorized"));
  try {

    const { _id } = verifyToken(token);

    const user = await User.findOne({ _id });

    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
