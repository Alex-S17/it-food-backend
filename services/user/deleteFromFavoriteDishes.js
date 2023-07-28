const { User } = require("../../models/userModel");

const deleteFromFavoriteDishes = async (req, arrayOfFavorite) => {
  const { _id } = req?.user;
  const { delFavorite } = req.body;

  // console.log("arrayOfFavorite3=", arrayOfFavorite);
  // console.log("delFavorite2=", delFavorite);

  arrayOfFavorite.splice(arrayOfFavorite.indexOf(delFavorite), 1);
  // console.log("arrayOfFavorite4=", arrayOfFavorite);


  await User.findByIdAndUpdate(
    _id,
    { favorite: arrayOfFavorite },
    { new: true }
  );
  return arrayOfFavorite;
};

module.exports = {
  deleteFromFavoriteDishes,
};
