const {
  NonExistingParamsError,
  NotAuthorizedError,
} = require("../../helpers/errors");
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
      $match: { _id, owner },
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
  console.log("getOrderById => result:", result);

  if (result.length <= 0) throw new NotAuthorizedError("Not authorized");

  return result[0];
};

module.exports = { getOrderById };
