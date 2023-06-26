const { User } = require("../models/userModel");
const { verifyToken } = require("../helpers/verifyToken");

const addOrderMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [, token] = authorization.split(" ");

  try {
    const user = await User.findOne({ token });

    const verifiedToken = verifyToken(user.token);

    req.user = verifiedToken;

    next();
  } catch (error) {
    next((req.user = null));
  }
};

module.exports = { addOrderMiddleware };
