const { passwordReset } = require("../../services/auth/passwordReset");

const passwordResetController = async (req, res) => {
  const result = await passwordReset(req);
  res.status(201).json(result);
};

module.exports = { passwordResetController };
