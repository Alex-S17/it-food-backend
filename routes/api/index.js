const { authRouter } = require("./auth");
const { dishRouter } = require("./dish");
const { userOrder } = require("./order");
const { userRouter } = require("./user");

module.exports = {
  dishRouter,
  authRouter,
  userOrder,
  userRouter,
};
