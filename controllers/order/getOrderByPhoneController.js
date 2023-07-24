const { getOrderByPhone } = require("../../services/order/getOrderByPhone");

const getOrderByPhoneController = async (req, res) => {
  const result = await getOrderByPhone(req);

  res.status(200).json(result);
};

module.exports = {
  getOrderByPhoneController,
};
