const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");

const getLastOrder = async (req) => {
  const owner = req.user?._id;

  const phone = req.body?.phone;

  console.log(req.body);

  if (!phone && !owner) throw new NonExistingParamsError("Credentials error");

  return Order.findOne({ owner, phone }).sort({ _id: -1 });
};

module.exports = { getLastOrder };
