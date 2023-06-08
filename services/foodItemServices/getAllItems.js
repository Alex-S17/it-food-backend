const { FoodItem } = require("../../models/foodItemModel");

const getAllItems = async () => {
  const result = await FoodItem.find({});
  return result;
};

module.exports = {
  getAllItems,
};
