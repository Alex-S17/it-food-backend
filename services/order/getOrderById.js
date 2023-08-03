const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");
const ObjectId = require("mongodb").ObjectId;

const getOrderById = async (req) => {
  const orderId = req.params.orderId;
  const user = req.user;

  if (!orderId) throw new NonExistingParamsError("Credentials error");

  const _id = new ObjectId(orderId);
  const owner = new ObjectId(user._id);

  const result = await Order.aggregate([
    {
      $match: { _id, owner, confirmed: false },
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
      $unset: [
        "dishesData",
        "orderedDish.ingredients",
        "orderedDish.id",
        "orderedDish.instructions",
      ],
    },
  ]);

  if (result.length <= 0) throw new NonExistingParamsError("Request error");

  return result[0];
};

module.exports = { getOrderById };
