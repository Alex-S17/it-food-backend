const { getCurrentUser } = require("../../services/user/userFavoriteDishes");
const {
  addToFavoriteDishes,
} = require("../../services/user/addToFavoriteDishes");

const addToFavoriteDishesController = async (req, res) => {
  const currentUser = await getCurrentUser(req);

  const arrayOfFavorite = currentUser.favorite;

  const { newFavorite } = req.body;

  if (arrayOfFavorite.includes(newFavorite)) {
    res.json({
      code: 202,
      status: "This dish is already added to your List of favorite dishes",
    });
    return;
  }

  await addToFavoriteDishes(req, arrayOfFavorite);
  res.json({
    code: 200,
    status: "This dish is successfully added to your List of favorite dishes",
  });
};

module.exports = {
  addToFavoriteDishesController,
};
