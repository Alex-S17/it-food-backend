const { passwordReset } = require("../../services/auth/passwordReset");

const passwordResetController = async (req, res) => {
  await passwordReset(req);
  res.sendFile("index.html", { root: "." });
};

module.exports = { passwordResetController };
