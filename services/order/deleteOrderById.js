const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");

const deleteOrderById = async (req) => {
  const { _id } = req.body;
  console.log("deleteOrderById => req.body:", req.body);

  const result = await Order.findOneAndDelete({ _id });

  if (!result) throw new NonExistingParamsError("Order error");
};

module.exports = { deleteOrderById };
