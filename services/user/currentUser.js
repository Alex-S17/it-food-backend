const { User } = require("../../models/userModel");

const currentUser = async (req) => {
  console.log(req.user);

  const { _id } = req?.user;

  const user = User.findById({ _id }, { password: false });

  return user;
};

module.exports = { currentUser };
