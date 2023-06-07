const { logOut } = require("../../services/auth/logOut");

const logOutController = async (req, res) => {
  await logOut(req);
  res.sendStatus(204);
};

module.exports = {
  logOutController,
};
