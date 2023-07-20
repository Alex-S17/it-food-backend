const ObjectId = require("mongodb").ObjectId;
const { Order } = require("../../models/orderModel");

const getUserOrder = async (req) => {
  const { _id: owner } = req.user;

  let { page = 1, limit = 8 } = req.query;
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const ownerId = new ObjectId(owner);

  const result = await Order.aggregate([
    {
      $match: { owner: ownerId },
    },
    { $sort: { _id: -1 } },
    { $skip: skip },
    { $limit: limit },

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
