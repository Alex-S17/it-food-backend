const { User } = require("../../models/userModel");

const addToFavoriteDishes = async (req, arrayOfFavorite) => {
  const { _id } = req?.user;

  // console.log("arrayOfFavorite1=", arrayOfFavorite);
  const { newFavorite } = req.body;
  // console.log("newFavorite2=", newFavorite);
  arrayOfFavorite.push(newFavorite);
  // console.log("arrayOfFavorite2=", arrayOfFavorite);

  await User.findByIdAndUpdate(
    _id,
    { favorite: arrayOfFavorite },
    { new: true }
  );

  return arrayOfFavorite;
};

module.exports = {
  addToFavoriteDishes,
};
