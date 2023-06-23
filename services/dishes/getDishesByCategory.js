const { Dish } = require("../../models/dishModel");

const getDishesByCategory = async (req) => {
  const { collection } = req.params;

  return Dish.find({ collection });
};

module.exports = { getDishesByCategory };
