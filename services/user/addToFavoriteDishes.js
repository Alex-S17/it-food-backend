const { User } = require("../../models/userModel");

const addToFavoriteDishes = async (req, arrayOfFavorite) => {
  const { _id } = req?.user;

  const { newFavorite } = req.body;

  arrayOfFavorite.push(newFavorite);

  await User.findByIdAndUpdate(
    _id,
    { favorite: arrayOfFavorite },
    { new: true }
  );
};

module.exports = {
  addToFavoriteDishes,
};
