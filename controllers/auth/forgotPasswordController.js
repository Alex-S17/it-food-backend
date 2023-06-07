const { forgotPassword } = require("../../services/auth/forgotPassword");

const forgotPasswordController = async (req, res) => {
  const result = await forgotPassword(req);
  res.status(201).json(result);
};

module.exports = { forgotPasswordController };
