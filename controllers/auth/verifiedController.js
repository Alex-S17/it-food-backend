const { verifyUser } = require("../../services/auth/verifyUser");

const verifiedController = async (req, res) => {
  const result = await verifyUser(req);

  res.json(result);
};

module.exports = {
  verifiedController,
};
