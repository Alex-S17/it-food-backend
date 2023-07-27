const {
  getCurrentUser,
  deleteFromFavoriteDishes,
} = require("../../services/user");

const deleteFromFavoriteDishesController = async (req, res) => {
  const currentUser = await getCurrentUser(req);
  const arrayOfFavorite = currentUser.favorite;
  const { delFavorite } = req.body;

  if (!arrayOfFavorite.includes(delFavorite)) {
    res.json({
      code: 202,
      status: "This dish was not include in your List of favorite dishes",
    });
    return;
  }

  await deleteFromFavoriteDishes(req, arrayOfFavorite);
  res.json({
    code: 200,
    status:
      "This dish is successfully deleted from your List of favorite dishes",
  });
};

module.exports = {
  deleteFromFavoriteDishesController,
};
