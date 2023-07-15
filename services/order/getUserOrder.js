const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const getUserOrder = async (req) => {
  const { _id: owner } = req.user;

  const ownerId = new ObjectId(owner);

  const result = await Order.aggregate([
    {
      $match: { owner: ownerId },
    },
    { $sort: { _id: -1 } },
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
        "orderedDish.time",
        "orderedDish.tags",
        "orderedDish.updatedAt",
        "orderedDish.collection",
        "orderedDish.category",
        "orderedDish.area",
        "orderedDish.description",
        "orderedDish.thumb",
        "orderedDish.id",
        "orderedDish.instructions",
      ],
    },
  ]);

  return result;
};

module.exports = { getUserOrder };
