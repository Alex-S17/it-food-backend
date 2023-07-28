

const { currentUser } = require("../../services/user");

const currentUserController = async (req, res) => {
  const result = await currentUser(req);

  res.status(200).json(result);
};

module.exports = {
  currentUserController,
};
