const { getCurrentUser, userFavoriteDishes } = require("../../services/user");

const userFavoriteDishesController = async (req, res) => {
  const currentUser = await getCurrentUser(req);

  const arrayOfFavoriteID = currentUser.favorite;

  // const arrayOfFavoriteDishes = await arrayOfFavoriteID.map((id) => {
  //   return userFavoriteDishes(id);
  // });

  const arrayOfFavoriteDishes = [];
  for (const item of arrayOfFavoriteID) {
    const favoriteDish = await userFavoriteDishes(item);
    arrayOfFavoriteDishes.push(favoriteDish);
  }

  // console.log("arrayOfFavoriteDishes=", arrayOfFavoriteDishes);

  res.status(200).json(arrayOfFavoriteDishes);
};

module.exports = {
  userFavoriteDishesController,
};
