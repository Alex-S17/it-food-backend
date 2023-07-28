const { forgotPassword } = require("./forgotPassword");
const { logIn } = require("./logIn");
const { logOut } = require("./logOut");
const { passwordReset } = require("./passwordReset");
const { signUp } = require("./signUp");
const { verifyUser } = require("./verifyUser");

module.exports = {
  forgotPassword,
  logIn,
  logOut,
  passwordReset,
  signUp,
  verifyUser,
};
