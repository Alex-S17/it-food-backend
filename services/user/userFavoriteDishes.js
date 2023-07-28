const { User } = require("../../models/userModel");
const { Dish } = require("../../models/dishModel");

const getCurrentUser = async (req) => {
  const { _id } = req?.user;

  const currentUser = await User.findById({ _id });
  return currentUser;
};

const userFavoriteDishes = async (id) => {
  const favoriteDish = await Dish.findById(id);

  return favoriteDish;
};

module.exports = {
  getCurrentUser,
  userFavoriteDishes,
};
