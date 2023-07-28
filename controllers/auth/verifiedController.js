const { verifyUser } = require("../../services/auth");

const verifiedController = async (req, res) => {
  const result = await verifyUser(req);

  res.status(201).json(result);
};

module.exports = {
  verifiedController,
};
