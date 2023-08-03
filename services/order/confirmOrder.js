const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const { NonExistingParamsError } = require("../../helpers/errors");
const { User } = require("../../models/userModel");
const { verifyToken } = require("../../helpers/verifyToken");

const confirmOrder = async (req) => {
  const { _id, paymentMethod, tipAmount, orderedDish, note, option } = req.body;

  const { authorization = "" } = req.headers;

  const [, token] = authorization.split(" ");
  const orderId = new ObjectId(_id);

  await Order.findByIdAndUpdate(
    { _id },
    { tipAmount, paymentMethod, orderedDish, note, option },
    { new: true }
  );

  const result = await Order.aggregate([
    {
      $match: { _id: orderId, confirmed: false },
    },
    {
      $lookup: {
        from: "dishes",
        localField: "dishes._id",
        foreignField: "id",
        as: "dishesData",
      },
    },
    {
      $set: {
        orderedDish: {
          $map: {
            input: "$orderedDish",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  $arrayElemAt: [
                    "$dishesData",
                    {
                      $indexOfArray: ["$dishesData._id", "$$this.id"],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $unwind: "$orderedDish",
    },
    {
      $addFields: {
        tp: {
          $sum: [
            {
              $multiply: [
                {
                  $toInt: {
                    $replaceAll: {
                      input: "$orderedDish.price",
                      find: ".",
                      replacement: "",
                    },
                  },
                },
                { $toInt: "$orderedDish.quantity" },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        totalPrice: {
          $sum: "$tp",
        },
      },
    },
  ]);

  const { totalPrice } = result[0] || false;

  if (!totalPrice) throw new NonExistingParamsError("Request error");

  const totalWithTipsPrice = (
    totalPrice / 100 +
    (totalPrice / 10000) * tipAmount
  ).toFixed(2);

  if (token) {
    const verifiedToken = verifyToken(token);
    const { _id: owner } = verifiedToken || {};

    const ownerId = new ObjectId(owner);

    const calculatedGiftCoin = (
      (((totalPrice / 100) * 0.03 * tipAmount) / 10) *
      100
    ).toFixed(0);

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id },
      {
        totalPrice: totalPrice / 100,
        totalWithTipsPrice,
        confirmed: true,
        giftCoin: calculatedGiftCoin,
      },
      { new: true }
    );
    const result = await Order.aggregate([
      {
        $match: { owner: ownerId, confirmed: true },
      },
      {
        $group: {
          _id: null,
          totalGiftCoin: { $sum: { $toInt: "$giftCoin" } },
        },
      },
    ]);
    const [{ totalGiftCoin }] = result || null;

    await User.findOneAndUpdate({ token }, { giftCoin: totalGiftCoin });

    return updatedOrder;
  } else {
    return await Order.findByIdAndUpdate(
      { _id },
      {
        totalPrice: totalPrice / 100,
        totalWithTipsPrice,
        confirmed: true,
      },
      { new: true }
    );
  }
};

module.exports = { confirmOrder };
