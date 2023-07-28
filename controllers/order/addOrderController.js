const { addOrder } = require("../../services/order");

const addOrderController = async (req, res) => {
  const result = await addOrder(req);

  res.status(200).json(result);
};

module.exports = {
  addOrderController,
};
