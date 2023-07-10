const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const { NonExistingParamsError } = require("../../helpers/errors");

const confirmOrder = async (req) => {
  const { _id, paymentMethod, tipAmount } = req.body;

  const orderId = new ObjectId(_id);

  const [{ totalPrice }] = await Order.aggregate([
    {
      $match: { _id: orderId },
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

  if (!totalPrice) throw new NonExistingParamsError("Credentials error");

  const totalWithTipsPrice =
    totalPrice / 100 + (totalPrice / 10000) * tipAmount;

  const updatedOrder = await Order.findByIdAndUpdate(
    { _id },
    {
      paymentMethod,
      tipAmount,
      totalPrice: totalWithTipsPrice.toFixed(2),
      confirmed: true,
    },
    { new: true }
  );

  return updatedOrder;
};

module.exports = { confirmOrder };
