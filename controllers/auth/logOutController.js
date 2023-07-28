const { logOut } = require("../../services/auth");

const logOutController = async (req, res) => {
  await logOut(req);
  res.sendStatus(204);
};

module.exports = {
  logOutController,
};
