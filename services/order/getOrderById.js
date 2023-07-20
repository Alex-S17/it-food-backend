const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");
const ObjectId = require("mongodb").ObjectId;

const getOrderById = async (req) => {
  const orderId = req.params.orderId;
  // const user = req.user;
  // console.log("getOrderById => user:", user);

  // add check user

  if (!orderId) throw new NonExistingParamsError("Credentials error");

  const _id = new ObjectId(orderId);

  const result = await Order.aggregate([
    {
      $match: { _id },
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

  return result[0];
};

module.exports = { getOrderById };
