const { confirmOrder } = require("../../services/order/confirmOrder");

const confirmOrderController = async (req, res) => {
  const result = await confirmOrder(req);

  res.status(200).json(result);
};

module.exports = {
  confirmOrderController,
};
