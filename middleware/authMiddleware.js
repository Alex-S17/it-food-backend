const { User } = require("../models/userModel");
const { verifyToken } = require("../helpers/verifyToken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  bearer !== "Bearer" && next(new NotAuthorizedError("Not authorized"));
  try {
    const user = await User.findOne({ token });
    // console.log("User222=", user);

    const verifiedToken = verifyToken(user.token);

    console.log("verifiedToken=", verifiedToken);

    // req.user = verifiedToken;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
