const { NonExistingParamsError } = require("../../helpers/errors");
const { Order } = require("../../models/orderModel");
const ObjectId = require("mongodb").ObjectId;

const getLastOrder = async (req) => {
  const userId = req.user?._id;

  const phone = req.body?.phone;

  const owner = new ObjectId(userId);

  if (!phone && !userId) throw new NonExistingParamsError("Credentials error");

  const result = await Order.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [{ owner }, { phone }],
          },
        ],
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
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

  // return Order.findOne({ owner, phone }).sort({ _id: -1 });
};

module.exports = { getLastOrder };
