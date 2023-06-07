const { forgotPassword } = require("../../services/auth/forgotPassword");

const forgotPasswordController = async (req, res) => {
  await forgotPassword(req);
  res.json({
    message: "Email sended",
  });
};

module.exports = { forgotPasswordController };
