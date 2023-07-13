const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const getUserOrder = async (req) => {
  const { _id: owner } = req.user;

  const ownerId = new ObjectId(owner);

  const result = await Order.aggregate([
    {
      $match: { owner: ownerId },
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

  return result;
};

module.exports = { getUserOrder };
