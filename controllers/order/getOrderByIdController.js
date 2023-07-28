const { getOrderById } = require("../../services/order");

const getOrderByIdController = async (req, res) => {
  const result = await getOrderById(req);

  res.status(200).json(result);
};

module.exports = {
  getOrderByIdController,
};
