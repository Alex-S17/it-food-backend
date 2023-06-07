const { logIn } = require("../../services/auth/logIn");

const logInController = async (req, res) => {
  const result = await logIn(req);
  res.json(result);
};

module.exports = { logInController };
