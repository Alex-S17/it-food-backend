const { Order } = require("../../models/orderModel");

const addOrder = async (req) => {
  const { note, option, orderedDish, phone, customerName } = req.body;
  console.log("addOrder => orderedDish:", orderedDish);

  const user = req.user;

  const orderCount = await Order.count({});

  return await Order.create({
    orderNumber: String(orderCount + 1).padStart(6, "0"),
    customerName,
    note,
    option,
    orderedDish,
    owner: user ? user._id : null,
    phone,
  });
};

module.exports = { addOrder };
