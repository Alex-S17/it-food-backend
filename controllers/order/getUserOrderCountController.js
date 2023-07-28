const { getUserOrderCount } = require("../../services/order");

const getUserOrderCountController = async (req, res) => {
  const result = await getUserOrderCount(req);

  res.status(200).json(result);
};

module.exports = {
  getUserOrderCountController,
};
