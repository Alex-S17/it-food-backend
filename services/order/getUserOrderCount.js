const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const getUserOrderCount = async (req) => {
  const { _id } = req.user;

  const owner = new ObjectId(_id);

  const [firstResult] = await Order.aggregate([
    {
      $match: { owner, confirmed: true },
    },

    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $round: ["$totalPrice", 2] },
        },
        totalPriceWithTips: {
          $sum: { $round: ["$totalWithTipsPrice", 1] },
        },
        totalGiftCoin: {
          $sum: { $round: ["$giftCoin", 2] },
        },

        confirmedOrder: { $sum: 1 },
      },
    },
  ]);

  const {
    totalPrice = 0,
    totalPriceWithTips = 0,
    totalGiftCoin = 0,
    confirmedOrder = 0,
  } = firstResult || {};

  const [secondResult] = await Order.aggregate([
    {
      $match: { owner, confirmed: true },
    },

    {
      $unwind: "$orderedDish",
    },

    {
      $group: {
        _id: null,
        totalOrderedDish: {
          $sum: "$orderedDish.quantity",
        },
      },
    },
  ]);

  const { totalOrderedDish } = secondResult || {};

  const result = await Order.aggregate([
    {
      $match: { owner, confirmed: false },
    },

    {
      $group: {
        _id: null,

        unconfirmedOrder: { $sum: 1 },
      },
    },
  ]);

  return {
    totalPrice,
    totalPriceWithTips,
    totalGiftCoin,
    confirmedOrder,
    unconfirmedOrder: result.length === 0 ? 0 : result[0].unconfirmedOrder,
    totalOrderedDish,
  };
};

module.exports = { getUserOrderCount };
