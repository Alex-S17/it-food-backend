const { User } = require("../../models/userModel");
const { Dish } = require("../../models/dishModel");

const getCurrentUser = async (req) => {
  const { _id } = req?.user;

  const currentUser = await User.findById({ _id });
  // console.log("favorite=", currentUser);
  // console.log("_id=", _id);

  return currentUser;
};

const userFavoriteDishes = async (id) => {
  const favoriteDish = await Dish.findById(id);
  console.log("favoriteDish=======", favoriteDish.title);
  return favoriteDish;
};

module.exports = {
  getCurrentUser,
  userFavoriteDishes,
};
