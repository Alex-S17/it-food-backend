const { User } = require("../../models/userModel");

const logOut = async (req) => {
  const { _id } = req.user;

  await User.findOneAndUpdate({ _id }, { token: null });
};

module.exports = {
  logOut,
};
