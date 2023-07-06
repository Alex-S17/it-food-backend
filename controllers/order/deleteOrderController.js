const { deleteOrderById } = require("../../services/order/deleteOrderById");

const deleteOrderController = async (req, res) => {
  const result = await deleteOrderById(req);

  res.status(200).json(result);
};

module.exports = {
  deleteOrderController,
};
