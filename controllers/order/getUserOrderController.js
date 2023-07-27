const { getUserOrder } = require("../../services/order");

const getUserOrderController = async (req, res) => {
  const result = await getUserOrder(req);

  res.status(200).json(result);
};

module.exports = {
  getUserOrderController,
};
