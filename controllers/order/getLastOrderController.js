const { getLastOrder } = require("../../services/order/getLastOrder");

const getLastOrderController = async (req, res) => {
  const result = await getLastOrder(req);

  res.status(200).json(result);
};

module.exports = {
  getLastOrderController,
};
