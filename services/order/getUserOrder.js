const { Order } = require("../../models/orderModel");

const getUserOrder = async (req) => {
  const { _id: owner } = req.user;

  return await Order.find({ owner });
};

module.exports = { getUserOrder };
