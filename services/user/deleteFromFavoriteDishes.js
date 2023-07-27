const { User } = require("../../models/userModel");

const deleteFromFavoriteDishes = async (req, arrayOfFavorite) => {
  const { _id } = req?.user;
  const { delFavorite } = req.body;

  arrayOfFavorite.splice(arrayOfFavorite.indexOf(delFavorite), 1);

  await User.findByIdAndUpdate(
    _id,
    { favorite: arrayOfFavorite },
    { new: true }
  );
};

module.exports = {
  deleteFromFavoriteDishes,
};
