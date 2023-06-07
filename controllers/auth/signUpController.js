const { signUp } = require("../../services/auth/signUp");

const signUpController = async (req, res) => {
  const result = await signUp(req);

  res.status(201).json(result);
};

module.exports = {
  signUpController,
};
