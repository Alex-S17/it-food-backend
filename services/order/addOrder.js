const { Order } = require("../../models/orderModel");

const addOrder = async (req) => {
  const { note, option, dishes, phone, customerName } = req.body;
  const user = req.user;

  return await Order.create({
    customerName,
    note,
    option,
    dishes,
    owner: user ? user._id : null,
    phone,
  });
};

module.exports = { addOrder };
