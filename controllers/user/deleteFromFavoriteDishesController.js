const { ConflictDataError } = require("../../helpers/errors");
const { deleteFromFavoriteDishes } = require("../../services/user");

const deleteFromFavoriteDishesController = async (req, res) => {
  // const currentUser = await getCurrentUser(req);
  // const arrayOfFavorite = currentUser.favorite;

  const arrayOfFavorite = req.user.favorite;
  // console.log("4DEL arrayOfFavorite = ", arrayOfFavorite);

  const { delFavorite } = req.body;

  // console.log("delFavorite1=", delFavorite);

  if (!arrayOfFavorite.includes(delFavorite)) {
    throw new ConflictDataError(
      "This dish was not include in your List of favorite dishes"
    );
  }

  // if (!arrayOfFavorite.includes(delFavorite)) {
  //   res.json({
  //     code: 409,
  //     status: "This dish was not include in your List of favorite dishes",
  //     // newArrayOfFavorite: req.user.favorite,
  //   });
  //   return;
  // }

  const newArrayOfFavorite = await deleteFromFavoriteDishes(
    req,
    arrayOfFavorite
  );
  res.json({
    code: 200,
    status:
      "This dish is successfully deleted from your List of favorite dishes",
    newArrayOfFavorite,
  });
};

module.exports = {
  deleteFromFavoriteDishesController,
};
