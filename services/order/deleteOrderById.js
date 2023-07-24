const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");

const deleteOrderById = async (req) => {
  const { _id } = req.body;

  const result = await Order.findOneAndDelete({ _id });

  if (!result) throw new NonExistingParamsError("Order error");
  return { _id: result._id };
};

module.exports = { deleteOrderById };
