// const { getCurrentUser } = require("../../services/user/userFavoriteDishes");
const {
  addToFavoriteDishes,
} = require("../../services/user/addToFavoriteDishes");

const addToFavoriteDishesController = async (req, res) => {
  // const currentUser = await getCurrentUser(req);
  // const arrayOfFavorite = currentUser.favorite;

  const arrayOfFavorite = req.user.favorite;
  // console.log("NEW arrayOfFavorite = ", arrayOfFavorite);

  const { newFavorite } = req.body;

  // console.log("newFavorite1=", newFavorite);

  if (arrayOfFavorite.includes(newFavorite)) {
    res.json({
      code: 202,
      status: "This dish is already added to your List of favorite dishes",
      // newArrayOfFavorite: req.user.favorite,
    });
    // console.log("req.user.favorite=", req.user.favorite);
    return;
  }

  const newArrayOfFavorite = await addToFavoriteDishes(req, arrayOfFavorite);
  // console.log("newArrayOfFavorite-ADD =", newArrayOfFavorite);
  res.json({
    code: 200,
    status: "This dish is successfully added to your List of favorite dishes",
    newArrayOfFavorite,
  });
};

module.exports = {
  addToFavoriteDishesController,
};
