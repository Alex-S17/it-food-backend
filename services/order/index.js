const { addOrder } = require("./addOrder");
const { confirmOrder } = require("./confirmOrder");
const { deleteOrderById } = require("./deleteOrderById");
const { getOrderByPhone } = require("./getOrderByPhone");
const { getUserOrder } = require("./getUserOrder");
const { getUserOrderCount } = require("./getUserOrderCount");
const { getOrderById } = require("./getOrderById");

module.exports = {
  addOrder,
  confirmOrder,
  deleteOrderById,
  getOrderByPhone,
  getUserOrder,
  getUserOrderCount,
  getOrderById,
};
