const { forgotPasswordController } = require("./forgotPasswordController");
const { logInController } = require("./logInController");
const { logOutController } = require("./logOutController");
const { passwordResetController } = require("./passwordResetController");
const { signUpController } = require("./signUpController");
const { verifiedController } = require("./verifiedController");

module.exports = {
  forgotPasswordController,
  logInController,
  logOutController,
  passwordResetController,
  signUpController,
  verifiedController,
};
