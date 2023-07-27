const { addToFavoriteDishes } = require("./addToFavoriteDishes");
const { currentUser } = require("./currentUser");
const { deleteFromFavoriteDishes } = require("./deleteFromFavoriteDishes");
const { userDataChange } = require("./userDataChange");
const { getCurrentUser, userFavoriteDishes } = require("./userFavoriteDishes");

module.exports = {
  addToFavoriteDishes,
  currentUser,
  deleteFromFavoriteDishes,
  userDataChange,
  getCurrentUser,
  userFavoriteDishes,
};
