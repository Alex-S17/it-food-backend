const { Order } = require("../../models/orderModel");

const addOrder = async (req) => {
  const { note, option, orderedDish, phone, customerName } = req.body;

  const user = req.user;

  const [lastOrder] = await Order.find().sort({ _id: -1 }).limit(1);

  return await Order.create({
    orderNumber: String(
      lastOrder ? Number(lastOrder.orderNumber) + 1 : 1
    ).padStart(6, "0"),

    customerName,
    note,
    option,
    orderedDish,
    owner: user ? user._id : null,
    phone,
  });
};

module.exports = { addOrder };
