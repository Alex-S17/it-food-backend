const { Dish } = require("../../models/dishModel");

const getDishesByCategory = async (req) => {
  const { collection } = req.params;

  return await Dish.find({ collection });
};

module.exports = { getDishesByCategory };
